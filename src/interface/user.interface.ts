import { Role, UserStatus } from "@/constants";

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