import * as SecureStore from "expo-secure-store";

/* ---------- SET ---------- */
export async function setSecureItem(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("SecureStore set error:", error);
  }
}

/* ---------- GET ---------- */
export async function getSecureItem(key: string) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("SecureStore get error:", error);
    return null;
  }
}

/* ---------- REMOVE ---------- */
export async function removeSecureItem(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("SecureStore remove error:", error);
  }
}
