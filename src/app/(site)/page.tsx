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
import { getPrimaryLocation, getServiceGroups, toSiteSettings } from "@/lib/content/adapters";
import { getLocations, getServices, getSettings } from "@/lib/content/content";

export default async function HomePage() {
  const [settings, services, locations] = await Promise.all([
    getSettings(),
    getServices(),
    getLocations(),
  ]);

  const site = toSiteSettings(settings);
  const { primaryServices, featuredService, secondaryServices } = getServiceGroups(services);
  const primaryLocation = getPrimaryLocation(locations);
  const copy = designCopy.home;

  return (
    <>
      <Hero site={site} hero={pages.home.hero} copy={copy} />
      <StatsBar stats={copy.heroStats} />
      {primaryServices.length ? (
        <ServicesSection services={primaryServices} intro={copy.servicesIntro} />
      ) : null}
      <ReserveCta content={copy.reserveCta} />
      {featuredService ? (
        <InstallationsSection service={featuredService} content={copy.installations} />
      ) : null}
      {secondaryServices.length ? (
        <MoreServicesSection services={secondaryServices} intro={copy.moreServicesIntro} />
      ) : null}
      <AboutBand content={copy.aboutBand} />
      {primaryLocation ? (
        <LocationSection site={site} location={primaryLocation} intro={copy.locationIntro} />
      ) : null}
    </>
  );
}
