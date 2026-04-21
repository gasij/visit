
import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';

const techTagClass =
  'font-mono text-[11px] sm:text-xs px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 text-zinc-200 bg-zinc-950/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-200 hover:border-white/15 hover:bg-zinc-900/45 hover:text-white';

/** Стеклянная панель под описание проекта (как в шапке / тегах) */
const projectCopyGlass =
  'max-w-md rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-zinc-950/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl backdrop-saturate-150 px-5 py-5 sm:px-7 sm:py-6';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-8 sm:py-12 md:py-14 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full min-w-0 overflow-x-hidden">
      {/* Project: Gostat */}
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-14 sm:mb-22 md:mb-28 relative">
        <div className="order-2 lg:order-1 space-y-5 sm:space-y-8 min-w-0">
          <h3 className="text-2xl sm:text-4xl font-bold">Gostat</h3>
          <div className="flex flex-wrap gap-2">
            {['Golang', 'TypeScript', 'Gin', 'NextJs', 'PostgreSQL', 'Redis'].map((tag) => (
              <span key={tag} className={techTagClass}>
                {tag}
              </span>
            ))}
          </div>
          <div className={projectCopyGlass}>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-lg">
              <span className="text-white italic">GOStat</span> — современное микросервисное приложение, предназначенное для обработки{' '}
              <span className="text-white">аутентификации HTTP-запросов</span> и статистики с высокой точностью.
              <br />
              <br />
              Этот проект состоит из нескольких ключевых микросервисов, каждый из которых вносит вклад в общую функциональность и производительность.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors">
              <Github size={20} />
            </button>
            <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors">
              <ArrowUpRight size={20} />
            </button>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative w-full max-sm:min-h-[min(92vw,400px)] max-sm:h-[min(92vw,400px)] max-sm:overflow-hidden h-[min(52vw,220px)] min-h-[200px] sm:h-[320px] sm:min-h-0 md:h-[420px] lg:h-[500px]">
           <div className="absolute top-0 right-0 w-[72%] sm:w-[70%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 border border-zinc-800">
             <img src="https://picsum.photos/seed/dash1/800/600" alt="dashboard" className="w-full h-auto" />
           </div>
           <div className="absolute bottom-[8%] left-0 w-[38%] sm:w-[40%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-20 border border-zinc-800 transform -rotate-6">
             <img src="https://picsum.photos/seed/mobile1/400/800" alt="mobile" className="w-full h-auto max-sm:max-h-[min(52vh,280px)] max-sm:object-cover" />
           </div>
           <div className="absolute bottom-[-12px] sm:bottom-[-40px] right-[12%] sm:right-20 w-[28%] sm:w-[30%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-30 border border-zinc-800">
              <img src="https://picsum.photos/seed/cat/400/400" alt="art" className="w-full h-full object-cover" />
           </div>
        </div>
      </div>

      {/* Project: Kana Master */}
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-14 sm:mb-22 md:mb-28 relative">
        <div className="order-1 relative w-full max-sm:min-h-[min(92vw,400px)] max-sm:h-[min(92vw,400px)] max-sm:overflow-hidden h-[min(52vw,220px)] min-h-[200px] sm:h-[320px] sm:min-h-0 md:h-[420px] lg:h-[500px]">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-video bg-zinc-900 border border-zinc-800 rounded-2xl sm:rounded-[4rem] z-0 opacity-50"></div>
           <div className="absolute top-[8%] left-[6%] sm:top-10 sm:left-10 w-[45%] max-sm:max-h-[78%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-20 border border-zinc-800 transform rotate-2">
             <img src="https://picsum.photos/seed/jp1/400/800" alt="jp-app" className="w-full h-auto max-sm:max-h-[min(58vh,320px)] max-sm:object-cover max-sm:w-full" />
           </div>
           <div className="absolute max-sm:top-2 sm:top-[-40px] left-[38%] sm:left-[40%] w-[35%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-30 border border-zinc-800 transform -rotate-3">
              <img src="https://picsum.photos/seed/art2/400/400" alt="jp-art" className="w-full h-full object-cover" />
           </div>
        </div>
        <div className="order-2 space-y-5 sm:space-y-8 min-w-0">
          <h3 className="text-2xl sm:text-4xl font-bold">Kana Master</h3>
          <div className="flex flex-wrap gap-2">
            {['TypeScript', 'ReactNative', 'Redux Toolkit', 'i18n', 'iOS'].map((tag) => (
              <span key={tag} className={techTagClass}>
                {tag}
              </span>
            ))}
          </div>
          <div className={projectCopyGlass}>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-lg">
              Kana Master — это <span className="text-white">iOS приложение</span>, предназначенное для{' '}
              <span className="text-white">изучения Катаканы и Хираганы</span>. Оно включает различные тесты и практические упражнения.
              <br />
              <br />
              Приложение также предлагает <span className="text-white italic">аудиотренировки</span> для правильного произношения и демонстрирует, как
              правильно <span className="text-white">рисовать каждый символ</span>.
            </p>
          </div>
          <div className="flex gap-4">
             <button className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
               <ArrowUpRight size={24} />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
