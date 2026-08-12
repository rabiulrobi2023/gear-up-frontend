import { backendBaseUrl } from "@/utils/url";
import { IGearResponse } from "@/interface/gear.interface";

export const getSingleGear = async (gearId: string): Promise<IGearResponse> => {
  const res = await fetch(`${backendBaseUrl}/gear/${gearId}`, {
    method: "GET",
    cache: "force-cache",
    next: {
      revalidate: 1 * 24 * 60 * 60,
      tags: ["single-gear"],
    },
  });
  const result = await res.json();
  return result;
};
