import { ENDPOINTS } from "@/utils/endpoints";
import apiService from "../api-service";

export interface CheckoutParams {
  email?: string;
  paymentId?: string | null;
  couponCode?: string | null;
  addressId?: number | null;
}

export const initiateCheckout = async (data: CheckoutParams) => {
  const response = await apiService.post<any>(ENDPOINTS.checkout.initiate, data);
  return response;
};
