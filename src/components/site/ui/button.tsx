import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = {
  default:
    "bg-frontend-surface text-white hover:bg-frontend-brand hover:text-white",
  primary:
    "bg-frontend-brand text-white hover:bg-frontend-surface hover:text-white",
  secondary:
    "bg-frontend-muted text-frontend-heading hover:bg-frontend-surface hover:text-white",
  outline:
    "border border-frontend-heading text-frontend-heading hover:bg-frontend-heading hover:text-white",
  outlineLight:
    "border border-white/40 text-white hover:bg-white hover:text-frontend-heading",
  ghost: "text-frontend-heading hover:text-frontend-brand",
  link: "text-frontend-brand underline-offset-4 hover:underline tracking-normal normal-case",
} satisfies Record<string, string>;

const buttonSizes = {
  default: "h-10 px-5",
  sm: "h-9 px-5",
  lg: "h-12 px-6",
  icon: "size-11",
} satisfies Record<string, string>;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  {
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "frontend-small-label inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap border border-transparent outline-none transition-[background-color,color,border-color,transform] duration-150 ease-in-out active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-frontend-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-frontend-bg [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
