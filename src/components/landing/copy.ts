export const languages = ["es", "en", "pt-BR"] as const;
export type Language = (typeof languages)[number];
export function language(value: unknown): Language {
  return languages.includes(value as Language) ? (value as Language) : "es";
}
const es = {
  langName: "Idioma",
  skip: "Saltar al contenido",
  platform: "Plataforma",
  method: "Cómo funciona",
  questions: "Preguntas",
  login: "Iniciar sesión",
  parent: "Un producto de",
  light: "Usar tema claro",
  dark: "Usar tema oscuro",
  eyebrow: "VISIBILIDAD EXTERNA. DECISIONES CON CONTEXTO.",
  headline: "Tu superficie de ataque,",
  headlineAccent: "a la luz.",
  description:
    "Conecta tus dominios, entiende lo que expones y convierte cada hallazgo en una decisión informada. Hydra reúne descubrimiento, relaciones y evidencia en un mismo lugar.",
  primary: "Entrar a Hydra",
  secondary: "Conoce la plataforma",
  access: "Acceso para cuentas habilitadas",
  scroll: "MIRA MÁS ALLÁ DEL PERÍMETRO",
  artLabel:
    "Ilustración de dominios, servicios y relaciones conectados por evidencia.",
  artTitle: "Una superficie conectada",
  artCaption: "Vista ilustrativa · Sin datos de tu organización",
  artScope: "ALCANCE AUTORIZADO",
  artNode: "dominio",
  artEvidence: "EVIDENCIA",
  artSignal: "DNS · TLS · SERVICIOS",
  introLabel: "EL PANORAMA COMPLETO",
  introTitle: "La exposición cambia.\nTu perspectiva también.",
  introBody:
    "Un dominio puede conducir a un servicio olvidado, un certificado compartido o una configuración expuesta. Entiende esas conexiones antes de decidir tu siguiente paso.",
  capabilities: [
    {
      title: "Descubre lo que expones",
      text: "Explora dominios, subdominios y servicios visibles desde internet. Parte de un alcance definido y autorizado.",
      tag: "DESCUBRIMIENTO",
    },
    {
      title: "Conecta las señales",
      text: "Relaciona DNS, certificados e infraestructura. Conserva el contexto que explica por qué dos activos están conectados.",
      tag: "CONTEXTO",
    },
    {
      title: "Actúa con evidencia",
      text: "Investiga los hallazgos, revisa cambios y prepara reportes que tu equipo pueda llevar a la acción.",
      tag: "EVIDENCIA",
    },
  ],
  methodLabel: "UN PROCESO CON INTENCIÓN",
  methodTitle: "De un dominio\na una perspectiva clara.",
  methodBody:
    "El control empieza antes del primer escaneo y continúa después de cada resultado.",
  steps: [
    {
      title: "Define y verifica",
      text: "Establece el alcance y verifica la propiedad de tus dominios.",
    },
    {
      title: "Explora e investiga",
      text: "Solicita un escaneo autorizado y consulta sus resultados con contexto.",
    },
    {
      title: "Revisa y comparte",
      text: "Evalúa la evidencia, configura monitoreo y genera reportes para tu equipo.",
    },
  ],
  principleLabel: "EL ALCANCE IMPORTA",
  principleTitle: "Descubrir una relación\nno concede autorización.",
  principleBody:
    "Hydra distingue lo observado de lo autorizado. Una señal puede abrir una investigación; el permiso para escanear debe ser explícito.",
  principleNote: "Scope explícito. Evidencia trazable. Revisión humana.",
  faqLabel: "ANTES DE EMPEZAR",
  faqTitle: "Un poco más de claridad.",
  faqs: [
    {
      question: "¿Qué es EASM?",
      answer:
        "External Attack Surface Management es la gestión de la superficie de ataque externa: conocer qué activos y servicios de una organización son visibles desde internet, cómo se relacionan y qué exposiciones necesitan atención.",
    },
    {
      question: "¿Puedo escanear cualquier dominio?",
      answer:
        "Debes ser propietario del sistema o contar con autorización explícita. Hydra verifica el alcance en el backend; los activos descubiertos por correlación no se convierten automáticamente en objetivos autorizados.",
    },
    {
      question: "¿Cómo accedo a la aplicación?",
      answer:
        "La consola está disponible para cuentas habilitadas. Usa Iniciar sesión para conectar una API key de tu cuenta. Si todavía no tienes acceso, coordínalo con el administrador de tu organización.",
    },
    {
      question: "¿Cuál es la relación con Boqueron Labs?",
      answer:
        "Hydra es la plataforma EASM de Boqueron Labs. boqueronlabs.com es el sitio principal y hydra.boqueronlabs.com reúne esta presentación y el acceso a la aplicación.",
    },
  ],
  closingTitle: "Empieza por lo que es tuyo.",
  closingBody: "Dale contexto a tu superficie de ataque.",
  footerLine: "Claridad para proteger lo que construyes.",
  source: "Documentación de Hydra",
  copyright: "Un producto de Boqueron Labs.",
  illustration: "Ilustración conceptual",
  metaTitle: "Hydra — tu superficie de ataque, a la luz | Boqueron Labs",
  metaDescription:
    "Conoce Hydra, la plataforma EASM de Boqueron Labs. Descubrimiento de activos, relaciones con contexto y evidencia para investigar tu exposición externa.",
};
export type LandingCopy = typeof es;
const en: LandingCopy = {
  langName: "Language",
  skip: "Skip to content",
  platform: "Platform",
  method: "How it works",
  questions: "Questions",
  login: "Sign in",
  parent: "A product by",
  light: "Use light theme",
  dark: "Use dark theme",
  eyebrow: "EXTERNAL VISIBILITY. INFORMED DECISIONS.",
  headline: "Your attack surface,",
  headlineAccent: "brought to light.",
  description:
    "Connect your domains, understand your exposure and turn each finding into an informed decision. Hydra brings discovery, relationships and evidence into one place.",
  primary: "Open Hydra",
  secondary: "Explore the platform",
  access: "Access for enabled accounts",
  scroll: "LOOK BEYOND THE PERIMETER",
  artLabel:
    "Illustration of domains, services and relationships connected by evidence.",
  artTitle: "One connected surface",
  artCaption: "Illustrative view · No organization data",
  artScope: "AUTHORIZED SCOPE",
  artNode: "domain",
  artEvidence: "EVIDENCE",
  artSignal: "DNS · TLS · SERVICES",
  introLabel: "THE COMPLETE PICTURE",
  introTitle: "Exposure changes.\nSo does your perspective.",
  introBody:
    "A domain can lead to a forgotten service, a shared certificate or an exposed configuration. Understand those connections before choosing your next step.",
  capabilities: [
    {
      title: "Discover your exposure",
      text: "Explore internet-facing domains, subdomains and services. Begin with a defined, authorized scope.",
      tag: "DISCOVERY",
    },
    {
      title: "Connect the signals",
      text: "Link DNS, certificates and infrastructure. Keep the context that explains why two assets are connected.",
      tag: "CONTEXT",
    },
    {
      title: "Act on evidence",
      text: "Investigate findings, review changes and prepare reports your team can act on.",
      tag: "EVIDENCE",
    },
  ],
  methodLabel: "A DELIBERATE PROCESS",
  methodTitle: "From one domain\nto a clearer perspective.",
  methodBody:
    "Control begins before the first scan and continues after every result.",
  steps: [
    {
      title: "Define and verify",
      text: "Set your scope and verify ownership of your domains.",
    },
    {
      title: "Explore and investigate",
      text: "Request an authorized scan and review its results in context.",
    },
    {
      title: "Review and share",
      text: "Assess the evidence, configure monitoring and create reports for your team.",
    },
  ],
  principleLabel: "SCOPE MATTERS",
  principleTitle: "A discovered relationship\nis not authorization.",
  principleBody:
    "Hydra distinguishes observation from authorization. A signal can open an investigation; permission to scan must be explicit.",
  principleNote: "Explicit scope. Traceable evidence. Human review.",
  faqLabel: "BEFORE YOU BEGIN",
  faqTitle: "A little more clarity.",
  faqs: [
    {
      question: "What is EASM?",
      answer:
        "External Attack Surface Management means understanding which assets and services an organization exposes to the internet, how they relate and which exposures need attention.",
    },
    {
      question: "Can I scan any domain?",
      answer:
        "You must own the system or have explicit authorization. Hydra checks scope in the backend; assets discovered through correlation do not automatically become authorized targets.",
    },
    {
      question: "How do I access the application?",
      answer:
        "The console is available to enabled accounts. Use Sign in to connect an API key for your account. If you do not have access yet, contact your organization's administrator.",
    },
    {
      question: "How is Hydra related to Boqueron Labs?",
      answer:
        "Hydra is the EASM platform by Boqueron Labs. boqueronlabs.com is the main site; hydra.boqueronlabs.com hosts this introduction and access to the application.",
    },
  ],
  closingTitle: "Start with what is yours.",
  closingBody: "Put your attack surface in context.",
  footerLine: "Clarity to protect what you build.",
  source: "Hydra documentation",
  copyright: "A product by Boqueron Labs.",
  illustration: "Conceptual illustration",
  metaTitle: "Hydra — your attack surface, brought to light | Boqueron Labs",
  metaDescription:
    "Meet Hydra, the EASM platform by Boqueron Labs. Asset discovery, relationships in context and evidence to investigate your external exposure.",
};
const pt: LandingCopy = {
  langName: "Idioma",
  skip: "Pular para o conteúdo",
  platform: "Plataforma",
  method: "Como funciona",
  questions: "Perguntas",
  login: "Entrar",
  parent: "Um produto da",
  light: "Usar tema claro",
  dark: "Usar tema escuro",
  eyebrow: "VISIBILIDADE EXTERNA. DECISÕES COM CONTEXTO.",
  headline: "Sua superfície de ataque,",
  headlineAccent: "à luz.",
  description:
    "Conecte seus domínios, entenda sua exposição e transforme cada descoberta em uma decisão informada. O Hydra reúne descoberta, relações e evidências em um só lugar.",
  primary: "Acessar o Hydra",
  secondary: "Conheça a plataforma",
  access: "Acesso para contas habilitadas",
  scroll: "VEJA ALÉM DO PERÍMETRO",
  artLabel:
    "Ilustração de domínios, serviços e relações conectados por evidências.",
  artTitle: "Uma superfície conectada",
  artCaption: "Vista ilustrativa · Sem dados da organização",
  artScope: "ESCOPO AUTORIZADO",
  artNode: "domínio",
  artEvidence: "EVIDÊNCIAS",
  artSignal: "DNS · TLS · SERVIÇOS",
  introLabel: "A VISÃO COMPLETA",
  introTitle: "A exposição muda.\nSua perspectiva também.",
  introBody:
    "Um domínio pode levar a um serviço esquecido, um certificado compartilhado ou uma configuração exposta. Entenda essas conexões antes de decidir seu próximo passo.",
  capabilities: [
    {
      title: "Descubra sua exposição",
      text: "Explore domínios, subdomínios e serviços visíveis na internet. Comece com um escopo definido e autorizado.",
      tag: "DESCOBERTA",
    },
    {
      title: "Conecte os sinais",
      text: "Relacione DNS, certificados e infraestrutura. Preserve o contexto que explica por que dois ativos estão conectados.",
      tag: "CONTEXTO",
    },
    {
      title: "Aja com evidências",
      text: "Investigue descobertas, analise mudanças e prepare relatórios que sua equipe possa transformar em ação.",
      tag: "EVIDÊNCIAS",
    },
  ],
  methodLabel: "UM PROCESSO COM INTENÇÃO",
  methodTitle: "De um domínio\na uma perspectiva clara.",
  methodBody:
    "O controle começa antes da primeira varredura e continua depois de cada resultado.",
  steps: [
    {
      title: "Defina e verifique",
      text: "Estabeleça o escopo e verifique a propriedade dos seus domínios.",
    },
    {
      title: "Explore e investigue",
      text: "Solicite uma varredura autorizada e consulte seus resultados com contexto.",
    },
    {
      title: "Analise e compartilhe",
      text: "Avalie as evidências, configure o monitoramento e gere relatórios para sua equipe.",
    },
  ],
  principleLabel: "O ESCOPO IMPORTA",
  principleTitle: "Descobrir uma relação\nnão concede autorização.",
  principleBody:
    "O Hydra distingue o que foi observado do que foi autorizado. Um sinal pode abrir uma investigação; a permissão para uma varredura deve ser explícita.",
  principleNote: "Escopo explícito. Evidências rastreáveis. Revisão humana.",
  faqLabel: "ANTES DE COMEÇAR",
  faqTitle: "Um pouco mais de clareza.",
  faqs: [
    {
      question: "O que é EASM?",
      answer:
        "External Attack Surface Management é a gestão da superfície de ataque externa: entender quais ativos e serviços de uma organização estão visíveis na internet, como se relacionam e quais exposições precisam de atenção.",
    },
    {
      question: "Posso fazer uma varredura em qualquer domínio?",
      answer:
        "Você deve ser proprietário do sistema ou ter autorização explícita. O Hydra verifica o escopo no backend; ativos descobertos por correlação não se tornam automaticamente alvos autorizados.",
    },
    {
      question: "Como acesso a aplicação?",
      answer:
        "O console está disponível para contas habilitadas. Use Entrar para conectar uma chave de API da sua conta. Se ainda não tiver acesso, fale com o administrador da sua organização.",
    },
    {
      question: "Qual é a relação com a Boqueron Labs?",
      answer:
        "O Hydra é a plataforma EASM da Boqueron Labs. boqueronlabs.com é o site principal; hydra.boqueronlabs.com reúne esta apresentação e o acesso à aplicação.",
    },
  ],
  closingTitle: "Comece pelo que é seu.",
  closingBody: "Dê contexto à sua superfície de ataque.",
  footerLine: "Clareza para proteger o que você constrói.",
  source: "Documentação do Hydra",
  copyright: "Um produto da Boqueron Labs.",
  illustration: "Ilustração conceitual",
  metaTitle: "Hydra — sua superfície de ataque, à luz | Boqueron Labs",
  metaDescription:
    "Conheça o Hydra, a plataforma EASM da Boqueron Labs. Descoberta de ativos, relações com contexto e evidências para investigar sua exposição externa.",
};
export const copy: Record<Language, LandingCopy> = { es, en, "pt-BR": pt };
