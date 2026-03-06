import { ApiResponse, ApiSuccessResponse } from "@/types/response-types.";
import { getSecureItem } from "@/utils/libs";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

class ApiError extends Error {
  status_code: number;
  data?: any;

  constructor(message: string, status_code: number, data?: any) {
    super(message);
    this.status_code = status_code;
    this.data = data;
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiSuccessResponse<T>> {
  try {
    const token = await getSecureItem("access_token");

    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...(options.headers || {}),
      },
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data?.message || "Request failed",
        response.status,
        data,
      );
    }

    return data as ApiSuccessResponse<T>;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Network / fetch failure
    if (error instanceof TypeError) {
      throw new ApiError(
        "Network request failed. Please check your connection.",
        502,
      );
    }

    // Unknown error
    throw new ApiError(error?.message || "Unexpected error", 500);
  }
}

const apiService = {
  get: async <T = any>(
    endpoint: string,
    params?: Record<string, string | number | undefined>,
    signal?: AbortSignal,
  ): Promise<ApiSuccessResponse<T>> => {
    let finalEndpoint = endpoint;

    if (params) {
      const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, v]) => v !== undefined && v !== null && v !== "",
        ),
      ) as Record<string, string | number>;

      // build query manually to preserve commas
      const queryString = Object.entries(cleanedParams)
        .map(([key, value]) => {
          if (["dateRange", "timeRange"].includes(key)) {
            return `${encodeURIComponent(key)}=${value}`;
          }

          return `${encodeURIComponent(key)}=${encodeURIComponent(
            String(value),
          )}`;
        })
        .join("&");

      if (queryString) {
        finalEndpoint += `?${queryString}`;
      }
    }

    return apiRequest<T>(finalEndpoint, {
      method: "GET",
      signal,
    });
  },
  post: <T, D = any>(endpoint: string, data: D, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    }),

  put: <T, D = any>(endpoint: string, data: D) =>
    apiRequest<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T, D = any>(endpoint: string, data: D) =>
    apiRequest<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: "DELETE" }),
};

export default apiService;
