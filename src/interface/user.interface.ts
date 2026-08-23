import { Role, UserStatus } from "@/constants/auth.constant";


export type IRole = keyof typeof Role

export interface IUserResponse {
  success: boolean;
  message: string;
  data: IUser | null;
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
