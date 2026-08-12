"use server";

import { TokenNames } from "@/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(TokenNames.ACCESS_TOKEN);
  cookieStore.delete(TokenNames.REFRESH_TOKEN);
  revalidateTag("get-me", "max");
};
