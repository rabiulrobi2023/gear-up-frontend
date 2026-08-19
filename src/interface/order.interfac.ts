import { createOrderSchema } from "./../validation/createOrderSchema";
import z from "zod";

export type ICreateOrder = z.infer<ReturnType<typeof createOrderSchema>>;

export interface IOrderResponse {
  success: boolean;
  message: string;
  data: IOrder | null;
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PICKED = "PICKED",
  RETURNED = "RETURNED",
  CANCELLED = "CANCELLED",
}
export interface IOrder {
  id: string;
  customerId: string;
  itemId: string;
  quantity: number;
  dailyRate: string;
  totalDays: number;
  totalAmount: string;
  status: OrderStatus;
  expireAt: string;
  startDate: string;
  returnDate: string;
  createdAt: string;
  updatedAt: string;
}
