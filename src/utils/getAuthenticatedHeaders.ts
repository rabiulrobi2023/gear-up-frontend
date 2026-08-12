"use server";

import { TokenNames } from "@/constants";
import { getAccessTokenFromCookie } from "./cookie";

export const getAuthenticatedHeaders =
  async (): Promise<HeadersInit | null> => {
    const accessToken = await getAccessTokenFromCookie();
    if (!accessToken) {
      return null
    }

    return {
      "Content-type": "application/json",
      Cookie: `${TokenNames.ACCESS_TOKEN}=${accessToken}`,
    };
  };
