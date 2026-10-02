import { getAllCategories, getSingleGear, updateGear } from "@/api/gear.api";
import { IAddGearFormData } from "@/interface/gear.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetSingleGear = (id: string) => {
  return useQuery({
    queryKey: ["gear", id],
    queryFn: () => getSingleGear(id),
    enabled: !!id,
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["allCategory"],
    queryFn: getAllCategories,
  });
};

export const useUpdateGear = () => {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<IAddGearFormData>;
    }) => updateGear(id, payload),
    
  });
};
