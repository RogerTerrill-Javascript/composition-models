import { WORKBOOK } from './demoWorkbook';

import { Payload } from './Payload';

console.log(
  '*************************',
  new Payload(WORKBOOK).payload.creatives[0].attributes,
  '*************************'
);
