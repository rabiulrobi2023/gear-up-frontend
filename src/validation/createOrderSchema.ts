import { IGear } from "@/interface/gear.interface";
import z from "zod";

export const createOrderSchema = (gear: IGear) =>
  z
    .object({
      itemId: z.string().optional(),
      quantity: z
        .number("Quantity is required")
        .int("Must be integer")
        .positive("Quantity must be at least 1")
        .max(gear.stock, `Quantity must be maximum ${gear.stock} `),
      startDate: z.date(),
      returnDate: z.date(),
    })
    .refine((data) => data.returnDate > data.startDate, {
      message: "Return date must be after start date",
      path: ["returnDate"],
    });
