import { fieldAttrs, itemAttrs } from "@/lib/content/blocks";
import type { Service } from "@/lib/content/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/site/ui/accordion";

/** The bound collection of the block `services.more`: one row per service, marked by its slug. */
export function ServicesAccordion({ services }: { services: Service[] }) {
  return (
    <div {...fieldAttrs("list")} className="frontend-card px-7 py-2">
      <Accordion type="single" collapsible defaultValue={services[0]?.slug}>
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <AccordionItem key={service.slug} value={service.slug} {...itemAttrs(service.slug)}>
              <AccordionTrigger>
                <span className="flex items-center gap-4">
                  <Icon {...fieldAttrs("icon")} className="size-5 shrink-0 text-frontend-brand" />
                  <span {...fieldAttrs("title")}>{service.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <span {...fieldAttrs("description")}>{service.description}</span>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
