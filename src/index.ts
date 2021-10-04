import { WORKBOOK, SHEETNAMES } from './demoWorkbook';

import { Payload } from './Payload_2';

console.log(
  '*************************',
  new Payload(WORKBOOK, SHEETNAMES),
  '*************************'
);
