import { loginSchema } from "@/validation/loginSchema";
import { registerSchema } from "@/validation/registerSchema";
import z from "zod";
import { IUser } from "./user.interface";

export type ILoginFormValues = z.infer<typeof loginSchema>;
export type IRegisterFormValues = z.infer<typeof registerSchema>;

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  PROVIDER = "PROVIDER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPEND = "SUSPEND",
}

export enum NodeEnv {
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
}

export enum TokenNames {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

export type IRefreshTokenResponse = ILoginResponse;

export interface IRegisterResponse {
  success: boolean;
  message: string;
  data: IUser | null;
}
