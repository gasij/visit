import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Send, Facebook, Instagram } from 'lucide-react';
import Reveal from './Reveal';
import TextPressure from './TextPressure';

const heroIntroPanelClass =
  'rounded-2xl border border-white/10 bg-zinc-950/25 px-4 py-3 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]';

const Hero: React.FC = () => {
  const [narrow, setNarrow] = useState(true);

  useEffect(() => {
    const q = () => setNarrow(window.matchMedia('(max-width: 639px)').matches);
    q();
    const m = window.matchMedia('(max-width: 639px)');
    m.addEventListener('change', q);
    return () => m.removeEventListener('change', q);
  }, []);

  const minMain = narrow ? 54 : 78;
  /** Одна база для «Студия» и «веб-разработки» — один размер букв */
  const minSubtitle = narrow ? 32 : 52;
  const hMain = narrow ? 'clamp(80px, 24vw, 300px)' : 'clamp(140px, 24vw, 300px)';
  const hSub = narrow ? 'clamp(82px, 22vw, 260px)' : 'clamp(120px, 22vw, 300px)';

  return (
    <section className="w-full min-w-0 pt-24 pb-12 px-4 sm:pt-32 sm:pb-16 sm:px-6 md:pt-48 md:pb-20 md:px-8 lg:px-12 xl:px-16">
      <div className="relative min-w-0 w-full">
        <Reveal defaultVisible width="100%">
          <div className="mb-8 sm:mb-12 flex flex-col gap-1 sm:gap-2 min-w-0">
            <div style={{ position: 'relative', height: hMain }} className="w-full min-w-0 overflow-visible">
              <TextPressure
                text="BLOOM-STUDIO"
                flex
                alpha={false}
                stroke={false}
                width
                weight
                italic
                textColor="#ffffff"
                strokeColor="#5227FF"
                minFontSize={minMain}
                fontScale={0.92}
                verticalAlign="center"
              />
            </div>
            {/* Подзаголовки отдельно на всю ширину — не делим ряд с кнопкой, без наезда */}
            <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 w-full min-w-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-8 lg:gap-14 w-full min-w-0">
                <div
                  className="relative w-full md:w-[42%] md:max-w-xl min-w-0 overflow-visible"
                  style={{ height: hSub }}
                >
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
                    minFontSize={minSubtitle}
                    fontScale={0.7}
                    verticalAlign="center"
                  />
                </div>
                <div
                  className="relative w-full md:flex-1 md:min-w-0 overflow-visible"
                  style={{ height: hSub }}
                >
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
                    minFontSize={minSubtitle}
                    fontScale={0.7}
                    verticalAlign="center"
                  />
                </div>
              </div>
              {/* Кнопка отдельной строкой справа — как раньше по положению */}
              <div className="hidden sm:flex justify-end w-full pt-0 md:pt-1">
                <a
                  href="#projects"
                  className="inline-flex items-center bg-white text-black text-sm px-6 md:px-10 py-3 md:py-4 rounded-full font-bold hover:bg-zinc-200 transition-all gap-2 sm:translate-y-0 md:translate-y-4"
                >
                  Проекты
                  <span className="bg-black text-white rounded-full p-1 ml-2 md:ml-4 inline-flex">
                    <ArrowRight size={16} />
                  </span>
                </a>
              </div>
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
        <Reveal delay={0.2} width="100%">
          <div className={`max-w-md ${heroIntroPanelClass}`}>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Наша цель — создавать сложные и поддерживаемые проекты и системы.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.4} width="100%">
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
