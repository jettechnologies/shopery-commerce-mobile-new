import { OrderItem } from "@/types/response-types.";

export interface FlatOrderItem extends OrderItem {
  parentOrderId: string;
  parentStatus: string;
  parentCreatedAt: string;
}
