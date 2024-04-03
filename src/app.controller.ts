import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async seed(): Promise<any> {
    await this.appService.seed();
    // this.appService.getEmployeeById(1); // ! get Employee
    // this.appService.deleteEmployee(1); // ! delete Employee
    return "Seed Complete!!!";
  }


}
