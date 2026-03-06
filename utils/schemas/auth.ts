import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(6)
    .refine(
      (value) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        return hasUppercase && hasLowercase && hasNumber;
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        path: ["password"],
      },
    ),
  name: z.string().optional(),
});

export type SignupType = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  email: z.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(6)
    .refine(
      (value) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        return hasUppercase && hasLowercase && hasNumber;
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        path: ["password"],
      },
    ),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const ResetPasswordSchema = z.object({
  email: z.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: "Invalid email address",
  }),
  otp: z.string().max(4),
  password: z
    .string()
    .min(6)
    .refine(
      (value) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        return hasUppercase && hasLowercase && hasNumber;
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        path: ["password"],
      },
    ),
});

export const ForgotEmailSchema = z.object({
  email: z.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: "Invalid email address",
  }),
});

export type ForgotEmailType = z.infer<typeof ForgotEmailSchema>;

export const OtpSchema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be 4 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type OtpType = z.infer<typeof OtpSchema>;

export const NewPasswordSchema = z
  .object({
    otp: z
      .string()
      .length(4, "OTP must be 4 digits")
      .regex(/^\d+$/, "OTP must contain only numbers"),
    password: z
      .string()
      .min(6)
      .refine(
        (value) => {
          const hasUppercase = /[A-Z]/.test(value);
          const hasLowercase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          return hasUppercase && hasLowercase && hasNumber;
        },
        {
          message: "Password must contain uppercase, lowercase and number",
        },
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type NewPasswordType = z.infer<typeof NewPasswordSchema>;
