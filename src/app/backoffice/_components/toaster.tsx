"use client";

import { Toaster } from "@/components/ui/sonner";

export function BackofficeToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "border-border bg-popover text-popover-foreground shadow-lg",
          title: "text-popover-foreground",
          description: "text-muted-foreground",
          error:
            "border-destructive/40 bg-popover text-popover-foreground",
          success:
            "border-border bg-popover text-popover-foreground",
        },
      }}
    />
  );
}
