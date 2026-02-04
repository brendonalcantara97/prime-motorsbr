
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FAQ,
  FEATURES,
  HERO_IMAGES,
  HOW_IT_WORKS_STEPS,
  MODEL_VARIANTS,
  TESTIMONIALS,
  TRUST_ITEMS
} from './constants';
import { buildWhatsAppUrl, initGtm, persistUtmContext, trackEvent } from './tracking';
import { ModelVariant } from './types';

const AUTOPLAY_INTERVAL_MS = 4500;
const MODEL_AUTOPLAY_INTERVAL_MS = 4500;
const HERO_AVATARS: string[] = [
  '/Imagens_12/avatars/carlosfotos.png',
  '/Imagens_12/avatars/Fernanda.png',
  '/Imagens_12/avatars/arthur.png'
];

const SectionHeader: React.FC<{ subtitle: string; title: string; centered?: boolean }> = ({
  subtitle,
  title,
  centered = false
}) => (
  <div className={`mb-10 animate-fade-up ${centered ? 'text-center' : ''}`}>
    <span className="text-accent-blue text-xs font-bold tracking-[0.2em] uppercase block mb-2">{subtitle}</span>
    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
    <div
      className={`h-1 w-12 bg-gradient-to-r from-primary to-accent-blue rounded-full mt-4 ${centered ? 'mx-auto' : ''}`}
    />
  </div>
);

interface HeroCarouselProps {
  images: string[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((previous) => {
        const next = (previous + 1) % images.length;
        trackEvent('carousel_slide_change', {
          section: 'hero',
          slide_index: next,
          interaction: 'autoplay'
        });
        return next;
      });
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [images.length, isPaused]);

  const goToIndex = (index: number, interaction: string): void => {
    setCurrentIndex(index);
    trackEvent('carousel_nav_click', { section: 'hero', slide_index: index, interaction });
    trackEvent('carousel_slide_change', { section: 'hero', slide_index: index, interaction });
  };

  const goNext = (): void => {
    const index = (currentIndex + 1) % images.length;
    goToIndex(index, 'next');
  };

  const goPrev = (): void => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToIndex(index, 'prev');
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    touchStart.current = event.changedTouches[0].clientX;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - event.changedTouches[0].clientX;
    touchStart.current = null;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <div
      className="absolute inset-0"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Carrossel de imagens da scooter X12"
    >
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`Scooter elétrica X12 - imagem ${index + 1}`}
          loading={index === 0 ? 'eager' : 'lazy'}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
            index === currentIndex ? 'opacity-100 scale-100 group-hover:scale-[1.06]' : 'opacity-0 scale-[1.03] pointer-events-none'
          }`}
        />
      ))}
      <button
        type="button"
        onClick={goPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel text-white"
        aria-label="Imagem anterior"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel text-white"
        aria-label="Próxima imagem"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            aria-label={`Ir para imagem ${index + 1}`}
            className={`h-2 rounded-full transition-all ${currentIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
            onClick={() => goToIndex(index, 'dot')}
          />
        ))}
      </div>

    </div>
  );
};

const ModelsCarousel: React.FC<{ models: ModelVariant[]; onCtaClick: (ctaId: string, section: string, modelName?: string) => void }> = ({
  models,
  onCtaClick
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleCards, setVisibleCards] = useState(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  });
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const maxPage = Math.max(models.length - visibleCards, 0);

  useEffect(() => {
    const onResize = (): void => {
      const nextVisible = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      setVisibleCards(nextVisible);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setCurrentPage((previous) => Math.min(previous, maxPage));
  }, [maxPage]);

  useEffect(() => {
    if (isPaused || maxPage === 0) return;
    const timer = window.setInterval(() => {
      setCurrentPage((previous) => (previous >= maxPage ? 0 : previous + 1));
    }, MODEL_AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, maxPage]);

  const goNext = (): void => {
    if (maxPage === 0) return;
    setCurrentPage((previous) => (previous >= maxPage ? 0 : previous + 1));
  };

  const goPrev = (): void => {
    if (maxPage === 0) return;
    setCurrentPage((previous) => (previous <= 0 ? maxPage : previous - 1));
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - event.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) goNext();
    else goPrev();
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentPage * (100 / visibleCards)}%)` }}
        >
          {models.map((model, index) => (
            <article
              key={model.id}
              className="px-3 animate-fade-up"
              style={{ flex: `0 0 ${100 / visibleCards}%`, animationDelay: `${index * 90}ms` }}
            >
              <div className="glass-panel rounded-3xl overflow-hidden h-full">
                <img src={encodeURI(model.image)} alt={model.name} loading="lazy" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{model.name}</h3>
                  <p className="text-gray-400 text-sm mt-1 mb-4">{model.finish}</p>
                  <ul className="space-y-2 text-sm text-gray-300 mb-5">
                    {model.specs.map((item, itemIndex) => (
                      <li key={item} className="flex items-start gap-2" style={{ animationDelay: `${itemIndex * 70}ms` }}>
                        <span className="text-primary mt-1 material-symbols-outlined text-base">check_circle</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={buildWhatsAppUrl(model.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 rounded-xl bg-primary text-white font-semibold inline-flex items-center justify-center"
                    onClick={() => {
                      trackEvent('model_cta_click', { section: 'models', cta_id: model.id, model_name: model.name });
                      onCtaClick('model_whatsapp', 'models', model.name);
                    }}
                  >
                    Solicitar atendimento
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel text-white"
        aria-label="Cor anterior"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel text-white"
        aria-label="Próxima cor"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: maxPage + 1 }).map((_, index) => (
          <button
            key={`model-page-${index}`}
            type="button"
            aria-label={`Ir para grupo ${index + 1}`}
            className={`h-2 rounded-full transition-all ${currentPage === index ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [heroSeen, setHeroSeen] = useState(false);
  const [scroll50Tracked, setScroll50Tracked] = useState(false);
  const [scroll90Tracked, setScroll90Tracked] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  const links = useMemo(
    () => ({
      hero: buildWhatsAppUrl(
        'Olá, vim pelo anúncio da X12 e quero confirmar disponibilidade e pagamento na entrega.'
      ),
      final: buildWhatsAppUrl('Olá, quero fechar minha X12 com pagamento na entrega. Pode me atender?')
    }),
    []
  );

  useEffect(() => {
    initGtm();
    persistUtmContext();
    trackEvent('view_page');
  }, []);

  useEffect(() => {
    const onScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
      setScrollOffset(window.scrollY);

      const scrollDepth = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (!scroll50Tracked && scrollDepth >= 0.5) {
        setScroll50Tracked(true);
        trackEvent('scroll_50', { section: 'page' });
      }
      if (!scroll90Tracked && scrollDepth >= 0.9) {
        setScroll90Tracked(true);
        trackEvent('scroll_90', { section: 'page' });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [scroll50Tracked, scroll90Tracked]);

  useEffect(() => {
    if (!heroRef.current || heroSeen) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeroSeen(true);
            trackEvent('view_hero', { section: 'hero' });
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [heroSeen]);

  const onCtaClick = (ctaId: string, section: string, modelName?: string): void => {
    trackEvent('cta_whatsapp_click', { cta_id: ctaId, section, model_name: modelName });
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-grid-pattern bg-[size:44px_44px] opacity-40 pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background-dark/10 via-background-dark/70 to-background-dark pointer-events-none" />
      <div
        className="fixed -top-48 -right-48 h-96 w-96 bg-accent-blue/20 blur-[120px] pointer-events-none"
        style={{ transform: `translateY(${Math.min(scrollOffset * 0.05, 80)}px)` }}
      />

      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'glass-panel py-3 shadow-lg' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold tracking-tighter text-primary">Prime</span>
            <span className="text-2xl font-bold tracking-tighter text-accent-blue">Motors</span>
          </div>
          <a
            href={links.hero}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center h-10 px-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider hover:bg-primary/20 transition-all"
            onClick={() => onCtaClick('navbar_whatsapp', 'navbar')}
          >
            Comprar Agora
          </a>
        </div>
      </nav>

      <header ref={heroRef} className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-dark border border-white/10 px-4 py-2 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-brand-gradient"></div>
              <span className="material-symbols-outlined text-primary text-[18px] relative z-10">verified</span>
              <span className="text-white text-xs font-semibold tracking-wide relative z-10">Pagamento 100% na Entrega</span>
            </div>

            <h1 className="text-white text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              A Revolução da <span className="text-gradient">Mobilidade</span> está aqui.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg font-medium">
              A nova X12 1000W une tecnologia, economia e o design futurista. Sem burocracia, não precisa de CNH e não precisa
              de emplacamento.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={links.hero}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none group relative flex items-center justify-center gap-3 bg-primary text-white h-14 px-8 rounded-xl font-bold text-lg transition-all active:scale-[0.98] neon-shadow-red"
                onClick={() => onCtaClick('hero_whatsapp', 'hero')}
              >
                <span className="material-symbols-outlined">chat</span>
                Falar com Especialista
              </a>
              <div className="flex items-center gap-3 h-14 px-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex -space-x-2">
                  {HERO_AVATARS.map((avatar) => (
                    <img
                      key={avatar}
                      src={avatar}
                      className="w-9 h-9 rounded-full border-2 border-background-dark object-cover"
                      alt="Cliente"
                    />
                  ))}
                </div>
                <div className="text-xs leading-tight">
                  <span className="text-white font-bold block">+100</span>
                  <span className="text-gray-400">vendidos este ano</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
            <div className="relative w-full max-w-[28.75rem] lg:max-w-[29.5rem] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-surface-dark group">
              <HeroCarousel images={HERO_IMAGES} />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 flex gap-4 pointer-events-none">
                <div className="glass-panel px-4 py-2 rounded-xl">
                  <span className="text-primary text-xl font-bold block leading-none">1000W</span>
                  <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Motor</span>
                </div>
                <div className="glass-panel px-4 py-2 rounded-xl">
                  <span className="text-accent-blue text-xl font-bold block leading-none">50km</span>
                  <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Autonomia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 px-6 py-16 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader subtitle="Benefícios" title="Por que a X12 funciona para o dia a dia" />
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-panel rounded-2xl p-6 animate-fade-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <span className="material-symbols-outlined text-primary mb-3">{feature.icon}</span>
                <h3 className="text-white text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader subtitle="Modelos X12" title="Mesmo desempenho, diferentes acabamentos" />
          <ModelsCarousel models={MODEL_VARIANTS} onCtaClick={onCtaClick} />
        </div>
      </section>

      <section className="relative z-10 px-6 py-16 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="animate-fade-up">
            <SectionHeader subtitle="Confiança" title="Compra com pagamento na entrega" />
            <p className="text-gray-300 leading-relaxed">
              Nosso processo é direto: você confirma condições no WhatsApp, recebe no endereço combinado e realiza o pagamento
              após conferir o produto.
            </p>
          </div>
          <ul className="space-y-3">
            {TRUST_ITEMS.map((item, index) => (
              <li
                key={item}
                className="glass-panel rounded-xl px-5 py-4 flex items-center gap-3 animate-fade-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <span className="material-symbols-outlined text-accent-blue">verified</span>
                <span className="text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader subtitle="Como funciona" title="Fluxo de compra em 4 passos" />
          <div className="grid md:grid-cols-4 gap-4">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div
                key={step}
                className="glass-panel rounded-2xl p-5 animate-fade-up"
                style={{ animationDelay: `${index * 130}ms` }}
              >
                <div className="text-primary font-bold text-xl mb-2">0{index + 1}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader subtitle="Prova social" title="Relatos de quem já usa a X12" centered />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <article
                key={testimonial.id}
                className="glass-panel rounded-2xl p-6 animate-fade-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex gap-1 text-primary mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <span key={`${testimonial.id}-${starIndex}`} className="material-symbols-outlined text-base">
                      star
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} className="w-10 h-10 rounded-full object-cover" alt={testimonial.name} />
                  <div>
                    <p className="text-white text-sm font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 max-w-3xl mx-auto w-full">
        <SectionHeader subtitle="FAQ" title="Dúvidas frequentes" centered />
        <div className="space-y-4">
          {FAQ.map((item) => (
            <details
              key={item.question}
              className="group glass-panel rounded-2xl overflow-hidden border-white/10"
              onToggle={(event) => {
                const isOpen = (event.currentTarget as HTMLDetailsElement).open;
                if (isOpen) {
                  trackEvent('faq_open', { section: 'faq', cta_id: item.question });
                }
              }}
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <h4 className="text-white font-semibold">{item.question}</h4>
                <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">{item.answer}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 pb-32">
        <div className="max-w-5xl mx-auto rounded-3xl glass-panel p-8 md:p-12 text-center animate-fade-up">
          <h3 className="text-3xl md:text-4xl text-white font-bold mb-3">Pronto para falar com o atendimento?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Confirme disponibilidade, prazo e pagamento na entrega diretamente no WhatsApp.
          </p>
          <a
            href={links.final}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-brand-gradient text-white h-14 px-8 rounded-xl font-bold neon-shadow-red"
            onClick={() => onCtaClick('final_whatsapp', 'final_cta')}
          >
            <span className="material-symbols-outlined">chat</span>
            Falar no WhatsApp agora
          </a>
        </div>
      </section>

      <footer className="relative z-10 bg-surface-dark border-t border-white/10 pt-10 pb-28 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-xs">
          © 2026 Prime Motors Mobilidade Urbana LTDA. Todos os direitos reservados.
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 bg-gradient-to-t from-background-dark via-background-dark/95 to-transparent pt-12">
        <div className="max-w-lg mx-auto">
          <a
            href={links.final}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl bg-brand-gradient text-white text-lg font-bold border border-white/20 neon-shadow-red"
            onClick={() => onCtaClick('sticky_whatsapp', 'sticky')}
          >
            <span className="material-symbols-outlined text-[28px]">chat</span>
            Atendimento no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
