import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { fieldAttrs, itemAttrs } from "@/lib/content/blocks";
import type { SiteLocation, SiteSettings } from "@/lib/content/types";

/**
 * The cards of the website block `contact.info`, whose root is the section
 * around them. Each card's title is the block's own text; what it shows is bound
 * business content.
 */
export function ContactInfo({
  site,
  location,
  labels,
}: {
  site: SiteSettings;
  location?: SiteLocation;
  labels: { address: string; phone: string; email: string; schedule: string };
}) {
  const hasPhone = Boolean(site.phone.trim() && site.phoneHref.trim());
  const hasEmail = Boolean(site.email.trim());
  const hasAddress = Boolean(location && (location.lines.length || location.city));
  const hasSchedule = site.schedule.length > 0;

  if (!hasAddress && !hasPhone && !hasEmail && !hasSchedule) {
    return null;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {hasAddress && location ? (
        <InfoCard icon={<MapPin className="size-5" />} label={labels.address} field="addressLabel">
          <div {...fieldAttrs("address")}>
            <p {...itemAttrs(location.slug)}>
              <span {...fieldAttrs("lines")}>
                {location.lines.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </span>
              <span {...fieldAttrs("city")}>{location.city}</span>
            </p>
          </div>
        </InfoCard>
      ) : null}

      {hasPhone ? (
        <InfoCard icon={<Phone className="size-5" />} label={labels.phone} field="phoneLabel">
          <a
            {...fieldAttrs("phone")}
            href={site.phoneHref}
            className="tabular-nums transition-colors duration-150 ease-out hover:text-frontend-brand"
          >
            {site.phone}
          </a>
        </InfoCard>
      ) : null}

      {hasEmail ? (
        <InfoCard icon={<Mail className="size-5" />} label={labels.email} field="emailLabel">
          <a
            {...fieldAttrs("email")}
            href={`mailto:${site.email}`}
            className="break-all transition-colors duration-150 ease-out hover:text-frontend-brand"
          >
            {site.email}
          </a>
        </InfoCard>
      ) : null}

      {hasSchedule ? (
        <InfoCard icon={<Clock className="size-5" />} label={labels.schedule} field="scheduleLabel">
          <div {...fieldAttrs("schedule")} className="flex flex-col gap-1">
            {site.schedule.map((slot, index) => (
              <p key={index}>
                <span className="font-medium text-frontend-heading">{slot.days}</span>{" "}
                <span className="font-normal text-frontend-body">{slot.hours}</span>
              </p>
            ))}
          </div>
        </InfoCard>
      ) : null}
    </div>
  );
}

function InfoCard({
  icon,
  label,
  field,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  field: string;
  children: React.ReactNode;
}) {
  return (
    <div className="frontend-card flex flex-col gap-3 p-7">
      <span className="frontend-tile mb-1">{icon}</span>
      <h3 {...fieldAttrs(field)} className="text-sm font-medium text-frontend-body">
        {label}
      </h3>
      <div className="font-medium leading-relaxed text-frontend-heading">{children}</div>
    </div>
  );
}
