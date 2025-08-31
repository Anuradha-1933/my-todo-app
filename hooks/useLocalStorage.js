"use client";
import { useEffect, useState } from "react";

/**
 * Simple localStorage state hook that:
 * - reads once on mount (client-side)
 * - writes whenever the value changes
 * - returns [value, setValue, ready] so we can avoid SSR mismatch
 */
export function useLocalStorage(key, initialValue) {
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to read localStorage:", e);
    } finally {
      setReady(true);
    }
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to write localStorage:", e);
    }
  }, [key, value, ready]);

  return [value, setValue, ready];
}
