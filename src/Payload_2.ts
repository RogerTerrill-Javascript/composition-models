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
    SBVK: {
      sheetNames: [
        'SBVK_Campaigns',
        'SBVK_Creatives',
        'SBVK_Keywords',
        'SBVK_NegativeKeywords',
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
          'PortfolioId',
        ],
        relations: {
          SBVK_Creatives: {
            propName: 'creative',
            many: false,
          },
          SBVK_Keywords: {
            propName: 'keywords',
            many: true,
          },
          SBVK_NegativeKeywords: {
            propName: 'negativeKeywords',
            many: true,
          },
        },
        mutators: {
          setBudgetAttribute(value: string) {
            return parseFloat(value);
          },
        },
      },
      Creatives: {
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'Asins', 'VideoMediaIds', 'Type'],
        mutators: {
          setAsinsAttribute(values: string) {
            return values.split(',').map((value) => value.trim());
          },
          setVideoMediaIdsAttribute(values: string) {
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
        'SBE_NegativeExpressions',
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
        primaryKey: 'name',
        removePrimaryKey: true,
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
        columns: ['TargetName', 'Type', 'Value'],
        mutators: {},
      },
      NegativeTargets: {
        primaryKey: 'name',
        removePrimaryKey: true,
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'Name'],
        relations: {
          SBE_NegativeExpressions: {
            propName: 'expressions',
            many: true,
          },
        },
        mutators: {},
      },
      NegativeExpressions: {
        foreignKey: 'negativeTargetName',
        columns: ['NegativeTargetName', 'Type', 'Value'],
        mutators: {},
      },
    },
    SBVE: {
      sheetNames: [
        'SBVE_Campaigns',
        'SBVE_Creatives',
        'SBVE_Targets',
        'SBVE_Expressions',
        'SBVE_NegativeTargets',
        'SBVE_NegativeExpressions',
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
          'PortfolioId',
        ],
        relations: {
          SBVE_Creatives: {
            propName: 'creative',
            many: false,
          },
          SBVE_Targets: {
            propName: 'targets',
            many: true,
          },
          SBVE_NegativeTargets: {
            propName: 'negativeTargets',
            many: true,
          },
        },
        mutators: {
          setBudgetAttribute(value: string) {
            return parseFloat(value);
          },
        },
      },
      Creatives: {
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'Asins', 'VideoMediaIds', 'Type'],
        mutators: {
          setAsinsAttribute(values: string) {
            return values.split(',').map((value) => value.trim());
          },
          setVideoMediaIdsAttribute(values: string) {
            return values.split(',').map((value) => value.trim());
          },
        },
      },
      Targets: {
        primaryKey: 'name',
        removePrimaryKey: true,
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'Name', 'Bid'],
        relations: {
          SBVE_Expressions: {
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
        columns: ['TargetName', 'Type', 'Value'],
        mutators: {},
      },
      NegativeTargets: {
        primaryKey: 'name',
        removePrimaryKey: true,
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'Name'],
        relations: {
          SBVE_NegativeExpressions: {
            propName: 'expressions',
            many: true,
          },
        },
        mutators: {},
      },
      NegativeExpressions: {
        foreignKey: 'negativeTargetName',
        columns: ['NegativeTargetName', 'Type', 'Value'],
        mutators: {},
      },
    },
    SD: {
      sheetNames: [
        'SD_Campaigns',
        'SD_AdGroups',
        'SD_ProductAds',
        'SD_Targetings',
        'SD_Expressions',
        'SD_ExpressionsNested',
        'SD_NegativeTargetings',
        'SD_NegativeExpressions',
      ],
      Campaigns: {
        primaryKey: 'name',
        columns: [
          'Name',
          'Budget',
          'BudgetType',
          'StartDate',
          'EndDate',
          'CostType',
          'State',
          'PortfolioId',
          'Tactic',
        ],
        relations: {
          SD_AdGroups: {
            propName: 'adGroups',
            many: true,
          },
          SD_ProductAds: {
            propName: 'productAds',
            many: true,
          },
          SD_Targetings: {
            propName: 'targetings',
            many: true,
          },
          SD_NegativeTargetings: {
            propName: 'negativeTargetings',
            many: true,
          },
        },
        mutators: {
          setBudgetAttribute(value: string) {
            return parseFloat(value);
          },
        },
      },
      AdGroups: {
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'Name', 'DefaultBid', 'State', 'Tactic'],
        mutators: {
          setDefaultBidAttribute(value: string) {
            return parseFloat(value);
          },
        },
      },
      ProductAds: {
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'State', 'AdGroupName', 'Asin', 'Sku'],
        mutators: {},
      },
      Targetings: {
        primaryKey: 'name',
        removePrimaryKey: true,
        foreignKey: 'campaignName',
        columns: [
          'CampaignName',
          'Name',
          'State',
          'Bid',
          'AdGroupName',
          'ExpressionType',
        ],
        relations: {
          SD_Expressions: {
            propName: 'expression',
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
        primaryKey: 'name',
        removePrimaryKey: true,
        foreignKey: 'targetingName',
        columns: ['TargetingName', 'Name', 'Type', 'Value'],
        relations: {
          SD_ExpressionsNested: {
            propName: 'value',
            many: true,
          },
        },
        mutators: {},
      },
      ExpressionsNested: {
        foreignKey: 'expressionName',
        columns: ['ExpressionName', 'Type', 'Value'],
        mutators: {},
      },
      NegativeTargetings: {
        primaryKey: 'name',
        removePrimaryKey: true,
        foreignKey: 'campaignName',
        columns: ['CampaignName', 'Name'],
        relations: {
          SD_NegativeExpressions: {
            propName: 'expression',
            many: true,
          },
        },
        mutators: {},
      },
      NegativeExpressions: {
        foreignKey: 'negativeTargetingName',
        columns: ['NegativeTargetingName', 'Type', 'Value'],
        mutators: {},
      },
    },
  };

  constructor(public sponsoredType: string) {}

  getEntity(entity: string) {
    return this.schema[this.sponsoredType][entity];
  }

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
    if (inputSheetNames.length !== schemaSheetNames.length)
      throw Error('Sheet count does not match.');

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

export class AmazonAdvertisingPayload {
  schema: any;

  constructor(public workbook: any, public sheetNames: string[]) {
    const entityType = this.sheetNames[0].split('_')[0];
    this.schema = new Schema(entityType);
    this.schema.validateSheetNames(sheetNames);

    this.populateProperties();
    this.buildRelations();
  }

  populateProperties() {
    this.sheetNames.forEach(
      (sheetName) =>
        (this[sheetName] = this.workbook[
          this.sheetNames.findIndex((name) => name === sheetName)
        ].map((entity: any) => new Entity(entity, sheetName, this.schema)))
    );
  }

  buildRelations() {
    const reverseSheetNames = [...this.sheetNames].reverse();

    reverseSheetNames.forEach((sheetName: any) => {
      this[sheetName].forEach((entityElement: any) => {
        const relations = entityElement.schema.getRelations(
          entityElement.currentEntity
        );

        if (!relations) return;

        Object.keys(relations).forEach((relation: any) => {
          entityElement.setRelationAttributes(
            relations[relation],
            this[relation]
          );
        });
      });
    });
  }

  getPayload() {
    const rootSheet = this.sheetNames[0];
    return this[rootSheet].map((campaign) => campaign.getAttributes());
  }

  stringifyPayload() {
    const rootSheet = this.sheetNames[0];
    // this[rootSheet].map((campaign) =>
    //   console.log(campaign.getAttributes().targetings[0].expression)
    // );

    console.log(this['SD_Campaigns'][5].getAttributes());
    // console.log(
    //   'CAMPAIGN',
    //   this['SBE_Campaigns'][1].getAttributes().negativeTargets[0]
    // );
    // console.log('EXPRESSIONS', this['SBE_Expressions']);
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

  setRelationAttributes(relation: any, values: any[]) {
    const removePrimaryKey = this.schema.getEntity(
      this.currentEntity
    ).removePrimaryKey;
    const primaryKey = this.schema.getEntity(this.currentEntity).primaryKey;

    const filtered = values.filter((value: any) => {
      const foreignKey = this.schema.getEntity(value.currentEntity).foreignKey;

      if (this.attributes[primaryKey] === value.getAttributes()[foreignKey]) {
        value.removeAttribute(foreignKey);
        return true;
      }

      return false;
    });

    if (removePrimaryKey) {
      this.removeAttribute(primaryKey);
    }

    // Check to see if a value already exist in the prop, if not, then add it.
    if (!this.attributes[relation.propName]) {
      this.attributes[relation.propName] = relation.many
        ? filtered.map((obj) => obj.getAttributes())
        : filtered[0].getAttributes();
    }

    return this;
  }

  getAttributes() {
    return this.attributes;
  }

  removeAttribute(name: string) {
    delete this.attributes[name];
  }
}
