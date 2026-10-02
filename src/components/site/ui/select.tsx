import * as React from "react";

import { cn } from "@/lib/utils";

function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "frontend-control flex h-12 w-full px-4 py-2 text-[0.9375rem]",
        className
      )}
      {...props}
    />
  );
}

export { Select };
