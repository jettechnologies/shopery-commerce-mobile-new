import {
  GuestCartResponse,
  LoginResponse,
  RegisterResponse,
} from "@/types/response-types.";
import { ENDPOINTS } from "@/utils/endpoints";
import apiService from "../api-service";

import { Platform } from "react-native";

interface RegisterParams {
  email: string;
  name?: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface VerifyEmailParams {
  otp: string;
  email: string;
}

interface EmailParams {
  email: string;
}

interface ResetPasswordParams {
  otp: string;
  email: string;
  password: string;
}

export const register = (data: RegisterParams) =>
  apiService.post<RegisterResponse>(ENDPOINTS.auth.signup, data);
export const login = (data: LoginParams) =>
  apiService.post<LoginResponse>(ENDPOINTS.auth.login, data);

export const logout = () => apiService.post(ENDPOINTS.auth.logout, {});

export const createGuestCart = async () => {
  const response = await apiService.post<GuestCartResponse>(
    "/guest-cart",
    {},
    {
      headers: {
        "x-platform": Platform.OS,
      },
    },
  );

  return response.data;
};

export const verifyEmail = (data: VerifyEmailParams) =>
  apiService.post(ENDPOINTS.auth.verifyEmail, data);

export const resendVerification = (data: EmailParams) =>
  apiService.post(ENDPOINTS.auth.resendVerification, data);

export const forgotPassword = (data: EmailParams) =>
  apiService.post(ENDPOINTS.auth.forgotPassword, data);

export const resetPassword = (data: ResetPasswordParams) =>
  apiService.post(ENDPOINTS.auth.resetPassword, data);
