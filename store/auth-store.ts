import { type BaseUser as User } from "@/types/response-types.";
import { getSecureItem, removeSecureItem, setSecureItem } from "@/utils/libs";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  guestCartToken: string | null;

  login: (data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;

  setRefreshTokens: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;

  setGuestCartToken: (token: string) => Promise<void>;

  logout: () => Promise<void>;

  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  guestCartToken: null,

  login: async ({ user, accessToken, refreshToken }) => {
    await setSecureItem("access_token", accessToken);
    await setSecureItem("refresh_token", refreshToken);

    set({
      user,
      accessToken,
      refreshToken,
    });
  },

  setGuestCartToken: async (token) => {
    await setSecureItem("guest_cart_token", token);

    set({
      guestCartToken: token,
    });
  },

  setRefreshTokens: async ({ accessToken, refreshToken }) => {
    await setSecureItem("access_token", accessToken);
    await setSecureItem("refresh_token", refreshToken);

    set({
      accessToken,
      refreshToken,
    });
  },

  logout: async () => {
    await removeSecureItem("access_token");
    await removeSecureItem("refresh_token");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  },

  hydrate: async () => {
    const accessToken = await getSecureItem("access_token");
    const refreshToken = await getSecureItem("refresh_token");
    const guestCartToken = await getSecureItem("guest_cart_token");

    set({
      accessToken,
      refreshToken,
      guestCartToken,
    });
  },
}));
