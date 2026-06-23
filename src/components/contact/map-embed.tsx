import { cn } from "@/lib/utils";

export function MapEmbed({
  className,
  src,
}: {
  className?: string;
  src: string;
}) {
  return (
    <div className={cn("overflow-hidden border border-border", className)}>
      <iframe
        title="Mapa Aguicius"
        src={src}
        className="h-full min-h-80 w-full grayscale-[0.3]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
