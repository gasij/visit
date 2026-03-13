import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const cardData = [
  { color: '#060010', label: 'Мы', title: 'Команда', description: 'Мы — команда веб-разработчиков: от идеи до продакшена.' },
  { color: '#060010', label: 'Веб', title: 'Разработка', description: 'Сайты, SPA, API и интеграции под задачи бизнеса.' },
  { color: '#060010', label: 'Вместе', title: 'Совместно', description: 'Работаем с заказчиком прозрачно, по итерациям.' },
  { color: '#060010', label: 'Код', title: 'Качество', description: 'Поддерживаемый код, ревью и единые стандарты.' },
  { color: '#060010', label: 'Стек', title: 'Технологии', description: 'React, Vue, TypeScript, Node, Python — стек, который надёжно масштабируется.' },
  { color: '#060010', label: 'Поддержка', title: 'Надёжность', description: 'Релизы, сопровождение и развитие после запуска.' },
];

const createParticleElement = (x: number, y: number, color: string) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},0.6);pointer-events:none;z-index:100;left:${x}px;top:${y}px`;
  return el;
};

const updateCardGlow = (card: HTMLElement, mx: number, my: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--glow-x', `${((mx - rect.left) / rect.width) * 100}%`);
  card.style.setProperty('--glow-y', `${((my - rect.top) / rect.height) * 100}%`);
  card.style.setProperty('--glow-intensity', String(glow));
  card.style.setProperty('--glow-radius', `${radius}px`);
};

function ParticleCard({
  children,
  className,
  style,
  particleCount,
  glowColor,
  enableTilt,
  clickEffect,
  enableMagnetism,
  disableAnimations,
}: {
  children: React.ReactNode;
  className: string;
  style: React.CSSProperties;
  particleCount: number;
  glowColor: string;
  enableTilt: boolean;
  clickEffect: boolean;
  enableMagnetism: boolean;
  disableAnimations: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hovered = useRef(false);
  const pool = useRef<HTMLDivElement[]>([]);
  const inited = useRef(false);
  const magnetRef = useRef<gsap.core.Tween | null>(null);

  const initPool = useCallback(() => {
    if (inited.current || !cardRef.current || particleCount <= 0) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    pool.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    inited.current = true;
  }, [particleCount, glowColor]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetRef.current?.kill();
    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => p.remove(),
      });
    });
    particlesRef.current = [];
  }, []);

  const spawn = useCallback(() => {
    if (!cardRef.current || !hovered.current || particleCount <= 0) return;
    if (!inited.current) initPool();
    pool.current.forEach((particle, i) => {
      const id = setTimeout(() => {
        if (!hovered.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });
      }, i * 100);
      timeoutsRef.current.push(id);
    });
  }, [initPool, particleCount]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;
    const enter = () => {
      hovered.current = true;
      spawn();
      if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
    };
    const leave = () => {
      hovered.current = false;
      clearParticles();
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    };
    const move = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      if (enableTilt) {
        gsap.to(el, {
          rotateX: ((y - cy) / cy) * -10,
          rotateY: ((x - cx) / cx) * 10,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }
      if (enableMagnetism) {
        magnetRef.current = gsap.to(el, { x: (x - cx) * 0.05, y: (y - cy) * 0.05, duration: 0.3, ease: 'power2.out' });
      }
    };
    const click = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const d = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
      const ripple = document.createElement('div');
      ripple.style.cssText = `position:absolute;width:${d * 2}px;height:${d * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4)0%,rgba(${glowColor},0.2)30%,transparent 70%);left:${x - d}px;top:${y - d}px;pointer-events:none;z-index:1000`;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
    };
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    el.addEventListener('mousemove', move);
    el.addEventListener('click', click);
    return () => {
      hovered.current = false;
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
      el.removeEventListener('mousemove', move);
      el.removeEventListener('click', click);
      clearParticles();
    };
  }, [disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor, spawn, clearParticles]);

  return (
    <div ref={cardRef} className={`${className} particle-container`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  );
}

function GlobalSpotlight({
  gridRef,
  enabled,
  disableAnimations,
  spotlightRadius,
  glowColor,
}: {
  gridRef: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
  disableAnimations: boolean;
  spotlightRadius: number;
  glowColor: string;
}) {
  const spotRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (disableAnimations || !gridRef.current || !enabled) return;
    const spot = document.createElement('div');
    spot.className = 'global-spotlight';
    spot.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.15)0%,rgba(${glowColor},0.06)40%,transparent70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen`;
    document.body.appendChild(spot);
    spotRef.current = spot;
    const prox = spotlightRadius * 0.5;
    const fade = spotlightRadius * 0.75;
    const onMove = (e: MouseEvent) => {
      if (!spotRef.current || !gridRef.current) return;
      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      const cards = gridRef.current.querySelectorAll('.magic-bento-card');
      if (!inside) {
        gsap.to(spotRef.current, { opacity: 0, duration: 0.3 });
        cards.forEach((c) => (c as HTMLElement).style.setProperty('--glow-intensity', '0'));
        return;
      }
      let minD = Infinity;
      cards.forEach((c) => {
        const card = c as HTMLElement;
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2);
        minD = Math.min(minD, dist);
        let g = 0;
        if (dist <= prox) g = 1;
        else if (dist <= fade) g = (fade - dist) / (fade - prox);
        updateCardGlow(card, e.clientX, e.clientY, g, spotlightRadius);
      });
      gsap.to(spotRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
      const op =
        minD <= prox ? 0.75 : minD <= fade ? ((fade - minD) / (fade - prox)) * 0.75 : 0;
      gsap.to(spotRef.current, { opacity: op, duration: op > 0 ? 0.2 : 0.5 });
    };
    const onLeave = () => {
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach((c) => (c as HTMLElement).style.setProperty('--glow-intensity', '0'));
      if (spotRef.current) gsap.to(spotRef.current, { opacity: 0, duration: 0.3 });
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      spotRef.current?.remove();
    };
  }, [gridRef, enabled, disableAnimations, spotlightRadius, glowColor]);
  return null;
}

export default function MagicBento({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = 400,
  particleCount = 12,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = false,
}: {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const q = () => setMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    q();
    window.addEventListener('resize', q);
    return () => window.removeEventListener('resize', q);
  }, []);
  const off = disableAnimations || mobile;

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight gridRef={gridRef} enabled={enableSpotlight} disableAnimations={off} spotlightRadius={spotlightRadius} glowColor={glowColor} />
      )}
      <div className="card-grid bento-section" ref={gridRef}>
        {cardData.map((card, i) => {
          const cls = `magic-bento-card ${textAutoHide ? 'magic-bento-card--text-autohide' : ''} ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`;
          const st = { backgroundColor: card.color, '--glow-color': glowColor } as React.CSSProperties;
          return (
            <ParticleCard
              key={i}
              className={cls}
              style={st}
              particleCount={enableStars ? particleCount : 0}
              glowColor={glowColor}
              enableTilt={enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
              disableAnimations={off}
            >
              <div className="magic-bento-card__header">
                <div className="magic-bento-card__label">{card.label}</div>
              </div>
              <div className="magic-bento-card__content">
                <h2 className="magic-bento-card__title">{card.title}</h2>
                <p className="magic-bento-card__description">{card.description}</p>
              </div>
            </ParticleCard>
          );
        })}
      </div>
    </>
  );
}
