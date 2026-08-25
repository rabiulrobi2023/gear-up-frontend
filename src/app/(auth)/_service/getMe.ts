"use server";

import { IUserResponse } from "@/interface/user.interface";
import { getAuthenticatedHeaders } from "@/utils/getAuthenticatedHeaders";
import { backendBaseUrl } from "@/utils/url";

export const getMe = async (): Promise<IUserResponse | null> => {
  try {
    const headers = await getAuthenticatedHeaders();
    if (!headers) {
      return null;
    }
    const res = await fetch(`${backendBaseUrl}/auth/me`, {
      method: "GET",
      headers,
      cache: "no-cache",
      next: {
        tags: ["get-me"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {

    return {
      success: false,
      message: "Failed to get profile",
      data: null,
    };
  }
};
