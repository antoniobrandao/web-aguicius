import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? <p className="frontend-eyebrow">{eyebrow}</p> : null}
      <h2 className="frontend-display-heading frontend-display-md text-frontend-heading">
        {title}
      </h2>
      {description ? (
        <p
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
