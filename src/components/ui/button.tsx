import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-150 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
        primary:
          "bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground",
        outline:
          "border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
        outlineLight:
          "border border-white/40 text-white hover:bg-white hover:text-secondary",
        ghost:
          "text-secondary hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline tracking-normal normal-case",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-9 px-5",
        lg: "h-14 px-10 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
