"use server";
import { backendBaseUrl } from "@/app/utils/url";
import { IApiResponse, ICategory } from "@/interface";
import { IGear } from "@/interface/gear.interface";

export const getAllCategories = async (): Promise<IApiResponse<IGear[]>> => {
  const res = await fetch(`${backendBaseUrl}/categories`, {
    method: "GET",
    next: { revalidate: 1 * 24 * 60 * 60, tags: ["all-gears"] },
    cache: "force-cache",
  });
  const result = await res.json();

  return result;
};
