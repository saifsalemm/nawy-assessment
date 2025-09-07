import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString
} from 'class-validator';

export class CreateUnitDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: [number, number];

  @IsNumber()
  unit_area: number;

  @IsNumber()
  bedrooms: number;

  @IsNumber()
  bathrooms: number;

  @IsString()
  area_id: string;
  @IsString()
  area_name: string;

  @IsString()
  project_id: string;
  @IsString()
  project_name: string;

  @IsString()
  developer_id: string;
  @IsString()
  developer_name: string;
  @IsString()
  developer_img_url: string;

  @IsNumber()
  price: number;

  @IsArray()
  @ArrayMinSize(1)
  payment_plans: {
    down_payment: number;
    installments: number;
    installment_amount: number;
  }[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  images: string[];
}
