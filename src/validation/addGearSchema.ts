import z from "zod";

export const addGearSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name at least 3 characters long")
    .trim(),

  brand: z.string().trim().optional(),

  description: z.string().trim().optional(),

  image: z.string().optional(),

  categoryId: z.string("Category is required").min(1, "Category is required"),

  dailyRate: z
    .number("Daily rate is required")
    .positive("Daily rate must be greater than 0"),

  stock: z
    .number("Stock amount is required")
    .int("Stock must be a whole number")
    .min(1, "Stock must be at least 1"),
});
