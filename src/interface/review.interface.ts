import { reviewSchema } from "@/validation/reviewSchema";
import z from "zod";

export interface IReviewResponse {
  success: boolean;
  message: string;
  data: IReview | null;
}

export interface IReview {
  id: string;
  customerId: string;
  orderId: string;
  itemId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export type IReviewFormValue = z.infer<typeof reviewSchema>;
