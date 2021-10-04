export class Attribute {
  private properties: Map<string, any> = new Map();

  constructor(attributes: any) {
    if (attributes === null) {
      this.properties = new Map();
    } else {
      this.properties = new Map(attributes);
    }
  }

  getProperty(propertyName: string) {
    return this.properties.get(propertyName);
  }

  getProperties() {
    return this.properties;
  }
}
