import { Role, UserStatus } from "./auth.interface";
import { IMetaData } from "./common.interface";



export type IRole = keyof typeof Role;

export interface IGetMeResponse {
  success: boolean;
  message: string;
  data: IUser | null;
}

export interface IUserResponse {
  success: boolean;
  message: string;
  data: {
    data: IUser[];
    metadata: IMetaData;
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


export interface IChangeUserStatusPayload {
  status: UserStatus
}

export interface IGetAllUsersParams {
  searchTerm?: string, page?:string, limit?: string
}