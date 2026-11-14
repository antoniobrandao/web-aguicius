import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { footerNav, headerNav } from "@/content/site";
import { getPrimaryLocation, toService, toSiteSettings } from "@/lib/content/adapters";
import { linkOf, listOf, textOf } from "@/lib/content/blocks";
import { boundLocations, boundServices, boundSite, itemLink } from "@/lib/content/bound";
import { getBlocks, getLocations, getServices, getSettings } from "@/lib/content/content";
import type { NavItem } from "@/lib/content/types";

// The field of the block `layout.header` each menu entry takes its label from.
// The entries themselves are this site's routes and stay in src/content/site.ts.
const HEADER_NAV_FIELDS: Record<string, string> = {
  "/": "navHome",
  "/sobre-nos": "navAbout",
  "/servicos": "navServices",
  "/contactos": "navContact",
};

// How many services the footer column holds: the `max` of its bound collection.
const FOOTER_SERVICES_MAX = 6;

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [blocks, settings, services, locations] = await Promise.all([
    getBlocks(),
    getSettings(),
    getServices(),
    getLocations(),
  ]);

  const site = toSiteSettings(settings);

  const navItems: NavItem[] = headerNav.map((item) => {
    if (item.cta) {
      return { ...item, ...linkOf(blocks, "layout.header", "cta", item), field: "cta" };
    }

    const field = HEADER_NAV_FIELDS[item.href];
    return field
      ? { ...item, label: textOf(blocks, "layout.header", field, item.label), field }
      : item;
  });

  // The footer's own links: the block's list when the owner saved one, else the
  // ones in src/content/site.ts. `index` is the position in the saved list.
  const savedCompanyLinks = listOf<unknown>(blocks, "layout.footer", "company", [])
    .map((item, index) => ({ index, link: itemLink(item, "link") }))
    .flatMap(({ index, link }) => (link ? [{ index, link }] : []));
  const companyLinks = savedCompanyLinks.length
    ? savedCompanyLinks
    : footerNav.map(({ label, href }, index) => ({ index, link: { label, href } }));

  // Bound content: what the block serves, else the resource this layout reads.
  const footerServices =
    boundServices(blocks, "layout.footer", "services") ?? services.slice(0, FOOTER_SERVICES_MAX);
  const footerLocations = boundLocations(blocks, "layout.footer", "address");

  return (
    <div className="frontend-theme flex min-h-dvh flex-col bg-frontend-bg text-frontend-body">
      <SiteHeader site={boundSite(site, blocks, "layout.header")} navItems={navItems} />
      <main className="flex-1">{children}</main>
      <SiteFooter
        site={boundSite(site, blocks, "layout.footer")}
        services={footerServices.map(toService)}
        companyLinks={companyLinks}
        location={footerLocations ? footerLocations[0] : getPrimaryLocation(locations)}
        copy={{
          servicesTitle: textOf(blocks, "layout.footer", "servicesTitle", "Serviços"),
          companyTitle: textOf(blocks, "layout.footer", "companyTitle", "Empresa"),
          contactTitle: textOf(blocks, "layout.footer", "contactTitle", "Contactos"),
          rights: textOf(blocks, "layout.footer", "rights", "Todos os direitos reservados."),
          appLabel: textOf(blocks, "layout.footer", "appLabel", "Descarregue a nossa app"),
        }}
      />
    </div>
  );
}
