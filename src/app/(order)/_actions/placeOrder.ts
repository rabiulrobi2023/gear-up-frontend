"use server";

import { IOrderResponse } from "@/interface/order.interfac";
import { getAuthenticatedHeaders } from "@/utils/getAuthenticatedHeaders";
import { backendBaseUrl } from "@/utils/url";

export const placeOrder = async (
  _previousState: IOrderResponse | null,
  formData: FormData,
): Promise<IOrderResponse> => {
  const itemId = formData.get("itemId");
  const quantity = Number(formData.get("quantity"));
  const startDate = formData.get("startDate");
  const returnDate = formData.get("returnDate");

  const headers = await getAuthenticatedHeaders();
  if (!headers) {
    return {
      success: false,
      message: "Authentication problem",
      data: null,
    };
  }

  try {
    const res = await fetch(`${backendBaseUrl}/rentals`, {
      method: "POST",
      body: JSON.stringify({
        itemId,
        quantity,
        startDate,
        returnDate,
      }),
      headers,
    });

    const result: IOrderResponse = await res.json();
    if (!res.ok || !result.success || !result.data) {
      return {
        success: false,
        message: result.message || "Order not created",
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again",
      data: null,
    };
  }
};
