import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { QuoteForm } from "@/components/forms/quote-form";
import { getContentIcon } from "@/lib/content/icons";
import {
  getServiceGroups,
  toSiteSettings,
} from "@/lib/content/adapters";
import { getWebsiteContent } from "@/lib/content/website-content";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getWebsiteContent();
  return content.pages.quote.seo;
}

export default async function OrcamentoPage() {
  const { content } = await getWebsiteContent();
  const site = toSiteSettings(content);
  const page = content.pages.quote;
  const { allServices } = getServiceGroups(content);

  return (
    <>
      <PageHero {...page.hero} />

      <section className="bg-background py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <div className="flex flex-col gap-6">
              {page.perks.map((perk) => {
                const Icon = getContentIcon(perk.icon);
                return (
                  <div key={perk.title} className="flex gap-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center bg-primary text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold uppercase tracking-wide text-secondary">
                        {perk.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border border-border bg-muted p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {page.sidebarHeading}
              </p>
              <a
                href={site.phoneHref}
                className="mt-3 block text-2xl font-extrabold text-secondary transition-colors hover:text-primary"
              >
                {site.phone}
              </a>
              <p className="mt-1 text-sm text-muted-foreground">{site.email}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <QuoteForm
              services={allServices.map(({ slug, title }) => ({ slug, title }))}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
