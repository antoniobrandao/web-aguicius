import type { NavItem } from "@/lib/content/types";

// This website's own structure and copy.
//
// Which pages exist, what they are called, how they are titled for search engines
// and what their headers say are all properties of this site, not of the business.
// The business — its name, contacts, services, values, locations and legal text —
// comes from the Casa Digital dashboard through the Site API.
//
// Keeping these here is what makes the site independently editable: adding a page
// or rewording a heading is a change in this repository, with no platform
// involvement and no schema to update.

// Site-wide metadata is composed from the company information the client maintains
// in the dashboard: the business name titles the site, the tagline completes the
// home title, and the description is the default meta description. Only the
// deployment URL belongs here, because it is a property of the deployment rather
// than of the business.
//
// The fallbacks are used when a field has not been filled in yet, so a site whose
// company record is empty still has sensible metadata.
export const siteMeta = {
  url: "https://aguicius.com",
  fallbackName: "Aguicius",
  fallbackTagline: "Transporte e Serviços Técnicos",
  fallbackDescription:
    "Soluções Smart para o mercado de serviços e transporte eficientes, sustentáveis e de qualidade. Transporte de mercadorias, montagens, instalações e mudanças.",
} as const;

export const headerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Sobre Nós", href: "/sobre-nos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contactos", href: "/contactos" },
  { label: "Peça o seu orçamento", href: "/orcamento", cta: true },
];

export const footerNav: NavItem[] = [
  { label: "Quem somos", href: "/sobre-nos" },
  { label: "Contactos", href: "/contactos" },
  { label: "Termos e condições", href: "/termos" },
  { label: "Política de privacidade", href: "/privacidade" },
];

type PageContent = {
  /**
   * The page's own name and description. The name is suffixed with the business
   * name by the root title template, so it is written bare here. A page with no
   * description falls back to the business description.
   *
   * Omitted for the home page, which takes the root metadata composed from the
   * company record. Add a `generateMetadata` with `title: { absolute }` there if
   * it ever needs its own.
   */
  seo?: { title: string; description: string };
  hero: { eyebrow: string; title: string; description: string };
  /** Prose blocks for pages that have them. Empty means the section is not shown. */
  prose?: { title: string; body: string }[];
};

export const pages = {
  home: {
    hero: {
      eyebrow: "O que fazemos",
      title: "Soluções completas para o seu negócio",
      description:
        "De pequenos a grandes volumes, com ou sem complexidade técnica. Temos a solução para o seu negócio.",
    },
  },
  about: {
    seo: {
      title: "Sobre Nós",
      description:
        "Conheça a história da Aguicius, empresa de transporte e serviços técnicos que alia anos de experiência a soluções smart, sustentáveis e de qualidade.",
    },
    hero: {
      eyebrow: "Sobre Nós",
      title: "Soluções Smart para o mercado de serviços e transporte",
      description:
        "Desenvolvemos e aplicamos soluções eficientes, sustentáveis e de qualidade para o mercado de serviços e transporte.",
    },
    // The story section renders once this has content. It was never populated on
    // the platform either, so nothing was lost in moving it here.
    prose: [],
  },
  services: {
    seo: {
      title: "Serviços",
      description:
        "Transporte de mercadorias, montagens, instalações, mudanças, armazenamento e entregas express. Soluções completas com garantia de qualidade Aguicius.",
    },
    hero: {
      eyebrow: "Serviços",
      title: "Soluções completas para o seu negócio",
      description:
        "De pequenos a grandes volumes, com ou sem complexidade técnica, seja uma empresa ou particular, temos a solução para o seu negócio.",
    },
  },
  contact: {
    seo: {
      title: "Contactos",
      description:
        "Entre em contacto com a Aguicius. Fale connosco por telefone, email ou através do formulário.",
    },
    hero: {
      eyebrow: "Contactos",
      title: "Fale connosco",
      description:
        "Estamos disponíveis para responder a todas as suas questões e apresentar as melhores soluções para as suas necessidades.",
    },
  },
  quote: {
    seo: {
      title: "Peça o seu orçamento",
      description:
        "Solicite um orçamento sem compromisso para transporte, montagens, instalações, mudanças ou qualquer outro serviço Aguicius.",
    },
    hero: {
      eyebrow: "Orçamento",
      title: "Peça o seu orçamento",
      description:
        "Preencha o formulário e receba uma proposta personalizada para o seu projeto. Respondemos com rapidez e profissionalismo.",
    },
  },
  terms: {
    seo: {
      title: "Termos e Condições",
      description:
        "Consulte os termos e condições de utilização dos serviços Aguicius, empresa de transporte de mercadorias e serviços técnicos.",
    },
    hero: {
      eyebrow: "Legal",
      title: "Termos e Condições",
      description:
        "Leia atentamente os termos e condições que regem a utilização dos nossos serviços.",
    },
  },
  privacy: {
    seo: {
      title: "Política de Privacidade",
      description:
        "Consulte a política de privacidade da Aguicius e saiba como tratamos e protegemos os seus dados pessoais de acordo com o RGPD.",
    },
    hero: {
      eyebrow: "Legal",
      title: "Política de Privacidade",
      description:
        "A Aguicius respeita a sua privacidade e compromete-se a proteger os seus dados pessoais.",
    },
  },
} satisfies Record<string, PageContent>;
