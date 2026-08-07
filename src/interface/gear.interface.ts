import { IMetaData } from "./common.interface";

export interface IGearResponse {
  success: boolean;
  message: string;
  data: {
    data: IGear | IGear[];
    metadata?: IMetaData;
  };
}

export interface IGear {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  providerId: string;
  categoryId: string;
  dailyRate: string;
  stock: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
  provider: Provider;
}

interface Provider {
  name: string;
  email: string;
  phone: string;
}

interface Category {
  id: string;
  name: string;
}
