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
  creatives: any = {};
  landingPages: any = {};
  keywords: any = {};
  negativeKeywords: any = {};
  constructor(workbook) {
    this.campaigns = workbook[0].map(
      (campaign: { [key: string]: string }) => new Campaign(campaign)
    );
    this.creatives = workbook[1].map(
      (creative: { [key: string]: string }) => new Creative(creative)
    );
    this.landingPages = workbook[2].map(
      (landingPage: { [key: string]: string }) => new LandingPage(landingPage)
    );
  }
}

export class Campaign {
  attributes: { [key: string]: any } = {};

  constructor(campaign: { [key: string]: string }) {
    this.attributes = new Attributes(campaign, this.constructor.prototype);
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

  constructor(creative: { [key: string]: string }) {
    this.attributes = new Attributes(creative, this.constructor.prototype);
  }

  columns() {
    return ['CampaignName', 'BrandName', 'BrandLogo', 'Headline', 'Asins'];
  }

  setAsinsAttribute(values: string) {
    return values.split(',').map((value) => value.trim());
  }
}

export class LandingPage {
  attributes: { [key: string]: any } = {};

  constructor(landingPage: { [key: string]: string }) {
    this.attributes = new Attributes(landingPage, this.constructor.prototype);
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

  constructor(keyword: { [key: string]: string }) {
    this.attributes = new Attributes(keyword, this.constructor.prototype);
  }

  columns() {
    return ['CampaignName', 'Asins', 'Url'];
  }

  setAsinsAttribute(values: string) {
    return values.split(',').map((value) => value.trim());
  }
}

export class Attributes {
  attributes: any = {};

  constructor(attributes: any, public context: any) {
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
