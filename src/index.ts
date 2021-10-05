import {
  SBE_SHEETNAMES,
  SBE_WORKBOOK,
  SBK_WORKBOOK,
  SHEETNAMES,
} from './demoWorkbook';

import { AmazonAdvertisingPayload, Payload } from './Payload_2';

console.log(
  '*************************',
  new AmazonAdvertisingPayload(SBE_WORKBOOK, SBE_SHEETNAMES).stringifyPayload(),
  '*************************'
);
