import z from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1, "Please select a rating")
    .max(5, "Rating must be between 5"),

  comment: z.string().trim().min(5, "Please write a review"),
});
