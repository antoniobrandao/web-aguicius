import { cn } from "@/lib/utils";

export function MapEmbed({
  className,
  src,
  title = "Mapa",
}: {
  className?: string;
  src: string;
  title?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-3xl shadow-frontend-card", className)}>
      <iframe
        title={title}
        src={src}
        className="h-full min-h-80 w-full grayscale-[0.3]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
