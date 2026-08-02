"use server";
import { backendBaseUrl } from "@/app/utils/url";

import {  IGearResponse } from "@/interface/gear.interface";

export const getAllGears = async (): Promise<IGearResponse> => {
  const res = await fetch(`${backendBaseUrl}/gear`, {
    method: "GET",
    next: { revalidate: 1 * 24 * 60 * 60, tags: ["gears"] },
    cache: "force-cache",
  });
  const result = await res.json();
  return result;
};
