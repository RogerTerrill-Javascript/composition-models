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
  SP_SHEETNAMES,
  SP_WORKBOOK,
} from './demoWorkbook';

import { AmazonAdvertisingPayload } from './Payload_2';

new AmazonAdvertisingPayload(SP_WORKBOOK, SP_SHEETNAMES).stringifyPayload();
// .exportToFile();
