import { IMetaData } from "./common.interface";

export interface IAllGearResponse {
  success: boolean;
  message: string;
  data: {
    data: IGear[];
    metadata?: IMetaData;
  };
}

export interface ISingleGearResponse {
  success: boolean;
  message: string;
  data?: IGear
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
