import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UnitDocument = HydratedDocument<Unit>;

@Schema({ timestamps: true })
export class Unit {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: [Number, Number] })
  coordinates: [number, number];

  @Prop({ required: true, type: Number })
  unit_area: number;

  @Prop({ required: true, type: Number })
  bedrooms: number;

  @Prop({ required: true, type: Number })
  bathrooms: number;

  @Prop({ required: true, type: String })
  area_id: string;

  @Prop({ required: true, type: String })
  area_name: string;

  @Prop({ required: true, type: String })
  project_id: string;

  @Prop({ required: true, type: String })
  project_name: string;

  @Prop({ required: true, type: String })
  developer_id: string;

  @Prop({ required: true, type: String })
  developer_name: string;

  @Prop({ required: true, type: String })
  developer_img_url: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({
    required: true,
    type: [
      {
        down_payment: Number,
        installments: Number,
        installment_amount: Number,
      },
    ],
  })
  payment_plans: {
    down_payment: number;
    installments: number;
    installment_amount: number;
  }[];

  @Prop({ required: true, type: [String] })
  images: string[];
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
