import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { BRAND_ASSETS, STUDIO_METRICS, StudioMetric } from '../data/studioData';

function AnimatedMetricValue({ metric }: { metric: StudioMetric }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [displayValue, setDisplayValue] = useState(metric.numericTarget);

  useEffect(() => {
    if (!isInView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(metric.numericTarget);
      return;
    }

    let frameId = 0;
    const duration = 850;
    const startTime = performance.now();
    const startVal = Math.max(1, Math.round(metric.numericTarget * 0.4));

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (metric.numericTarget - startVal) * eased);
      setDisplayValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, metric.numericTarget]);

  return (
    <div
      ref={ref}
      className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#11141A] tabular-nums"
    >
      {metric.prefix ?? ''}
      {displayValue}
      <span className="text-[#E86A17]">{metric.suffix}</span>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="apresentacao"
      className="bg-[#F6F7F9] py-16 sm:py-20 lg:py-24 border-b border-[#11141A]/8"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Editorial positioning */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5"
          >
            <p className="text-xs font-semibold tracking-wide text-[#C8510A]">
              Digital Product Studio
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#11141A] leading-tight text-balance">
              Tecnologia construída para estruturar operações e gerar vantagem competitiva.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[#3B4351] max-w-2xl">
              Não somos uma agência genérica nem uma fábrica de sites em série. A{' '}
              <strong className="font-semibold text-[#11141A]">CS22</strong> atua como empresa de
              tecnologia e estúdio de produtos digitais: unimos design de interface, engenharia de
              software e visão de negócio para transformar gargalos operacionais e ideias
              estratégicas em ativos tecnológicos proprietários.
            </p>

            {/* Unboxed differentiation list */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#3B4351]">
              <div className="pt-3 border-t border-[#11141A]/10">
                <span className="font-semibold text-[#11141A] block mb-1">
                  Arquitetura proprietária
                </span>
                Código escalável, documentado e preparado para evoluir com a sua operação.
              </div>
              <div className="pt-3 border-t border-[#11141A]/10">
                <span className="font-semibold text-[#11141A] block mb-1">
                  Foco em resultado operacional
                </span>
                Cada tela, fluxo e regra de negócio nasce para eliminar atrito e ampliar produtividade.
              </div>
            </div>
          </motion.div>

          {/* Brand identity showcase card matching native black logo background */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl bg-black p-6 sm:p-8 border border-[#11141A]/15 shadow-[0_18px_40px_rgba(17,20,26,0.12)] space-y-6">
              <div className="flex items-center justify-between gap-4">
                <img
                  src={BRAND_ASSETS.iconMark}
                  alt="Símbolo oficial CS22"
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-xl object-cover shrink-0"
                />
                <div className="text-right">
                  <div className="text-xs font-medium text-neutral-400">Área de atuação</div>
                  <div className="text-sm font-semibold text-white">Desenvolvimento Digital</div>
                </div>
              </div>

              <div className="py-4 border-y border-white/10 flex items-center justify-center bg-black">
                <img
                  src={BRAND_ASSETS.fullWordmark}
                  alt="CS22 Tecnologia que impulsiona negócios"
                  referrerPolicy="no-referrer"
                  className="w-full max-w-[340px] h-auto object-contain"
                />
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-neutral-300">
                Do primeiro desenho de fluxo ao deploy em nuvem: sites institucionais de alto nível,
                aplicativos móveis, micro aplicações corporativas e plataformas Micro SaaS.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 4-column studio metrics bar */}
        <div className="mt-12 pt-10 border-t border-[#11141A]/10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STUDIO_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5"
            >
              <AnimatedMetricValue metric={metric} />
              <div className="text-sm font-semibold text-[#11141A]">{metric.label}</div>
              <div className="text-xs text-[#4B5563] leading-relaxed">{metric.context}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
