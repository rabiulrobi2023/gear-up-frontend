import { changeUserStatus, getAdminStatistics, getAllUsers } from "@/api/admin";
import {
  IChangeUserStatusPayload,
  IGetAllUsersParams,
} from "@/interface/user.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAdminStatistics = () => {
  return useQuery({
    queryKey: ["adminStatistics"],
    queryFn: getAdminStatistics,
  });
};

export const useGetAllUsers = (params: IGetAllUsersParams) => {
  return useQuery({
    queryKey: ["users",params],
    queryFn:()=> getAllUsers(params),
  });
};

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IChangeUserStatusPayload;
    }) => changeUserStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
