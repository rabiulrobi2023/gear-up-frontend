import { deleteGear, getProvidersGears } from "@/api/gear.api";
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

export const useGetAllGears = () => {
  return useQuery({
    queryKey: ["providersGears"],
    queryFn: getProvidersGears,
  });
};

export const useDeleteGear = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteGear(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAllGears"] });
    },
  });
};
