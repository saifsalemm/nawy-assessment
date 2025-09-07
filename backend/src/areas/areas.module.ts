import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from './area.schema';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }])],
  controllers: [AreasController],
  providers: [AreasService],
})
export class AreasModule {}