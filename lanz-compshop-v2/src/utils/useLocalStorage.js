// src/utils/useLocalStorage.js
import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      console.log(`[useLocalStorage] reading "${key}":`, stored);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      const current = (() => {
        try {
          const stored = localStorage.getItem(key);
          return stored ? JSON.parse(stored) : value;
        } catch {
          return value;
        }
      })();

      const valueToStore = newValue instanceof Function ? newValue(current) : newValue;
      console.log(`[useLocalStorage] writing "${key}":`, valueToStore);
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("useLocalStorage error:", error);
    }
  };

  return [value, setStoredValue];
}