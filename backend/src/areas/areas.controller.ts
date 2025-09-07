import { Controller, Get } from '@nestjs/common';
import { Area } from './area.schema';
import { AreasService } from './areas.service';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  async getAreas(): Promise<Area[]> {
    return this.areasService.findAll();
  }
}