
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-start">
      <div className="font-bold text-lg leading-tight tracking-tighter">
        sopranos<br />studio
      </div>
      
      <nav className="hidden md:flex gap-12 text-sm uppercase tracking-widest text-zinc-400">
        <a href="#about" className="hover:text-white transition-colors">О себе</a>
        <a href="#projects" className="hover:text-white transition-colors">Проекты</a>
        <a href="#articles" className="hover:text-white transition-colors">Статьи</a>
        <a href="#contacts" className="hover:text-white transition-colors">Контакты</a>
      </nav>

      <div className="relative group cursor-pointer">
        <div className="absolute inset-[-40px] w-[100px] h-[100px] border border-zinc-800 rounded-full group-hover:border-zinc-500 transition-colors"></div>
        <div className="flex flex-col items-center text-xs font-mono relative z-10 pt-2">
          <span className="text-white">Ru</span>
          <span className="text-zinc-500">En</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
