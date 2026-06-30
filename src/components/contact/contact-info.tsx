import { MapPin, Phone, Mail, Clock } from "lucide-react";

import type { SiteSettings } from "@/lib/content/website-types";
import type { WebsiteLocation } from "@/lib/content/website-schema";

export function ContactInfo({
  site,
  location,
}: {
  site: SiteSettings;
  location: WebsiteLocation;
}) {
  const hasPhone = Boolean(site.phone.trim() && site.phoneHref.trim());
  const hasEmail = Boolean(site.email.trim());

  return (
    <div className="grid gap-px border border-frontend-border bg-frontend-border sm:grid-cols-2">
      <InfoCard icon={<MapPin className="size-5" />} label="Morada">
        <p>
          {location.lines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
          {location.city}
        </p>
      </InfoCard>

      {hasPhone ? (
        <InfoCard icon={<Phone className="size-5" />} label="Telefone">
          <a
            href={site.phoneHref}
            className="transition-colors hover:text-frontend-brand"
          >
            {site.phone}
          </a>
        </InfoCard>
      ) : null}

      {hasEmail ? (
        <InfoCard icon={<Mail className="size-5" />} label="Email">
          <a
            href={`mailto:${site.email}`}
            className="break-all transition-colors hover:text-frontend-brand"
          >
            {site.email}
          </a>
        </InfoCard>
      ) : null}

      <InfoCard icon={<Clock className="size-5" />} label="Horário">
        <div className="flex flex-col gap-1">
          {site.schedule.map((slot) => (
            <p key={slot.days}>
              <span className="font-medium text-frontend-heading">{slot.days}</span>{" "}
              <span className="text-frontend-body">{slot.hours}</span>
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
    <div className="flex flex-col gap-4 bg-frontend-card p-8">
      <span className="inline-flex size-12 items-center justify-center bg-frontend-surface text-white">
        {icon}
      </span>
      <h3 className="frontend-small-label text-frontend-brand">
        {label}
      </h3>
      <div className="frontend-copy text-sm text-frontend-heading">{children}</div>
    </div>
  );
}
