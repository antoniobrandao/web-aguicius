import type { ContentIconKey } from "@/lib/content/constants";
import type { Cta, FormCopy, SectionIntro } from "@/lib/content/types";

// Layout and section copy for this site's bespoke design.
//
// This is NOT business data. Business data — identity, contacts, services,
// locations, values, and each page's SEO, hero and prose — is managed by the
// client in the casadigital dashboard and arrives through the Site API. What
// lives here is the scaffolding this particular design needs to hold that data:
// band headings, stat framing, button labels and section intros. Another client's
// site has a different design and therefore different copy, which is exactly why
// the platform does not model any of it.
//
// Anything added here should be true of the design, not of the business.

export const designCopy = {
  home: {
    // The hero headline comes from the dashboard; this is the fragment of it the
    // design renders in the accent colour. Ignored when it is not part of the
    // headline.
    heroHighlight: "transporte e serviços",
    heroPrimaryCta: { label: "Peça o seu orçamento", href: "/orcamento" },
    heroSecondaryCta: { label: "Ver serviços", href: "/servicos" },
    heroStats: [
      { value: "10+", label: "Anos de experiência" },
      { value: "24h", label: "Resposta a pedidos" },
      { value: "100%", label: "Serviço dedicado" },
    ],
    servicesIntro: {
      eyebrow: "O que fazemos",
      title: "Serviços pensados para si",
      description:
        "Transporte, montagens e instalações com equipas próprias e acompanhamento do início ao fim.",
    },
    reserveCta: {
      title: "Precisa de um orçamento hoje?",
      description: "Diga-nos o que precisa e respondemos com uma proposta clara.",
      button: { label: "Pedir orçamento", href: "/orcamento" },
    },
    installations: {
      eyebrow: "Em destaque",
      title: "Instalações e montagens",
      button: { label: "Falar connosco", href: "/contactos" },
      highlights: [
        "Equipas próprias e material incluído",
        "Agendamento à medida da sua operação",
        "Montagem e desmontagem no mesmo serviço",
        "Acompanhamento após a intervenção",
      ],
    },
    moreServicesIntro: {
      eyebrow: "Mais serviços",
      title: "Também podemos ajudar com",
      description: "Serviços complementares que tratamos com a mesma exigência.",
    },
    aboutBand: {
      statValue: "10+",
      statLabel: "Anos ao seu lado",
      lead: "Uma equipa que trata cada serviço como se fosse o primeiro.",
      body: "Trabalhamos com rigor, pontualidade e comunicação direta, para que saiba sempre em que ponto está o seu pedido.",
      cta: { label: "Conhecer a empresa", href: "/sobre-nos" },
    },
    locationIntro: {
      eyebrow: "Onde estamos",
      title: "Perto de si",
      description: "Visite-nos ou fale connosco para combinarmos o melhor horário.",
    },
  },
  about: {
    storyEyebrow: "A nossa história",
    locationsIntro: {
      eyebrow: "Localizações",
      title: "Onde nos pode encontrar",
      description: "Estamos presentes em vários pontos para servir mais perto.",
    },
    valuesIntro: {
      eyebrow: "Os nossos valores",
      title: "O que nos guia",
    },
    ctaBand: {
      title: "Vamos falar sobre o que precisa?",
      description: "Conte-nos o seu caso e apresentamos a melhor solução.",
      primary: { label: "Peça o seu orçamento", href: "/orcamento" },
      secondary: { label: "Contactos", href: "/contactos" },
    },
  },
  services: {
    secondaryIntro: {
      eyebrow: "Outros serviços",
      title: "Soluções complementares",
      description: "Serviços que acrescentamos sempre que o seu projeto o exige.",
    },
    ctaBand: {
      title: "Não encontrou o que procura?",
      description: "Fale connosco: quase sempre há uma solução à medida.",
      primary: { label: "Peça o seu orçamento", href: "/orcamento" },
      secondary: { label: "Contactos", href: "/contactos" },
    },
  },
  contact: {
    formIntro: {
      eyebrow: "Fale connosco",
      title: "Envie-nos o seu pedido",
      description: "Preencha o formulário e entramos em contacto o mais breve possível.",
    },
    form: {
      submitLabel: "Enviar mensagem",
      submittingLabel: "A enviar...",
      success: {
        title: "Mensagem enviada",
        description:
          "Obrigado pelo seu contacto. Respondemos o mais brevemente possível.",
        resetLabel: "Enviar nova mensagem",
      },
      error:
        "Não foi possível enviar a sua mensagem. Tente novamente ou contacte-nos diretamente.",
    },
  },
  quote: {
    sidebarHeading: "Prefere falar diretamente?",
    form: {
      submitLabel: "Reserve já",
      submittingLabel: "A enviar...",
      success: {
        title: "Pedido enviado",
        description:
          "Obrigado pelo seu contacto. A nossa equipa irá responder ao seu pedido de orçamento o mais brevemente possível.",
        resetLabel: "Enviar novo pedido",
      },
      error:
        "Não foi possível enviar o seu pedido. Tente novamente ou contacte-nos diretamente.",
    },
    perks: [
      {
        icon: "clock",
        title: "Resposta rápida",
        description: "Analisamos o seu pedido e respondemos com uma proposta clara.",
      },
      {
        icon: "shieldCheck",
        title: "Sem compromisso",
        description: "Pedir um orçamento não implica qualquer obrigação da sua parte.",
      },
      {
        icon: "packageCheck",
        title: "Serviço acompanhado",
        description: "Ficamos ao seu lado do primeiro contacto até à conclusão.",
      },
    ],
  },
} satisfies {
  home: {
    heroHighlight: string;
    heroPrimaryCta: Cta;
    heroSecondaryCta: Cta;
    heroStats: { value: string; label: string }[];
    servicesIntro: SectionIntro;
    reserveCta: { title: string; description: string; button: Cta };
    installations: { eyebrow: string; title: string; button: Cta; highlights: string[] };
    moreServicesIntro: SectionIntro;
    aboutBand: {
      statValue: string;
      statLabel: string;
      lead: string;
      body: string;
      cta: Cta;
    };
    locationIntro: SectionIntro;
  };
  about: {
    storyEyebrow: string;
    locationsIntro: SectionIntro;
    valuesIntro: SectionIntro;
    ctaBand: { title: string; description: string; primary: Cta; secondary: Cta };
  };
  services: {
    secondaryIntro: SectionIntro;
    ctaBand: { title: string; description: string; primary: Cta; secondary: Cta };
  };
  contact: { formIntro: SectionIntro; form: FormCopy };
  quote: {
    sidebarHeading: string;
    form: FormCopy;
    perks: { icon: ContentIconKey; title: string; description: string }[];
  };
};
