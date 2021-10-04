// Has Entity Type ie SBK
export class Payload {
  payload: any;
  constructor(workbook: { [key: string]: string }[][], sheetnames: string[]) {
    const sbType = sheetnames[0].split('_')[0];
    this.payload = new SBK(workbook);
  }
}

enum SBKSheet {
  SBK_Campaigns,
  SBK_Creatives,
  SBK_LandingPages,
  SBK_Keywords,
  SBK_NegativeKeywords
}

export class SBK {
  campaigns: any = {};

  constructor(workbook: { [key: string]: string }[][]) {
    this.campaigns = workbook[SBKSheet.SBK_Campaigns].map(
      (campaign: { [key: string]: string }) =>
        new Campaign(campaign, {
          workbook,
        })
    );
  }
}

export class Entity {
  attributes: {[key:string]: any} = {};
}

export class Campaign {
  attributes: { [key: string]: any } = {};
  creative: any = {};
  landingPage: any = {};
  keywords: any = {};
  negativeKeywords: any = {};

  constructor(campaign: any, options = { workbook: [[{}]] }) {
    this.attributes = new Attributes(campaign, {
      context: this.constructor.prototype,
    });
    this.creative = new Creative(options.workbook[SBKSheet.SBK_Creatives], {
      primaryKey: this.getAttribute('Name'),
    });
    this.landingPage = new LandingPage(options.workbook[SBKSheet.SBK_LandingPages], {
      primaryKey: this.getAttribute('Name'),
    });
    // @ts-ignore
    this.keywords = new Keyword(options.workbook[SBKSheet.SBK_Keywords], {
      primaryKey: this.getAttribute('Name'),
    });
    // @ts-ignore
    this.negativeKeywords = new NegativeKeyword(options.workbook[SBKSheet.SBK_NegativeKeywords], {
      primaryKey: this.getAttribute('Name'),
    });
  }

  columns() {
    return [
      'Name',
      'Budget',
      'BudgetType',
      'StartDate',
      'EndDate',
      'AdFormat',
      'State',
      'BrandEntityId',
      'BidOptimization',
      'BidMutliplier',
      'PortfolioId',
    ];
  }

  setBudgetAttribute(value: string) {
    return parseFloat(value);
  }

  setBidOptimizationAttribute(value: string) {
    return value === 'true';
  }

  getAttribute(name: string) {
    return this.attributes.getProperty(name);
  }

  getProperties() {
    return this.attributes.getProperties();
  }

}

export class Creative {
  attributes: { [key: string]: any } = {};

  constructor(
    creatives: { [key: string]: string }[],
    options = { primaryKey: 'Name' }
  ) {
    const _creative = creatives.filter((creative) => {
      return creative.CampaignName === options.primaryKey;
    })[0];

    this.attributes = new Attributes(_creative, {
      context: this.constructor.prototype,
    });
  }

  columns() {
    return ['CampaignName', 'BrandName', 'BrandLogo', 'Headline', 'Asins'];
  }

  filter(primaryKey: string, foreignKey: string) {}

  setAsinsAttribute(values: string) {
    return values.split(',').map((value) => value.trim());
  }
}

export class LandingPage {
  attributes: { [key: string]: any } = {};

  constructor(
    landingPages: { [key: string]: string }[],
    options = { primaryKey: 'Name' }
  ) {
    const _landingPage = landingPages.filter((landingPage) => {
      return landingPage.CampaignName === options.primaryKey;
    })[0];

    this.attributes = new Attributes(_landingPage, {
      context: this.constructor.prototype,
    });
  }

  columns() {
    return ['CampaignName', 'Asins', 'Url'];
  }

  setAsinsAttribute(values: string) {
    return values.split(',').map((value) => value.trim());
  }
}

export class Keyword {
  attributes: { [key: string]: any } = {};

  constructor(
    keywords: { [key: string]: string }[],
    options = { foreignKey: '', primaryKey: '' }
  ) {
    const _keywords = keywords.filter((keyword) => {
      return keyword.CampaignName === options.primaryKey;
    });

    this.attributes = _keywords.map(
      (keyword) =>
        new Attributes(keyword, { context: this.constructor.prototype })
    );
  }

  columns() {
    return [
      'CampaignName',
      'KeywordText',
      'NativeLanguageKeyword',
      'NativeLanguageLocale',
      'MatchType',
      'Bid',
    ];
  }

  setBidAttribute(value: string) {
    return parseFloat(value);
  }
}

export class NegativeKeyword {
  attributes: { [key: string]: any } = {};

  constructor(
    negativeKeywords: { [key: string]: string }[],
    options = { foreignKey: '', primaryKey: '' }
  ) {
    const _negativeKeywords = negativeKeywords.filter((negativeKeyword) => {
      return negativeKeyword.CampaignName === options.primaryKey;
    });

    this.attributes = _negativeKeywords.map(
      (negativeKeyword) =>
        new Attributes(negativeKeyword, { context: this.constructor.prototype })
    );
  }

  columns() {
    return ['CampaignName', 'KeywordText', 'MatchType'];
  }
}

export class Attributes {
  attributes: any = {};
  context: any;

  constructor(attributes: any, options = { context: null }) {
    this.context = options.context;
    Object.entries(attributes).forEach(([key, value]) => {
      if (this.context.columns().includes(key)) {
        this.setAttribute(key, value);
      }
    });
  }

  setAttribute(key: string, value: string) {
    const mutator = this.context[`set${key}Attribute`];
    this.attributes[key] = mutator ? mutator(value) : value;

    return true;
  }

  getProperty(name:string) {
    return this.attributes[name]
  }

  getProperties() {
    return this.attributes;
  }
}
