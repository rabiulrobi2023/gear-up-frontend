"use server";

import { envVar } from "@/config/envConfig";
import { NodeEnv, TokenNames } from "@/constants/auth.constant";

import ms, { StringValue } from "ms";
import { cookies } from "next/headers";

export const setAccessTokenIntoCookie = async (token: string) => {
  const maxAge = ms(envVar.JWT_ACCESS_TOKEN_EXPIRE_IN as StringValue) / 1000;
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token, {
    httpOnly: true,
    secure: envVar.ENVIRONMENT === NodeEnv.PRODUCTION,
    sameSite: "lax",
    maxAge: maxAge,
  });
};
export const setRefreshTokenIntoCookie = async (token: string) => {
  const maxAge = ms(envVar.JWT_REFRESH_TOKEN_EXPIRE_IN as StringValue) / 1000;
  const cookieStore = await cookies();
  cookieStore.set("refreshToken", token, {
    httpOnly: true,
    secure: envVar.ENVIRONMENT === NodeEnv.PRODUCTION,
    sameSite: "lax",
    maxAge: maxAge,
  });
};

export const getAccessTokenFromCookie = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(TokenNames.ACCESS_TOKEN)?.value ?? null;
};
