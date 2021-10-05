import { lowercaseFirst } from './utils';

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
        relations: {
          SBK_Creatives: {
            propName: 'creative',
            many: false,
          },
          SBK_LandingPages: {
            propName: 'landingPage',
            many: false,
          },
          SBK_Keywords: {
            propName: 'keywords',
            many: true,
          },
          SBK_NegativeKeywords: {
            propName: 'negativeKeywords',
            many: true,
          },
        },
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
    SBE: {
      sheetNames: [
        'SBE_Campaigns',
        'SBE_Creatives',
        'SBE_LandingPages',
        'SBE_Targets',
        'SBE_Expressions',
        'SBE_NegativeTargets',
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
        relations: {
          SBE_Creatives: {
            propName: 'creative',
            many: false,
          },
          SBE_LandingPages: {
            propName: 'landingPage',
            many: false,
          },
          SBE_Targets: {
            propName: 'targets',
            many: true,
          },
          SBE_NegativeTargets: {
            propName: 'negativeTargets',
            many: true,
          },
        },
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
          'BrandLogoAssetID',
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
      Targets: {
        primaryKey: 'Name',
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'Name', 'Bid'],
        relations: {
          SBE_Expressions: {
            propName: 'expressions',
            many: true,
          },
        },
        mutators: {
          setBidAttribute(value: string) {
            return parseFloat(value);
          },
        },
      },
      Expressions: {
        foreignKey: 'targetName',
        columns: ['CampaignName', 'Type', 'Value'],
        mutators: {},
      },
      NegativeTargets: {
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'Type', 'Value'],
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

  getRelations(entity: string) {
    return this.schema[this.sponsoredType][entity].relations;
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

enum SBK {
  SBK_Campaigns,
  SBK_Creatives,
  SBK_LandingPages,
  SBK_Keywords,
  SBK_NegativeKeywords,
}

enum SBE {
  SBE_Campaigns,
  SBE_Creatives,
  SBE_LandingPages,
  SBE_Targets,
  SBE_Expressions,
  SBE_NegativeTargets,
}

export class AmazonAdvertisingPayload {
  constructor(workbook: any, public sheetNames: string[]) {
    const type = this.sheetNames[0].split('_')[0];

    const schema = new Schema(type);
    schema.validateSheetNames(sheetNames);

    this.sheetNames.forEach((sheetName) => (this[sheetName] = {}));

    this.sheetNames.forEach(
      (sheetName) =>
        (this[sheetName] = workbook[SBE[sheetName]].map(
          (entity: any) => new Entity(entity, SBE[SBE[sheetName]], schema)
        ))
    );

    this[SBE['0']].forEach((rootEntity: any) => {
      const relations = rootEntity.schema.getRelations(
        rootEntity.currentEntity
      );

      const relationKeys = Object.keys(relations);

      relationKeys.forEach((relationKey: any) => {
        rootEntity.setRelationAttributes(
          relations[relationKey].propName,
          this[relationKey],
          relations[relationKey].many
        );
      });
    });
  }

  getPayload() {
    const rootSheet = this.sheetNames[0];
    return this[rootSheet].map((campaign) => campaign.getAttributes());
  }

  stringifyPayload() {
    const rootSheet = this.sheetNames[0];
    this[rootSheet].map((campaign) => console.log(campaign.getAttributes()));
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

    this.attributes[key] = many
      ? filtered.map((obj) => obj.getAttributes())
      : filtered[0].getAttributes();

    return this;
  }

  getAttributes() {
    return this.attributes;
  }

  removeAttribute(name: string) {
    delete this.attributes[name];
  }
}
