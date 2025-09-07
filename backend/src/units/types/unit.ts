export interface UnitI {
  name: string;
  description: string;
  coordinates: [number, number];
  unit_area: number;
  bedrooms: number;
  bathrooms: number;
  area_id: string;
  area_name: string;
  project_id: string;
  project_name: string;
  developer_id: string;
  developer_name: string;
  developer_img_url: string;
  price: number;
  payment_plans: {
    down_payment: number;
    installments: number;
    installment_amount: number;
  }[];
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetUnitsResponse {
  results: number;
  pages: number;
  currentPage: number;
  data: UnitI[];
}

export interface PaymentPlan {
  down_payment: number;
  installments: number;
  installment_amount: number;
}

export interface Metadata {
  developers: Array<{
    id: string;
    name: string;
    img_url: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    developer_id: string;
  }>;
  areas: Array<{
    id: string;
    name: string;
  }>;
}

export interface CreateUnitI {
  name: string;
  description: string;
  unit_area: number;
  area_id: string;
  area_name: string;
  bedrooms: number;
  bathrooms: number;
  project_id: string;
  project_name: string;
  developer_id: string;
  developer_name: string;
  developer_img_url: string;
  price: number;
  payment_plans: PaymentPlan[];
  images: string[];
  coordinates: [number, number];
}