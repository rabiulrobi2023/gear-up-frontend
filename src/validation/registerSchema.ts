import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  role: z.enum(["CUSTOMER","PROVIDER"], "Please select a role"),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladesh mobile number")
    .optional(),
  address: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),

}).refine((data)=>data.password===data.confirmPassword,{message:"Password do not match", path:["confirmPassword"]});
