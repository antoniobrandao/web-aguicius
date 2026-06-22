import { Hero } from "@/components/home/hero";
import { ServicesSection } from "@/components/home/services-section";
import { ReserveCta } from "@/components/home/reserve-cta";
import { InstallationsSection } from "@/components/home/installations-section";
import { MoreServicesSection } from "@/components/home/more-services-section";
import { AboutBand } from "@/components/home/about-band";
import { LocationSection } from "@/components/home/location-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ReserveCta />
      <InstallationsSection />
      <MoreServicesSection />
      <AboutBand />
      <LocationSection />
    </>
  );
}
