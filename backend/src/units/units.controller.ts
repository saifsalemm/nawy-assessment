import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UnitsService } from './units.service';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  getUnits(@Query() query: Record<string, string>) {
    return this.unitsService.getUnits(query);
  }

  @Get(':id')
  getUnitById(@Param('id') id: string) {
    return this.unitsService.getUnitById(id);
  }

  @Post()
  createUnit(@Body() createUnitDto: CreateUnitDto) {
    return this.unitsService.createUnit(createUnitDto);
  }
}
