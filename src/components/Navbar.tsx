import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import { BRAND_ASSETS } from '../data/studioData';
import { buildWhatsAppUrl } from '../utils/projectEstimator';

const NAV_LINKS = [
  { href: '#apresentacao', label: 'Estúdio' },
  { href: '#solucoes', label: 'Soluções' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#processo', label: 'Processo' },
  { href: '#contato', label: 'Contato' },
];

const WHATSAPP_START_URL = buildWhatsAppUrl(
  'Olá, equipe CS22! Gostaria de iniciar um projeto digital.'
);

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#11141A]/8">
      {/* Scroll progress indicator */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#C8510A] via-[#E86A17] to-[#F5882B]"
      />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand mark + wordmark */}
        <a
          href="#topo"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E86A17] rounded-md"
        >
          <img
            src={BRAND_ASSETS.iconMark}
            alt="CS22"
            referrerPolicy="no-referrer"
            className="h-9 w-9 rounded-lg object-cover shrink-0 bg-black"
          />
          <span className="font-display text-lg font-bold tracking-tight text-[#11141A] whitespace-nowrap shrink-0">
            CS22
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-[#3B4351] hover:text-[#11141A] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1.5px] after:bg-[#E86A17] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E86A17] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary CTA + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={WHATSAPP_START_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#11141A] hover:bg-[#E86A17] rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E86A17]"
          >
            Iniciar projeto
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-lg border border-[#11141A]/12 text-[#11141A] hover:bg-[#F3F5F8] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <nav
          aria-label="Menu móvel"
          className="md:hidden border-t border-[#11141A]/8 bg-white px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium text-[#11141A] hover:bg-[#F5F6F8] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={WHATSAPP_START_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-[#E86A17] hover:bg-[#C8510A] rounded-lg transition-colors cursor-pointer"
            >
              Iniciar projeto
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
