import { z } from "zod";

export const UpdateProfileSchema = z.object({
  name: z.string().min(3, "Name is required").optional(),
  email: z
    .string()
    .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: "Invalid email address",
    })
    .optional(),
});

export type UpdateProfileSchemaType = z.infer<typeof UpdateProfileSchema>;
