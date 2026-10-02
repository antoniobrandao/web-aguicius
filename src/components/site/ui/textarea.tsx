import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "frontend-control flex min-h-32 w-full px-4 py-3 text-[0.9375rem]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
