import { getContentIcon } from "./icons";
import type { LocationContent, ServiceContent, Settings } from "./resources";
import type { Service, SiteSettings } from "./types";

// Maps Site API content onto the view types the components use.
//
// These functions are honest about absence: a site whose content has not been
// authored yet has no services and no locations, so anything that picks a single
// item returns undefined and callers must handle it.

export function toService(service: ServiceContent): Service {
  return {
    slug: service.slug,
    title: service.title,
    icon: getContentIcon(service.icon),
    image: service.image?.pathname
      ? {
          ...service.image,
          alt: service.image.alt || service.title,
        }
      : undefined,
    short: service.short,
    description: service.description,
    bullets: service.bullets,
  };
}

export function getServiceGroups(services: ServiceContent[]) {
  const featured = services.find((service) => service.tier === "featured") ?? services[0];

  return {
    primaryServices: services.filter((service) => service.tier === "primary").map(toService),
    // Undefined when the site has no services at all.
    featuredService: featured ? toService(featured) : undefined,
    secondaryServices: services.filter((service) => service.tier === "secondary").map(toService),
    allServices: services.map(toService),
  };
}

export function toSiteSettings(settings: Settings): SiteSettings {
  const { appUrl, seo: _seo, ...rest } = settings;
  void _seo;

  return {
    ...rest,
    app: appUrl,
  };
}

export function getPrimaryLocation(
  locations: LocationContent[],
): LocationContent | undefined {
  return locations.find((location) => location.primary) ?? locations[0];
}

export function toServiceOptions(services: Service[]) {
  return services.map(({ slug, title }) => ({ slug, title }));
}
