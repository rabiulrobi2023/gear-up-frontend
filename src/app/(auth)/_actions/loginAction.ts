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
  const payload = {
    email: formData.get("email")?.toString().trim(),
    password: formData.get("password"),
  };

  if (!payload.email || !payload.password) {
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
      body: JSON.stringify(payload),
    });

    const result: ILoginResponse = await res.json();

    if (!res.ok || !result.success || !result.data) {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }

    const { accessToken, refreshToken } = result?.data;
    await setAccessTokenIntoCookie(accessToken);
    await setRefreshTokenIntoCookie(refreshToken);
  } catch (error) {
    console.error("Login error: ", error);
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
  if (redirectTo) {
    redirect(redirectTo);
  }
  redirect("/");
};
