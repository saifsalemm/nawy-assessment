import { Controller, Get } from '@nestjs/common';
import { Developer } from './developer.schema';
import { DevelopersService } from './developers.service';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get()
  async getDevelopers(): Promise<Developer[]> {
    return this.developersService.findAll();
  }
}