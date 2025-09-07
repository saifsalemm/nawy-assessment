import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AreaDocument = HydratedDocument<Area>;

@Schema()
export class Area {
  @Prop({ type: String, required: true, unique: true })
  _id: string;

  @Prop({ required: true })
  name: string;
}

export const AreaSchema = SchemaFactory.createForClass(Area);
