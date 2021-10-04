export interface PayloadType {}

// Has Entity Type ie SBK
export class Payload {
  payload: any;
  constructor(workbook: { [key: string]: string }[][]) {
    this.payload = new SBK(workbook);
  }
}

export class SBK {
  campaigns: any = {};

  constructor(workbook: { [key: string]: string }[][]) {
    this.campaigns = workbook[0].map(
      (campaign: { [key: string]: string }) =>
        new Campaign(campaign, {
          workbook,
        })
    );
  }
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
    this.creative = new Creative(options.workbook[1], {
      primaryKey: this.attributes.attributes.Name,
    });
    this.landingPage = new LandingPage(options.workbook[2], {
      primaryKey: this.attributes.attributes.Name,
    });
    // @ts-ignore
    this.keywords = new Keyword(options.workbook[3], {
      primaryKey: this.attributes.attributes.Name,
    });
    // @ts-ignore
    this.negativeKeywords = new NegativeKeyword(options.workbook[4], {
      primaryKey: this.attributes.attributes.Name,
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
}
