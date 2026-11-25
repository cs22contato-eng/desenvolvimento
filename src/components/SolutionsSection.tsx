import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import {
  SOLUTION_FILTERS,
  SOLUTIONS,
  SolutionCategory,
} from '../data/studioData';
import { buildWhatsAppUrl, filterSolutionsByCategory } from '../utils/projectEstimator';

export function SolutionsSection() {
  const [activeFilter, setActiveFilter] = useState<SolutionCategory>('todas');
  const filteredSolutions = filterSolutionsByCategory(SOLUTIONS, activeFilter);

  return (
    <section
      id="solucoes"
      className="bg-white py-16 sm:py-20 lg:py-24 border-b border-[#11141A]/8"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Segmented Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[#C8510A]">
              Capacidades & Arquitetura
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#11141A] text-balance">
              Soluções digitais sob medida para cada estágio do negócio
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563]">
              Exibindo <span className="font-semibold text-[#11141A] tabular-nums">{filteredSolutions.length}</span>{' '}
              {filteredSolutions.length === 1 ? 'frente de entrega' : 'frentes de entrega'} · Selecione uma solução para preencher seu briefing técnico.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filtrar soluções por categoria"
            className="inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 rounded-xl bg-[#F2F4F7] border border-[#11141A]/8 self-start lg:self-auto shrink-0"
          >
            {SOLUTION_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={isActive}
                  className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#11141A] shadow-xs'
                      : 'text-[#4B5563] hover:text-[#11141A]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div
          className={`grid grid-cols-1 gap-6 ${
            activeFilter === 'todas'
              ? 'lg:grid-cols-3'
              : filteredSolutions.length === 1
                ? 'lg:grid-cols-1 max-w-3xl'
                : 'lg:grid-cols-2'
          }`}
        >
          {filteredSolutions.map((solution, index) => {
            const isWide = activeFilter === 'todas' && solution.spanWide;
            const whatsappUrl = buildWhatsAppUrl(
              `Olá, equipe CS22! Gostaria de falar sobre: ${solution.title}.`
            );

            return (
              <motion.article
                key={solution.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 border transition-all duration-200 hover:-translate-y-1 bg-[#F8F9FB] border-[#11141A]/10 hover:bg-white hover:border-[#E86A17]/45 hover:shadow-[0_14px_34px_rgba(17,20,26,0.06)] ${
                  isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div>
                  {/* Clean unboxed editorial metadata */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[#4B5563] mb-3">
                    <span className="font-mono font-semibold text-[#C8510A] tabular-nums">
                      {solution.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{solution.categoryLabel}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#11141A] tracking-tight mb-3">
                    {solution.title}
                  </h3>

                  <p className="text-sm sm:text-base leading-relaxed text-[#3B4351] mb-6 max-w-2xl">
                    {solution.summary}
                  </p>

                  {/* Deliverables list separated cleanly by hairline */}
                  <ul className="space-y-2.5 pt-5 border-t border-[#11141A]/8 mb-6">
                    {solution.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#11141A]"
                      >
                        <Check
                          aria-hidden="true"
                          className="h-4 w-4 text-[#E86A17] shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#11141A]/8 flex flex-col gap-3">
                  <span className="text-xs text-[#4B5563]">
                    Indicado para: <strong className="font-medium text-[#11141A]">{solution.idealFor}</strong>
                  </span>

                  <div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer bg-white border border-[#11141A]/14 text-[#11141A] hover:bg-[#E86A17] hover:text-white hover:border-[#E86A17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E86A17]"
                    >
                      <span>Solicitar pelo WhatsApp</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
