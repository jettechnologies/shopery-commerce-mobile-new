import { create } from "zustand";

interface DrawerStore {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isNotificationOpen: boolean;
  
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  
  openNotification: () => void;
  closeNotification: () => void;
  toggleNotification: () => void;
  
  closeAll: () => void;
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isNotificationOpen: false,

  openCart: () => set({ isCartOpen: true, isSearchOpen: false, isNotificationOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen, isSearchOpen: false, isNotificationOpen: false })),

  openSearch: () => set({ isSearchOpen: true, isCartOpen: false, isNotificationOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen, isCartOpen: false, isNotificationOpen: false })),

  openNotification: () => set({ isNotificationOpen: true, isCartOpen: false, isSearchOpen: false }),
  closeNotification: () => set({ isNotificationOpen: false }),
  toggleNotification: () => set((state) => ({ isNotificationOpen: !state.isNotificationOpen, isCartOpen: false, isSearchOpen: false })),

  closeAll: () => set({ isCartOpen: false, isSearchOpen: false, isNotificationOpen: false }),
}));
