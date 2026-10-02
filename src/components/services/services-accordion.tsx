import type { Service } from "@/lib/content/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/site/ui/accordion";

export function ServicesAccordion({ services }: { services: Service[] }) {
  return (
    <div className="frontend-card px-7 py-2">
      <Accordion type="single" collapsible defaultValue={services[0]?.slug}>
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <AccordionItem key={service.slug} value={service.slug}>
              <AccordionTrigger>
                <span className="flex items-center gap-4">
                  <Icon className="size-5 shrink-0 text-frontend-brand" />
                  {service.title}
                </span>
              </AccordionTrigger>
              <AccordionContent>{service.description}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
