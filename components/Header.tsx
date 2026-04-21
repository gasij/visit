import React, { useState, useEffect, useRef } from 'react';
import StaggeredMenu from './StaggeredMenu';

const navLinks = [
  { href: '#leaders', label: 'Команда' },
  { href: '#magicbento', label: 'Способности' },
  { href: '#projects', label: 'Проекты' },
  { href: '#articles', label: 'Статьи' },
  { href: '#calculator', label: 'Стоимость' },
  { href: '#contact', label: 'Контакты' },
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
          className="pointer-events-auto px-3 pt-2 sm:px-5 sm:pt-3 md:px-6 md:pt-3"
          style={barMotionStyle}
        >
          <div
            className={[
              'mx-auto max-w-7xl flex justify-between items-center gap-2 min-h-[64px] md:min-h-[72px]',
              'rounded-2xl md:rounded-[1.35rem]',
              'border border-white/[0.12]',
              'bg-zinc-950/45 shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
              'backdrop-blur-xl backdrop-saturate-150',
              'px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2.5',
            ].join(' ')}
          >
            <a href="#" className="flex items-center shrink-0 z-10 min-w-0 pl-1 sm:pl-2 md:pl-3">
              <img
                src="/Mask%20group.svg"
                alt="webfoundry"
                className="h-12 w-auto md:h-14 lg:h-16"
                width={672}
                height={250}
                decoding="async"
              />
            </a>

            <nav className="flex gap-8 lg:gap-12 text-sm uppercase tracking-widest text-zinc-400">
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="hover:text-white transition-colors duration-300 shrink-0">
                  {label}
                </a>
              ))}
            </nav>
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
