"use server";
import { backendBaseUrl } from "@/app/utils/url";
import { IApiResponse,  } from "@/interface";
import { ICategory } from "@/interface/category.interface";

export const getAllCategories = async (): Promise<
  IApiResponse<ICategory[]>
> => {

  const res = await fetch(`${backendBaseUrl}/categories`, {
    method: "GET",
    next: { revalidate: 1 * 24 * 60 * 60, tags: ["categories"] },
    cache: "force-cache",
  });
  const result = await res.json();

  return result;
};
