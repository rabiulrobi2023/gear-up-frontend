import { ISingleOrderResponse } from "@/interface/order.interface";
import { getAuthenticatedHeaders } from "@/utils/getAuthenticatedHeaders";
import { backendBaseUrl } from "@/utils/url";

export const getSingleOrder = async (
  orderId: string,
): Promise<ISingleOrderResponse> => {
  if (!orderId) {
    return {
      success: false,
      message: "Order ID not found",
    };
  }

  try {
    const headers = await getAuthenticatedHeaders();

    if (!headers) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const res = await fetch(`${backendBaseUrl}/rentals/${orderId}`, {
      method: "GET",
      headers,
    });

    const result: ISingleOrderResponse = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch order",
      };
    }

    return result;
  } catch (error) {
    console.error("Get single order error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
