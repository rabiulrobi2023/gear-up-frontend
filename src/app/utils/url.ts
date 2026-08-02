import { envVar } from "@/config/envConfig";
import { IQueryParams } from "@/interface/common.interface";

export const backendBaseUrl = envVar.BACKEND_API_URL;

export const getQueryUrl = async (
  { query }: IQueryParams,
  pathname: string,
) => {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else {
        params.set(key, value);
      }
    });
  }
  const queryUrl = `${envVar.BACKEND_API_URL}${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  return queryUrl;
};
