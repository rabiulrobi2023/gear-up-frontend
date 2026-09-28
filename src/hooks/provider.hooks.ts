import {
  confirmOrder,

  getPendingOrders,
  getProviderGearStatistics,
} from "@/api/provider.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProviderGearStatistics = () => {
  return useQuery({
    queryKey: ["gearStatistics"],
    queryFn: getProviderGearStatistics,
  });
};


export const usePendingOrders = () => {
  return useQuery({
    queryKey: ["pendingOrder"],
    queryFn: getPendingOrders,
  });
};

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pendingOrder"],
      });
      queryClient.invalidateQueries({
        queryKey: ["myAllOrders"],
      });
    },
  });
};
