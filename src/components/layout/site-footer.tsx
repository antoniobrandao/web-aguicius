import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import { site, allServices } from "@/lib/site";
import { Logo } from "@/components/layout/logo";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/social";

const companyLinks = [
  { label: "Quem somos", href: "/sobre-nos" },
  { label: "Contactos", href: "/contactos" },
  { label: "Termos e condições", href: "/termos" },
  { label: "Política de privacidade", href: "/privacidade" },
];

export function SiteFooter() {
  return (
    <footer className="bg-surface-darker text-white/70">
      <div className="mx-auto max-w-(--container-page) px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo variant="light" />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
            <div className="flex gap-3 pt-1">
              <SocialLink href={site.social.facebook} label="Facebook">
                <FacebookIcon className="size-4" />
              </SocialLink>
              <SocialLink href={site.social.instagram} label="Instagram">
                <InstagramIcon className="size-4" />
              </SocialLink>
              <SocialLink href={site.social.youtube} label="YouTube">
                <YoutubeIcon className="size-4" />
              </SocialLink>
            </div>
          </div>

          <FooterColumn title="Serviços">
            {allServices.slice(0, 6).map((service) => (
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
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {site.address.street}
                <br />
                {site.address.zip}
              </span>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0 text-primary" />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-primary" />
                {site.email}
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Aguicius. Todos os direitos reservados.</p>
          <a
            href={site.app}
            target="_blank"
            rel="noreferrer"
            className="uppercase tracking-[0.18em] transition-colors hover:text-white"
          >
            Descarregue a nossa APP
          </a>
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
      <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white">
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
        className="transition-colors hover:text-white hover:underline underline-offset-4"
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
      className="inline-flex size-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-primary hover:bg-primary hover:text-white"
    >
      {children}
    </a>
  );
}
