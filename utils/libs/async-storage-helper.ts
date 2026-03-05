import AsyncStorage from "@react-native-async-storage/async-storage";

/* ---------- SET ---------- */
export async function setAsyncStorageItem<T>(key: string, value: T) {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch (error) {
    console.error("Storage set error:", error);
  }
}

/* ---------- GET ---------- */
// export async function getAsyncStorageItem<T>(key: string): Promise<T | null> {
//   try {
//     const item = await AsyncStorage.getItem(key);
//     return item ? (JSON.parse(item) as T) : null;
//   } catch (error) {
//     console.error("Storage get error:", error);
//     return null;
//   }
// }

export async function getAsyncStorageItem<T>(key: string): Promise<T | null> {
  try {
    const item = await AsyncStorage.getItem(key);

    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      // fallback if value wasn't JSON
      return item as unknown as T;
    }
  } catch (error) {
    console.error("Storage get error:", error);
    return null;
  }
}

/* ---------- REMOVE ---------- */
export async function removeAsyncStorageItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Storage remove error:", error);
  }
}

/* ---------- CLEAR ---------- */
export async function clearAsyncStorage() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Storage clear error:", error);
  }
}
