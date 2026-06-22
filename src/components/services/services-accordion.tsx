import type { Service } from "@/lib/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ServicesAccordion({ services }: { services: Service[] }) {
  return (
    <Accordion type="single" collapsible defaultValue={services[0]?.slug}>
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <AccordionItem key={service.slug} value={service.slug}>
            <AccordionTrigger>
              <span className="flex items-center gap-4">
                <Icon className="size-5 text-primary" />
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
