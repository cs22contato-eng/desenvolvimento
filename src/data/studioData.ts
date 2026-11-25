export const BRAND_ASSETS = {
  iconMark: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_23.47.17_7b9a96a4.jpeg',
  fullWordmark: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_23.47.16__1__d4378a43.jpeg',
  email: 'cs22.contato@gmail.com',
  whatsappNumber: '5518991621455',
  whatsappDisplay: '(18) 99162-1455',
} as const;

export type SolutionCategory = 'todas' | 'web' | 'mobile' | 'saas';

export type ProjectTypeKey = 'site' | 'app' | 'microapp' | 'microsaas';

export interface SolutionItem {
  id: string;
  number: string;
  category: Exclude<SolutionCategory, 'todas'>;
  categoryLabel: string;
  projectTypeKey: ProjectTypeKey;
  title: string;
  summary: string;
  deliverables: string[];
  idealFor: string;
  spanWide?: boolean;
  defaultModules: string[];
}

export interface HeroShowcaseMode {
  id: Exclude<SolutionCategory, 'todas'>;
  label: string;
  headline: string;
  architectureNote: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  layers: {
    name: string;
    detail: string;
  }[];
  codePreview: string[];
}

export interface StudioMetric {
  id: string;
  numericTarget: number;
  prefix?: string;
  suffix: string;
  label: string;
  context: string;
}

export interface CaseStudy {
  id: string;
  sector: string;
  deliveryWindow: string;
  title: string;
  challenge: string;
  architecture: string;
  metricValue: string;
  metricCaption: string;
  stack: string[];
}

export interface ProcessStage {
  id: string;
  number: string;
  title: string;
  duration: string;
  summary: string;
  artifacts: string[];
}

export const HERO_MODES: HeroShowcaseMode[] = [
  {
    id: 'web',
    label: 'Web & Sites',
    headline: 'Arquitetura web de alta conversão',
    architectureNote: 'Renderização otimizada, SEO técnico estruturado e design system exclusivo.',
    primaryMetricLabel: 'Tempo de carregamento',
    primaryMetricValue: '0,6s',
    secondaryMetricLabel: 'Conversão em leads',
    secondaryMetricValue: '+142%',
    layers: [
      { name: 'Camada de Interface', detail: 'React · TypeScript · Design tokens CS22' },
      { name: 'SEO & Indexação', detail: 'Schema estruturado · Core Web Vitals A+' },
      { name: 'Captação & Conversão', detail: 'Formulários estruturados · Validação nativa' },
    ],
    codePreview: [
      'export async function createPipeline(input: LeadInput) {',
      '  const data = validateSchema(input);',
      '  await saveLeadRequest(data, { priority: "high" });',
      '  return { status: "scheduled", slaMinutes: 15 };',
      '}',
    ],
  },
  {
    id: 'mobile',
    label: 'Aplicativos',
    headline: 'Experiência mobile fluida e resiliente',
    architectureNote: 'Aplicativos iOS, Android e PWA com sincronização offline e notificações.',
    primaryMetricLabel: 'Retenção em 90 dias',
    primaryMetricValue: '84%',
    secondaryMetricLabel: 'Sincronização',
    secondaryMetricValue: 'Offline-first',
    layers: [
      { name: 'Experiência Mobile', detail: 'Gestos nativos · Interface responsiva 60fps' },
      { name: 'Armazenamento Local', detail: 'Cache encriptado · Fila de sincronização' },
      { name: 'Nuvem & Notificações', detail: 'Push transacional · Biometria e sessão segura' },
    ],
    codePreview: [
      'const syncQueue = createOfflineStore({',
      '  encryption: "AES-256-GCM",',
      '  retryPolicy: "exponential-backoff",',
      '  onReconnect: flushPendingOperations,',
      '});',
    ],
  },
  {
    id: 'saas',
    label: 'Micro SaaS',
    headline: 'Produtos digitais prontos para escalar',
    architectureNote: 'Multi-tenancy, cobrança recorrente e fluxos operacionais automatizados.',
    primaryMetricLabel: 'Redução operacional',
    primaryMetricValue: '-68%',
    secondaryMetricLabel: 'Disponibilidade',
    secondaryMetricValue: '99,9%',
    layers: [
      { name: 'Núcleo Multi-Tenant', detail: 'Isolamento de dados · Controle de acesso RBAC' },
      { name: 'Motor de Automação', detail: 'Filas assíncronas · Regras e rotinas em nuvem' },
      { name: 'Faturamento Recorrente', detail: 'Planos, assinaturas e faturas automatizadas' },
    ],
    codePreview: [
      'export const billingEngine = defineSubscription({',
      '  tenants: "isolated-schema",',
      '  metering: ["workflows", "active_seats"],',
      '  settlement: "automated-monthly",',
      '});',
    ],
  },
];

export const STUDIO_METRICS: StudioMetric[] = [
  {
    id: 'custom-code',
    numericTarget: 100,
    suffix: '%',
    label: 'Engenharia sob medida',
    context: 'Código proprietário sem templates engessados',
  },
  {
    id: 'api-latency',
    numericTarget: 240,
    prefix: '< ',
    suffix: 'ms',
    label: 'Resposta média do sistema',
    context: 'Arquitetura orientada a baixa latência',
  },
  {
    id: 'delivery-cycle',
    numericTarget: 6,
    suffix: ' sem',
    label: 'Ciclo inicial de entrega',
    context: 'Do mapeamento técnico ao primeiro deploy',
  },
  {
    id: 'uptime-sla',
    numericTarget: 99,
    suffix: ',9%',
    label: 'Estabilidade em produção',
    context: 'Monitoramento contínuo e deploys seguros',
  },
];

export const SOLUTION_FILTERS: { id: SolutionCategory; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'web', label: 'Web & Sites' },
  { id: 'mobile', label: 'Aplicativos' },
  { id: 'saas', label: 'Micro SaaS & Automação' },
];

export const SOLUTIONS: SolutionItem[] = [
  {
    id: 'sites-plataformas',
    number: '01.',
    category: 'web',
    categoryLabel: 'Web & Plataformas',
    projectTypeKey: 'site',
    title: 'Sites Profissionais & Portais Corporativos',
    summary:
      'Presença digital de engenharia superior para empresas que exigem autoridade, velocidade extrema e captação estruturada de oportunidades.',
    deliverables: [
      'Design system institucional sob medida',
      'Arquitetura SEO técnica e performance A+',
      'Fluxos estruturados de captação e conversão',
    ],
    idealFor: 'Empresas B2B, indústrias e marcas em expansão',
    spanWide: true,
    defaultModules: ['cms', 'analytics'],
  },
  {
    id: 'aplicativos-mobile',
    number: '02.',
    category: 'mobile',
    categoryLabel: 'Aplicativos',
    projectTypeKey: 'app',
    title: 'Aplicativos Mobile & Multiplataforma',
    summary:
      'Aplicativos para iOS, Android e Web App focados em retenção, operação em campo e experiência fluida para clientes ou equipes.',
    deliverables: [
      'Interfaces responsivas e navegação intuitiva',
      'Autenticação segura e notificações push',
      'Sincronização em nuvem com suporte offline',
    ],
    idealFor: 'Operações em campo, serviços e produtos B2C',
    spanWide: false,
    defaultModules: ['auth', 'analytics'],
  },
  {
    id: 'micro-aplicacoes',
    number: '03.',
    category: 'saas',
    categoryLabel: 'Micro SaaS & Automação',
    projectTypeKey: 'microapp',
    title: 'Micro Aplicações & Automação Operacional',
    summary:
      'Ferramentas internas, portais de cliente e fluxos automatizados sob medida para eliminar planilhas paralelas e gargalos manuais.',
    deliverables: [
      'Automação de rotinas operacionais e financeiras',
      'Painéis operacionais com permissões por perfil',
      'Alertas, relatórios e rotinas programadas',
    ],
    idealFor: 'Operações com processos manuais recorrentes',
    spanWide: false,
    defaultModules: ['admin', 'automation'],
  },
  {
    id: 'micro-saas',
    number: '04.',
    category: 'saas',
    categoryLabel: 'Micro SaaS & Automação',
    projectTypeKey: 'microsaas',
    title: 'Micro SaaS & Produtos Digitais Escaláveis',
    summary:
      'Concepção e engenharia completa de softwares como serviço, da arquitetura multi-tenant ao faturamento recorrente em produção.',
    deliverables: [
      'Arquitetura multi-tenant e gestão de assinaturas',
      'Onboarding de clientes e painel administrativo',
      'Telemetria de uso e base preparada para escala',
    ],
    idealFor: 'Empreendedores, startups e novas verticais digitais',
    spanWide: true,
    defaultModules: ['auth', 'admin', 'payments', 'automation'],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'logistica-b2b',
    sector: 'Logística & Operações',
    deliveryWindow: 'Entregue em 7 semanas',
    title: 'Portal operacional e automação de despachos',
    challenge:
      'Acompanhamento de pedidos fragmentado entre planilhas e e-mails gerava retrabalho diário na expedição.',
    architecture:
      'Micro aplicação web sob medida com fila de validação automática, histórico auditável e painel operacional em tempo real.',
    metricValue: '-68%',
    metricCaption: 'no tempo operacional de conferência em 90 dias',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'plataforma-industrial',
    sector: 'Engenharia & Indústria',
    deliveryWindow: 'Entregue em 5 semanas',
    title: 'Plataforma institucional e configurador técnico B2B',
    challenge:
      'Site anterior genérico não traduzia capacidade técnica e obrigava engenheiros comerciais a filtrar solicitações incompletas.',
    architecture:
      'Plataforma institucional de alta performance com qualificador técnico interativo para captação comercial estruturada.',
    metricValue: '+145%',
    metricCaption: 'em solicitações comerciais qualificadas em 6 meses',
    stack: ['React', 'Tailwind CSS', 'SEO Técnico', 'Performance A+'],
  },
  {
    id: 'micro-saas-recorrente',
    sector: 'SaaS Financeiro',
    deliveryWindow: 'Entregue em 9 semanas',
    title: 'Micro SaaS de conciliação e gestão de assinaturas',
    challenge:
      'Transformar uma metodologia proprietária de auditoria financeira em um produto digital comercializável para múltiplas empresas.',
    architecture:
      'Aplicação multi-tenant com importação automatizada, regras de conciliação e gestão de cobrança recorrente.',
    metricValue: '42.000+',
    metricCaption: 'transações mensais processadas automaticamente',
    stack: ['Multi-tenant', 'Assinaturas', 'PostgreSQL', 'Dashboards'],
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Descoberta & Arquitetura',
    duration: 'Semana 1',
    summary:
      'Mapeamos regras de negócio, fluxos críticos, jornadas de uso e objetivos comerciais antes de escrever a primeira linha de código.',
    artifacts: ['Escopo funcional enxuto', 'Desenho de arquitetura e dados', 'Cronograma por entregas'],
  },
  {
    id: 'ux-prototype',
    number: '02',
    title: 'Interface & Prototipagem',
    duration: 'Semana 2',
    summary:
      'Estruturamos fluxos navegáveis, hierarquia de informação e identidade visual alinhada à marca para validar usabilidade com clareza.',
    artifacts: ['Fluxos de navegação', 'Sistema visual responsivo', 'Validação antecipada de telas'],
  },
  {
    id: 'engineering',
    number: '03',
    title: 'Engenharia Full-Stack',
    duration: 'Semanas 3 a 6',
    summary:
      'Desenvolvimento modular em sprints curtas com código limpo, testes automatizados de regras críticas e revisões contínuas em ambiente de homologação.',
    artifacts: ['Front-end e regras de negócio', 'Testes de fluxo e segurança', 'Acompanhamento semanal'],
  },
  {
    id: 'launch-scale',
    number: '04',
    title: 'Deploy & Evolução Contínua',
    duration: 'Go-live + Suporte',
    summary:
      'Publicação com monitoramento, documentação técnica e base preparada para novas funcionalidades conforme o produto ganha tração.',
    artifacts: ['Deploy em produção', 'Observabilidade e backups', 'Roadmap de evolução técnica'],
  },
];
