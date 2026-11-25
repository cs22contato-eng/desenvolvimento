import { useState } from 'react';
import { motion } from 'motion/react';
import { CASE_STUDIES, PROCESS_STAGES } from '../data/studioData';

export function CasesAndProcessSection() {
  const [activeStageId, setActiveStageId] = useState<string>(PROCESS_STAGES[0].id);
  const activeStage =
    PROCESS_STAGES.find((stage) => stage.id === activeStageId) ?? PROCESS_STAGES[0];

  return (
    <>
      {/* Quantified Proof / Case Studies */}
      <section
        id="resultados"
        className="bg-[#F6F7F9] py-16 sm:py-20 lg:py-24 border-b border-[#11141A]/8"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-10 sm:mb-12">
            <p className="text-xs font-semibold tracking-wide text-[#C8510A]">
              Impacto em Produção
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#11141A] text-balance">
              Entregas orientadas a eficiência operacional e receita
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563]">
              Cada produto desenvolvido pela CS22 combina arquitetura enxuta com métricas claras de retorno.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 border border-[#11141A]/10 hover:border-[#E86A17]/40 transition-all duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#4B5563] mb-4">
                    <span className="font-semibold text-[#11141A]">{item.sector}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.deliveryWindow}</span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#11141A] mb-4">
                    {item.title}
                  </h3>

                  <div className="space-y-3 text-sm leading-relaxed text-[#3B4351] mb-6">
                    <p>
                      <strong className="font-semibold text-[#11141A]">Desafio:</strong>{' '}
                      {item.challenge}
                    </p>
                    <p>
                      <strong className="font-semibold text-[#11141A]">Arquitetura:</strong>{' '}
                      {item.architecture}
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#11141A]/8 space-y-3">
                  <div>
                    <div className="font-display text-2xl sm:text-3xl font-bold text-[#E86A17] tabular-nums">
                      {item.metricValue}
                    </div>
                    <div className="text-xs sm:text-sm text-[#11141A] font-medium">
                      {item.metricCaption}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-[#4B5563]">
                    {item.stack.join(' · ')}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Engineering Process */}
      <section
        id="processo"
        className="bg-white py-16 sm:py-20 lg:py-24 border-b border-[#11141A]/8"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-10 sm:mb-12">
            <p className="text-xs font-semibold tracking-wide text-[#C8510A]">
              Método de Engenharia
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#11141A] text-balance">
              Da concepção estratégica ao produto em produção
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563]">
              Explore as quatro etapas do nosso ciclo de desenvolvimento para entender o que é entregue em cada fase.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Stage selector list */}
            <div
              role="tablist"
              aria-label="Etapas do processo de desenvolvimento"
              className="lg:col-span-5 space-y-2.5"
            >
              {PROCESS_STAGES.map((stage) => {
                const isActive = stage.id === activeStageId;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveStageId(stage.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-[#11141A] text-white border-[#11141A] shadow-sm'
                        : 'bg-[#F8F9FB] text-[#11141A] border-[#11141A]/10 hover:bg-white hover:border-[#E86A17]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-semibold tabular-nums ${
                            isActive ? 'text-[#F5882B]' : 'text-[#C8510A]'
                          }`}
                        >
                          {stage.number}.
                        </span>
                        <span className="font-display text-base font-bold">{stage.title}</span>
                      </div>
                      <span
                        className={`text-xs whitespace-nowrap shrink-0 ${
                          isActive ? 'text-neutral-300' : 'text-[#4B5563]'
                        }`}
                      >
                        {stage.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active stage inspection panel */}
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              role="tabpanel"
              className="lg:col-span-7 rounded-2xl bg-[#F8F9FB] border border-[#11141A]/10 p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#11141A]/8">
                <div className="text-xs font-semibold text-[#C8510A]">
                  Etapa {activeStage.number} · {activeStage.duration}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#11141A]">
                  {activeStage.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#3B4351]">
                  {activeStage.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#11141A]/8">
                <div className="text-xs font-semibold text-[#11141A] mb-3">
                  Principais entregáveis desta etapa
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeStage.artifacts.map((artifact, idx) => (
                    <div
                      key={artifact}
                      className="rounded-xl bg-white border border-[#11141A]/8 p-3.5 text-sm text-[#11141A]"
                    >
                      <span className="block font-mono text-xs text-[#E86A17] mb-1 tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="font-medium">{artifact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
