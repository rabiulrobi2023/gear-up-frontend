"use server";

import { ICheckOut } from "@/interface/payment.interface";
import { getAuthenticatedHeaders } from "@/utils/getAuthenticatedHeaders";
import { backendBaseUrl } from "@/utils/url";
import { redirect } from "next/navigation";

export const checkOut = async (orderId: string) => {
  if (!orderId) {
    return {
      success: false,
      message: "Order ID not found",
    };
  }

  let checkoutUrl: string | null = null;

  try {
    const headers = await getAuthenticatedHeaders();

    if (!headers) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const res = await fetch(`${backendBaseUrl}/payments/create`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        orderId,
      }),
    });

    const result: ICheckOut = await res.json();

    if (!res.ok || !result.success || !result.data) {
      return {
        success: false,
        message: result.message || "Failed to create payment",
      };
    }

    checkoutUrl = result.data;
  } catch (error) {
    console.error("Checkout error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  redirect(checkoutUrl);
};
