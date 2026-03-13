import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Send, Facebook, Instagram, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import TextPressure from './TextPressure';

const Hero: React.FC = () => {
  const [narrow, setNarrow] = useState(true);

  useEffect(() => {
    const q = () => setNarrow(window.matchMedia('(max-width: 639px)').matches);
    q();
    const m = window.matchMedia('(max-width: 639px)');
    m.addEventListener('change', q);
    return () => m.removeEventListener('change', q);
  }, []);

  const minMain = narrow ? 30 : 56;
  const minSub = narrow ? 22 : 56;
  const hMain = narrow ? 'clamp(88px, 26vw, 380px)' : 'clamp(180px, 28vw, 380px)';
  const hSub = narrow ? 'clamp(72px, 20vw, 380px)' : 'clamp(180px, 28vw, 380px)';

  return (
    <section className="pt-24 pb-12 px-4 sm:pt-32 sm:pb-16 sm:px-6 md:pt-48 md:pb-20 md:px-8 max-w-7xl mx-auto w-full min-w-0">
      <div className="relative min-w-0">
        <Reveal defaultVisible>
          <div className="mb-8 sm:mb-12 flex flex-col gap-2 sm:gap-3 min-w-0">
            <div style={{ position: 'relative', height: hMain }} className="w-full min-w-0">
              <TextPressure
                text="Bloom-studio"
                flex
                alpha={false}
                stroke={false}
                width
                weight
                italic
                textColor="#ffffff"
                strokeColor="#5227FF"
                minFontSize={minMain}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 min-w-0 w-full">
              <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6 md:gap-10 w-full min-w-0 flex-1">
                <div className="relative w-full sm:flex-1 min-w-0" style={{ height: hSub }}>
                  <TextPressure
                    text="Студия"
                    fontFamily="Inter"
                    fontUrl="https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7W0Q5n-wU.woff2"
                    flex
                    alpha={false}
                    stroke={false}
                    width={false}
                    weight
                    italic={false}
                    textColor="#ffffff"
                    strokeColor="#5227FF"
                    minFontSize={minSub}
                  />
                </div>
                <div className="relative w-full sm:flex-[1.35] min-w-0" style={{ height: narrow ? 'clamp(64px, 18vw, 200px)' : hSub }}>
                  <TextPressure
                    text="веб-разработки"
                    fontFamily="Inter"
                    fontUrl="https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7W0Q5n-wU.woff2"
                    flex
                    alpha={false}
                    stroke={false}
                    width={false}
                    weight
                    italic={false}
                    textColor="#ffffff"
                    strokeColor="#5227FF"
                    minFontSize={narrow ? 16 : minSub}
                  />
                </div>
              </div>
              <a
                href="#projects"
                className="hidden sm:inline-flex items-center bg-white text-black text-sm px-6 md:px-10 py-3 md:py-4 rounded-full font-bold hover:bg-zinc-200 transition-all gap-2 sm:translate-y-0 md:translate-y-4 cursor-pointer shrink-0 self-start sm:self-end"
              >
                Проекты
                <span className="bg-black text-white rounded-full p-1 ml-2 md:ml-4 inline-flex">
                  <ArrowRight size={16} />
                </span>
              </a>
            </div>
            <a
              href="#projects"
              className="sm:hidden inline-flex items-center justify-center bg-white text-black text-sm px-6 py-3 rounded-full font-bold gap-2 w-full max-w-xs"
            >
              Проекты
              <span className="bg-black text-white rounded-full p-1 ml-2 inline-flex">
                <ArrowRight size={16} />
              </span>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mt-12 md:mt-24">
        <Reveal delay={0.2}>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-md">
            Моя цель — <span className="italic text-white">писать поддерживаемый, чистый</span> и{' '}
            <span className="italic text-white">понятный код</span>, чтобы процесс разработки был приятным.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap gap-2 sm:gap-3 md:justify-end">
            <SocialButton icon={<Github size={18} />} label="Github" />
            <SocialButton icon={<Linkedin size={18} />} label="LinkedIn" />
            <SocialButton icon={<Send size={18} />} label="Telegram" />
            <SocialButton icon={<Facebook size={18} />} label="Facebook" />
            <SocialButton icon={<Instagram size={18} />} label="Instagram" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const SocialButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button
    type="button"
    className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-400 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all text-zinc-300 hover:text-white hover:scale-105 active:scale-95"
  >
    {icon}
    <span className="truncate max-w-[28vw] sm:max-w-none">{label}</span>
  </button>
);

export default Hero;
