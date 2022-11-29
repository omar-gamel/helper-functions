import { Controller, Get } from '@nestjs/common';
import { ConvertHtmlToPdfWithPuppeteer } from 'src/helpers/generate-pdf.helper';

@Controller()
export class AppController {
  @Get('test')
  test(): Promise<string> {
    return ConvertHtmlToPdfWithPuppeteer();
  }
}
