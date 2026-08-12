"use sever";
import { envVar } from "@/config/envConfig";
import { TokenNames } from "@/constants";
import { IRefreshTokenResponse } from "@/interface/auth.interface";
import { cookies } from "next/headers";

export const getNewAccessAndRefreshToken =
  async (): Promise<IRefreshTokenResponse> => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(TokenNames.REFRESH_TOKEN)?.value;
    if (!refreshToken) {
      return {
        success: false,
        message: "Refresh token not found",
      };
    }
    const res = await fetch(`${envVar.BACKEND_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: `${TokenNames.REFRESH_TOKEN} = ${refreshToken}`
      },
      cache:"no-cache"
    });
    const result: IRefreshTokenResponse = await res.json();
    if (!res?.ok) {
      throw new Error(result?.message || "Failed to refresh token");
    }
    return result;
  };
