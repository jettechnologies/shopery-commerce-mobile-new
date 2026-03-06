export interface ApiSuccessResponse<T = any> {
  status: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  error: string;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

export type BaseUser = {
  id: string;
  email: string;
  name: string;
};

export type LoginResponse = {
  user: BaseUser;
  accessToken: string;
  refreshToken: string;
};

export type RegisterResponse = LoginResponse;

export type GuestCartResponse = {
  id: string;
  token: string;
  expiresAt: string;
  items: any[];
};
