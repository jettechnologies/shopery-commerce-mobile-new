import { create } from "zustand";

export interface CartItem {
  id: string | number; // This should be the CartItemId
  productId: string;
  variantId: number;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
  product?: {
    name: string;
    images?: { imageUrl: string; altText: string; isPrimary: boolean }[];
    description?: string;
  };
  variant?: {
    size?: string;
    color?: string[];
  };
}

interface CartStore {
  items: Record<string, CartItem>;
  totalAmount: number;
  totalItems: number;
  setCart: (items: any[]) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: {},
  totalAmount: 0,
  totalItems: 0,

  setCart: (items) => {
    const formattedItems = Object.fromEntries(
      items.map((i) => [
        String(i.id),
        {
          ...i,
          quantity: Number(i.quantity),
        },
      ]),
    );

    // Recalculate totals
    const totalAmount = items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0,
    );
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    set({
      items: formattedItems,
      totalAmount,
      totalItems,
    });
  },

  updateQuantity: (id, quantity) =>
    set((state) => {
      const item = state.items[String(id)];
      if (!item) return state;

      const newQuantity = Math.max(1, quantity);
      const newItems = {
        ...state.items,
        [String(id)]: { ...item, quantity: newQuantity },
      };

      // Recalculate totals
      const itemsArray = Object.values(newItems);
      const totalAmount = itemsArray.reduce(
        (sum, i) => sum + i.unitPrice * i.quantity,
        0,
      );
      const totalItems = itemsArray.reduce((sum, i) => sum + i.quantity, 0);

      return {
        items: newItems,
        totalAmount,
        totalItems,
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const { [String(id)]: removed, ...newItems } = state.items;

      // Recalculate totals
      const itemsArray = Object.values(newItems);
      const totalAmount = itemsArray.reduce(
        (sum, i) => sum + i.unitPrice * i.quantity,
        0,
      );
      const totalItems = itemsArray.reduce(
        (sum, i) => sum + Number(i.quantity),
        0,
      );

      return {
        items: newItems,
        totalAmount,
        totalItems,
      };
    }),

  clearCart: () =>
    set({
      items: {},
      totalAmount: 0,
      totalItems: 0,
    }),
}));
