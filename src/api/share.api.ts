import { IOrderResponse } from "@/interface/order.interface";
import apiClient from "@/lib/apiClient";

export const getMyAllOrders = () => {
  return apiClient<IOrderResponse>("/rentals", {
    method: "GET",
  });
};