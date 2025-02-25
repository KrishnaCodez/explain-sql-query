export const API_KEY_STORAGE_KEY = "GOOGLE_API_KEY";

export const apiKeyManager = {
  getApiKey: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  },
  setApiKey: (key: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  },

  removeApiKey: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  },
};
