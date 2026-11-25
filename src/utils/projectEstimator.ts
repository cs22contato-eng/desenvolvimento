import { ProjectTypeKey, SolutionCategory, SolutionItem } from '../data/studioData';

export type TimelineKey = 'rapido' | 'padrao' | 'evolutivo';

export interface ProjectModuleOption {
  id: string;
  label: string;
  complexityWeight: number;
  layerTag: string;
}

export const PROJECT_TYPE_OPTIONS: {
  id: ProjectTypeKey;
  label: string;
  baseWeeksMin: number;
  baseWeeksMax: number;
  architectureSummary: string;
  recommendedStack: string[];
}[] = [
  {
    id: 'site',
    label: 'Site Profissional',
    baseWeeksMin: 3,
    baseWeeksMax: 5,
    architectureSummary: 'Plataforma web de alta velocidade com SEO técnico e captação estruturada.',
    recommendedStack: ['React + TypeScript', 'Edge CDN', 'SEO Técnico'],
  },
  {
    id: 'app',
    label: 'Aplicativo Mobile',
    baseWeeksMin: 6,
    baseWeeksMax: 10,
    architectureSummary: 'Aplicativo multiplataforma com autenticação, sync em nuvem e push.',
    recommendedStack: ['Mobile Híbrido / PWA', 'Sync em Nuvem', 'Storage Seguro'],
  },
  {
    id: 'microapp',
    label: 'Micro Aplicação',
    baseWeeksMin: 4,
    baseWeeksMax: 7,
    architectureSummary: 'Sistema enxuto focado em automação de fluxo interno ou portal B2B.',
    recommendedStack: ['Web App Modular', 'Filas & Automação', 'Banco Relacional'],
  },
  {
    id: 'microsaas',
    label: 'Micro SaaS',
    baseWeeksMin: 7,
    baseWeeksMax: 12,
    architectureSummary: 'Produto digital multi-tenant preparado para receita recorrente e escala.',
    recommendedStack: ['Arquitetura Multi-Tenant', 'Billing Recorrente', 'Cloud Database'],
  },
];

export const TIMELINE_OPTIONS: {
  id: TimelineKey;
  label: string;
  sprintCadence: string;
}[] = [
  { id: 'rapido', label: 'MVP enxuto (4–6 sem)', sprintCadence: 'Sprints semanais focadas no núcleo essencial' },
  { id: 'padrao', label: 'Estrutura completa (6–10 sem)', sprintCadence: 'Ciclo completo com validação e QA dedicado' },
  { id: 'evolutivo', label: 'Evolução contínua', sprintCadence: 'Squad dedicada para entregas progressivas mensais' },
];

export const MODULE_OPTIONS: ProjectModuleOption[] = [
  { id: 'auth', label: 'Autenticação & Perfis', complexityWeight: 1, layerTag: 'Segurança RBAC' },
  { id: 'admin', label: 'Painel Administrativo', complexityWeight: 1, layerTag: 'Gestão & Dados' },
  { id: 'automation', label: 'Automação de Fluxos', complexityWeight: 2, layerTag: 'Automação' },
  { id: 'payments', label: 'Pagamentos / Assinaturas', complexityWeight: 2, layerTag: 'Faturamento' },
  { id: 'cms', label: 'Gestão de Conteúdo', complexityWeight: 1, layerTag: 'Conteúdo' },
  { id: 'analytics', label: 'Métricas & Conversão', complexityWeight: 1, layerTag: 'Telemetria' },
];

export interface ArchitectureBlueprint {
  projectTypeLabel: string;
  estimatedWindow: string;
  complexityTier: 'Enxuta' | 'Intermediária' | 'Completa';
  architectureSummary: string;
  sprintCadence: string;
  stack: string[];
  activeLayerTags: string[];
}

export interface BriefingFormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  description: string;
}

export interface BriefingValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
}

export function filterSolutionsByCategory(
  solutions: SolutionItem[],
  category: SolutionCategory
): SolutionItem[] {
  if (category === 'todas') {
    return solutions;
  }
  return solutions.filter((item) => item.category === category);
}

export function computeArchitectureBlueprint(
  projectType: ProjectTypeKey,
  timeline: TimelineKey,
  selectedModules: string[]
): ArchitectureBlueprint {
  const typeMeta =
    PROJECT_TYPE_OPTIONS.find((item) => item.id === projectType) ?? PROJECT_TYPE_OPTIONS[0];
  const timelineMeta =
    TIMELINE_OPTIONS.find((item) => item.id === timeline) ?? TIMELINE_OPTIONS[1];

  const activeModules = MODULE_OPTIONS.filter((mod) => selectedModules.includes(mod.id));
  const moduleWeight = activeModules.reduce((acc, mod) => acc + mod.complexityWeight, 0);

  const extraWeeks = Math.floor(moduleWeight / 2);
  let minWeeks = typeMeta.baseWeeksMin + extraWeeks;
  let maxWeeks = typeMeta.baseWeeksMax + extraWeeks;

  if (timeline === 'rapido') {
    minWeeks = Math.max(3, minWeeks - 1);
    maxWeeks = Math.max(minWeeks + 1, maxWeeks - 2);
  } else if (timeline === 'evolutivo') {
    minWeeks = typeMeta.baseWeeksMin;
    maxWeeks = typeMeta.baseWeeksMax + extraWeeks + 2;
  }

  let complexityTier: ArchitectureBlueprint['complexityTier'] = 'Enxuta';
  if (moduleWeight >= 5 || projectType === 'microsaas') {
    complexityTier = 'Completa';
  } else if (moduleWeight >= 2 || projectType === 'app') {
    complexityTier = 'Intermediária';
  }

  const estimatedWindow =
    timeline === 'evolutivo'
      ? `Primeira versão em ${minWeeks} semanas · evolução mensal`
      : `${minWeeks} a ${maxWeeks} semanas`;

  return {
    projectTypeLabel: typeMeta.label,
    estimatedWindow,
    complexityTier,
    architectureSummary: typeMeta.architectureSummary,
    sprintCadence: timelineMeta.sprintCadence,
    stack: typeMeta.recommendedStack,
    activeLayerTags: activeModules.map((mod) => mod.layerTag),
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateBriefingForm(values: BriefingFormValues): {
  isValid: boolean;
  errors: BriefingValidationErrors;
} {
  const errors: BriefingValidationErrors = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Informe seu nome completo para contato.';
  }

  if (!values.email.trim()) {
    errors.email = 'Informe um e-mail válido.';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Formato de e-mail inválido. Ex.: nome@empresa.com.br';
  }

  const digits = values.phone.replace(/\D/g, '');
  if (values.phone.trim() && (digits.length < 10 || digits.length > 13)) {
    errors.phone = 'Informe um telefone ou WhatsApp com DDD (10 a 11 dígitos).';
  }

  if (!values.description.trim() || values.description.trim().length < 15) {
    errors.description = 'Descreva brevemente o objetivo do projeto (mínimo de 15 caracteres).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export const CS22_WHATSAPP_NUMBER = '5518991621455';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CS22_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildBriefingWhatsAppMessage(params: {
  blueprint: ArchitectureBlueprint;
  values?: Partial<BriefingFormValues>;
}): string {
  const { blueprint, values } = params;
  const lines = [
    'Olá, equipe CS22! Gostaria de iniciar um projeto digital.',
    `• Solução: ${blueprint.projectTypeLabel}`,
    `• Estimativa: ${blueprint.estimatedWindow}`,
  ];

  if (blueprint.activeLayerTags.length > 0) {
    lines.push(`• Módulos: ${blueprint.activeLayerTags.join(', ')}`);
  }

  if (values?.name?.trim()) {
    lines.push(`• Nome: ${values.name.trim()}`);
  }
  if (values?.company?.trim()) {
    lines.push(`• Empresa: ${values.company.trim()}`);
  }
  if (values?.email?.trim()) {
    lines.push(`• E-mail: ${values.email.trim()}`);
  }
  if (values?.phone?.trim()) {
    lines.push(`• Telefone: ${values.phone.trim()}`);
  }
  if (values?.description?.trim()) {
    lines.push(`• Resumo: ${values.description.trim()}`);
  }

  return lines.join('\n');
}
