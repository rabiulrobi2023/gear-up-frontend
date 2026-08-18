import { loginSchema } from "@/validation/loginSchema";
import { registerSchema } from "@/validation/registerSchema";
import z from "zod";

export type ILoginFormValues = z.infer<typeof loginSchema>;
export type IRegisterFormValues = z.infer<typeof registerSchema>;

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
  data: IRegisteredUser | null;
}

export interface IRegisteredUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER";
  status: "ACTIVE" | "SUSPEND";
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
