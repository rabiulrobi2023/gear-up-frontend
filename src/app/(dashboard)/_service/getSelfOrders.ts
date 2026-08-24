import { IAllOrderResponse } from "@/interface/order.interface";
import { getAuthenticatedHeaders } from "@/utils/getAuthenticatedHeaders";
import { backendBaseUrl } from "@/utils/url";

export const getSelfOrders = async (): Promise<IAllOrderResponse> => {
  try {
    const headers = await getAuthenticatedHeaders();

    if (!headers) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const res = await fetch(`${backendBaseUrl}/rentals`, {
      method: "GET",
      headers,

      next: {
        revalidate: 24 * 60 * 60,
        tags: ["self-orders"],
      },
    });

    const result: IAllOrderResponse = await res.json();

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
