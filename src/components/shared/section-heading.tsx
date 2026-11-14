import { fieldAttrs } from "@/lib/content/blocks";
import { cn } from "@/lib/utils";

/**
 * `marked` says the heading shows the `eyebrow`, `title` and `description` fields
 * of the website block it sits in, so the backoffice preview can point at them.
 * A description passed as an element is not the block's `description` field (it
 * is bound content the caller marks itself) and is left unmarked.
 */
export function SectionHeading({
  marked = false,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  marked?: boolean;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const mark = (id: string) => (marked ? fieldAttrs(id) : {});

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <p {...mark("eyebrow")} className="frontend-eyebrow">
          {eyebrow}
        </p>
      ) : null}
      <h2
        {...mark("title")}
        className="frontend-display-heading frontend-display-md text-frontend-heading"
      >
        {title}
      </h2>
      {description ? (
        <p
          {...(typeof description === "string" ? mark("description") : {})}
          className={cn(
            "frontend-copy mt-1 max-w-xl text-[1.0625rem]",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
