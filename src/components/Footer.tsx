import { Mail, MessageCircle } from 'lucide-react';
import { BRAND_ASSETS } from '../data/studioData';
import { buildWhatsAppUrl } from '../utils/projectEstimator';

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá, equipe CS22! Gostaria de falar sobre um projeto digital.'
  );

  return (
    <footer className="bg-black text-neutral-300 border-t border-white/10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10 items-start">
          {/* Official horizontal CS22 logo on native pure black background */}
          <div className="md:col-span-5 space-y-4">
            <img
              src={BRAND_ASSETS.fullWordmark}
              alt="CS22 Tecnologia que impulsiona negócios"
              referrerPolicy="no-referrer"
              className="h-12 sm:h-14 w-auto object-contain object-left"
            />
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              CS22 · Desenvolvimento Digital. Engenharia de sites, aplicativos, micro aplicações e
              Micro SaaS sob medida para negócios orientados a eficiência e tecnologia.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-white">Navegação</div>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="#apresentacao" className="hover:text-[#F5882B] transition-colors">
                  Estúdio Digital
                </a>
              </li>
              <li>
                <a href="#solucoes" className="hover:text-[#F5882B] transition-colors">
                  Soluções Sob Medida
                </a>
              </li>
              <li>
                <a href="#resultados" className="hover:text-[#F5882B] transition-colors">
                  Impacto em Produção
                </a>
              </li>
              <li>
                <a href="#processo" className="hover:text-[#F5882B] transition-colors">
                  Método de Engenharia
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#F5882B] transition-colors">
                  Iniciar Projeto
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white">Contato direto</div>
            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#F5882B] transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[#E86A17] shrink-0" />
                <span>WhatsApp {BRAND_ASSETS.whatsappDisplay}</span>
              </a>
              <a
                href={`mailto:${BRAND_ASSETS.email}`}
                className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-[#F5882B] transition-colors break-all"
              >
                <Mail className="h-4 w-4 text-[#E86A17] shrink-0" />
                <span>{BRAND_ASSETS.email}</span>
              </a>
            </div>
            <p className="text-xs text-neutral-500">
              Atendimento consultivo para empresas, empreendedores e operações digitais.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-500">
          <span>© {new Date().getFullYear()} CS22 · Desenvolvimento Digital. Todos os direitos reservados.</span>
          <span>Digital Product Studio</span>
        </div>
      </div>
    </footer>
  );
}
