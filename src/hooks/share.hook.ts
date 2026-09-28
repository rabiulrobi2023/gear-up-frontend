
import { getMyAllOrders } from "@/api/share.api";
import { useQuery } from "@tanstack/react-query";

export const useGetMyAllOrders = () => {
  return useQuery({
    queryKey: ["myAllOrders"],
    queryFn: getMyAllOrders,
  });
};
