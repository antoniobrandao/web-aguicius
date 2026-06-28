"use client";

import Link from "next/link";
import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  Check,
  ChevronsUpDown,
  FileText,
  Layers,
  MapPin,
  Plus,
  Settings,
  Sparkles,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import {
  saveBackofficeContent,
  uploadServiceImage,
} from "@/app/backoffice/actions";
import { useBackofficeSave } from "@/components/backoffice/save-context";
import { RichTextField } from "@/components/backoffice/rich-text-field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  contentIconOptions,
  getContentIcon,
  type ContentIconName,
} from "@/lib/content/icons";
import { cn } from "@/lib/utils";
import type {
  WebsiteContent,
  WebsiteLocation,
  WebsiteService,
  WebsiteValue,
} from "@/lib/content/website-schema";

type ContentSource = "mongo" | "default";
type BackofficeSection = "painel" | "servicos" | "paginas" | "definicoes";
type Pages = WebsiteContent["pages"];
type SiteSettings = WebsiteContent["site"];
type Navigation = WebsiteContent["navigation"];
type LinkItem = Navigation["header"][number];
type Cta = { label: string; href: string };
type Hero = { eyebrow: string; title: string; description: string };
type Seo = { title: string; description: string };
type PageSectionIntro = { eyebrow: string; title: string; description: string };

const tierLabels = {
  primary: "Principal",
  featured: "Destaque",
  secondary: "Complementar",
} as const;

const sectionMeta: Record<
  BackofficeSection,
  { title: string; description: string }
> = {
  painel: {
    title: "Painel",
    description: "Visão geral dos conteúdos do website.",
  },
  servicos: {
    title: "Serviços",
    description: "Conteúdos repetíveis com ícone, categoria, imagem e descrição.",
  },
  paginas: {
    title: "Páginas",
    description: "Textos, heros e secções de cada página do website.",
  },
  definicoes: {
    title: "Definições",
    description: "Marca, contactos, navegação, localizações e valores.",
  },
};

export function BackofficeEditor({
  initialContent,
  source,
  section = "painel",
}: {
  initialContent: WebsiteContent;
  source: ContentSource;
  section?: BackofficeSection;
}) {
  const [content, setContent] = useState(initialContent);
  const [savedContent, setSavedContent] = useState(initialContent);
  const [isDirty, setIsDirty] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { setSaveState } = useBackofficeSave();

  const meta = sectionMeta[section];

  const counts = useMemo(
    () => ({
      services: content.services.length,
      pages: Object.keys(content.pages).length,
      locations: content.locations.length,
      values: content.values.length,
    }),
    [content],
  );

  function updateService(slug: string, next: Partial<WebsiteService>) {
    setIsDirty(true);
    setContent((current) => ({
      ...current,
      services: current.services.map((service) =>
        service.slug === slug ? { ...service, ...next } : service,
      ),
    }));
  }

  function updateSite(site: SiteSettings) {
    setIsDirty(true);
    setContent((current) => ({ ...current, site }));
  }

  function updateNavigation(navigation: Navigation) {
    setIsDirty(true);
    setContent((current) => ({ ...current, navigation }));
  }

  function updatePages(pages: Pages) {
    setIsDirty(true);
    setContent((current) => ({ ...current, pages }));
  }

  function updateLocations(locations: WebsiteLocation[]) {
    setIsDirty(true);
    setContent((current) => ({ ...current, locations }));
  }

  function updateValues(values: WebsiteValue[]) {
    setIsDirty(true);
    setContent((current) => ({ ...current, values }));
  }

  const save = useCallback(() => {
    startTransition(async () => {
      const result = await saveBackofficeContent(content);
      if (!result.ok) {
        toast.error("Não foi possível gravar", {
          description: result.error,
        });
        return;
      }
      setContent(result.data);
      setSavedContent(result.data);
      setIsDirty(false);
      toast.success("Conteúdo gravado com sucesso.");
    });
  }, [content]);

  const revert = useCallback(() => {
    setContent(savedContent);
    setIsDirty(false);
    toast.message("Alterações revertidas.");
  }, [savedContent]);

  useEffect(() => {
    setSaveState({ isDirty, isPending, onSave: save, onRevert: revert });

    return () => {
      setSaveState({
        isDirty: false,
        isPending: false,
        onSave: null,
        onRevert: null,
      });
    };
  }, [isDirty, isPending, revert, save, setSaveState]);

  function addService() {
    const slug = `novo-servico-${content.services.length + 1}`;
    setIsDirty(true);
    setContent((current) => ({
      ...current,
      services: [
        ...current.services,
        {
          slug,
          title: "Novo serviço",
          icon: "truck",
          image: { alt: "Novo serviço Aguicius" },
          tier: "secondary",
          short: "Resumo do serviço.",
          description: "Descrição do serviço.",
        },
      ],
    }));
  }

  function removeService(slug: string) {
    setIsDirty(true);
    setContent((current) => ({
      ...current,
      services: current.services.filter((service) => service.slug !== slug),
    }));
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">{meta.title}</h1>
        <p className="text-sm text-muted-foreground">{meta.description}</p>
      </div>

      {section === "painel" ? (
        <DashboardSection counts={counts} source={source} />
      ) : null}

      {section === "servicos" ? (
        <ServicesSection
          services={content.services}
          onAdd={addService}
          onChange={updateService}
          onRemove={removeService}
        />
      ) : null}

      {section === "paginas" ? (
        <PagesFields pages={content.pages} onChange={updatePages} />
      ) : null}

      {section === "definicoes" ? (
        <DefinicoesSection
          content={content}
          onSite={updateSite}
          onNavigation={updateNavigation}
          onLocations={updateLocations}
          onValues={updateValues}
        />
      ) : null}

    </div>
  );
}

const dashboardCards = [
  {
    key: "services" as const,
    title: "Serviços",
    href: "/backoffice/servicos",
    icon: Layers,
  },
  {
    key: "pages" as const,
    title: "Páginas",
    href: "/backoffice/paginas",
    icon: FileText,
  },
  {
    key: "locations" as const,
    title: "Localizações",
    href: "/backoffice/definicoes",
    icon: MapPin,
  },
  {
    key: "values" as const,
    title: "Valores",
    href: "/backoffice/definicoes",
    icon: Sparkles,
  },
];

function DashboardSection({
  counts,
  source,
}: {
  counts: { services: number; pages: number; locations: number; values: number };
  source: ContentSource;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group border bg-card p-4 transition-colors hover:border-primary"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center bg-muted text-muted-foreground transition-colors group-hover:text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="text-2xl font-semibold tabular-nums">
                  {counts[card.key]}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium">{card.title}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Origem dos conteúdos:</span>
        <Badge variant="outline" className="font-normal">
          {source === "mongo" ? "MongoDB" : "Default local"}
        </Badge>
      </div>
    </div>
  );
}

function ServicesSection({
  services,
  onAdd,
  onChange,
  onRemove,
}: {
  services: WebsiteService[];
  onAdd: () => void;
  onChange: (slug: string, next: Partial<WebsiteService>) => void;
  onRemove: (slug: string) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Serviços</CardTitle>
          <CardDescription>
            {services.length} {services.length === 1 ? "serviço" : "serviços"} — expanda para editar.
          </CardDescription>
        </div>
        <Button type="button" variant="outline" onClick={onAdd}>
          <Plus data-icon="inline-start" />
          Adicionar serviço
        </Button>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="flex flex-col">
          {services.map((service) => (
            <AccordionItem
              key={service.slug}
              value={service.slug}
              className="last:border-b-0"
            >
              <AccordionTrigger className="gap-3">
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    {createElement(getContentIcon(service.icon), {
                      className: "size-4",
                    })}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate">{service.title}</span>
                    <span className="truncate text-xs font-normal text-muted-foreground">
                      {service.slug}
                    </span>
                  </span>
                </span>
                <Badge
                  variant="outline"
                  className="ml-auto mr-1 font-normal text-muted-foreground"
                >
                  {tierLabels[service.tier]}
                </Badge>
              </AccordionTrigger>
              <AccordionContent className="text-foreground">
                <ServiceEditor
                  service={service}
                  onChange={(next) => onChange(service.slug, next)}
                  onRemove={() => onRemove(service.slug)}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

function DefinicoesSection({
  content,
  onSite,
  onNavigation,
  onLocations,
  onValues,
}: {
  content: WebsiteContent;
  onSite: (site: SiteSettings) => void;
  onNavigation: (navigation: Navigation) => void;
  onLocations: (locations: WebsiteLocation[]) => void;
  onValues: (values: WebsiteValue[]) => void;
}) {
  return (
    <Tabs defaultValue="geral" className="gap-5">
      <TabsList variant="line" className="flex-wrap">
        <TabsTrigger value="geral">
          <Settings />
          Geral
        </TabsTrigger>
        <TabsTrigger value="navegacao">
          <FileText />
          Navegação
        </TabsTrigger>
        <TabsTrigger value="localizacoes">
          <MapPin />
          Localizações
        </TabsTrigger>
        <TabsTrigger value="valores">
          <Sparkles />
          Valores
        </TabsTrigger>
      </TabsList>
      <TabsContent value="geral">
        <SiteSettingsFields site={content.site} onChange={onSite} />
      </TabsContent>
      <TabsContent value="navegacao">
        <NavigationFields
          navigation={content.navigation}
          onChange={onNavigation}
        />
      </TabsContent>
      <TabsContent value="localizacoes">
        <LocationsFields
          locations={content.locations}
          onChange={onLocations}
        />
      </TabsContent>
      <TabsContent value="valores">
        <ValuesFields values={content.values} onChange={onValues} />
      </TabsContent>
    </Tabs>
  );
}

function PagesFields({
  pages,
  onChange,
}: {
  pages: Pages;
  onChange: (pages: Pages) => void;
}) {
  function update<K extends keyof Pages>(key: K, value: Pages[K]) {
    onChange({ ...pages, [key]: value });
  }

  return (
    <Tabs defaultValue="home" className="gap-5">
      <TabsList variant="line" className="flex-wrap">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="about">Sobre Nós</TabsTrigger>
        <TabsTrigger value="services">Serviços</TabsTrigger>
        <TabsTrigger value="contact">Contactos</TabsTrigger>
        <TabsTrigger value="quote">Orçamento</TabsTrigger>
        <TabsTrigger value="terms">Termos</TabsTrigger>
        <TabsTrigger value="privacy">Privacidade</TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <HomePageFields
          page={pages.home}
          onChange={(home) => update("home", home)}
        />
      </TabsContent>
      <TabsContent value="about">
        <AboutPageFields
          page={pages.about}
          onChange={(about) => update("about", about)}
        />
      </TabsContent>
      <TabsContent value="services">
        <ServicesPageFields
          page={pages.services}
          onChange={(services) => update("services", services)}
        />
      </TabsContent>
      <TabsContent value="contact">
        <ContactPageFields
          page={pages.contact}
          onChange={(contact) => update("contact", contact)}
        />
      </TabsContent>
      <TabsContent value="quote">
        <QuotePageFields
          page={pages.quote}
          onChange={(quote) => update("quote", quote)}
        />
      </TabsContent>
      <TabsContent value="terms">
        <LegalPageFields
          title="Termos e Condições"
          page={pages.terms}
          onChange={(terms) => update("terms", terms)}
        />
      </TabsContent>
      <TabsContent value="privacy">
        <LegalPageFields
          title="Política de Privacidade"
          page={pages.privacy}
          onChange={(privacy) => update("privacy", privacy)}
        />
      </TabsContent>
    </Tabs>
  );
}

function HomePageFields({
  page,
  onChange,
}: {
  page: Pages["home"];
  onChange: (page: Pages["home"]) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Home</CardTitle>
        <CardDescription>
          Hero, CTAs, estatísticas e blocos da página inicial.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <SectionCard title="Hero">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Eyebrow"
              value={page.hero.eyebrow ?? ""}
              onChange={(eyebrow) =>
                onChange({ ...page, hero: { ...page.hero, eyebrow } })
              }
            />
            <TextField
              label="Destaque"
              value={page.hero.highlight}
              onChange={(highlight) =>
                onChange({ ...page, hero: { ...page.hero, highlight } })
              }
            />
          </div>
          <TextField
            label="Título"
            value={page.hero.title}
            onChange={(title) =>
              onChange({ ...page, hero: { ...page.hero, title } })
            }
          />
          <TextAreaField
            label="Descrição"
            value={page.hero.description}
            onChange={(description) =>
              onChange({ ...page, hero: { ...page.hero, description } })
            }
          />
          <div className="grid gap-4 md:grid-cols-2">
            <CtaFields
              title="CTA principal"
              cta={page.hero.primaryCta}
              onChange={(primaryCta) =>
                onChange({ ...page, hero: { ...page.hero, primaryCta } })
              }
            />
            <CtaFields
              title="CTA secundário"
              cta={page.hero.secondaryCta}
              onChange={(secondaryCta) =>
                onChange({ ...page, hero: { ...page.hero, secondaryCta } })
              }
            />
          </div>
          <StatsFields
            stats={page.hero.stats}
            onChange={(stats) =>
              onChange({ ...page, hero: { ...page.hero, stats } })
            }
          />
        </SectionCard>

        <IntroFields
          title="Introdução aos serviços"
          intro={page.servicesIntro}
          onChange={(servicesIntro) => onChange({ ...page, servicesIntro })}
        />

        <SectionCard title="CTA de reserva">
          <TextField
            label="Título"
            value={page.reserveCta.title}
            onChange={(title) =>
              onChange({ ...page, reserveCta: { ...page.reserveCta, title } })
            }
          />
          <TextAreaField
            label="Descrição"
            value={page.reserveCta.description}
            onChange={(description) =>
              onChange({
                ...page,
                reserveCta: { ...page.reserveCta, description },
              })
            }
          />
          <CtaFields
            title="Botão"
            cta={page.reserveCta.button}
            onChange={(button) =>
              onChange({ ...page, reserveCta: { ...page.reserveCta, button } })
            }
          />
        </SectionCard>

        <SectionCard title="Instalações">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Eyebrow"
              value={page.installations.eyebrow}
              onChange={(eyebrow) =>
                onChange({
                  ...page,
                  installations: { ...page.installations, eyebrow },
                })
              }
            />
            <TextField
              label="Título"
              value={page.installations.title}
              onChange={(title) =>
                onChange({
                  ...page,
                  installations: { ...page.installations, title },
                })
              }
            />
          </div>
          <CtaFields
            title="Botão"
            cta={page.installations.button}
            onChange={(button) =>
              onChange({
                ...page,
                installations: { ...page.installations, button },
              })
            }
          />
          <StringListField
            label="Destaques"
            items={page.installations.highlights}
            itemLabel="Destaque"
            onChange={(highlights) =>
              onChange({
                ...page,
                installations: { ...page.installations, highlights },
              })
            }
          />
        </SectionCard>

        <IntroFields
          title="Mais serviços"
          intro={page.moreServicesIntro}
          onChange={(moreServicesIntro) =>
            onChange({ ...page, moreServicesIntro })
          }
        />

        <SectionCard title="Faixa Sobre Nós">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Valor estatístico"
              value={page.aboutBand.statValue}
              onChange={(statValue) =>
                onChange({ ...page, aboutBand: { ...page.aboutBand, statValue } })
              }
            />
            <TextField
              label="Legenda estatística"
              value={page.aboutBand.statLabel}
              onChange={(statLabel) =>
                onChange({ ...page, aboutBand: { ...page.aboutBand, statLabel } })
              }
            />
          </div>
          <TextAreaField
            label="Lead"
            value={page.aboutBand.lead}
            onChange={(lead) =>
              onChange({ ...page, aboutBand: { ...page.aboutBand, lead } })
            }
          />
          <TextAreaField
            label="Corpo"
            value={page.aboutBand.body}
            onChange={(body) =>
              onChange({ ...page, aboutBand: { ...page.aboutBand, body } })
            }
          />
          <CtaFields
            title="CTA"
            cta={page.aboutBand.cta}
            onChange={(cta) =>
              onChange({ ...page, aboutBand: { ...page.aboutBand, cta } })
            }
          />
        </SectionCard>

        <IntroFields
          title="Localização"
          intro={page.locationIntro}
          onChange={(locationIntro) => onChange({ ...page, locationIntro })}
        />
      </CardContent>
    </Card>
  );
}

function AboutPageFields({
  page,
  onChange,
}: {
  page: Pages["about"];
  onChange: (page: Pages["about"]) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sobre Nós</CardTitle>
        <CardDescription>SEO, hero, história, locais e valores.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <SeoFields
          seo={page.seo}
          onChange={(seo) => onChange({ ...page, seo })}
        />
        <HeroFields
          title="Hero"
          hero={page.hero}
          onChange={(hero) => onChange({ ...page, hero })}
        />
        <SectionCard title="História">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Eyebrow"
              value={page.story.eyebrow}
              onChange={(eyebrow) =>
                onChange({ ...page, story: { ...page.story, eyebrow } })
              }
            />
            <TextField
              label="Título"
              value={page.story.title}
              onChange={(title) =>
                onChange({ ...page, story: { ...page.story, title } })
              }
            />
          </div>
          <RichTextField
            label="Texto"
            value={page.story.body}
            onChange={(body) =>
              onChange({ ...page, story: { ...page.story, body } })
            }
          />
        </SectionCard>
        <IntroFields
          title="Localizações"
          intro={page.locationsIntro}
          onChange={(locationsIntro) => onChange({ ...page, locationsIntro })}
        />
        <SectionCard title="Valores">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Eyebrow"
              value={page.valuesIntro.eyebrow}
              onChange={(eyebrow) =>
                onChange({
                  ...page,
                  valuesIntro: { ...page.valuesIntro, eyebrow },
                })
              }
            />
            <TextField
              label="Título"
              value={page.valuesIntro.title}
              onChange={(title) =>
                onChange({ ...page, valuesIntro: { ...page.valuesIntro, title } })
              }
            />
          </div>
        </SectionCard>
        <CtaBandFields
          title="CTA"
          ctaBand={page.ctaBand}
          onChange={(ctaBand) => onChange({ ...page, ctaBand })}
        />
      </CardContent>
    </Card>
  );
}

function ServicesPageFields({
  page,
  onChange,
}: {
  page: Pages["services"];
  onChange: (page: Pages["services"]) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Página Serviços</CardTitle>
        <CardDescription>SEO, hero, introdução e CTA final.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <SeoFields
          seo={page.seo}
          onChange={(seo) => onChange({ ...page, seo })}
        />
        <HeroFields
          title="Hero"
          hero={page.hero}
          onChange={(hero) => onChange({ ...page, hero })}
        />
        <IntroFields
          title="Introdução de soluções complementares"
          intro={page.secondaryIntro}
          onChange={(secondaryIntro) => onChange({ ...page, secondaryIntro })}
        />
        <CtaBandFields
          title="CTA"
          ctaBand={page.ctaBand}
          onChange={(ctaBand) => onChange({ ...page, ctaBand })}
        />
      </CardContent>
    </Card>
  );
}

function ContactPageFields({
  page,
  onChange,
}: {
  page: Pages["contact"];
  onChange: (page: Pages["contact"]) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Página Contactos</CardTitle>
        <CardDescription>SEO, hero e texto introdutório do formulário.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <SeoFields
          seo={page.seo}
          onChange={(seo) => onChange({ ...page, seo })}
        />
        <HeroFields
          title="Hero"
          hero={page.hero}
          onChange={(hero) => onChange({ ...page, hero })}
        />
        <IntroFields
          title="Introdução do formulário"
          intro={page.formIntro}
          onChange={(formIntro) => onChange({ ...page, formIntro })}
        />
      </CardContent>
    </Card>
  );
}

function QuotePageFields({
  page,
  onChange,
}: {
  page: Pages["quote"];
  onChange: (page: Pages["quote"]) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Página Orçamento</CardTitle>
        <CardDescription>SEO, hero, vantagens e bloco lateral.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <SeoFields
          seo={page.seo}
          onChange={(seo) => onChange({ ...page, seo })}
        />
        <HeroFields
          title="Hero"
          hero={page.hero}
          onChange={(hero) => onChange({ ...page, hero })}
        />
        <PerksFields
          perks={page.perks}
          onChange={(perks) => onChange({ ...page, perks })}
        />
        <TextField
          label="Título do bloco lateral"
          value={page.sidebarHeading}
          onChange={(sidebarHeading) => onChange({ ...page, sidebarHeading })}
        />
      </CardContent>
    </Card>
  );
}

function LegalPageFields({
  title,
  page,
  onChange,
}: {
  title: string;
  page: Pages["terms"];
  onChange: (page: Pages["terms"]) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>SEO, hero e secções legais.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <SeoFields
          seo={page.seo}
          onChange={(seo) => onChange({ ...page, seo })}
        />
        <HeroFields
          title="Hero"
          hero={page.hero}
          onChange={(hero) => onChange({ ...page, hero })}
        />
        <LegalSectionsFields
          sections={page.sections}
          onChange={(sections) => onChange({ ...page, sections })}
        />
      </CardContent>
    </Card>
  );
}

function SiteSettingsFields({
  site,
  onChange,
}: {
  site: SiteSettings;
  onChange: (site: SiteSettings) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Definições gerais</CardTitle>
        <CardDescription>Marca, contactos, morada, horários, redes e SEO.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <SectionCard title="Marca">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Nome"
              value={site.name}
              onChange={(name) => onChange({ ...site, name })}
            />
            <TextField
              label="Tagline"
              value={site.tagline}
              onChange={(tagline) => onChange({ ...site, tagline })}
            />
          </div>
          <TextAreaField
            label="Descrição"
            value={site.description}
            onChange={(description) => onChange({ ...site, description })}
          />
        </SectionCard>

        <SectionCard title="Contactos">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Telefone"
              value={site.phone}
              onChange={(phone) => onChange({ ...site, phone })}
            />
            <TextField
              label="Link telefone"
              value={site.phoneHref}
              onChange={(phoneHref) => onChange({ ...site, phoneHref })}
            />
            <TextField
              label="Email"
              type="email"
              value={site.email}
              onChange={(email) => onChange({ ...site, email })}
            />
            <TextField
              label="WhatsApp"
              value={site.whatsapp}
              onChange={(whatsapp) => onChange({ ...site, whatsapp })}
            />
            <TextField
              label="App"
              value={site.appUrl}
              onChange={(appUrl) => onChange({ ...site, appUrl })}
            />
          </div>
        </SectionCard>

        <SectionCard title="Morada">
          <div className="grid gap-4 md:grid-cols-3">
            <TextField
              label="Rua"
              value={site.address.street}
              onChange={(street) =>
                onChange({ ...site, address: { ...site.address, street } })
              }
            />
            <TextField
              label="Código postal"
              value={site.address.zip}
              onChange={(zip) =>
                onChange({ ...site, address: { ...site.address, zip } })
              }
            />
            <TextField
              label="Cidade"
              value={site.address.city}
              onChange={(city) =>
                onChange({ ...site, address: { ...site.address, city } })
              }
            />
          </div>
        </SectionCard>

        <ScheduleFields
          schedule={site.schedule}
          onChange={(schedule) => onChange({ ...site, schedule })}
        />

        <SectionCard title="Redes sociais">
          <div className="grid gap-4 md:grid-cols-3">
            <TextField
              label="Facebook"
              value={site.social.facebook}
              onChange={(facebook) =>
                onChange({ ...site, social: { ...site.social, facebook } })
              }
            />
            <TextField
              label="Instagram"
              value={site.social.instagram}
              onChange={(instagram) =>
                onChange({ ...site, social: { ...site.social, instagram } })
              }
            />
            <TextField
              label="YouTube"
              value={site.social.youtube}
              onChange={(youtube) =>
                onChange({ ...site, social: { ...site.social, youtube } })
              }
            />
          </div>
        </SectionCard>

        <SectionCard title="SEO por defeito">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="URL base"
              value={site.seo.metadataBase}
              onChange={(metadataBase) =>
                onChange({ ...site, seo: { ...site.seo, metadataBase } })
              }
            />
            <TextField
              label="Título por defeito"
              value={site.seo.defaultTitle}
              onChange={(defaultTitle) =>
                onChange({ ...site, seo: { ...site.seo, defaultTitle } })
              }
            />
            <TextField
              label="Template do título"
              value={site.seo.titleTemplate}
              onChange={(titleTemplate) =>
                onChange({ ...site, seo: { ...site.seo, titleTemplate } })
              }
            />
          </div>
          <TextAreaField
            label="Descrição por defeito"
            value={site.seo.defaultDescription}
            onChange={(defaultDescription) =>
              onChange({ ...site, seo: { ...site.seo, defaultDescription } })
            }
          />
        </SectionCard>
      </CardContent>
    </Card>
  );
}

function NavigationFields({
  navigation,
  onChange,
}: {
  navigation: Navigation;
  onChange: (navigation: Navigation) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Navegação</CardTitle>
        <CardDescription>Menu principal e links de rodapé.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <LinkListFields
          title="Menu principal"
          links={navigation.header}
          allowCta
          onChange={(header) => onChange({ ...navigation, header })}
        />
        <LinkListFields
          title="Links de rodapé"
          links={navigation.footerCompany}
          onChange={(footerCompany) =>
            onChange({ ...navigation, footerCompany })
          }
        />
      </CardContent>
    </Card>
  );
}

function LocationsFields({
  locations,
  onChange,
}: {
  locations: WebsiteLocation[];
  onChange: (locations: WebsiteLocation[]) => void;
}) {
  function update(index: number, next: Partial<WebsiteLocation>) {
    onChange(
      locations.map((location, currentIndex) => {
        if (currentIndex !== index) {
          return next.primary ? { ...location, primary: false } : location;
        }
        return { ...location, ...next };
      }),
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Localizações</CardTitle>
          <CardDescription>Moradas, linhas e URLs de mapa.</CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            onChange([
              ...locations,
              {
                slug: `localizacao-${locations.length + 1}`,
                city: "Nova localização",
                lines: ["Morada"],
              },
            ])
          }
        >
          <Plus data-icon="inline-start" />
          Adicionar localização
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {locations.map((location, index) => (
          <SectionCard key={`${location.slug}-${index}`} title={location.city}>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Slug"
                value={location.slug}
                onChange={(slug) => update(index, { slug })}
              />
              <TextField
                label="Cidade"
                value={location.city}
                onChange={(city) => update(index, { city })}
              />
            </div>
            <TextAreaField
              label="Linhas da morada (uma por linha)"
              value={location.lines.join("\n")}
              onChange={(value) =>
                update(index, {
                  lines: value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                })
              }
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="URL de pesquisa no mapa"
                value={location.mapsSearchUrl ?? ""}
                onChange={(mapsSearchUrl) =>
                  update(index, {
                    mapsSearchUrl: mapsSearchUrl || undefined,
                  })
                }
              />
              <TextField
                label="URL de embed do mapa"
                value={location.mapEmbedUrl ?? ""}
                onChange={(mapEmbedUrl) =>
                  update(index, { mapEmbedUrl: mapEmbedUrl || undefined })
                }
              />
            </div>
            <CheckboxField
              label="Localização principal"
              checked={Boolean(location.primary)}
              onChange={(primary) => update(index, { primary })}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() =>
                onChange(locations.filter((_, currentIndex) => currentIndex !== index))
              }
            >
              <Trash2 data-icon="inline-start" />
              Remover localização
            </Button>
          </SectionCard>
        ))}
      </CardContent>
    </Card>
  );
}

function ValuesFields({
  values,
  onChange,
}: {
  values: WebsiteValue[];
  onChange: (values: WebsiteValue[]) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle>Valores</CardTitle>
          <CardDescription>Valores institucionais da empresa.</CardDescription>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            onChange([
              ...values,
              {
                slug: `valor-${values.length + 1}`,
                title: "Novo valor",
                description: "Descrição do valor.",
              },
            ])
          }
        >
          <Plus data-icon="inline-start" />
          Adicionar valor
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {values.map((value, index) => (
          <SectionCard key={`${value.slug}-${index}`} title={value.title}>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Slug"
                value={value.slug}
                onChange={(slug) =>
                  onChange(
                    values.map((item, currentIndex) =>
                      currentIndex === index ? { ...item, slug } : item,
                    ),
                  )
                }
              />
              <TextField
                label="Título"
                value={value.title}
                onChange={(title) =>
                  onChange(
                    values.map((item, currentIndex) =>
                      currentIndex === index ? { ...item, title } : item,
                    ),
                  )
                }
              />
            </div>
            <TextAreaField
              label="Descrição"
              value={value.description}
              onChange={(description) =>
                onChange(
                  values.map((item, currentIndex) =>
                    currentIndex === index ? { ...item, description } : item,
                  ),
                )
              }
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() =>
                onChange(values.filter((_, currentIndex) => currentIndex !== index))
              }
            >
              <Trash2 data-icon="inline-start" />
              Remover valor
            </Button>
          </SectionCard>
        ))}
      </CardContent>
    </Card>
  );
}

function ServiceEditor({
  service,
  onChange,
  onRemove,
}: {
  service: WebsiteService;
  onChange: (service: Partial<WebsiteService>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 pt-1">
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Título"
          value={service.title}
          onChange={(title) => onChange({ title })}
        />
        <TextField
          label="Slug"
          value={service.slug}
          onChange={(slug) => onChange({ slug })}
        />
        <Field label="Ícone">
          <IconCombobox
            value={service.icon}
            onChange={(icon) => onChange({ icon })}
          />
        </Field>
        <Field label="Tipo">
          <Select
            value={service.tier}
            onValueChange={(value: WebsiteService["tier"]) =>
              onChange({ tier: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolha o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(tierLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <TextAreaField
        label="Resumo"
        value={service.short}
        onChange={(short) => onChange({ short })}
      />
      <ServiceImageField
        service={service}
        onChange={(image) => onChange({ image })}
      />
      <RichTextField
        label="Descrição"
        value={service.description}
        onChange={(description) => onChange({ description })}
      />
      <StringListField
        label="Bullets"
        itemLabel="Bullet"
        items={service.bullets ?? []}
        onChange={(bullets) => onChange({ bullets })}
      />
      <div className="flex justify-end border-t pt-4">
        <Button type="button" variant="outline" size="sm" onClick={onRemove}>
          <Trash2 data-icon="inline-start" />
          Remover serviço
        </Button>
      </div>
    </div>
  );
}

function ServiceImageField({
  service,
  onChange,
}: {
  service: WebsiteService;
  onChange: (image: WebsiteService["image"]) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const image = service.image ?? { alt: service.title };

  function upload(file: File | undefined) {
    if (!file) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.set("slug", service.slug);
      formData.set("file", file);

      const result = await uploadServiceImage(formData);
      if (!result.ok) {
        toast.error("Falha ao carregar imagem", {
          description: result.error,
        });
        return;
      }

      onChange({
        ...image,
        pathname: result.data.pathname,
      });
      toast.success("Imagem carregada.");
    });
  }

  return (
    <div className="grid gap-4 rounded-lg border bg-muted/30 p-4 md:grid-cols-[180px_1fr]">
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-md border bg-background text-xs text-muted-foreground">
        {image.pathname ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/api/blob/${image.pathname}`}
            alt={image.alt}
            className="h-full w-full object-cover"
          />
        ) : (
          "Sem imagem"
        )}
      </div>
      <div className="flex flex-col gap-4">
        <TextField
          label="Texto alternativo da imagem"
          value={image.alt}
          onChange={(alt) => onChange({ ...image, alt })}
        />
        <Field label="Imagem do serviço">
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <label
                className={cn(
                  "cursor-pointer",
                  isPending && "pointer-events-none opacity-50",
                )}
              >
                <Plus data-icon="inline-start" />
                {isPending
                  ? "A carregar..."
                  : image.pathname
                    ? "Substituir imagem"
                    : "Carregar imagem"}
                <input
                  type="file"
                  accept="image/*"
                  disabled={isPending}
                  className="sr-only"
                  onChange={(event) => upload(event.target.files?.[0])}
                />
              </label>
            </Button>
            {image.pathname ? (
              <span className="truncate text-xs text-muted-foreground">
                {image.pathname}
              </span>
            ) : null}
          </div>
        </Field>
      </div>
    </div>
  );
}

function SeoFields({
  seo,
  onChange,
}: {
  seo: Seo;
  onChange: (seo: Seo) => void;
}) {
  return (
    <SectionCard title="SEO">
      <TextField
        label="Título"
        value={seo.title}
        onChange={(title) => onChange({ ...seo, title })}
      />
      <TextAreaField
        label="Descrição"
        value={seo.description}
        onChange={(description) => onChange({ ...seo, description })}
      />
    </SectionCard>
  );
}

function HeroFields({
  title,
  hero,
  onChange,
}: {
  title: string;
  hero: Hero;
  onChange: (hero: Hero) => void;
}) {
  return (
    <SectionCard title={title}>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Eyebrow"
          value={hero.eyebrow ?? ""}
          onChange={(eyebrow) => onChange({ ...hero, eyebrow })}
        />
        <TextField
          label="Título"
          value={hero.title}
          onChange={(newTitle) => onChange({ ...hero, title: newTitle })}
        />
      </div>
      <TextAreaField
        label="Descrição"
        value={hero.description}
        onChange={(description) => onChange({ ...hero, description })}
      />
    </SectionCard>
  );
}

function IntroFields({
  title,
  intro,
  onChange,
}: {
  title: string;
  intro: PageSectionIntro;
  onChange: (intro: PageSectionIntro) => void;
}) {
  return (
    <SectionCard title={title}>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Eyebrow"
          value={intro.eyebrow}
          onChange={(eyebrow) => onChange({ ...intro, eyebrow })}
        />
        <TextField
          label="Título"
          value={intro.title}
          onChange={(newTitle) => onChange({ ...intro, title: newTitle })}
        />
      </div>
      <TextAreaField
        label="Descrição"
        value={intro.description}
        onChange={(description) => onChange({ ...intro, description })}
      />
    </SectionCard>
  );
}

function CtaFields({
  title,
  cta,
  onChange,
}: {
  title: string;
  cta: Cta;
  onChange: (cta: Cta) => void;
}) {
  return (
    <SectionCard title={title}>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Etiqueta"
          value={cta.label}
          onChange={(label) => onChange({ ...cta, label })}
        />
        <TextField
          label="URL"
          value={cta.href}
          onChange={(href) => onChange({ ...cta, href })}
        />
      </div>
    </SectionCard>
  );
}

function CtaBandFields({
  title,
  ctaBand,
  onChange,
}: {
  title: string;
  ctaBand: {
    title: string;
    description: string;
    primary: Cta;
    secondary: Cta;
  };
  onChange: (ctaBand: {
    title: string;
    description: string;
    primary: Cta;
    secondary: Cta;
  }) => void;
}) {
  return (
    <SectionCard title={title}>
      <TextField
        label="Título"
        value={ctaBand.title}
        onChange={(newTitle) => onChange({ ...ctaBand, title: newTitle })}
      />
      <TextAreaField
        label="Descrição"
        value={ctaBand.description}
        onChange={(description) => onChange({ ...ctaBand, description })}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <CtaFields
          title="CTA principal"
          cta={ctaBand.primary}
          onChange={(primary) => onChange({ ...ctaBand, primary })}
        />
        <CtaFields
          title="CTA secundário"
          cta={ctaBand.secondary}
          onChange={(secondary) => onChange({ ...ctaBand, secondary })}
        />
      </div>
    </SectionCard>
  );
}

function StatsFields({
  stats,
  onChange,
}: {
  stats: Pages["home"]["hero"]["stats"];
  onChange: (stats: Pages["home"]["hero"]["stats"]) => void;
}) {
  return (
    <SectionCard title="Estatísticas">
      {stats.map((stat, index) => (
        <div key={`${stat.label}-${index}`} className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <TextField
            label="Valor"
            value={stat.value}
            onChange={(value) =>
              onChange(
                stats.map((item, currentIndex) =>
                  currentIndex === index ? { ...item, value } : item,
                ),
              )
            }
          />
          <TextField
            label="Legenda"
            value={stat.label}
            onChange={(label) =>
              onChange(
                stats.map((item, currentIndex) =>
                  currentIndex === index ? { ...item, label } : item,
                ),
              )
            }
          />
          <RemoveButton
            label="Remover"
            onClick={() =>
              onChange(stats.filter((_, currentIndex) => currentIndex !== index))
            }
          />
        </div>
      ))}
      <AddButton
        label="Adicionar estatística"
        onClick={() => onChange([...stats, { value: "Novo", label: "Legenda" }])}
      />
    </SectionCard>
  );
}

function PerksFields({
  perks,
  onChange,
}: {
  perks: Pages["quote"]["perks"];
  onChange: (perks: Pages["quote"]["perks"]) => void;
}) {
  return (
    <SectionCard title="Vantagens">
      {perks.map((perk, index) => (
        <div key={`${perk.title}-${index}`} className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <Field label="Ícone">
            <IconCombobox
              value={perk.icon}
              onChange={(icon) =>
                onChange(
                  perks.map((item, currentIndex) =>
                    currentIndex === index ? { ...item, icon } : item,
                  ),
                )
              }
            />
          </Field>
          <TextField
            label="Título"
            value={perk.title}
            onChange={(title) =>
              onChange(
                perks.map((item, currentIndex) =>
                  currentIndex === index ? { ...item, title } : item,
                ),
              )
            }
          />
          <RemoveButton
            label="Remover"
            onClick={() =>
              onChange(perks.filter((_, currentIndex) => currentIndex !== index))
            }
          />
          <div className="md:col-span-3">
            <TextAreaField
              label="Descrição"
              value={perk.description}
              onChange={(description) =>
                onChange(
                  perks.map((item, currentIndex) =>
                    currentIndex === index ? { ...item, description } : item,
                  ),
                )
              }
            />
          </div>
        </div>
      ))}
      <AddButton
        label="Adicionar vantagem"
        onClick={() =>
          onChange([
            ...perks,
            {
              icon: "truck",
              title: "Nova vantagem",
              description: "Descrição da vantagem.",
            },
          ])
        }
      />
    </SectionCard>
  );
}

function LegalSectionsFields({
  sections,
  onChange,
}: {
  sections: Pages["terms"]["sections"];
  onChange: (sections: Pages["terms"]["sections"]) => void;
}) {
  return (
    <SectionCard title="Secções">
      {sections.map((section, index) => (
        <div key={`${section.title}-${index}`} className="flex flex-col gap-4 rounded-md border p-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <TextField
              label="Título"
              value={section.title}
              onChange={(title) =>
                onChange(
                  sections.map((item, currentIndex) =>
                    currentIndex === index ? { ...item, title } : item,
                  ),
                )
              }
            />
            <RemoveButton
              label="Remover"
              onClick={() =>
                onChange(
                  sections.filter((_, currentIndex) => currentIndex !== index),
                )
              }
            />
          </div>
          <TextAreaField
            label="Texto"
            value={section.body}
            onChange={(body) =>
              onChange(
                sections.map((item, currentIndex) =>
                  currentIndex === index ? { ...item, body } : item,
                ),
              )
            }
          />
        </div>
      ))}
      <AddButton
        label="Adicionar secção"
        onClick={() =>
          onChange([...sections, { title: "Nova secção", body: "Texto." }])
        }
      />
    </SectionCard>
  );
}

function ScheduleFields({
  schedule,
  onChange,
}: {
  schedule: SiteSettings["schedule"];
  onChange: (schedule: SiteSettings["schedule"]) => void;
}) {
  return (
    <SectionCard title="Horário">
      {schedule.map((slot, index) => (
        <div key={`${slot.days}-${index}`} className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <TextField
            label="Dias"
            value={slot.days}
            onChange={(days) =>
              onChange(
                schedule.map((item, currentIndex) =>
                  currentIndex === index ? { ...item, days } : item,
                ),
              )
            }
          />
          <TextField
            label="Horas"
            value={slot.hours}
            onChange={(hours) =>
              onChange(
                schedule.map((item, currentIndex) =>
                  currentIndex === index ? { ...item, hours } : item,
                ),
              )
            }
          />
          <RemoveButton
            label="Remover"
            onClick={() =>
              onChange(schedule.filter((_, currentIndex) => currentIndex !== index))
            }
          />
        </div>
      ))}
      <AddButton
        label="Adicionar horário"
        onClick={() => onChange([...schedule, { days: "Dias", hours: "Horas" }])}
      />
    </SectionCard>
  );
}

function LinkListFields({
  title,
  links,
  allowCta = false,
  onChange,
}: {
  title: string;
  links: LinkItem[];
  allowCta?: boolean;
  onChange: (links: LinkItem[]) => void;
}) {
  return (
    <SectionCard title={title}>
      {links.map((link, index) => (
        <div key={`${link.href}-${index}`} className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <TextField
            label="Etiqueta"
            value={link.label}
            onChange={(label) =>
              onChange(
                links.map((item, currentIndex) =>
                  currentIndex === index ? { ...item, label } : item,
                ),
              )
            }
          />
          <TextField
            label="URL"
            value={link.href}
            onChange={(href) =>
              onChange(
                links.map((item, currentIndex) =>
                  currentIndex === index ? { ...item, href } : item,
                ),
              )
            }
          />
          <RemoveButton
            label="Remover"
            onClick={() =>
              onChange(links.filter((_, currentIndex) => currentIndex !== index))
            }
          />
          {allowCta ? (
            <div className="md:col-span-3">
              <CheckboxField
                label="Destacar como CTA"
                checked={Boolean(link.cta)}
                onChange={(cta) =>
                  onChange(
                    links.map((item, currentIndex) =>
                      currentIndex === index ? { ...item, cta } : item,
                    ),
                  )
                }
              />
            </div>
          ) : null}
        </div>
      ))}
      <AddButton
        label="Adicionar link"
        onClick={() => onChange([...links, { label: "Novo link", href: "/" }])}
      />
    </SectionCard>
  );
}

function StringListField({
  label,
  itemLabel,
  items,
  onChange,
}: {
  label: string;
  itemLabel: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <SectionCard title={label}>
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="grid gap-4 md:grid-cols-[1fr_auto]">
          <TextField
            label={`${itemLabel} ${index + 1}`}
            value={item}
            onChange={(value) =>
              onChange(
                items.map((currentItem, currentIndex) =>
                  currentIndex === index ? value : currentItem,
                ),
              )
            }
          />
          <RemoveButton
            label="Remover"
            onClick={() =>
              onChange(items.filter((_, currentIndex) => currentIndex !== index))
            }
          />
        </div>
      ))}
      <AddButton
        label={`Adicionar ${itemLabel.toLowerCase()}`}
        onClick={() => onChange([...items, `${itemLabel} ${items.length + 1}`])}
      />
    </SectionCard>
  );
}

function IconCombobox({
  value,
  onChange,
}: {
  value: ContentIconName;
  onChange: (value: ContentIconName) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = contentIconOptions.find((icon) => icon.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-10 w-full justify-between tracking-normal normal-case"
        >
          <span className="flex min-w-0 items-center gap-2">
            {createElement(getContentIcon(value))}
            <span className="truncate">
              {selected?.label ?? "Escolha um ícone"}
            </span>
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder="Pesquisar ícone..." />
          <CommandList>
            <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
            <CommandGroup>
              {contentIconOptions.map((icon) => {
                return (
                  <CommandItem
                    key={icon.value}
                    value={`${icon.label} ${icon.value}`}
                    onSelect={() => {
                      onChange(icon.value);
                      setOpen(false);
                    }}
                  >
                    {createElement(getContentIcon(icon.value))}
                    <span>{icon.label}</span>
                    <Check
                      className={cn(
                        "ml-auto",
                        value === icon.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-md border bg-muted/20 p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function TextField({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <Input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm font-medium select-none">
      <Switch checked={checked} onCheckedChange={onChange} />
      {label}
    </label>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onClick}>
      <Plus data-icon="inline-start" />
      {label}
    </Button>
  );
}

function RemoveButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="self-end"
      onClick={onClick}
    >
      <Trash2 data-icon="inline-start" />
      {label}
    </Button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
