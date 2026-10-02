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
            <div className="flex flex-col gap-7">
              {copy.perks.map((perk) => {
                const Icon = getContentIcon(perk.icon);
                return (
                  <div key={perk.title} className="flex gap-4">
                    <span className="frontend-tile">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="frontend-card-title text-lg">
                        {perk.title}
                      </h3>
                      <p className="frontend-copy mt-1 text-[0.9375rem]">{perk.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasContactSidebar ? (
              <div className="rounded-3xl bg-frontend-muted p-8">
                <p className="frontend-eyebrow">
                  {copy.sidebarHeading}
                </p>
                {hasPhone ? (
                  <a
                    href={site.phoneHref}
                    className="frontend-display-heading mt-2 block text-2xl tabular-nums text-frontend-heading transition-colors duration-150 ease-out hover:text-frontend-brand"
                  >
                    {site.phone}
                  </a>
                ) : null}
                {hasEmail ? (
                  <p className="mt-2 text-[0.9375rem] text-frontend-body">{site.email}</p>
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
