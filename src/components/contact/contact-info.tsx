import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { site } from "@/lib/site";

export function ContactInfo() {
  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
      <InfoCard icon={<MapPin className="size-5" />} label="Morada">
        <p>
          {site.address.street}
          <br />
          {site.address.zip}, {site.address.city}
        </p>
      </InfoCard>

      <InfoCard icon={<Phone className="size-5" />} label="Telefone">
        <a
          href={site.phoneHref}
          className="transition-colors hover:text-primary"
        >
          {site.phone}
        </a>
      </InfoCard>

      <InfoCard icon={<Mail className="size-5" />} label="Email">
        <a
          href={`mailto:${site.email}`}
          className="break-all transition-colors hover:text-primary"
        >
          {site.email}
        </a>
      </InfoCard>

      <InfoCard icon={<Clock className="size-5" />} label="Horário">
        <div className="flex flex-col gap-1">
          {site.schedule.map((slot) => (
            <p key={slot.days}>
              <span className="font-semibold text-secondary">{slot.days}</span>{" "}
              <span className="text-muted-foreground">{slot.hours}</span>
            </p>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 bg-card p-8">
      <span className="inline-flex size-12 items-center justify-center bg-secondary text-white">
        {icon}
      </span>
      <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
        {label}
      </h3>
      <div className="text-sm leading-relaxed text-secondary">{children}</div>
    </div>
  );
}
