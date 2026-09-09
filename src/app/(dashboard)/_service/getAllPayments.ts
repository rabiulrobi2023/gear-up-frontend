import { IPaymentResponse } from "@/interface/payment.interface";
import { getAuthenticatedHeaders } from "@/utils/getAuthenticatedHeaders";
import { backendBaseUrl } from "@/utils/url";

export const getAllPayments = async (): Promise<IPaymentResponse> => {
  try {
    const headers = await getAuthenticatedHeaders();

    if (!headers) {
      return {
        success: false,
        message: "Authentication required",
        data: [],
      };
    }

    const res = await fetch(`${backendBaseUrl}/payments`, {
      method: "GET",
      headers,

      next: {
        revalidate: 24 * 60 * 60,
        tags: ["payments"],
      },
    });

    const result: IPaymentResponse = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch order",
        data: [],
      };
    }
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error?.message : "Something went wrong",
      data: [],
    };
  }
};
