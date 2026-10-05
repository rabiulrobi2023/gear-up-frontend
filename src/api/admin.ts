import { UserStatus } from "@/interface/auth.interface";
import { IAdminStatisticsResponse } from "@/interface/dashboard.interface";
import { IGetAllUsersParams, IUserResponse } from "@/interface/user.interface";
import apiClient from "@/lib/apiClient";

export const getAdminStatistics = () =>
  apiClient<IAdminStatisticsResponse>("/admin/statistics", {
    method: "GET",
  });

export const getAllUsers = (params?: IGetAllUsersParams) =>
  apiClient<IUserResponse>("/admin/users", {
    method: "GET",
    query:params,
  });

export const changeUserStatus = (id: string, body: { status: UserStatus }) => {
  return apiClient(`/admin/users/${id}`, {
    method: "PATCH",
    body,
  });
};
