"use server";
import { backendBaseUrl } from "@/app/utils/url";
import { IApiResponse, ICategory } from "@/interface";

export const getAllCategories = async (): Promise<
  IApiResponse<ICategory[]>
> => {
  const res = await fetch(`${backendBaseUrl}/gear`, {
    method: "GET",
    next: { revalidate: 1 * 24 * 60 * 60, tags: ["categories"] },
    cache: "force-cache",
  });
  const result = await res.json();

  return result;
};
