import { SHEETNAMES } from './demoWorkbook';
import { lowercaseFirst } from './utils';

export class Payload {
  payload: any;

  constructor(workbook: any, sheetNames: any) {
    const SponsoredType = sheetNames[0].split('_')[0];
    this.payload = new SBK(workbook, sheetNames);
  }
}

class Schema {
  schema: any = {
    SBK: {
      sheetNames: [
        'SBK_Campaigns',
        'SBK_Creatives',
        'SBK_LandingPages',
        'SBK_Keywords',
        'SBK_NegativeKeywords',
      ],
      Campaigns: {
        primaryKey: 'name',
        columns: [
          'Name',
          'Budget',
          'BudgetType',
          'StartDate',
          'EndDate',
          'AdFormat',
          'State',
          'BrandEntityId',
          'BidOptimization',
          'BidMultiplier',
          'PortfolioId',
        ],
        relations: [
          'SBK_Creatives',
          'SBK_LandingPages',
          'SBK_Keywords',
          'SBK_NegativeKeywords',
        ],
        mutators: {
          setBudgetAttribute(value: string) {
            return parseFloat(value);
          },
          setBidOptimizationAttribute(value: string) {
            return value === 'true';
          },
          setBidMultiplierAttribute(value: string) {
            return parseInt(value);
          },
        },
      },
      Creatives: {
        foreignKey: 'campaignName',
        columns: [
          'CampaignName',
          'BrandName',
          'BrandLogo',
          'Headline',
          'Asins',
        ],
        mutators: {
          setAsinsAttribute(values: string) {
            return values.split(',').map((value) => value.trim());
          },
        },
      },
      LandingPages: {
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'Asins', 'Url'],
        mutators: {
          setAsinsAttribute(values: string) {
            return values.split(',').map((value) => value.trim());
          },
        },
      },
      Keywords: {
        foreignKey: 'campaignName',
        columns: [
          'CampaignName',
          'KeywordText',
          'NativeLanguageKeyword',
          'NativeLanguageLocale',
          'MatchType',
          'Bid',
        ],
        mutators: {
          setBidAttribute(value: string) {
            return parseFloat(value);
          },
        },
      },
      NegativeKeywords: {
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'KeywordText', 'MatchType'],
        mutators: {},
      },
    },
  };

  constructor(public sponsoredType: string) {}

  getColumns(entity: string) {
    return this.schema[this.sponsoredType][entity].columns;
  }

  getPrimaryKey(entity: string) {
    return this.schema[this.sponsoredType][entity].primaryKey;
  }

  getForeignKey(entity: string) {
    return this.schema[this.sponsoredType][entity].foreignKey;
  }

  validateSheetNames(inputSheetNames: string[]) {
    const schemaSheetNames = this.schema[this.sponsoredType].sheetNames;
    if (inputSheetNames.length !== schemaSheetNames.length) return false;

    for (let i = 0; i < schemaSheetNames.length; i++) {
      if (inputSheetNames[i] !== schemaSheetNames[i])
        throw Error(
          'Sheets Are Invalid. Please verify correct sheet names by downloading template file.'
        );
    }

    return this;
  }

  getMutator(entity: string, column: string) {
    return this.schema[this.sponsoredType][entity].mutators[
      `set${column}Attribute`
    ];
  }
}

enum SBKSheet {
  SBK_Campaigns,
  SBK_Creatives,
  SBK_LandingPages,
  SBK_Keywords,
  SBK_NegativeKeywords,
}

class SBK {
  campaigns: any = {};
  creatives: any = {};
  landingPages: any = {};
  keywords: any = {};
  negativeKeywords: any = {};

  constructor(workbook: any, sheetNames: string[]) {
    const schema = new Schema('SBK');
    schema.validateSheetNames(sheetNames);

    sheetNames.forEach((sheetName) => (this[sheetName] = {}));

    this.campaigns = workbook[SBKSheet.SBK_Campaigns].map(
      (campaign: any) =>
        new Entity(campaign, SBKSheet[SBKSheet.SBK_Campaigns], schema)
    );
    this.creatives = workbook[SBKSheet.SBK_Creatives].map(
      (creative: any) =>
        new Entity(creative, SBKSheet[SBKSheet.SBK_Creatives], schema)
    );
    this.landingPages = workbook[SBKSheet.SBK_LandingPages].map(
      (landingPage: any) =>
        new Entity(landingPage, SBKSheet[SBKSheet.SBK_LandingPages], schema)
    );
    this.keywords = workbook[SBKSheet.SBK_Keywords].map(
      (keyword: any) =>
        new Entity(keyword, SBKSheet[SBKSheet.SBK_Keywords], schema)
    );
    this.negativeKeywords = workbook[SBKSheet.SBK_NegativeKeywords].map(
      (negativeKeyword: any) =>
        new Entity(
          negativeKeyword,
          SBKSheet[SBKSheet.SBK_NegativeKeywords],
          schema
        )
    );

    this.campaigns.forEach((campaign: any) => {
      campaign.setRelationAttributes('creative', this.creatives);
      campaign.setRelationAttributes('landingPage', this.landingPages);
      campaign.setRelationAttributes('keywords', this.keywords, true);
      campaign.setRelationAttributes(
        'negativeKeywords',
        this.negativeKeywords,
        true
      );
    });

    console.log(this.campaigns[0].getAttributes());
  }
}

class Entity {
  attributes: any = {};
  currentEntity: string = '';

  constructor(attributes: any, public sheetName: any, public schema: any) {
    Object.entries(attributes).forEach(([key, value]) => {
      this.currentEntity = this.sheetName.split('_')[1];
      if (this.schema.getColumns(this.currentEntity).includes(key)) {
        this.setAttribute(key, value);
      }
    });
  }

  setAttribute(key: string, value: string) {
    const mutator = this.schema.getMutator(this.currentEntity, key);
    this.attributes[lowercaseFirst(key)] = mutator ? mutator(value) : value;
  }

  setRelationAttributes(key: string, values: any[], many: false) {
    const filtered = values.filter((value: any) => {
      const primaryKey = this.schema.getPrimaryKey(this.currentEntity);
      const foreignKey = this.schema.getForeignKey(value.currentEntity);

      if (this.attributes[primaryKey] === value.getAttributes()[foreignKey]) {
        value.removeAttribute(foreignKey);
        return true;
      }

      return false;
    });

    const filteredObj = many
      ? filtered.map((obj) => obj.getAttributes())
      : filtered[0].getAttributes();

    this.attributes[key] = filteredObj;
  }

  getAttributes() {
    return this.attributes;
  }

  removeAttribute(name: string) {
    delete this.attributes[name];
  }
}
