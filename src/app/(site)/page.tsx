import { AboutBand } from "@/components/home/about-band";
import { Hero } from "@/components/home/hero";
import { InstallationsSection } from "@/components/home/installations-section";
import { LocationSection } from "@/components/home/location-section";
import { MoreServicesSection } from "@/components/home/more-services-section";
import { ReserveCta } from "@/components/home/reserve-cta";
import { ServicesSection } from "@/components/home/services-section";
import { StatsBar } from "@/components/home/stats-bar";
import { designCopy } from "@/content/design-copy";
import { pages } from "@/content/site";
import { getPrimaryLocation, toService, toSiteSettings } from "@/lib/content/adapters";
import { linkOf, listOf, textOf } from "@/lib/content/blocks";
import {
  boundLocations,
  boundServices,
  boundSite,
  introOf,
  itemText,
} from "@/lib/content/bound";
import { getBlocks, getLocations, getServices, getSettings } from "@/lib/content/content";

// Every section is a website block (casadigital.blocks.json). Its copy is the
// block's value when the owner saved one, else the copy in this repository; the
// business content it shows is what the block serves (the documents the owner
// chose for that section), else the resource read here.
export default async function HomePage() {
  const [blocks, settings, services, locations] = await Promise.all([
    getBlocks(),
    getSettings(),
    getServices(),
    getLocations(),
  ]);

  const site = toSiteSettings(settings);
  const copy = designCopy.home;

  // A service's tier decides which section it belongs to, so each section keeps
  // its tier out of the documents chosen for it.
  const primaryServices = (boundServices(blocks, "home.services", "list") ?? services)
    .filter((service) => service.tier === "primary")
    .map(toService);
  const secondaryServices = (boundServices(blocks, "home.more-services", "list") ?? services)
    .filter((service) => service.tier === "secondary")
    .map(toService);
  // The spotlight shows one service: the first featured one, else the first.
  const spotlightServices = boundServices(blocks, "home.installations", "service") ?? services;
  const spotlight =
    spotlightServices.find((service) => service.tier === "featured") ?? spotlightServices[0];
  const servedLocations = boundLocations(blocks, "home.location", "location");
  const primaryLocation = servedLocations ? servedLocations[0] : getPrimaryLocation(locations);

  const stats = listOf<unknown>(blocks, "home.stats", "stats", copy.heroStats)
    .map((item) => ({ value: itemText(item, "value"), label: itemText(item, "label") }));
  const highlights = listOf<unknown>(
    blocks,
    "home.installations",
    "highlights",
    copy.installations.highlights.map((text) => ({ text })),
  ).map((item) => itemText(item, "text"));

  return (
    <>
      <Hero
        site={boundSite(site, blocks, "home.hero")}
        hero={{
          title: textOf(blocks, "home.hero", "title", pages.home.hero.title),
          description: textOf(blocks, "home.hero", "description", pages.home.hero.description),
        }}
        copy={{
          heroHighlight: textOf(blocks, "home.hero", "highlight", copy.heroHighlight),
          heroPrimaryCta: linkOf(blocks, "home.hero", "primaryCta", copy.heroPrimaryCta),
          heroSecondaryCta: linkOf(blocks, "home.hero", "secondaryCta", copy.heroSecondaryCta),
        }}
      />
      <StatsBar stats={stats} />
      {primaryServices.length ? (
        <ServicesSection
          services={primaryServices}
          intro={introOf(blocks, "home.services", copy.servicesIntro)}
          cta={linkOf(blocks, "home.services", "cta", { label: "Reserve já", href: "/orcamento" })}
        />
      ) : null}
      <ReserveCta
        content={{
          title: textOf(blocks, "home.quote", "title", copy.reserveCta.title),
          description: textOf(blocks, "home.quote", "description", copy.reserveCta.description),
          button: linkOf(blocks, "home.quote", "button", copy.reserveCta.button),
        }}
      />
      {spotlight ? (
        <InstallationsSection
          service={toService(spotlight)}
          content={{
            eyebrow: textOf(blocks, "home.installations", "eyebrow", copy.installations.eyebrow),
            title: textOf(blocks, "home.installations", "title", copy.installations.title),
            button: linkOf(blocks, "home.installations", "button", copy.installations.button),
            highlights,
          }}
        />
      ) : null}
      {secondaryServices.length ? (
        <MoreServicesSection
          services={secondaryServices}
          intro={introOf(blocks, "home.more-services", copy.moreServicesIntro)}
          cta={linkOf(blocks, "home.more-services", "cta", { label: "Saber mais", href: "/servicos" })}
        />
      ) : null}
      <AboutBand
        content={{
          statValue: textOf(blocks, "home.about", "statValue", copy.aboutBand.statValue),
          statLabel: textOf(blocks, "home.about", "statLabel", copy.aboutBand.statLabel),
          lead: textOf(blocks, "home.about", "lead", copy.aboutBand.lead),
          body: textOf(blocks, "home.about", "body", copy.aboutBand.body),
          cta: linkOf(blocks, "home.about", "cta", copy.aboutBand.cta),
        }}
      />
      {primaryLocation ? (
        <LocationSection
          site={boundSite(site, blocks, "home.location")}
          location={primaryLocation}
          intro={introOf(blocks, "home.location", copy.locationIntro)}
          mapLabel={textOf(blocks, "home.location", "mapLabel", "Abrir no mapa")}
          cta={linkOf(blocks, "home.location", "cta", { label: "Contactos", href: "/contactos" })}
        />
      ) : null}
    </>
  );
}
