"use server";
import { getQueryUrl } from "@/utils/url";
import { IQueryParams } from "@/interface/common.interface";
import { IAllGearResponse } from "@/interface/gear.interface";

export const getAllGears = async ({
  query,
}: IQueryParams): Promise<IAllGearResponse> => {
  const queryUrl = await getQueryUrl({ query }, "/gear");

  const res = await fetch(queryUrl, {
    method: "GET",
    next: { tags: ["gears"] },
  });
  const result = await res.json();
  return result;
};
