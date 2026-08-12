import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Brand logo.
 * - The source site serves a wide wordmark on desktop and a square icon on
 *   small breakpoints — `responsive` reproduces that switch.
 * - The artwork is dark on transparent; `variant="light"` inverts it to white
 *   for use on dark surfaces (footer / mobile menu).
 */
export function Logo({
  className,
  variant = "dark",
  responsive = false,
  name = "",
}: {
  className?: string;
  variant?: "dark" | "light";
  responsive?: boolean;
  name?: string;
}) {
  const tint = variant === "light" ? "brightness-0 invert" : undefined;
  const label = name || "Início";

  return (
    <Link
      href="/"
      aria-label={`${label} — página inicial`}
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/logo.png"
        alt={name}
        width={500}
        height={112}
        priority
        className={cn(
          "h-9 w-auto",
          responsive && "hidden lg:block",
          tint
        )}
      />
      {responsive ? (
        <Image
          src="/logo-icon.png"
          alt={name}
          width={280}
          height={280}
          priority
          className={cn("h-12 w-auto lg:hidden", tint)}
        />
      ) : null}
    </Link>
  );
}
