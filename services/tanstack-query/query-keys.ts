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
  products: {
    base: () => ["products"],
    list: (params?: any) => [...QUERY_KEYS.products.base(), "list", params],
    detail: (idOrSlug: string) => [...QUERY_KEYS.products.base(), "detail", idOrSlug],
  },
  categories: {
    base: () => ["categories"],
    list: (params?: any) => [...QUERY_KEYS.categories.base(), "list", params],
    detail: (id: string) => [...QUERY_KEYS.categories.base(), "detail", id],
    products: (slug: string, params?: any) => [
      ...QUERY_KEYS.categories.base(),
      "products",
      slug,
      params,
    ],
  },
};
