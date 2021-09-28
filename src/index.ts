import { WORKBOOK } from './demoWorkbook';

import { Payload } from './Payload';

console.log(
  '*************************',
  new Payload(WORKBOOK).payload.landingPages[0].attributes,
  '*************************'
);
