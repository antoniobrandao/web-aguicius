import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getPrimaryLocation, getServiceGroups, toSiteSettings } from "@/lib/content/adapters";
import { getLocations, getNavigation, getServices, getSettings } from "@/lib/content/content";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, navigation, services, locations] = await Promise.all([
    getSettings(),
    getNavigation(),
    getServices(),
    getLocations(),
  ]);

  const site = toSiteSettings(settings);
  const { allServices } = getServiceGroups(services);

  return (
    <div className="frontend-theme flex min-h-dvh flex-col bg-frontend-bg text-frontend-body">
      <SiteHeader site={site} navItems={navigation.header} />
      <main className="flex-1">{children}</main>
      <SiteFooter
        site={site}
        services={allServices}
        companyLinks={navigation.footerCompany}
        location={getPrimaryLocation(locations)}
      />
    </div>
  );
}
