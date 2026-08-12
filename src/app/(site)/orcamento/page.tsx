import type { Metadata } from "next";

import { QuoteForm } from "@/components/forms/quote-form";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { designCopy } from "@/content/design-copy";
import { pages } from "@/content/site";
import { buildPageMetadata } from "@/lib/content/metadata";
import { getServiceGroups, toServiceOptions, toSiteSettings } from "@/lib/content/adapters";
import { getServices, getSettings } from "@/lib/content/content";
import { getContentIcon } from "@/lib/content/icons";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(pages.quote.seo);
}

export default async function OrcamentoPage() {
  const [settings, services] = await Promise.all([
    getSettings(),
    getServices(),
  ]);

  const site = toSiteSettings(settings);
  const { allServices } = getServiceGroups(services);
  const copy = designCopy.quote;
  const hasPhone = Boolean(site.phone.trim() && site.phoneHref.trim());
  const hasEmail = Boolean(site.email.trim());
  const hasContactSidebar = hasPhone || hasEmail;

  return (
    <>
      <PageHero {...pages.quote.hero} />

      <section className="bg-frontend-bg py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <div className="flex flex-col gap-6">
              {copy.perks.map((perk) => {
                const Icon = getContentIcon(perk.icon);
                return (
                  <div key={perk.title} className="flex gap-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center bg-frontend-brand text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-medium leading-7 tracking-widest text-frontend-heading">
                        {perk.title}
                      </h3>
                      <p className="frontend-copy mt-1 text-sm">{perk.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasContactSidebar ? (
              <div className="frontend-flat-card bg-frontend-muted p-8">
                <p className="frontend-small-label text-frontend-brand">
                  {copy.sidebarHeading}
                </p>
                {hasPhone ? (
                  <a
                    href={site.phoneHref}
                    className="mt-3 block text-2xl font-medium text-frontend-heading transition-colors duration-150 ease-in-out hover:text-frontend-brand"
                  >
                    {site.phone}
                  </a>
                ) : null}
                {hasEmail ? (
                  <p className="mt-1 text-sm text-frontend-body">{site.email}</p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <QuoteForm services={toServiceOptions(allServices)} />
          </div>
        </Container>
      </section>
    </>
  );
}
