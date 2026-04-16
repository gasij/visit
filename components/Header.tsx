import React, { useState, useEffect, useRef } from 'react';
import bloomLogo from '../bloomcode_transparent.png';
import StaggeredMenu from './StaggeredMenu';

const navLinks = [
  { href: '#leaders', label: 'Команда' },
  { href: '#magicbento', label: 'Способности' },
  { href: '#projects', label: 'Проекты' },
  { href: '#articles', label: 'Статьи' },
  { href: '#contacts', label: 'Контакты' },
];

const staggeredMenuItems = navLinks.map(({ href, label }) => ({
  label,
  ariaLabel: `Перейти: ${label}`,
  link: href,
}));

const staggeredSocialItems = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com' },
  { label: 'Telegram', link: 'https://t.me' },
];

const SCROLL_TOP_SHOW = 24;
const SCROLL_DOWN_HIDE_AFTER = 72;

const Header: React.FC = () => {
  const [barHidden, setBarHidden] = useState(false);
  const lastScrollY = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const y = window.scrollY;
        const prev = lastScrollY.current;
        const delta = y - prev;
        lastScrollY.current = y;

        if (y < SCROLL_TOP_SHOW) {
          setBarHidden(false);
          return;
        }

        if (delta > 6 && y > SCROLL_DOWN_HIDE_AFTER) {
          setBarHidden(true);
        } else if (delta < -4) {
          setBarHidden(false);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const barVisible = !barHidden;

  const barMotionStyle: React.CSSProperties = {
    transform: barVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, calc(-100% - 14px), 0)',
    opacity: barVisible ? 1 : 0,
    transitionProperty: 'transform, opacity',
    transitionDuration: '0.85s, 0.95s',
    transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1), cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    pointerEvents: barVisible ? 'auto' : 'none',
    willChange: barVisible ? undefined : 'transform, opacity',
  };

  return (
    <>
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div
          className="pointer-events-auto px-3 pt-3 sm:px-5 sm:pt-4 md:px-6 md:pt-5"
          style={barMotionStyle}
        >
          <div
            className={[
              'mx-auto max-w-7xl flex justify-between items-center gap-3 min-h-[52px] sm:min-h-[60px] md:min-h-[72px]',
              'rounded-2xl md:rounded-[1.35rem]',
              'border border-white/[0.12]',
              'bg-zinc-950/45 shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
              'backdrop-blur-xl backdrop-saturate-150',
              'px-3 py-2.5 sm:px-5 sm:py-3 md:px-7 md:py-4',
            ].join(' ')}
          >
            <a href="#" className="flex items-center shrink-0 z-10 min-w-0">
              <img
                src={bloomLogo}
                alt="Bloom"
                className="h-8 sm:h-9 md:h-14 w-auto max-w-[min(40vw,180px)] object-contain object-left drop-shadow-sm"
              />
            </a>

            <nav className="flex gap-8 lg:gap-12 text-sm uppercase tracking-widest text-zinc-400">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="hover:text-white transition-colors duration-300 shrink-0">
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="relative group cursor-pointer flex items-center justify-center">
                <div className="absolute inset-[-20px] sm:inset-[-28px] md:inset-[-32px] w-[64px] h-[64px] sm:w-[76px] sm:h-[76px] md:w-[88px] md:h-[88px] border border-white/15 rounded-full group-hover:border-white/35 transition-colors duration-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="flex flex-col items-center text-[10px] sm:text-xs font-mono relative z-10 pt-1 sm:pt-2 w-8">
                  <span className="text-white">Ru</span>
                  <span className="text-zinc-500">En</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="md:hidden">
        <StaggeredMenu
          isFixed
          position="right"
          items={staggeredMenuItems}
          socialItems={staggeredSocialItems}
          displaySocials
          displayItemNumbering
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen
          colors={['#1a1224', '#2a1f3d', '#3d2d5c', '#5227FF']}
          logoUrl={bloomLogo}
          logoHref="#"
          accentColor="#5227FF"
          socialSectionTitle="Соцсети"
          toggleLabels={{ open: 'Меню', close: 'Закрыть' }}
        />
      </div>
    </>
  );
};

export default Header;
