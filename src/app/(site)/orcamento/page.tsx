import type { Metadata } from "next";

import { QuoteForm } from "@/components/forms/quote-form";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { designCopy } from "@/content/design-copy";
import { pages } from "@/content/site";
import { buildPageMetadata } from "@/lib/content/metadata";
import { getServiceGroups, toServiceOptions, toSiteSettings } from "@/lib/content/adapters";
import { blockAttrs, fieldAttrs, itemAttrs, listOf, textOf } from "@/lib/content/blocks";
import { boundSite, introOf, itemText } from "@/lib/content/bound";
import { getBlocks, getServices, getSettings } from "@/lib/content/content";
import { getContentIcon } from "@/lib/content/icons";

export function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(pages.quote.seo);
}

export default async function OrcamentoPage() {
  const [blocks, settings, services] = await Promise.all([
    getBlocks(),
    getSettings(),
    getServices(),
  ]);

  // Bound content: the phone and email the block serves, else the settings read here.
  const site = boundSite(toSiteSettings(settings), blocks, "quote.request");
  const { allServices } = getServiceGroups(services);
  const copy = designCopy.quote;
  const hasPhone = Boolean(site.phone.trim() && site.phoneHref.trim());
  const hasEmail = Boolean(site.email.trim());
  const hasContactSidebar = hasPhone || hasEmail;
  // The perks are the block's list. Their icons belong to the design, by position.
  const perks = listOf<unknown>(blocks, "quote.request", "perks", copy.perks).map((item, index) => ({
    icon: copy.perks[index % copy.perks.length].icon,
    title: itemText(item, "title"),
    description: itemText(item, "description"),
  }));

  return (
    <>
      <PageHero block="quote.hero" {...introOf(blocks, "quote.hero", pages.quote.hero)} />

      <section {...blockAttrs("quote.request")} className="bg-frontend-bg py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <div {...fieldAttrs("perks")} className="flex flex-col gap-7">
              {perks.map((perk, index) => {
                const Icon = getContentIcon(perk.icon);
                return (
                  <div key={index} {...itemAttrs(index)} className="flex gap-4">
                    <span className="frontend-tile">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 {...fieldAttrs("title")} className="frontend-card-title text-lg">
                        {perk.title}
                      </h3>
                      <p {...fieldAttrs("description")} className="frontend-copy mt-1 text-[0.9375rem]">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasContactSidebar ? (
              <div className="rounded-3xl bg-frontend-muted p-8">
                <p {...fieldAttrs("sidebarHeading")} className="frontend-eyebrow">
                  {textOf(blocks, "quote.request", "sidebarHeading", copy.sidebarHeading)}
                </p>
                {hasPhone ? (
                  <a
                    {...fieldAttrs("phone")}
                    href={site.phoneHref}
                    className="frontend-display-heading mt-2 block text-2xl tabular-nums text-frontend-heading transition-colors duration-150 ease-out hover:text-frontend-brand"
                  >
                    {site.phone}
                  </a>
                ) : null}
                {hasEmail ? (
                  <p {...fieldAttrs("email")} className="mt-2 text-[0.9375rem] text-frontend-body">
                    {site.email}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <QuoteForm
              services={toServiceOptions(allServices)}
              submitLabel={textOf(blocks, "quote.request", "submit", copy.form.submitLabel)}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
