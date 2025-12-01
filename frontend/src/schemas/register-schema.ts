import z from "zod";

export const registerSchema = z.object({
  first_name: z
    .string()
    .min(3, "Min 3 chars")
    .max(50, "Max 50 chars")
    .regex(/^[\p{L}\s'-]{3,50}$/u, "Invalid first name"),

  last_name: z
    .string()
    .min(3, "Min 3 chars")
    .max(50, "Max 50 chars")
    .regex(/^[\p{L}\s'-]{3,50}$/u, "Invalid last name"),

  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),

  password: z
    .string()
    .min(8, "Min 8 chars")
    .max(16, "Max 16 chars")
    .regex(
      /^(?=.*\p{L})(?=.*\p{Nd})(?=.*[!@#$%^&*()\-_=+\[\]{};:'",.<>/?]).{8,16}$/u,
      "Weak password"
    ),

  confirmPassword: z
    .string()
    .min(1, "Required"),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});
