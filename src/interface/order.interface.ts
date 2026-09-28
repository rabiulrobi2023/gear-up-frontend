import { createOrderSchema } from "../validation/createOrderSchema";
import z from "zod";
import { IGear } from "./gear.interface";
import { IMetaData } from "./common.interface";
import { IUser } from "./user.interface";

export type ICreateOrderPayload = z.infer<ReturnType<typeof createOrderSchema>>;

export interface ICreateOrderResponse {
  success: boolean;
  message: string;
  data: IOrder | null;
}

export interface IOrderResponse {
  success: boolean;
  message: string;
  data?: {
    data: IOrder[];
    metadata?: IMetaData;
  };
}

export enum OrderStatus {
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  PAID = "PAID",
  PICKED = "PICKED",
  RETURNED = "RETURNED",
  COMPLETED = "COMPLETED",
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
  customer: IUser;
  item: IGear;
}

//=======================================

export interface ISingleOrderResponse {
  success: boolean;
  message: string;
  data?: IOrder;
}

export interface IOrderProvider {
  name: string;
  email: string;
  phone: string;
}

export interface IOrderCategory {
  name: string;
}
