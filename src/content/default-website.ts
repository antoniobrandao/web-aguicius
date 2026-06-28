import type { AguiciusWebsiteContent } from "@/lib/content/website-types";

export const defaultWebsiteContent = {
  "site": {
    "name": "Aguicius",
    "tagline": "Soluções Smart de transporte e serviços",
    "description": "Desenvolver e aplicar soluções Smart para o mercado de serviços e transporte eficientes, sustentáveis e de qualidade.",
    "phone": "+351 918 451 505",
    "phoneHref": "tel:+351918451505",
    "email": "geral@aguicius.com",
    "whatsapp": "https://wa.me/00351918451505",
    "appUrl": "https://play.google.com/store/apps/details?id=solutiondevelopers.aguicius",
    "address": {
      "street": "Rua do Capitão 88",
      "zip": "4755-104 Carvalhal",
      "city": "Barcelos"
    },
    "schedule": [
      {
        "days": "Seg – Sáb",
        "hours": "09h – 19h"
      },
      {
        "days": "Domingo",
        "hours": "Fechado"
      }
    ],
    "social": {
      "facebook": "https://www.facebook.com/aguicius",
      "instagram": "https://instagram.com/aguicius",
      "youtube": "https://youtube.com"
    },
    "seo": {
      "metadataBase": "https://aguicius.com",
      "defaultTitle": "Aguicius — Peça o seu orçamento",
      "titleTemplate": "%s — Aguicius",
      "defaultDescription": "Soluções Smart de transporte e serviços. Transporte de mercadorias, montagens, instalações, entregas, mudanças e armazenamento em todo o território nacional."
    }
  },
  "navigation": {
    "header": [
      {
        "label": "Home",
        "href": "/"
      },
      {
        "label": "Sobre Nós",
        "href": "/sobre-nos"
      },
      {
        "label": "Serviços",
        "href": "/servicos"
      },
      {
        "label": "Contactos",
        "href": "/contactos"
      },
      {
        "label": "Peça o seu orçamento",
        "href": "/orcamento",
        "cta": true
      }
    ],
    "footerCompany": [
      {
        "label": "Sobre Nós",
        "href": "/sobre-nos"
      },
      {
        "label": "Serviços",
        "href": "/servicos"
      },
      {
        "label": "Contactos",
        "href": "/contactos"
      },
      {
        "label": "Privacidade",
        "href": "/privacidade"
      }
    ]
  },
  "services": [
    {
      "slug": "transporte-de-mercadorias",
      "title": "Transporte de mercadorias",
      "icon": "truck",
      "image": {
        "alt": "Transporte de mercadorias Aguicius"
      },
      "tier": "primary",
      "short": "Saídas diárias em todo o território Nacional para cargas completas ou grupagem.",
      "description": "Com saídas diárias em todo o território Nacional para cargas completas ou grupagem. Temos linhas regulares em todo o País com uma grande variedade de destinos/origens, com soluções à medida e com garantia de qualidade. De pequenos a grandes volumes, com ou sem complexidade técnica ou risco, seja uma empresa ou particular, temos a solução para o seu negócio.",
      "bullets": [
        "Tipo 1: Viaturas Ligeiras com ou sem mecanismos de suporte",
        "Tipo 2: Viaturas Pesadas com ou sem mecanismos de suporte"
      ]
    },
    {
      "slug": "montagens",
      "title": "Montagens",
      "icon": "wrench",
      "image": {
        "alt": "Montagens Aguicius"
      },
      "tier": "primary",
      "short": "Serviço PRIME AGUICIUS com profissionais preparados e treinados para os mais variados serviços de Montagens.",
      "description": "Serviço PRIME AGUICIUS com profissionais preparados e treinados para os mais variados serviços de Montagens. Para Montagens, vai obter toda a garantia de qualidade necessária para o serviço que pretende. Realizamos os mais diversos tipos de montagens, desde a montagem de mobiliário em “kit” até a um equipamento de ginástica, dos mais variados móveis de escritório/casa, até à montagem integral de linhas de produção.",
      "bullets": [
        "Tipo 1: Mobiliário residencial ou escritório",
        "Tipo 2: Equipamentos elétricos ou de mecânica simples"
      ]
    },
    {
      "slug": "entregas",
      "title": "Entregas",
      "icon": "packageCheck",
      "image": {
        "alt": "Entregas Aguicius"
      },
      "tier": "primary",
      "short": "Com os serviços Prime da Aguicius adaptamos o transporte à sua medida. Rapidez e qualidade ao melhor preço.",
      "description": "Com os serviços Prime da Aguicius adaptamos o transporte à sua medida e necessidade. Com o nosso serviço de entregas obtém rapidez e qualidade ao melhor preço. Transporte desde o ponto de recolha até à porta da morada de entrega, com possibilidade de arrumação no local e divisão pretendida."
    },
    {
      "slug": "instalacoes",
      "title": "Instalações",
      "icon": "hammer",
      "image": {
        "alt": "Instalações Aguicius"
      },
      "tier": "featured",
      "short": "Consultoria e obra para a execução de pequenas adaptações ou modificações para instalação de eletrodomésticos ou equipamentos.",
      "description": "Com os Serviços Prime da AGUICIUS para instalações vai obter toda a consultoria e obra para a execução de pequenas adaptações ou modificações para instalação de eletrodomésticos ou equipamentos. Com a AGUICIUS pode obter um serviço de qualidade garantida, desde a instalação de eletrodomésticos até à instalação de equipamentos industriais ou de escritório."
    },
    {
      "slug": "mudancas",
      "title": "Mudanças",
      "icon": "boxes",
      "image": {
        "alt": "Mudanças Aguicius"
      },
      "tier": "secondary",
      "short": "Disponibilizamos todo o tipo de mudanças Key Hand, tratando de toda a logística e embalamento.",
      "description": "Aguicius Mudanças é o serviço Prime da empresa! Disponibilizamos todo o tipo de mudanças Key Hand, tratando de toda a logística e embalamento de, e para qualquer local a nível do território nacional e U.E. Transportamos todo o tipo de mobiliário, bens pessoais, eletrodomésticos, roupa, entre outros."
    },
    {
      "slug": "armazenamento",
      "title": "Armazenamento",
      "icon": "warehouse",
      "image": {
        "alt": "Armazenamento Aguicius"
      },
      "tier": "secondary",
      "short": "Armazenamento temporário das suas mercadorias e bens, com toda a segurança.",
      "description": "Com os serviços da Aguicius pode obter armazenamento temporário das suas mercadorias e bens, com toda a segurança."
    },
    {
      "slug": "recolhas",
      "title": "Recolhas",
      "icon": "arrowDownToLine",
      "image": {
        "alt": "Recolhas Aguicius"
      },
      "tier": "secondary",
      "short": "Solicite o serviço de recolhas, classificando-o por prioritário ou normal conforme as suas necessidades.",
      "description": "Com os serviços Prime da Aguicius tem a possibilidade de solicitar o serviço de recolhas, podendo classificá-lo por prioritário ou normal e atender às suas necessidades de momento. Serviço de recolhas de usados ou monos e serviço de entulho e resíduos não tóxicos ou similares."
    },
    {
      "slug": "entregas-express",
      "title": "Entregas Express",
      "icon": "zap",
      "image": {
        "alt": "Entregas Express Aguicius"
      },
      "tier": "secondary",
      "short": "Garantimos que o seu envio é entregue em qualquer parte do território nacional até ao dia útil seguinte.",
      "description": "Quando envia uma mercadoria ou simplesmente um pacote/envelope, o prazo de entrega é muito importante para nós. Com o nosso serviço Express da Aguicius, garantimos que o seu envio é entregue em qualquer parte do território nacional até ao dia útil seguinte possível. Serviço Express Aguicius 24 horas e 48 horas."
    }
  ],
  "values": [
    {
      "slug": "qualidade",
      "title": "Qualidade",
      "description": "A AGUICIUS, através de todos os seus colaboradores, pauta-se pela execução de serviços de excelência, promovendo sempre melhorias contínuas que permitam a criação de valor acrescentado para todos os que colaboram connosco e em especial os nossos Clientes."
    },
    {
      "slug": "sustentabilidade",
      "title": "Sustentabilidade",
      "description": "Promovemos o desenvolvimento sustentado através do respeito por todos os intervenientes, da qualificação contínua dos colaboradores, do cumprimento de todos os requisitos de segurança e com práticas amigas do ambiente, sempre com uma visão de médio e longo prazo."
    },
    {
      "slug": "etica",
      "title": "Ética",
      "description": "Nas relações estabelecidas, com várias parcerias nos diversos pontos do globo, baseamo-nos em relações de confiança de longo prazo que se regem por princípios de honestidade, integridade e cooperação entre todos."
    }
  ],
  "locations": [
    {
      "slug": "barcelos",
      "city": "Barcelos",
      "lines": [
        "Rua do Capitão 88",
        "4755-104 Carvalhal"
      ],
      "mapsSearchUrl": "https://www.google.com/maps/search/?api=1&query=Rua+do+Capit%C3%A3o+88+Carvalhal+Portugal",
      "mapEmbedUrl": "https://www.google.com/maps?q=Rua%20do%20Capit%C3%A3o%2088%20Carvalhal%20Portugal&output=embed",
      "primary": true
    },
    {
      "slug": "leiria",
      "city": "Leiria",
      "lines": [
        "Armazém 4, Estrada Nacional 1, km 117",
        "Golpilheira, Alto do Moinho, Batalha"
      ]
    },
    {
      "slug": "faro",
      "city": "Faro",
      "lines": [
        "Algarve",
        "Portugal"
      ]
    }
  ],
  "pages": {
    "home": {
      "hero": {
        "eyebrow": "A nossa missão",
        "title": "Soluções Smart de transporte e serviços",
        "highlight": "Smart",
        "description": "Desenvolver e aplicar soluções Smart para o mercado de serviços e transporte eficientes, sustentáveis e de qualidade — sempre na linha da frente do digital e da mobilidade técnica.",
        "primaryCta": {
          "label": "Peça o seu orçamento",
          "href": "/orcamento"
        },
        "secondaryCta": {
          "label": "Ver serviços",
          "href": "/servicos"
        },
        "stats": [
          {
            "value": "100%",
            "label": "Para si"
          },
          {
            "value": "24/48h",
            "label": "Entregas express"
          },
          {
            "value": "Nacional",
            "label": "Cobertura"
          },
          {
            "value": "Prime",
            "label": "Serviço Aguicius"
          }
        ]
      },
      "servicesIntro": {
        "eyebrow": "O que fazemos",
        "title": "Os nossos serviços",
        "description": "Soluções à medida para empresas e particulares, com a garantia de qualidade AGUICIUS."
      },
      "reserveCta": {
        "title": "Reserve já!",
        "description": "Peça já o seu orçamento sem compromisso e adapte o transporte à sua medida e necessidade.",
        "button": {
          "label": "Aqui",
          "href": "/orcamento"
        }
      },
      "installations": {
        "eyebrow": "Serviços Prime",
        "title": "Instalações",
        "button": {
          "label": "Mais serviços",
          "href": "/servicos"
        },
        "highlights": [
          "Consultoria e obra para adaptações",
          "Instalação de eletrodomésticos",
          "Equipamentos industriais ou de escritório",
          "Qualidade garantida AGUICIUS"
        ]
      },
      "moreServicesIntro": {
        "eyebrow": "Mais soluções",
        "title": "Tudo o que precisa, num só lugar",
        "description": "Do armazenamento às entregas express, cobrimos todas as etapas da sua logística."
      },
      "aboutBand": {
        "statValue": "100%",
        "statLabel": "Para si!",
        "lead": "A Aguicius proporciona aos seus clientes os melhores serviços. Com muita qualidade e rigor.",
        "body": "Promovemos o desenvolvimento sustentado através do respeito por todos os intervenientes, da qualificação contínua dos colaboradores, do cumprimento de todos os requisitos de segurança e com práticas amigas do ambiente, sempre com uma visão de médio e longo prazo.",
        "cta": {
          "label": "Mais sobre nós",
          "href": "/sobre-nos"
        }
      },
      "locationIntro": {
        "eyebrow": "Onde estamos",
        "title": "A nossa localização",
        "description": "Visite-nos ou contacte-nos. Estamos disponíveis para encontrar a melhor solução para si."
      }
    },
    "about": {
      "seo": {
        "title": "Sobre Nós",
        "description": "Conheça a Aguicius — soluções Smart de transporte e serviços, construídas sobre qualidade, sustentabilidade e ética."
      },
      "hero": {
        "eyebrow": "Quem somos",
        "title": "Sobre Nós",
        "description": "Soluções Smart para o mercado de serviços e transporte eficientes, sustentáveis e de qualidade."
      },
      "story": {
        "eyebrow": "A nossa história",
        "title": "Desenvolver e aplicar soluções Smart para o mercado de serviços e transporte.",
        "body": "Aliando os largos anos de experiência como motorista profissional à visão de que ao mercado da logística faltavam soluções para o transporte de mercadorias mais delicadas, o nosso fundador, **Bruno António Ferreira**, apostou arduamente na sua formação académica para obter a capacidade profissional de gestão de empresas de transportes.\n\nNeste seguimento começou um processo de recrutamento de uma “brigada” de recursos humanos altamente competentes e profissionais, apostando continuamente na sua formação, focando o objetivo da empresa num serviço de excelência na área do transporte de mercadorias delicadas e entregas técnicas.\n\n**Assim nasceu a Aguicius.**"
      },
      "locationsIntro": {
        "eyebrow": "Cobertura nacional",
        "title": "Onde atuamos",
        "description": "Presença estratégica de norte a sul do país para servir os nossos clientes com rapidez."
      },
      "valuesIntro": {
        "eyebrow": "O que nos move",
        "title": "Os nossos valores"
      },
      "ctaBand": {
        "title": "Espírito Aguicius",
        "description": "Junte-se aos clientes que confiam na qualidade e no rigor dos nossos serviços Prime.",
        "primary": {
          "label": "Peça o seu orçamento",
          "href": "/orcamento"
        },
        "secondary": {
          "label": "Ver serviços",
          "href": "/servicos"
        }
      }
    },
    "services": {
      "seo": {
        "title": "Serviços",
        "description": "Transporte de mercadorias, montagens, instalações, entregas, recolhas, mudanças e armazenamento — soluções Prime Aguicius à medida."
      },
      "hero": {
        "eyebrow": "O que fazemos",
        "title": "Serviços",
        "description": "De pequenos a grandes volumes, com ou sem complexidade técnica. Temos a solução para o seu negócio."
      },
      "secondaryIntro": {
        "eyebrow": "Mais soluções",
        "title": "Tudo o que precisa",
        "description": "Serviços complementares para cobrir cada etapa da sua logística, com a garantia Aguicius."
      },
      "ctaBand": {
        "title": "Apoio ao cliente",
        "description": "Caso tenha alguma dúvida não hesite em contactar-nos. Pedido de orçamento sem compromisso.",
        "primary": {
          "label": "Pedido de orçamento",
          "href": "/orcamento"
        },
        "secondary": {
          "label": "Contactos",
          "href": "/contactos"
        }
      }
    },
    "contact": {
      "seo": {
        "title": "Contactos",
        "description": "Fale com a Aguicius. Morada em Barcelos, telefone, email e horário de funcionamento."
      },
      "hero": {
        "eyebrow": "Fale connosco",
        "title": "Contactos",
        "description": "Estamos disponíveis para encontrar a melhor solução para si. Entre em contacto."
      },
      "formIntro": {
        "eyebrow": "Apoio ao cliente",
        "title": "Envie-nos uma mensagem",
        "description": "Preencha o formulário e a nossa equipa responderá o mais brevemente possível."
      }
    },
    "quote": {
      "seo": {
        "title": "Peça o seu orçamento",
        "description": "Peça já o seu orçamento Aguicius sem compromisso. Soluções de transporte e serviços à sua medida."
      },
      "hero": {
        "eyebrow": "Reserve já!",
        "title": "Peça o seu orçamento",
        "description": "Adapte o transporte à sua medida e necessidade. Rapidez e qualidade ao melhor preço."
      },
      "perks": [
        {
          "icon": "truck",
          "title": "Cobertura nacional",
          "description": "Saídas diárias em todo o território para cargas completas ou grupagem."
        },
        {
          "icon": "clock",
          "title": "Resposta rápida",
          "description": "Recebe o seu orçamento o mais brevemente possível, sem compromisso."
        },
        {
          "icon": "shieldCheck",
          "title": "Garantia Aguicius",
          "description": "Serviço Prime com qualidade e rigor em cada etapa do processo."
        }
      ],
      "sidebarHeading": "Prefere falar connosco?"
    },
    "terms": {
      "seo": {
        "title": "Termos e Condições",
        "description": "Termos e condições de utilização dos serviços Aguicius."
      },
      "hero": {
        "eyebrow": "Legal",
        "title": "Termos e Condições",
        "description": "Condições aplicáveis à utilização dos serviços Aguicius."
      },
      "sections": [
        {
          "title": "1. Âmbito",
          "body": "Os presentes termos e condições regulam a prestação dos serviços de transporte, montagens, instalações, entregas, mudanças e armazenamento disponibilizados pela Aguicius."
        },
        {
          "title": "2. Orçamentos",
          "body": "Todos os orçamentos solicitados são gratuitos e sem compromisso. Os valores apresentados são válidos pelo período indicado em cada proposta."
        },
        {
          "title": "3. Responsabilidade",
          "body": "A Aguicius compromete-se a executar os serviços com qualidade e rigor, cumprindo todos os requisitos de segurança aplicáveis ao transporte e manuseamento de mercadorias."
        },
        {
          "title": "4. Contactos",
          "body": "Para qualquer questão relativa a estes termos, contacte-nos através dos meios disponíveis na página de contactos."
        }
      ]
    },
    "privacy": {
      "seo": {
        "title": "Política de Privacidade",
        "description": "Como a Aguicius recolhe e trata os seus dados pessoais."
      },
      "hero": {
        "eyebrow": "Legal",
        "title": "Política de Privacidade",
        "description": "Informação sobre a recolha e tratamento dos seus dados pessoais."
      },
      "sections": [
        {
          "title": "1. Dados recolhidos",
          "body": "Recolhemos apenas os dados necessários para responder aos seus pedidos de orçamento e prestar os nossos serviços, tais como nome, email, telefone e detalhes do serviço pretendido."
        },
        {
          "title": "2. Finalidade",
          "body": "Os dados são utilizados exclusivamente para a gestão da relação comercial, resposta a pedidos e prestação dos serviços contratados."
        },
        {
          "title": "3. Conservação",
          "body": "Os dados pessoais são conservados apenas durante o período necessário às finalidades para que foram recolhidos, ou conforme exigido por lei."
        },
        {
          "title": "4. Direitos do titular",
          "body": "Pode solicitar a qualquer momento o acesso, retificação ou eliminação dos seus dados pessoais através dos nossos contactos."
        }
      ]
    }
  }
} satisfies AguiciusWebsiteContent;
