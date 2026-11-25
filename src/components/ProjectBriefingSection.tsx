import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, Layers, MessageCircle, RotateCcw } from 'lucide-react';
import { ProjectTypeKey } from '../data/studioData';
import {
  BriefingValidationErrors,
  buildBriefingWhatsAppMessage,
  buildWhatsAppUrl,
  computeArchitectureBlueprint,
  MODULE_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
  TimelineKey,
  validateBriefingForm,
} from '../utils/projectEstimator';

interface SubmittedRecord {
  name: string;
  company: string;
  email: string;
  phone: string;
  description: string;
  projectTypeLabel: string;
  estimatedWindow: string;
  whatsappUrl: string;
}

export function ProjectBriefingSection() {
  const [projectType, setProjectType] = useState<ProjectTypeKey>('site');
  const [timeline, setTimeline] = useState<TimelineKey>('padrao');
  const [selectedModules, setSelectedModules] = useState<string[]>(['analytics']);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<BriefingValidationErrors>({});
  const [submitted, setSubmitted] = useState<SubmittedRecord | null>(null);

  const blueprint = computeArchitectureBlueprint(projectType, timeline, selectedModules);
  const blueprintWhatsAppUrl = buildWhatsAppUrl(
    buildBriefingWhatsAppMessage({ blueprint })
  );

  const toggleModule = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateBriefingForm({
      name,
      company,
      email,
      phone,
      description,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const whatsappUrl = buildWhatsAppUrl(
      buildBriefingWhatsAppMessage({
        blueprint,
        values: { name, company, email, phone, description },
      })
    );

    setErrors({});
    setSubmitted({
      name: name.trim(),
      company: company.trim() || 'Projeto independente',
      email: email.trim(),
      phone: phone.trim(),
      description: description.trim(),
      projectTypeLabel: blueprint.projectTypeLabel,
      estimatedWindow: blueprint.estimatedWindow,
      whatsappUrl,
    });
  };

  const handleReset = () => {
    setSubmitted(null);
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setDescription('');
    setErrors({});
  };

  return (
    <section
      id="contato"
      className="bg-[#F6F7F9] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3 mb-10 sm:mb-12">
          <p className="text-xs font-semibold tracking-wide text-[#C8510A]">
            Planejamento & Contato
          </p>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#11141A] text-balance">
            Estruture o escopo da sua solução digital
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563]">
            Configure o formato do produto para visualizar uma estimativa técnica imediata e envie seu briefing para nossa equipe de engenharia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column: Interactive scope configurator + live technical blueprint */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-white border border-[#11141A]/10 p-6 space-y-6">
              <div>
                <div className="text-xs font-semibold text-[#11141A] mb-2.5">
                  1. Tipo de solução
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {PROJECT_TYPE_OPTIONS.map((option) => {
                    const isSelected = projectType === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setProjectType(option.id)}
                        className={`min-h-[42px] px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#11141A] text-white border-[#11141A]'
                            : 'bg-[#F8F9FB] text-[#11141A] border-[#11141A]/10 hover:border-[#E86A17]/45'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-[#11141A] mb-2.5">
                  2. Ritmo de entrega
                </div>
                <div className="space-y-2">
                  {TIMELINE_OPTIONS.map((item) => {
                    const isSelected = timeline === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setTimeline(item.id)}
                        className={`w-full min-h-[42px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF7F1] text-[#11141A] border-[#E86A17]'
                            : 'bg-[#F8F9FB] text-[#3B4351] border-[#11141A]/10 hover:border-[#11141A]/25'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-[#11141A] mb-2.5">
                  3. Módulos necessários
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MODULE_OPTIONS.map((mod) => {
                    const active = selectedModules.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleModule(mod.id)}
                        className={`min-h-[40px] px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-[#11141A] text-white border-[#11141A]'
                            : 'bg-white text-[#3B4351] border-[#11141A]/12 hover:border-[#E86A17]/40'
                        }`}
                      >
                        {mod.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Dynamic Architecture Blueprint Readout */}
            <div
              data-testid="architecture-blueprint"
              className="rounded-2xl bg-[#11141A] text-white p-6 space-y-4 border border-[#11141A]"
            >
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#F5882B]">
                  <Layers className="h-4 w-4" />
                  <span>Prévia da arquitetura sugerida</span>
                </div>
                <span className="text-xs text-neutral-400">
                  Complexidade {blueprint.complexityTier}
                </span>
              </div>

              <div>
                <div className="text-xs text-neutral-400">Horizonte estimado</div>
                <div className="font-display text-xl font-bold text-white mt-0.5 tabular-nums">
                  {blueprint.estimatedWindow}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {blueprint.architectureSummary} {blueprint.sprintCadence}.
              </p>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                <div className="text-neutral-400">
                  Stack recomendada:{' '}
                  <span className="text-neutral-100 font-mono">
                    {blueprint.stack.join(' · ')}
                  </span>
                </div>
                {blueprint.activeLayerTags.length > 0 && (
                  <div className="text-neutral-400">
                    Camadas incluídas:{' '}
                    <span className="text-[#F5882B]">
                      {blueprint.activeLayerTags.join(' · ')}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <a
                  href={blueprintWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-[#E86A17] hover:bg-[#C8510A] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Enviar escopo pelo WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right column: Validated Lead Capture Form */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-[#11141A]/10 p-6 sm:p-8">
            {submitted ? (
              <div
                data-testid="briefing-confirmation"
                className="py-8 sm:py-12 space-y-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF3EB] text-[#E86A17]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold text-[#11141A]">
                    Briefing técnico registrado com sucesso
                  </h3>
                  <p className="text-sm sm:text-base text-[#3B4351] max-w-xl">
                    Obrigado, <strong className="font-semibold text-[#11141A]">{submitted.name}</strong>.
                    Recebemos os dados do projeto para{' '}
                    <strong className="font-semibold text-[#11141A]">{submitted.company}</strong> e
                    encaminharemos uma resposta inicial para{' '}
                    <span className="font-medium text-[#11141A]">{submitted.email}</span>.
                  </p>
                </div>

                <div className="rounded-xl bg-[#F8F9FB] border border-[#11141A]/8 p-5 space-y-2 text-sm">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="text-[#4B5563]">Formato selecionado</span>
                    <span className="font-semibold text-[#11141A]">
                      {submitted.projectTypeLabel}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="text-[#4B5563]">Estimativa inicial</span>
                    <span className="font-semibold text-[#E86A17] tabular-nums">
                      {submitted.estimatedWindow}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={submitted.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#E86A17] hover:bg-[#C8510A] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Continuar no WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg border border-[#11141A]/15 text-sm font-semibold text-[#11141A] hover:bg-[#F5F6F8] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Enviar nova solicitação</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="pb-4 border-b border-[#11141A]/8">
                  <h3 className="font-display text-xl font-bold text-[#11141A]">
                    Conte sobre o seu projeto
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                    Preencha os campos abaixo para receber um diagnóstico técnico e proposta de arquitetura.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="briefing-name"
                      className="block text-xs font-semibold text-[#11141A] mb-1.5"
                    >
                      Nome completo *
                    </label>
                    <input
                      id="briefing-name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex.: Mariana Costa"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#11141A]/15 bg-[#F8F9FB] focus:bg-white text-sm text-[#11141A] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E86A17]"
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1 text-xs font-medium text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="briefing-company"
                      className="block text-xs font-semibold text-[#11141A] mb-1.5"
                    >
                      Empresa ou projeto
                    </label>
                    <input
                      id="briefing-company"
                      name="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex.: Grupo Horizonte"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#11141A]/15 bg-[#F8F9FB] focus:bg-white text-sm text-[#11141A] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E86A17]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="briefing-email"
                      className="block text-xs font-semibold text-[#11141A] mb-1.5"
                    >
                      E-mail profissional *
                    </label>
                    <input
                      id="briefing-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@empresa.com.br"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#11141A]/15 bg-[#F8F9FB] focus:bg-white text-sm text-[#11141A] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E86A17]"
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1 text-xs font-medium text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="briefing-phone"
                      className="block text-xs font-semibold text-[#11141A] mb-1.5"
                    >
                      WhatsApp / Telefone
                    </label>
                    <input
                      id="briefing-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#11141A]/15 bg-[#F8F9FB] focus:bg-white text-sm text-[#11141A] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E86A17]"
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1 text-xs font-medium text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="briefing-description"
                    className="block text-xs font-semibold text-[#11141A] mb-1.5"
                  >
                    Objetivo do projeto e principais desafios *
                  </label>
                  <textarea
                    id="briefing-description"
                    name="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva o problema que deseja resolver, quem utilizará o sistema e os principais fluxos esperados."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#11141A]/15 bg-[#F8F9FB] focus:bg-white text-sm text-[#11141A] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E86A17]"
                  />
                  {errors.description && (
                    <p role="alert" className="mt-1 text-xs font-medium text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-[#4B5563]">
                    Escopo configurado: <strong className="text-[#11141A]">{blueprint.projectTypeLabel}</strong> ·{' '}
                    <span className="tabular-nums">{blueprint.estimatedWindow}</span>
                  </span>

                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 rounded-lg bg-[#E86A17] hover:bg-[#C8510A] text-white text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E86A17]"
                  >
                    <span>Solicitar diagnóstico técnico</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
