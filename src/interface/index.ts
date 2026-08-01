import { Role, UserStatus } from "@/constants";

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  metadata?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  categoryPhoto: string;
  createdAt: string;
  updatedAt: string;
}
