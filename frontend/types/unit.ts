export interface Unit {
  _id: string;
  name: string;
  unit_area: number;
  area_name: string;
  bedrooms: number;
  bathrooms: number;
  project_name: string;
  developer_name: string;
  developer_img_url: string;
  price: number;
  images: string[];
}

export interface PropertiesListProps {
  units: Unit[];
  currentPage: number;
  totalPages: number;
}

export interface PaymentPlan {
  down_payment: number;
  installments: number;
  installment_amount: number;
}

export interface Metadata {
  developers: {
    _id: string;
    name: string;
    image_url: string;
  }[];
  projects: {
    _id: string;
    name: string;
  }[];
  areas: {
    _id: string;
    name: string;
  }[];
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
