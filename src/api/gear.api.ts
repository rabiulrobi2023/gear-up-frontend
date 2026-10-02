import { ICategoryResponse } from "@/interface/category.interface";
import {
  IAddGearFormData,
  IAddGearResponse,
  IAllGearResponse,
  IDeleteGearResponse,
  ISingleGearResponse,
} from "@/interface/gear.interface";
import apiClient from "@/lib/apiClient";

export const getProvidersGears = () =>
  apiClient<IAllGearResponse>("/provider/my-gears", {
    method: "GET",
  });

export const getSingleGear = (id: string) =>
  apiClient<ISingleGearResponse>(`/gear/${id}`, { method: "GET" });

export const getAllCategories = () =>
  apiClient<ICategoryResponse>("/categories", {
    method: "GET",
  });

export const updateGear = (id: string, payload: Partial<IAddGearFormData>) => {
  return apiClient<IAddGearResponse>(`/provider/gear/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const deleteGear = (id: string) =>
  apiClient<IDeleteGearResponse>(`/provider/gear/${id}`, {
    method: "PATCH",
  });
