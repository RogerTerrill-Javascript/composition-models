import {
  SBE_SHEETNAMES,
  SBE_WORKBOOK,
  SBK_WORKBOOK,
  SBK_SHEETNAMES,
  SBVE_SHEETNAMES,
  SBVE_WORKBOOK,
  SBVK_SHEETNAMES,
  SBVK_WORKBOOK,
  SD_SHEETNAMES,
  SD_WORKBOOK,
} from './demoWorkbook';

import { AmazonAdvertisingPayload } from './Payload_2';

new AmazonAdvertisingPayload(SD_WORKBOOK, SD_SHEETNAMES).stringifyPayload();
// new AmazonAdvertisingPayload(SBK_WORKBOOK, SBK_SHEETNAMES).stringifyPayload();
