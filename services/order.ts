import {
  Order,
  OrderHistoryResponse,
  OrdersResponse,
} from "@/types/response-types.";
import { ENDPOINTS } from "@/utils/endpoints";
import apiService from "./api-service";

export const OrderService = {
  getOrdersByUser: async (page = 1, limit = 10) => {
    const response = await apiService.get<OrdersResponse>(
      ENDPOINTS.orders.byUser,
      { page, limit },
    );
    return response.data;
  },

  getOrderHistory: async (page = 1, limit = 10) => {
    const response = await apiService.get<OrderHistoryResponse>(
      ENDPOINTS.orders.history,
      { page, limit },
    );
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await apiService.get<Order>(ENDPOINTS.orders.detail(id));
    return response.data;
  },

  cancelOrder: async (id: string) => {
    const response = await apiService.patch<Order>(
      ENDPOINTS.orders.cancel(id),
      {},
    );
    return response;
  },

  updateOrderAddress: async (id: string, addressId: number) => {
    const response = await apiService.patch<Order>(
      ENDPOINTS.orders.updateAddress(id),
      { addressId },
    );
    return response;
  },
};
