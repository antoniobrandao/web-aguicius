import type { Service } from "@/lib/content/website-types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/site/ui/accordion";

export function ServicesAccordion({ services }: { services: Service[] }) {
  return (
    <Accordion type="single" collapsible defaultValue={services[0]?.slug}>
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <AccordionItem key={service.slug} value={service.slug}>
            <AccordionTrigger>
              <span className="flex items-center gap-4">
                <Icon className="size-5 text-frontend-brand" />
                {service.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>{service.description}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
