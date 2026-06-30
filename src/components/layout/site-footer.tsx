import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import type { NavItem, Service, SiteSettings } from "@/lib/content/website-types";
import type { WebsiteLocation } from "@/lib/content/website-schema";
import { Logo } from "@/components/layout/logo";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/social";

export function SiteFooter({
  site,
  services,
  companyLinks,
  location,
}: {
  site: SiteSettings;
  services: Service[];
  companyLinks: NavItem[];
  location: WebsiteLocation;
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
    <footer className="bg-frontend-surface-dark text-white/70">
      <div className="mx-auto max-w-(--container-frontend-page) px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo variant="light" />
            <p className="frontend-copy max-w-xs text-sm text-white/60">
              {site.description}
            </p>
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

          <FooterColumn title="Serviços">
            {services.slice(0, 6).map((service) => (
              <FooterLink key={service.slug} href="/servicos">
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Empresa">
            {companyLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contactos">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-frontend-brand" />
              <span>
                {location.lines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < location.lines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </span>
            </li>
            {hasPhone ? (
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 transition-colors duration-150 ease-in-out hover:text-white"
                >
                  <Phone className="size-4 shrink-0 text-frontend-brand" />
                  {site.phone}
                </a>
              </li>
            ) : null}
            {hasEmail ? (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 transition-colors duration-150 ease-in-out hover:text-white"
                >
                  <Mail className="size-4 shrink-0 text-frontend-brand" />
                  {site.email}
                </a>
              </li>
            ) : null}
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Aguicius. Todos os direitos reservados.</p>
          {hasApp ? (
            <a
              href={site.app}
              target="_blank"
              rel="noreferrer"
              className="frontend-small-label transition-colors duration-150 ease-in-out hover:text-white"
            >
              Descarregue a nossa APP
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="frontend-small-label text-white">
        {title}
      </h3>
      <ul className="flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="transition-colors duration-150 ease-in-out hover:text-white hover:underline underline-offset-4"
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
      className="inline-flex size-9 items-center justify-center border border-white/15 text-white/70 transition-colors duration-150 ease-in-out hover:border-frontend-brand hover:bg-frontend-brand hover:text-white"
    >
      {children}
    </a>
  );
}
