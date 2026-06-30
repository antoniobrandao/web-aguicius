import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "frontend-control flex h-12 w-full px-4 py-2 text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
