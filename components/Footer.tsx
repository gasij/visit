
import React from 'react';
import { Github, Linkedin, Send, Facebook, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contacts" className="py-20 px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="relative mb-40">
        <div className="absolute top-0 left-[-10%] w-[120%] h-[120%] border border-zinc-800 rounded-full -z-10"></div>
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div className="space-y-4">
            <h2 className="text-[12vw] md:text-[8rem] font-black leading-[0.85] tracking-tighter">
              Иван<br />Жучков
            </h2>
            <div className="text-zinc-500 uppercase tracking-widest text-xs font-mono ml-4">
              Full-stack разработчик
            </div>
          </div>
          
          <div className="space-y-12 md:pl-20">
             <div className="text-zinc-500 font-mono">... /Контакты ...</div>
             <nav className="flex flex-wrap gap-x-12 gap-y-6 text-sm uppercase tracking-widest">
                <a href="#main" className="hover:text-white transition-colors">Главная</a>
                <a href="#about" className="hover:text-white transition-colors">О себе</a>
                <a href="#projects" className="hover:text-white transition-colors">Проекты</a>
                <a href="#articles" className="hover:text-white transition-colors">Статьи</a>
             </nav>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <SocialIcon icon={<Github size={18} />} label="Github" />
        <SocialIcon icon={<Linkedin size={18} />} label="Linkedin" />
        <SocialIcon icon={<Mail size={18} />} label="E-mail" />
        <SocialIcon icon={<Send size={18} />} label="Telegram" />
        <SocialIcon icon={<Facebook size={18} />} label="Facebook" />
        <SocialIcon icon={<Instagram size={18} />} label="Instagram" />
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex items-center justify-center gap-3 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 px-6 py-4 rounded-full text-xs font-bold transition-all text-zinc-500 hover:text-white">
    {icon}
    <span>{label}</span>
  </button>
);

export default Footer;
