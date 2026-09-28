import { IOrderResponse, OrderStatus } from "@/interface/order.interface";
import { IProviderStatisticsResponse } from "@/interface/provider.interface";
import apiClient from "@/lib/apiClient";

export const getProviderGearStatistics = () => {
  return apiClient<IProviderStatisticsResponse>("/provider/gear-statistics", {
    method: "GET",
  });
};



export const getPendingOrders = () => {
  return apiClient<IOrderResponse>("/provider/pending-orders", {
    method: "GET",
  });
};

interface IConfirmOrderProps {
  id: string;
  body: {
    status: OrderStatus;
  };
}
export const confirmOrder = ({ id, body }: IConfirmOrderProps) => {
  return apiClient(`/provider/orders/${id}`, {
    method: "PATCH",
    body,
  });
};
