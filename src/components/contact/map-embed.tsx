import { cn } from "@/lib/utils";

export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden border border-border", className)}>
      <iframe
        title="Mapa Aguicius"
        src="https://www.google.com/maps?q=Rua%20do%20Capit%C3%A3o%2088%20Carvalhal%20Portugal&output=embed"
        className="h-full min-h-80 w-full grayscale-[0.3]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
