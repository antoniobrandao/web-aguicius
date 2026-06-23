"use client";

import { useBackofficeTheme } from "@/components/backoffice/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export function BackofficeToaster() {
  const { theme } = useBackofficeTheme();
  return <Toaster theme={theme} position="bottom-right" />;
}
