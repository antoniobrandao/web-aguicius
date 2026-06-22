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
}: {
  className?: string;
  variant?: "dark" | "light";
  responsive?: boolean;
}) {
  const tint = variant === "light" ? "brightness-0 invert" : undefined;

  return (
    <Link
      href="/"
      aria-label="Aguicius — página inicial"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/logo.png"
        alt="Aguicius"
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
          alt="Aguicius"
          width={280}
          height={280}
          priority
          className={cn("h-12 w-auto lg:hidden", tint)}
        />
      ) : null}
    </Link>
  );
}
