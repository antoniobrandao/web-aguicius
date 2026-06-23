"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type BackofficeTheme = "light" | "dark";

type BackofficeThemeContextValue = {
  theme: BackofficeTheme;
  setTheme: (theme: BackofficeTheme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "aguicius-backoffice-theme";

const BackofficeThemeContext =
  createContext<BackofficeThemeContextValue | null>(null);

export function BackofficeThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] = useState<BackofficeTheme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return "light";
  });

  const value = useMemo<BackofficeThemeContextValue>(() => {
    function setTheme(nextTheme: BackofficeTheme) {
      setThemeState(nextTheme);
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    }

    return {
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    };
  }, [theme]);

  return (
    <BackofficeThemeContext.Provider value={value}>
      <div
        className={cn(
          "backoffice-theme min-h-dvh bg-background text-foreground",
          theme === "dark" && "dark",
        )}
      >
        {children}
      </div>
    </BackofficeThemeContext.Provider>
  );
}

export function useBackofficeTheme() {
  const context = useContext(BackofficeThemeContext);
  if (!context) {
    throw new Error(
      "useBackofficeTheme must be used within BackofficeThemeProvider.",
    );
  }
  return context;
}
