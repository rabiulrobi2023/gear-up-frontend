import { IAllGearResponse } from "@/interface/gear.interface";
import { getAuthenticatedHeaders } from "@/utils/getAuthenticatedHeaders";
import { backendBaseUrl } from "@/utils/url";

export const getSelfGears = async (): Promise<IAllGearResponse> => {
  try {
    const headers = await getAuthenticatedHeaders();

    if (!headers) {
      return {
        success: false,
        message: "Authentication required",
        data: { data: [] },
      };
    }

    const res = await fetch(`${backendBaseUrl}/provider/my-gears`, {
      method: "GET",
      headers,

      next: {
        revalidate: 24 * 60 * 60,
        tags: ["self-gears"],
      },
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch order",
        data: { data: [] },
      };
    }
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error?.message : "Something went wrong",
      data: { data: [] },
    };
  }
};
