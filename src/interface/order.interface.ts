import { createOrderSchema } from "../validation/createOrderSchema";
import z from "zod";
import { IGear } from "./gear.interface";
import { IMetaData } from "./common.interface";

export type ICreateOrderPayload = z.infer<ReturnType<typeof createOrderSchema>>;

export interface ICreateOrderResponse {
  success: boolean;
  message: string;
  data: IOrder | null;
}

export enum OrderStatus {
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  PAID = "PAID",
  PICKED = "PICKED",
  RETURNED = "RETURNED",
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
}

//=======================================

export interface IAllOrderResponse {
  success: boolean;
  message: string;
  data?: {
    data: IOrderWithItem[];
    metadata?: IMetaData;
  };
}

export interface ISingleOrderResponse {
  success: boolean;
  message: string;
  data?: IOrderWithItem;
}

export interface IOrderWithItem extends IOrder {
  item: IGear;
}
