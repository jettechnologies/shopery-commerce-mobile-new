import { useToastContext } from "@/context/toast-provider";
import { OrderService } from "@/services/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export const useGetOrdersByUser = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: QUERY_KEYS.orders.byUser({ page, limit }),
    queryFn: () => OrderService.getOrdersByUser(page, limit),
  });
};

export const useGetOrderHistory = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: QUERY_KEYS.orders.history({ page, limit }),
    queryFn: () => OrderService.getOrderHistory(page, limit),
  });
};

export const useGetOrderById = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.orders.detail(id),
    queryFn: () => OrderService.getOrderById(id),
    enabled: !!id,
  });
};

export const useCancelOrder = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: (orderId: string) => OrderService.cancelOrder(orderId),
    meta: {
      invalidatesQuery: QUERY_KEYS.orders.base(),
      errorMessage: "Failed to canel order",
    },
    onSuccess: (data) => {
      openToast(data.message || "Order Cancelled successfully", "success");
    },
  });
};

export const useUpdateOrderAddress = () => {
  const { openToast } = useToastContext();

  return useMutation({
    mutationFn: ({
      orderId,
      addressId,
    }: {
      orderId: string;
      addressId: number;
    }) => OrderService.updateOrderAddress(orderId, addressId),
    meta: {
      invalidatesQuery: QUERY_KEYS.orders.base(),
      errorMessage: "Failed to update order address",
    },
    onSuccess: (data) => {
      openToast(
        data.message || "Order address updated successfully",
        "success",
      );
    },
  });
};
