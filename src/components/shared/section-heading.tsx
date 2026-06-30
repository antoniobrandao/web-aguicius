import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? <span className="frontend-eyebrow">{eyebrow}</span> : null}
      <h2
        className={cn(
          "frontend-display-heading text-4xl lg:text-5xl",
          tone === "light" ? "text-white" : "text-frontend-heading"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "frontend-copy max-w-2xl",
            tone === "light" ? "text-white/70" : "text-frontend-body",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
