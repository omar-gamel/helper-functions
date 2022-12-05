import { Controller, Get } from '@nestjs/common';
import { cronJob } from './helpers/cron-job.helper';

@Controller()
export class AppController {
  @Get('test')
  async test() {
    return await cronJob();
  }
}
