import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Developer } from './developer.schema';

@Injectable()
export class DevelopersService {
  constructor(@InjectModel(Developer.name) private developerModel: Model<Developer>) {}

  async findAll(): Promise<Developer[]> {
    return this.developerModel.find().exec();
  }
}