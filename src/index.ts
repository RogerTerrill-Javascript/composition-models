import { SBE_SHEETNAMES, SBE_WORKBOOK, SBK_WORKBOOK } from './demoWorkbook';

import { AmazonAdvertisingPayload } from './Payload_2';

new AmazonAdvertisingPayload(SBE_WORKBOOK, SBE_SHEETNAMES).stringifyPayload();
