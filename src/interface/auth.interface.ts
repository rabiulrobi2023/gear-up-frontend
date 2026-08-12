import { loginFormSchema } from "@/validation/loginFormSchema";
import z from "zod/v3";

export type ILoginFormValues = z.infer<typeof loginFormSchema>;

export interface ILoginResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

export type IRefreshTokenResponse = ILoginResponse