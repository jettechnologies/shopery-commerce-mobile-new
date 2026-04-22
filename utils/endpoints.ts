const auth = {
  login: "/auth/login",
  signup: "/auth/register",
  verifyEmail: "/auth/verify-email",
  resendVerification: "/auth/resend-verification",
  logout: "/auth/logout",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  refreshToken: "/auth/refresh",
};

const guestCart = {
  create: "/guest-cart/create",
  addItem: "/guest-cart/add",
  get: "/guest-cart",
  removeItem: (id: string | number) => `/guest-cart/item/${id}`,
  clear: "/guest-cart/clear",
  merge: "/guest-cart/merge",
};

const cart = {
  get: "/cart",
  addItem: "/cart",
  updateItem: (id: string | number) => `/cart/${id}`,
  removeItem: (id: string | number) => `/cart/${id}`,
  clear: "/cart",
};

const categories = {
  list: "/categories",
  detail: (id: string | number) => `/categories/${id}`,
  products: (slug: string) => `/categories/${slug}/products`,
};

const products = {
  list: "/products",
  cursor: "/products/cursor",
  detail: (productId: string) => `/products/${productId}`,
  slug: (slug: string) => `/products/slug/${slug}`,
  filter: "/products/filter",
};
const productSearch = {
  search: "/product-search",
  autocomplete: "/product-search/autocomplete",
};

const orders = {
  byUser: "/orders/user",
  history: "/orders/history",
  detail: (id: string) => `/orders/${id}`,
  cancel: (id: string) => `/orders/${id}/cancel`,
  updateAddress: (id: string) => `/orders/${id}/address`,
};

const wishlist = {
  get: "/wishlist",
  add: "/wishlist",
  remove: (productId: string) => `/wishlist/${productId}`,
};

const profile = {
  get: "/profile/get-profile",
  update: "/profile/update-profile",
  uploadImage: "/profile/image/upload",
  deleteImage: "/profile/image/delete",
  address: {
    create: "/profile/address/create",
    update: (id: string) => `/profile/address/edit-address/${id}`,
  },
  deactivate: (userId: string) => `/profile/deactive/${userId}`,
  changePassword: "/profile/change-password",
};

const checkout = {
  initiate: "/checkout",
};

export const ENDPOINTS = {
  auth,
  guestCart,
  cart,
  categories,
  products,
  productSearch,
  orders,
  profile,
  wishlist,
  checkout,
};
