import type { NavItem, Service, SiteSettings } from "@/lib/content/website-types";

import { getContentIcon } from "./icons";
import type {
  WebsiteContent,
  WebsiteLocation,
  WebsiteService,
} from "./website-schema";

export function toService(service: WebsiteService): Service {
  return {
    slug: service.slug,
    title: service.title,
    icon: getContentIcon(service.icon),
    image: service.image,
    short: service.short,
    description: service.description,
    bullets: service.bullets,
  };
}

export function getServiceGroups(content: WebsiteContent) {
  const primaryServices = content.services
    .filter((service) => service.tier === "primary")
    .map(toService);
  const installations =
    content.services.find((service) => service.tier === "featured") ??
    content.services[0];
  const secondaryServices = content.services
    .filter((service) => service.tier === "secondary")
    .map(toService);

  return {
    primaryServices,
    installations: toService(installations),
    secondaryServices,
    allServices: content.services.map(toService),
  };
}

export function toSiteSettings(content: WebsiteContent): SiteSettings {
  return {
    name: content.site.name,
    tagline: content.site.tagline,
    description: content.site.description,
    phone: content.site.phone,
    phoneHref: content.site.phoneHref,
    email: content.site.email,
    whatsapp: content.site.whatsapp,
    schedule: content.site.schedule,
    social: content.site.social,
    app: content.site.appUrl,
  };
}

export function toNavItems(content: WebsiteContent): NavItem[] {
  return content.navigation.header;
}

export function getPrimaryLocation(content: WebsiteContent): WebsiteLocation {
  return (
    content.locations.find((location) => location.primary) ??
    content.locations[0]
  );
}
