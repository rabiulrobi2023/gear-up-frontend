"use server";
import { IAddGearResponse } from "@/interface/gear.interface";
import { getAuthenticatedHeaders } from "@/utils/getAuthenticatedHeaders";
import { backendBaseUrl } from "@/utils/url";
import { revalidateTag } from "next/cache";

export const updateGearAction = async (
  id: string | undefined,
  previousState: IAddGearResponse | null,
  formData: FormData,
): Promise<IAddGearResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Gear ID is required",
      data: null,
    };
  }
  const data = JSON.stringify({
    name: formData.get("name"),
    brand: formData.get("brand"),
    description: formData.get("description"),
    image: formData.get("image"),
    categoryId: formData.get("categoryId"),
    dailyRate: Number(formData.get("dailyRate")),
    stock: Number(formData.get("stock")),
  });

  try {
    const headers = await getAuthenticatedHeaders();

    if (!headers) {
      return {
        success: false,
        message: "Authentication required",
        data: null,
      };
    }

    const res = await fetch(`${backendBaseUrl}/provider/gear/${id}`, {
      method: "PUT",
      headers,
      body: data,
      cache: "no-cache",
    });

    const result: IAddGearResponse = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update gear",
        data: null,
      };
    }

    revalidateTag("self-gears", { expire: 0 });
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error?.message : "Something went wrong",
      data: null,
    };
  }
};
