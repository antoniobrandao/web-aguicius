"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackofficeTheme = "light" | "dark";

type BackofficeThemeContextValue = {
  theme: BackofficeTheme;
  setTheme: (theme: BackofficeTheme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "aguicius-backoffice-theme";
const CHANGE_EVENT = "backoffice-theme-change";

const ThemeContext = createContext<BackofficeThemeContextValue | null>(null);

export function BackofficeThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeClientValue,
    getThemeServerValue,
  );

  const value = useMemo<BackofficeThemeContextValue>(() => {
    function setTheme(nextTheme: BackofficeTheme) {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    }

    return {
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={cn(
          "min-h-dvh bg-background text-foreground",
          theme === "dark" && "dark",
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function BackofficeThemeToggle() {
  const { theme, toggleTheme } = useBackofficeTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}

function useBackofficeTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useBackofficeTheme must be used inside BackofficeThemeProvider.");
  }
  return context;
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getThemeClientValue(): BackofficeTheme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "dark" || stored === "light" ? stored : "light";
}

function getThemeServerValue(): BackofficeTheme {
  return "light";
}
