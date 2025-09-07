import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Developer, DeveloperSchema } from './developer.schema';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Developer.name, schema: DeveloperSchema }])],
  controllers: [DevelopersController],
  providers: [DevelopersService],
})
export class DevelopersModule {}