export const QUERY_KEYS = {
  auth: {
    base: () => ["auth"],
    login: () => [...QUERY_KEYS.auth.base(), "login"],
    signup: () => [...QUERY_KEYS.auth.base(), "signup"],
    verifyEmail: () => [...QUERY_KEYS.auth.base(), "verify-email"],
    resendVerification: () => [
      ...QUERY_KEYS.auth.base(),
      "resend-verification",
    ],
    logout: () => [...QUERY_KEYS.auth.base(), "logout"],
    forgotPassword: () => [...QUERY_KEYS.auth.base(), "forgot-password"],
    resetPassword: () => [...QUERY_KEYS.auth.base(), "reset-password"],
  },
};
