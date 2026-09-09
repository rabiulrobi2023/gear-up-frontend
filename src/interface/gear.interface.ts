import z from "zod";
import { IMetaData } from "./common.interface";
import { addGearSchema } from "@/validation/addGearSchema";

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
  data?: IGear;
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

export type IAddGearFormData = z.infer<typeof addGearSchema>;

export interface IAddGear {
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
}

export interface IAddGearResponse {
  success: boolean;
  message: string;
  data: IAddGear | null;
}
