import { formatCurrency } from "@/utils/libs/misc";

export const getStatusConfig = (status: string) => {
  switch (status?.toLowerCase()) {
    case "delivered":
      return {
        label: "Completed",
        borderColor: "#16a34a",
        textColor: "#16a34a",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        borderColor: "#dc2626",
        textColor: "#dc2626",
      };
    default:
      return {
        label: "On Progress",
        borderColor: "#0d9488",
        textColor: "#0d9488",
      };
  }
};

export const formatPrice = (value: string | number) =>
  formatCurrency({
    amount: Number(value),
  });

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
