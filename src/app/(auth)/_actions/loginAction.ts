"use server";

import { backendBaseUrl } from "@/utils/url";
import { ILoginResponse } from "@/interface/auth.interface";
import {
  setAccessTokenIntoCookie,
  setRefreshTokenIntoCookie,
} from "@/utils/cookie";
import { redirect } from "next/navigation";

export const loginAction = async (
  redirectTo: string,
  _previousState: ILoginResponse | null,
  formData: FormData,
): Promise<ILoginResponse> => {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  try {
    const res = await fetch(`${backendBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result: ILoginResponse = await res.json();

    if (!res.ok || !result.success || !result.data) {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }

    const { accessToken, refreshToken } = result.data;

    await setAccessTokenIntoCookie(accessToken);

    await setRefreshTokenIntoCookie(refreshToken);
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }


  const destination =
    redirectTo && redirectTo.startsWith("/")
      ? redirectTo
      : "/";

  const separator = destination.includes("?")
    ? "&"
    : "?";

  redirect(`${destination}${separator}login=success`);
};