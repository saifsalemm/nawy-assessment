import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Unit } from 'src/units/unit.schema';
import { CreateUnitDto } from './dto/create-unit.dto';
import { GetUnitsResponse } from './types/unit';

@Injectable()
export class UnitsService {
  constructor(@InjectModel(Unit.name) private unitModel: Model<Unit>) {}

  async getUnits(
    searchQuery: Record<string, string>,
  ): Promise<GetUnitsResponse> {
    try {
      let queryObj = { ...searchQuery };
      const excludedFields = ['limit', 'page', 'sort', 'fields'];
      excludedFields.forEach((field) => delete queryObj[field]);

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`,
      );
      queryObj = JSON.parse(queryStr);

      if (queryObj.name) {
        //@ts-ignore
        queryObj.name = { $regex: queryObj.name, $options: 'i' };
      }

      let query = this.unitModel.find({
        ...queryObj,
      });

      if (searchQuery.sort) {
        const sortBy = searchQuery.sort;
        query = query.sort(sortBy);
      } else {
        query = query.sort('-createdAt');
      }

      const totalUnits = await this.unitModel.countDocuments(queryObj);

      const limit = 10;
      const page = Number(searchQuery.page ?? 1);
      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);

      query = query.select(
        '-__v -updatedAt -createdAt -developer_id -area_id -project_id',
      );

      const units = await query.exec();
      return {
        results: totalUnits,
        currentPage: page,
        pages: Math.ceil(totalUnits / limit),
        data: units,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getUnitById(id: string): Promise<Unit> {
    try {
      return this.unitModel.findById(id).exec();
    } catch (err) {
      throw new NotFoundException('Unit not found');
    }
  }

  async createUnit(createUnitDto: CreateUnitDto): Promise<Unit> {
    try {
      const createdUnit = new this.unitModel(createUnitDto);
      return await createdUnit.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
