import { IOrderResponse } from "@/interface/order.interface";
import { getAuthenticatedHeaders } from "@/utils/getAuthenticatedHeaders";
import { backendBaseUrl } from "@/utils/url";

export const getProviderOrders = async (): Promise<IOrderResponse> => {
  try {
    const headers = await getAuthenticatedHeaders();

    if (!headers) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const res = await fetch(`${backendBaseUrl}/provider/orders`, {
      method: "GET",
      headers,

      next: {
        revalidate: 24 * 60 * 60,
        tags: ["provider-orders"],
      },
    });

    const result = await res.json();

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
