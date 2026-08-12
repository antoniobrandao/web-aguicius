import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { footerNav, headerNav } from "@/content/site";
import { getPrimaryLocation, getServiceGroups, toSiteSettings } from "@/lib/content/adapters";
import { getLocations, getServices, getSettings } from "@/lib/content/content";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, services, locations] = await Promise.all([
    getSettings(),
    getServices(),
    getLocations(),
  ]);

  const site = toSiteSettings(settings);
  const { allServices } = getServiceGroups(services);

  return (
    <div className="frontend-theme flex min-h-dvh flex-col bg-frontend-bg text-frontend-body">
      <SiteHeader site={site} navItems={headerNav} />
      <main className="flex-1">{children}</main>
      <SiteFooter
        site={site}
        services={allServices}
        companyLinks={footerNav}
        location={getPrimaryLocation(locations)}
      />
    </div>
  );
}
