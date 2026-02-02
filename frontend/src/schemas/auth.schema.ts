import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters"),

  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),

  city: z.string().min(2, "City is required"),

  state: z.string().min(2, "State is required"),

  gender: z.enum(["male", "female", "other"], {
    message: "Select a gender",
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
