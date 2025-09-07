import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './projects/projects.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async getMetadata() {
    const result = await this.projectModel.aggregate([
      {
        $limit: 1,
      },
      {
        $facet: {
          projects: [
            {
              $lookup: {
                from: 'projects',
                pipeline: [],
                as: 'data',
              },
            },
            { $unwind: '$data' },
            { $replaceRoot: { newRoot: '$data' } },
          ],
          areas: [
            {
              $lookup: {
                from: 'areas',
                pipeline: [],
                as: 'data',
              },
            },
            { $unwind: '$data' },
            { $replaceRoot: { newRoot: '$data' } },
          ],
          developers: [
            {
              $lookup: {
                from: 'developers',
                pipeline: [],
                as: 'data',
              },
            },
            { $unwind: '$data' },
            { $replaceRoot: { newRoot: '$data' } },
          ],
        },
      },
    ]);

    return result?.[0];
  }
}
