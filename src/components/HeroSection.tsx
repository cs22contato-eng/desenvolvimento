import { useRef, useState } from 'react';
import { ArrowRight, Code2, Cpu, Layers, Smartphone } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BRAND_ASSETS, HERO_MODES, SolutionCategory } from '../data/studioData';
import { buildWhatsAppUrl } from '../utils/projectEstimator';

const HEADLINE_WORDS = ['Transformamos', 'ideias', 'em', 'soluções', 'digitais.'];
const WHATSAPP_HERO_URL = buildWhatsAppUrl(
  'Olá, equipe CS22! Quero desenvolver meu projeto digital.'
);

export function HeroSection() {
  const [activeModeId, setActiveModeId] = useState<Exclude<SolutionCategory, 'todas'>>('web');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const cardDepthY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const activeMode = HERO_MODES.find((m) => m.id === activeModeId) ?? HERO_MODES[0];

  const handleScrollToSolutions = () => {
    const target = document.getElementById('solucoes');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="topo"
      ref={sectionRef}
      className="relative overflow-hidden bg-white border-b border-[#11141A]/8"
    >
      {/* Architectural light grid + subtle parallax backdrop */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgParallaxY }}
        className="pointer-events-none absolute inset-0 bg-tech-grid opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[440px] w-[540px] rounded-full bg-gradient-to-br from-[#E86A17]/8 via-[#F5882B]/4 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left column: Value proposition & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-semibold tracking-wide text-[#C8510A] mb-4"
            >
              CS22 · Desenvolvimento Digital
            </motion.p>

            <h1 className="font-display font-bold tracking-tight text-[#11141A] text-[clamp(2.25rem,4.1vw,3.75rem)] leading-[1.08] text-balance mb-6">
              {HEADLINE_WORDS.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block mr-[0.26em] ${
                    idx >= 3 ? 'text-[#E86A17]' : 'text-[#11141A]'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg leading-relaxed text-[#47505E] max-w-xl mb-8"
            >
              Desenvolvemos sites, aplicativos e produtos digitais sob medida para empresas que
              querem inovar, automatizar processos e crescer com tecnologia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <a
                href={WHATSAPP_HERO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 min-h-[46px] px-6 py-3 rounded-lg bg-[#E86A17] hover:bg-[#C8510A] text-white text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E86A17]"
              >
                <span>Quero desenvolver meu projeto</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>

              <button
                type="button"
                onClick={handleScrollToSolutions}
                className="inline-flex items-center justify-center min-h-[46px] px-5 py-3 rounded-lg border border-[#11141A]/15 bg-white hover:bg-[#F5F6F8] hover:border-[#11141A]/30 text-[#11141A] text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#11141A]"
              >
                Conheça nossas soluções
              </button>
            </motion.div>

            {/* Unboxed metadata strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-[#11141A]/8 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-[#4B5563]"
            >
              <span className="font-medium text-[#11141A]">Digital Product Studio</span>
              <span aria-hidden="true">·</span>
              <span>Sites & Plataformas</span>
              <span aria-hidden="true">·</span>
              <span>Aplicativos</span>
              <span aria-hidden="true">·</span>
              <span>Micro Aplicações & Micro SaaS</span>
            </motion.div>
          </div>

          {/* Right column: Interactive Product Studio visual composition */}
          <motion.div
            style={{ y: cardDepthY }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col justify-center gap-3"
          >
            {/* Subtle architectural metadata strip above card */}
            <div className="hidden sm:flex items-center justify-between px-1 text-xs text-[#4B5563]">
              <span className="inline-flex items-center gap-1.5 font-mono text-[#11141A]">
                <Code2 className="h-3.5 w-3.5 text-[#E86A17]" />
                TypeScript · Performance · Cloud
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#11141A]">
                <Smartphone className="h-3.5 w-3.5 text-[#E86A17]" />
                Design Responsivo & Escalável
              </span>
            </div>

            {/* Main Precision Product Studio Frame */}
            <div className="relative rounded-2xl border border-[#11141A]/12 bg-white shadow-[0_20px_50px_rgba(17,20,26,0.08)] overflow-hidden">
              {/* Seamless obsidian brand header bar housing the official black-background CS22 logo */}
              <div className="bg-black px-5 py-3.5 flex items-center justify-between gap-4 border-b border-white/10">
                <img
                  src={BRAND_ASSETS.fullWordmark}
                  alt="CS22 Tecnologia que impulsiona negócios"
                  referrerPolicy="no-referrer"
                  className="h-8 sm:h-9 w-auto object-contain object-left"
                />
                <span className="text-xs font-medium text-neutral-400 whitespace-nowrap shrink-0">
                  Arquitetura Digital
                </span>
              </div>

              {/* Interactive architecture mode switcher */}
              <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-[#11141A]/8 bg-[#F8F9FB]">
                <div
                  role="tablist"
                  aria-label="Modos de arquitetura CS22"
                  className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-[#EBEEF3]"
                >
                  {HERO_MODES.map((mode) => {
                    const isSelected = mode.id === activeModeId;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveModeId(mode.id)}
                        className={`px-2 py-2 rounded-md text-[11px] sm:text-xs font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                          isSelected
                            ? 'bg-white text-[#11141A] shadow-xs'
                            : 'text-[#4B5563] hover:text-[#11141A]'
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live interactive workspace preview */}
              <div className="p-5 sm:p-6 space-y-5 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-base sm:text-lg font-bold text-[#11141A]">
                      {activeMode.headline}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                      {activeMode.architectureNote}
                    </p>
                  </div>
                </div>

                {/* Quantitative indicator row (tabular-nums) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#F6F7F9] border border-[#11141A]/8">
                    <div className="text-xs text-[#4B5563]">{activeMode.primaryMetricLabel}</div>
                    <div className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#11141A] tabular-nums">
                      {activeMode.primaryMetricValue}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#F6F7F9] border border-[#11141A]/8">
                    <div className="text-xs text-[#4B5563]">{activeMode.secondaryMetricLabel}</div>
                    <div className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#E86A17] tabular-nums">
                      {activeMode.secondaryMetricValue}
                    </div>
                  </div>
                </div>

                {/* System architecture layers */}
                <div className="space-y-2">
                  {activeMode.layers.map((layer, index) => (
                    <div
                      key={layer.name}
                      className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg border border-[#11141A]/8 bg-white hover:border-[#E86A17]/35 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {index === 0 ? (
                          <Layers className="h-4 w-4 text-[#E86A17] shrink-0" />
                        ) : index === 1 ? (
                          <Cpu className="h-4 w-4 text-[#11141A] shrink-0" />
                        ) : (
                          <Code2 className="h-4 w-4 text-[#4B5563] shrink-0" />
                        )}
                        <span className="text-xs sm:text-sm font-semibold text-[#11141A] truncate">
                          {layer.name}
                        </span>
                      </div>
                      <span className="text-xs text-[#4B5563] text-right truncate">
                        {layer.detail}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Crisp code topology block */}
                <div className="rounded-xl bg-[#0D1016] px-4 py-3.5 text-left overflow-x-auto border border-[#11141A]/15">
                  <pre className="font-mono text-[11px] sm:text-xs leading-relaxed text-neutral-300">
                    <code>
                      {activeMode.codePreview.map((line, i) => (
                        <div key={i} className="whitespace-pre">
                          <span className="text-neutral-600 select-none mr-3 tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className={i === 0 ? 'text-[#F5882B]' : 'text-neutral-200'}>
                            {line}
                          </span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
