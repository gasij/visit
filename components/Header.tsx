import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import bloomLogo from '../bloomcode_transparent.png';

const navLinks = [
  { href: '#about', label: 'О себе' },
  { href: '#projects', label: 'Проекты' },
  { href: '#articles', label: 'Статьи' },
  { href: '#contacts', label: 'Контакты' },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-8 z-50 flex justify-between items-center min-h-[64px] md:min-h-[88px] gap-3">
      <a href="#" className="flex items-center shrink-0 z-10 min-w-0" onClick={() => setOpen(false)}>
        <img src={bloomLogo} alt="Bloom" className="h-8 sm:h-10 md:h-16 w-auto max-w-[min(40vw,180px)] object-contain object-left" />
      </a>

      <nav className="hidden md:flex gap-8 lg:gap-12 text-sm uppercase tracking-widest text-zinc-400">
        {navLinks.map(({ href, label }) => (
          <a key={href} href={href} className="hover:text-white transition-colors shrink-0">
            {label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="relative group cursor-pointer hidden sm:flex sm:items-center sm:justify-center">
          <div className="absolute inset-[-24px] sm:inset-[-32px] md:inset-[-40px] w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] md:w-[100px] md:h-[100px] border border-zinc-800 rounded-full group-hover:border-zinc-500 transition-colors left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="flex flex-col items-center text-[10px] sm:text-xs font-mono relative z-10 pt-1 sm:pt-2 w-8">
            <span className="text-white">Ru</span>
            <span className="text-zinc-500">En</span>
          </div>
        </div>

        <button
          type="button"
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-full border border-zinc-700 text-white hover:bg-zinc-900 transition-colors"
          aria-expanded={open}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden transition-[opacity,visibility] duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col items-center justify-center min-h-screen gap-8 px-6 pt-20 pb-12">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-2xl font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors py-2"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#projects"
            className="mt-4 px-8 py-4 rounded-full bg-white text-black text-sm font-bold uppercase tracking-widest"
            onClick={() => setOpen(false)}
          >
            Проекты
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
