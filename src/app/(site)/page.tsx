import { Hero } from "@/components/home/hero";
import { ServicesSection } from "@/components/home/services-section";
import { ReserveCta } from "@/components/home/reserve-cta";
import { InstallationsSection } from "@/components/home/installations-section";
import { MoreServicesSection } from "@/components/home/more-services-section";
import { AboutBand } from "@/components/home/about-band";
import { LocationSection } from "@/components/home/location-section";
import {
  getPrimaryLocation,
  getServiceGroups,
  toSiteSettings,
} from "@/lib/content/adapters";
import { getWebsiteContent } from "@/lib/content/website-content";

export default async function HomePage() {
  const { content } = await getWebsiteContent();
  const site = toSiteSettings(content);
  const { primaryServices, installations, secondaryServices } =
    getServiceGroups(content);
  const primaryLocation = getPrimaryLocation(content);

  return (
    <>
      <Hero site={site} hero={content.pages.home.hero} />
      <ServicesSection
        services={primaryServices}
        intro={content.pages.home.servicesIntro}
      />
      <ReserveCta content={content.pages.home.reserveCta} />
      <InstallationsSection
        service={installations}
        content={content.pages.home.installations}
      />
      <MoreServicesSection
        services={secondaryServices}
        intro={content.pages.home.moreServicesIntro}
      />
      <AboutBand content={content.pages.home.aboutBand} />
      <LocationSection
        site={site}
        location={primaryLocation}
        intro={content.pages.home.locationIntro}
      />
    </>
  );
}
