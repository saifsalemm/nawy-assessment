import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreasModule } from './areas/areas.module';
import { DevelopersModule } from './developers/developers.module';
import { ProjectsModule } from './projects/projects.module';
import { SeederService } from './seeder.service';
import { UnitsModule } from './units/units.module';

@Module({
  imports: [
    UnitsModule,
    ProjectsModule,
    AreasModule,
    DevelopersModule,
    MongooseModule.forRoot(
      'mongodb://admin:password@mongo:27017/nawy?authSource=admin',
    ),
    ProjectsModule,
    DevelopersModule,
    AreasModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
