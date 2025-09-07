import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area } from './area.schema';

@Injectable()
export class AreasService {
  constructor(@InjectModel(Area.name) private areaModel: Model<Area>) {}

  async findAll(): Promise<Area[]> {
    return this.areaModel.find().exec();
  }
}