import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import { blockAttrs, fieldAttrs, itemAttrs } from "@/lib/content/blocks";
import type { Cta, Service, SiteLocation, SiteSettings } from "@/lib/content/types";
import { Logo } from "@/components/layout/logo";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/social";

/**
 * The website block `layout.footer`. `companyLinks` are the items of its
 * `company` list, each with its position in the saved list; `services` and
 * `location` are its bound collections.
 */
export function SiteFooter({
  site,
  services,
  companyLinks,
  location,
  copy,
}: {
  site: SiteSettings;
  services: Service[];
  companyLinks: { index: number; link: Cta }[];
  location?: SiteLocation;
  copy: {
    servicesTitle: string;
    companyTitle: string;
    contactTitle: string;
    rights: string;
    appLabel: string;
  };
}) {
  const hasPhone = Boolean(site.phone.trim() && site.phoneHref.trim());
  const hasEmail = Boolean(site.email.trim());
  const hasApp = Boolean(site.app.trim());
  const socialLinks = [
    {
      href: site.social.facebook,
      label: "Facebook",
      icon: <FacebookIcon className="size-4" />,
    },
    {
      href: site.social.instagram,
      label: "Instagram",
      icon: <InstagramIcon className="size-4" />,
    },
    {
      href: site.social.youtube,
      label: "YouTube",
      icon: <YoutubeIcon className="size-4" />,
    },
  ].filter((link) => link.href.trim());

  return (
    <footer {...blockAttrs("layout.footer")} className="bg-frontend-muted text-frontend-body">
      <div className="frontend-road" aria-hidden />
      <div className="mx-auto max-w-(--container-frontend-page) px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo name={site.name} />
            <p {...fieldAttrs("description")} className="frontend-copy max-w-xs text-[0.9375rem]">
              {site.description}
            </p>
            {/* The settings `facebook`, `instagram` and `youtube` are link targets
                under an icon, so they are unmarked: the preview would type the URL
                over the icon. They are edited in the block's form. */}
            {socialLinks.length > 0 ? (
              <div className="flex gap-3 pt-1">
                {socialLinks.map((link) => (
                  <SocialLink key={link.label} href={link.href} label={link.label}>
                    {link.icon}
                  </SocialLink>
                ))}
              </div>
            ) : null}
          </div>

          <FooterColumn title={copy.servicesTitle} titleField="servicesTitle" listField="services">
            {services.map((service) => (
              <FooterLink key={service.slug} item={service.slug} field="title" href="/servicos">
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={copy.companyTitle} titleField="companyTitle" listField="company">
            {companyLinks.map(({ index, link }) => (
              <FooterLink key={index} item={index} field="link" href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={copy.contactTitle} titleField="contactTitle">
            {location?.lines.length ? (
              <li {...fieldAttrs("address")} className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-frontend-brand" />
                <span {...itemAttrs(location.slug)}>
                  <span {...fieldAttrs("lines")}>
                    {location.lines.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < location.lines.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </span>
                </span>
              </li>
            ) : null}
            {hasPhone ? (
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 transition-colors duration-150 ease-out hover:text-frontend-brand"
                >
                  <Phone className="size-4 shrink-0 text-frontend-brand" />
                  <span {...fieldAttrs("phone")}>{site.phone}</span>
                </a>
              </li>
            ) : null}
            {hasEmail ? (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 transition-colors duration-150 ease-out hover:text-frontend-brand"
                >
                  <Mail className="size-4 shrink-0 text-frontend-brand" />
                  <span {...fieldAttrs("email")}>{site.email}</span>
                </a>
              </li>
            ) : null}
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-frontend-border pt-8 text-sm sm:flex-row">
          <p>
            © {new Date().getFullYear()} <span {...fieldAttrs("name")}>{site.name}</span>.{" "}
            <span {...fieldAttrs("rights")}>{copy.rights}</span>
          </p>
          {/* The setting `app` is this link's target and is unmarked; its text is
              the block's own `appLabel`. */}
          {hasApp ? (
            <a
              {...fieldAttrs("appLabel")}
              href={site.app}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-frontend-heading transition-colors duration-150 ease-out hover:text-frontend-brand"
            >
              {copy.appLabel}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  titleField,
  listField,
  children,
}: {
  title: string;
  /** The block field the column title shows. */
  titleField: string;
  /** The list or collection field the column's rows are the items of, if they are. */
  listField?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 {...fieldAttrs(titleField)} className="frontend-small-label text-frontend-heading">
        {title}
      </h3>
      <ul {...(listField ? fieldAttrs(listField) : {})} className="flex flex-col gap-3 text-[0.9375rem]">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({
  href,
  item,
  field,
  children,
}: {
  href: string;
  /** The row's place in its list (a position) or collection (a slug). */
  item: string | number;
  /** The item field or document property the link shows. */
  field: string;
  children: React.ReactNode;
}) {
  return (
    <li {...itemAttrs(item)}>
      <Link
        {...fieldAttrs(field)}
        href={href}
        className="transition-colors duration-150 ease-out hover:text-frontend-brand"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-full bg-frontend-bg text-frontend-heading shadow-frontend-card transition-colors duration-150 ease-out hover:bg-frontend-brand hover:text-white"
    >
      {children}
    </a>
  );
}
