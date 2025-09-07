import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeveloperDocument = HydratedDocument<Developer>;

@Schema()
export class Developer {
  @Prop({ type: String, required: true, unique: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  image_url: string;
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);