import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = {
  default:
    "bg-frontend-brand-soft text-frontend-brand hover:bg-frontend-brand hover:text-white",
  primary: "bg-frontend-brand text-white hover:bg-frontend-brand-strong",
  secondary: "bg-frontend-muted text-frontend-heading hover:bg-frontend-border",
  outline:
    "border-frontend-line text-frontend-heading hover:border-frontend-brand hover:text-frontend-brand",
  outlineLight: "border-white/40 text-white hover:bg-white hover:text-frontend-brand",
  light: "bg-white text-frontend-brand hover:bg-frontend-brand-soft",
  ghost: "text-frontend-brand hover:text-frontend-brand-strong",
  link: "text-frontend-brand underline-offset-4 hover:underline",
} satisfies Record<string, string>;

const buttonSizes = {
  default: "h-11 px-6",
  sm: "h-10 px-5",
  lg: "h-13 px-7",
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
        "frontend-small-label inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent outline-none transition-[background-color,color,border-color,scale] duration-150 ease-out active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-frontend-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-frontend-bg [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
