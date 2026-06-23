"use client";

import { Moon, Sun } from "lucide-react";

import { useBackofficeTheme } from "@/components/backoffice/theme-provider";
import { Button } from "@/components/ui/button";

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
      {isDark ? (
        <Sun data-icon="inline-start" />
      ) : (
        <Moon data-icon="inline-start" />
      )}
    </Button>
  );
}
