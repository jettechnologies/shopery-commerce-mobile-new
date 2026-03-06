import { useToastContext } from "@/context/toast-provider";
import {
  createGuestCart,
  forgotPassword,
  login,
  logout,
  register,
  resendVerification,
  resetPassword,
  verifyEmail,
} from "@/services/mutations/auth";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export const useRegister = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: register,
    meta: {
      invalidatesQuery: QUERY_KEYS.auth.signup(),
      errorMessage: "Error creating account",
    },
    onSuccess: (data) => {
      const login = useAuthStore.getState().login;
      const registerData = {
        user: data.data.user,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };

      login(registerData);
      openToast(data.message || "Account created successfully", "success");
    },
  });
};

export const useLogin = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: login,
    meta: {
      invalidatesQuery: QUERY_KEYS.auth.login(),
      errorMessage: "Login failed",
    },
    onSuccess: (data) => {
      const login = useAuthStore.getState().login;
      const loginData = {
        user: data.data.user,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };

      login(loginData);
      openToast(data.message || "Login successful", "success");
    },
  });
};

export const useLogout = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: logout,
    meta: {
      invalidatesQuery: QUERY_KEYS.auth.base(),
      errorMessage: "Logout failed",
    },
    onSuccess: (data) => {
      openToast(data.message || "Logged out successfully", "success");
    },
  });
};

export const useCreateGuestCart = () => {
  return useMutation({
    mutationFn: createGuestCart,
    meta: {
      errorMessage: "Unable to create guest cart",
    },
    onSuccess: (data) => {
      const setGuestCartToken = useAuthStore.getState().setGuestCartToken;
      setGuestCartToken(data.token);
    },
  });
};

export const useVerifyEmail = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: verifyEmail,
    meta: {
      invalidatesQuery: QUERY_KEYS.auth.verifyEmail(),
      errorMessage: "Verification failed",
    },
    onSuccess: (data) => {
      openToast(data.message || "Email verified successfully", "success");
    },
  });
};

export const useResendVerification = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: resendVerification,
    meta: {
      invalidatesQuery: QUERY_KEYS.auth.resendVerification(),
      errorMessage: "Failed to resend verification email",
    },
    onSuccess: (data) => {
      openToast(data.message || "Verification email sent", "success");
    },
  });
};

export const useForgotPassword = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: forgotPassword,
    meta: {
      invalidatesQuery: QUERY_KEYS.auth.base(),
      errorMessage: "Failed to send reset email",
    },
    onSuccess: (data) => {
      openToast(data.message || "Reset OTP sent", "success");
    },
  });
};

export const useResetPassword = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: resetPassword,
    meta: {
      invalidatesQuery: QUERY_KEYS.auth.base(),
      errorMessage: "Password reset failed",
    },
    onSuccess: (data) => {
      openToast(data.message || "Password reset successful", "success");
    },
  });
};
