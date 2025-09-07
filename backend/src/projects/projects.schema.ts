import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ type: String, required: true, unique: true })
  _id: string;

  @Prop({ required: true })
  name: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
