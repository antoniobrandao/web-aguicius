import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import type {
  NavItem,
  Service,
  SiteLocation,
  SiteSettings,
} from "@/lib/content/types";
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
  location?: SiteLocation;
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
    <footer className="bg-frontend-muted text-frontend-body">
      <div className="frontend-road" aria-hidden />
      <div className="mx-auto max-w-(--container-frontend-page) px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo name={site.name} />
            <p className="frontend-copy max-w-xs text-[0.9375rem]">
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
            {location?.lines.length ? (
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-frontend-brand" />
                <span>
                  {location.lines.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < location.lines.length - 1 ? <br /> : null}
                    </span>
                  ))}
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
                  {site.phone}
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
                  {site.email}
                </a>
              </li>
            ) : null}
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-frontend-border pt-8 text-sm sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          {hasApp ? (
            <a
              href={site.app}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-frontend-heading transition-colors duration-150 ease-out hover:text-frontend-brand"
            >
              Descarregue a nossa app
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
      <h3 className="frontend-small-label text-frontend-heading">{title}</h3>
      <ul className="flex flex-col gap-3 text-[0.9375rem]">{children}</ul>
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
