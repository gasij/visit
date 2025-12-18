
import React from 'react';
import { Github, Linkedin, Send, Facebook, Instagram, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const Hero: React.FC = () => {
  return (
    <section className="pt-48 pb-20 px-8 max-w-7xl mx-auto">
      <div className="relative">
        <Reveal>
          <h1 className="text-7xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-12">
            Full-stack<br />
            <span className="flex items-center gap-8">
              разработчик
              <div className="hidden md:flex items-center bg-white text-black text-sm px-10 py-4 rounded-full font-bold hover:bg-zinc-200 transition-all gap-2 transform translate-y-4 cursor-pointer">
                Проекты
                <div className="bg-black text-white rounded-full p-1 ml-4">
                  <ArrowRight size={16} />
                </div>
              </div>
            </span>
          </h1>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-end mt-24">
        <Reveal delay={0.2}>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
            Моя цель — <span className="italic text-white">писать поддерживаемый, чистый</span> и <span className="italic text-white">понятный код</span>, чтобы процесс разработки был приятным.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <SocialButton icon={<Github size={18}/>} label="Github" />
            <SocialButton icon={<Linkedin size={18}/>} label="LinkedIn" />
            <SocialButton icon={<Send size={18}/>} label="Telegram" />
            <SocialButton icon={<Facebook size={18}/>} label="Facebook" />
            <SocialButton icon={<Instagram size={18}/>} label="Instagram" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const SocialButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-400 px-6 py-2.5 rounded-full text-sm transition-all text-zinc-300 hover:text-white hover:scale-105 active:scale-95">
    {icon}
    <span>{label}</span>
  </button>
);

export default Hero;
