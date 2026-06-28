import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  getServiceGroups,
  toNavItems,
  toSiteSettings,
} from "@/lib/content/adapters";
import { getWebsiteContent } from "@/lib/content/website-content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { content } = await getWebsiteContent();
  const site = toSiteSettings(content);
  const navItems = toNavItems(content);
  const { allServices } = getServiceGroups(content);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader site={site} navItems={navItems} />
      <main className="flex-1">{children}</main>
      <SiteFooter
        site={site}
        services={allServices}
        companyLinks={content.navigation.footerCompany}
      />
    </div>
  );
}
