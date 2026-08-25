"use server";

import { IReviewResponse } from "@/interface/review.interface";
import { getAuthenticatedHeaders } from "@/utils/getAuthenticatedHeaders";
import { backendBaseUrl } from "@/utils/url";
import { revalidateTag } from "next/cache";

export const leaveReview = async (
  _previousState: IReviewResponse | null,
  formData: FormData,
): Promise<IReviewResponse> => {
  const orderId = formData.get("orderId");
  const itemId = formData.get("itemId");
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment")?.toString();

  if (!orderId) {
    return {
      success: false,
      message: "Order ID not found",
      data: null,
    };
  }

  if (!itemId) {
    return {
      success: false,
      message: "Item ID not found",
      data: null,
    };
  }

  try {
    const headers = await getAuthenticatedHeaders();

    if (!headers) {
      return {
        success: false,
        message: "Authentication required",
        data: null,
      };
    }

    const res = await fetch(`${backendBaseUrl}/reviews`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        orderId,
        itemId,
        rating,
        comment: comment?.trim(),
      }),
    });

    const result: IReviewResponse = await res.json();

    if (!res.ok || !result.success || !result.data) {
      return {
        success: false,
        message: result.message || "Failed to create review",
        data: null,
      };
    }

    revalidateTag("self-orders", { expire: 0 });

    return result;
  } catch (error) {
    console.error("Leave review error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
      data: null,
    };
  }
};
