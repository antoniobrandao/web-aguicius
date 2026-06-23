import {
  Truck,
  Wrench,
  PackageCheck,
  Hammer,
  Boxes,
  Warehouse,
  ArrowDownToLine,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type SiteSettings = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  phoneHref: string;
  email: string;
  whatsapp: string;
  address: {
    street: string;
    zip: string;
    city: string;
  };
  schedule: { days: string; hours: string }[];
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  app: string;
};

export const site = {
  name: "Aguicius",
  tagline: "Soluções Smart de transporte e serviços",
  description:
    "Desenvolver e aplicar soluções Smart para o mercado de serviços e transporte eficientes, sustentáveis e de qualidade.",
  phone: "+351 918 451 505",
  phoneHref: "tel:+351918451505",
  email: ["geral", "aguicius.com"].join("@"),
  whatsapp: "https://wa.me/00351918451505",
  address: {
    street: "Rua do Capitão 88",
    zip: "4755-104 Carvalhal",
    city: "Barcelos",
  },
  schedule: [
    { days: "Seg – Sáb", hours: "09h – 19h" },
    { days: "Domingo", hours: "Fechado" },
  ],
  social: {
    facebook: "https://www.facebook.com/aguicius",
    instagram: "https://instagram.com/aguicius",
    youtube: "https://youtube.com",
  },
  app: "https://play.google.com/store/apps/details?id=solutiondevelopers.aguicius",
} as const;

export type NavItem = {
  label: string;
  href: string;
  cta?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Sobre Nós", href: "/sobre-nos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Contactos", href: "/contactos" },
  { label: "Peça o seu orçamento", href: "/orcamento", cta: true },
];

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  image?: {
    pathname?: string;
    alt: string;
  };
  short: string;
  description: string;
  bullets?: string[];
};

export const primaryServices: Service[] = [
  {
    slug: "transporte-de-mercadorias",
    title: "Transporte de mercadorias",
    icon: Truck,
    short:
      "Saídas diárias em todo o território Nacional para cargas completas ou grupagem.",
    description:
      "Com saídas diárias em todo o território Nacional para cargas completas ou grupagem. Temos linhas regulares em todo o País com uma grande variedade de destinos/origens, com soluções à medida e com garantia de qualidade. De pequenos a grandes volumes, com ou sem complexidade técnica ou risco, seja uma empresa ou particular, temos a solução para o seu negócio.",
    bullets: [
      "Tipo 1: Viaturas Ligeiras com ou sem mecanismos de suporte",
      "Tipo 2: Viaturas Pesadas com ou sem mecanismos de suporte",
    ],
  },
  {
    slug: "montagens",
    title: "Montagens",
    icon: Wrench,
    short:
      "Serviço PRIME AGUICIUS com profissionais preparados e treinados para os mais variados serviços de Montagens.",
    description:
      "Serviço PRIME AGUICIUS com profissionais preparados e treinados para os mais variados serviços de Montagens. Para Montagens, vai obter toda a garantia de qualidade necessária para o serviço que pretende. Realizamos os mais diversos tipos de montagens, desde a montagem de mobiliário em “kit” até a um equipamento de ginástica, dos mais variados móveis de escritório/casa, até à montagem integral de linhas de produção.",
    bullets: [
      "Tipo 1: Mobiliário residencial ou escritório",
      "Tipo 2: Equipamentos elétricos ou de mecânica simples",
    ],
  },
  {
    slug: "entregas",
    title: "Entregas",
    icon: PackageCheck,
    short:
      "Com os serviços Prime da Aguicius adaptamos o transporte à sua medida. Rapidez e qualidade ao melhor preço.",
    description:
      "Com os serviços Prime da Aguicius adaptamos o transporte à sua medida e necessidade. Com o nosso serviço de entregas obtém rapidez e qualidade ao melhor preço. Transporte desde o ponto de recolha até à porta da morada de entrega, com possibilidade de arrumação no local e divisão pretendida.",
  },
];

export const installations: Service = {
  slug: "instalacoes",
  title: "Instalações",
  icon: Hammer,
  short:
    "Consultoria e obra para a execução de pequenas adaptações ou modificações para instalação de eletrodomésticos ou equipamentos.",
  description:
    "Com os Serviços Prime da AGUICIUS para instalações vai obter toda a consultoria e obra para a execução de pequenas adaptações ou modificações para instalação de eletrodomésticos ou equipamentos. Com a AGUICIUS pode obter um serviço de qualidade garantida, desde a instalação de eletrodomésticos até à instalação de equipamentos industriais ou de escritório.",
};

export const secondaryServices: Service[] = [
  {
    slug: "mudancas",
    title: "Mudanças",
    icon: Boxes,
    short:
      "Disponibilizamos todo o tipo de mudanças Key Hand, tratando de toda a logística e embalamento.",
    description:
      "Aguicius Mudanças é o serviço Prime da empresa! Disponibilizamos todo o tipo de mudanças Key Hand, tratando de toda a logística e embalamento de, e para qualquer local a nível do território nacional e U.E. Transportamos todo o tipo de mobiliário, bens pessoais, eletrodomésticos, roupa, entre outros.",
  },
  {
    slug: "armazenamento",
    title: "Armazenamento",
    icon: Warehouse,
    short:
      "Armazenamento temporário das suas mercadorias e bens, com toda a segurança.",
    description:
      "Com os serviços da Aguicius pode obter armazenamento temporário das suas mercadorias e bens, com toda a segurança.",
  },
  {
    slug: "recolhas",
    title: "Recolhas",
    icon: ArrowDownToLine,
    short:
      "Solicite o serviço de recolhas, classificando-o por prioritário ou normal conforme as suas necessidades.",
    description:
      "Com os serviços Prime da Aguicius tem a possibilidade de solicitar o serviço de recolhas, podendo classificá-lo por prioritário ou normal e atender às suas necessidades de momento. Serviço de recolhas de usados ou monos e serviço de entulho e resíduos não tóxicos ou similares.",
  },
  {
    slug: "entregas-express",
    title: "Entregas Express",
    icon: Zap,
    short:
      "Garantimos que o seu envio é entregue em qualquer parte do território nacional até ao dia útil seguinte.",
    description:
      "Quando envia uma mercadoria ou simplesmente um pacote/envelope, o prazo de entrega é muito importante para nós. Com o nosso serviço Express da Aguicius, garantimos que o seu envio é entregue em qualquer parte do território nacional até ao dia útil seguinte possível. Serviço Express Aguicius 24 horas e 48 horas.",
  },
];

export const allServices: Service[] = [
  ...primaryServices,
  installations,
  ...secondaryServices,
];

export const values = [
  {
    title: "Qualidade",
    description:
      "A AGUICIUS, através de todos os seus colaboradores, pauta-se pela execução de serviços de excelência, promovendo sempre melhorias contínuas que permitam a criação de valor acrescentado para todos os que colaboram connosco e em especial os nossos Clientes.",
  },
  {
    title: "Sustentabilidade",
    description:
      "Promovemos o desenvolvimento sustentado através do respeito por todos os intervenientes, da qualificação contínua dos colaboradores, do cumprimento de todos os requisitos de segurança e com práticas amigas do ambiente, sempre com uma visão de médio e longo prazo.",
  },
  {
    title: "Ética",
    description:
      "Nas relações estabelecidas, com várias parcerias nos diversos pontos do globo, baseamo-nos em relações de confiança de longo prazo que se regem por princípios de honestidade, integridade e cooperação entre todos.",
  },
];

export const locations = [
  {
    city: "Barcelos",
    lines: ["Rua do Capitão 88", "4755-104 Carvalhal"],
  },
  {
    city: "Leiria",
    lines: [
      "Armazém 4, Estrada Nacional 1, km 117",
      "Golpilheira, Alto do Moinho, Batalha",
    ],
  },
  {
    city: "Faro",
    lines: ["Algarve", "Portugal"],
  },
];
