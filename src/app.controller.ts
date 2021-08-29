import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("hello/:productId")
  Hello(@Param() params: any): string {
    return "Say hello" + params.productId;
  }
  
}
