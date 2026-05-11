
import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import SectionPath from './SectionPath';

const techTagClass =
  'font-mono text-[11px] sm:text-xs px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 text-zinc-200 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/[0.06] hover:text-white';

/** Стеклянная панель под описание проекта (как в шапке / тегах) */
const projectCopyGlass =
  'max-w-md rounded-2xl sm:rounded-3xl border border-white/[0.10] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm px-5 py-5 sm:px-7 sm:py-6';

const projectShellClass =
  'relative overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] border border-white/[0.12] px-4 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_56px_rgba(0,0,0,0.22)] backdrop-blur-md sm:px-7 sm:py-8 md:px-9 md:py-10';

const projectBadgeClass =
  'relative z-10 mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-300 backdrop-blur-md';

const openMoreProjects = () => {
  window.history.pushState(null, '', '/projects');
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-8 sm:py-12 md:py-14 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full min-w-0 overflow-x-hidden">
      <SectionPath items={['проекты']} className="mb-6 sm:mb-8" />
      {/* Project: Gostat */}
      <article
        className={`${projectShellClass} mb-8 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.22),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.78),rgba(8,8,12,0.62))] sm:mb-10 md:mb-12`}
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/40 to-transparent" />
        <div className="pointer-events-none absolute -right-24 top-16 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
        <div className={projectBadgeClass}>
          <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
          backend platform
        </div>
        <div className="relative z-10 grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 min-w-0 space-y-5 sm:space-y-8 lg:order-1">
            <h3 className="text-2xl font-bold sm:text-4xl">Gostat</h3>
            <div className="flex flex-wrap gap-2">
              {['Golang', 'TypeScript', 'Gin', 'NextJs', 'PostgreSQL', 'Redis'].map((tag) => (
                <span key={tag} className={techTagClass}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={projectCopyGlass}>
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-lg">
                <span className="text-white italic">GOStat</span> — современное микросервисное приложение, предназначенное для обработки{' '}
                <span className="text-white">аутентификации HTTP-запросов</span> и статистики с высокой точностью.
                <br />
                <br />
                Этот проект состоит из нескольких ключевых микросервисов, каждый из которых вносит вклад в общую функциональность и производительность.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 transition-colors hover:bg-zinc-800">
                <Github size={20} />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-zinc-200">
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
          <div className="order-1 relative h-[min(52vw,220px)] min-h-[200px] w-full max-sm:h-[min(92vw,400px)] max-sm:min-h-[min(92vw,400px)] max-sm:overflow-hidden sm:h-[320px] sm:min-h-0 md:h-[420px] lg:order-2 lg:h-[500px]">
             <div className="absolute right-0 top-0 z-10 w-[72%] overflow-hidden rounded-2xl border border-zinc-700/80 shadow-2xl sm:w-[70%] sm:rounded-3xl">
               <img src="https://picsum.photos/seed/dash1/800/600" alt="dashboard" className="h-auto w-full" />
             </div>
             <div className="absolute bottom-[8%] left-0 z-20 w-[38%] -rotate-6 transform overflow-hidden rounded-2xl border border-zinc-700/80 shadow-2xl sm:w-[40%] sm:rounded-3xl">
               <img src="https://picsum.photos/seed/mobile1/400/800" alt="mobile" className="h-auto w-full max-sm:max-h-[min(52vh,280px)] max-sm:object-cover" />
             </div>
             <div className="absolute bottom-[-12px] right-[12%] z-30 w-[28%] overflow-hidden rounded-2xl border border-zinc-700/80 shadow-2xl sm:bottom-[-40px] sm:right-20 sm:w-[30%] sm:rounded-3xl">
                <img src="https://picsum.photos/seed/cat/400/400" alt="art" className="h-full w-full object-cover" />
             </div>
          </div>
        </div>
      </article>

      {/* Project: Kana Master */}
      <article
        className={`${projectShellClass} mb-14 bg-[radial-gradient(circle_at_82%_18%,rgba(236,72,153,0.18),transparent_32%),linear-gradient(135deg,rgba(23,12,20,0.72),rgba(8,8,12,0.66))] sm:mb-22 md:mb-28`}
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-200/35 to-transparent" />
        <div className="pointer-events-none absolute -left-24 bottom-10 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className={projectBadgeClass}>
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
          mobile learning
        </div>
        <div className="relative z-10 grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="order-1 relative h-[min(52vw,220px)] min-h-[200px] w-full max-sm:h-[min(92vw,400px)] max-sm:min-h-[min(92vw,400px)] max-sm:overflow-hidden sm:h-[320px] sm:min-h-0 md:h-[420px] lg:h-[500px]">
             <div className="absolute left-1/2 top-1/2 z-0 aspect-video w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-700/70 bg-zinc-900/80 opacity-50 sm:rounded-[4rem]"></div>
             <div className="absolute left-[6%] top-[8%] z-20 w-[45%] rotate-2 transform overflow-hidden rounded-2xl border border-zinc-700/80 shadow-2xl max-sm:max-h-[78%] sm:left-10 sm:top-10 sm:rounded-3xl">
               <img src="https://picsum.photos/seed/jp1/400/800" alt="jp-app" className="h-auto w-full max-sm:max-h-[min(58vh,320px)] max-sm:w-full max-sm:object-cover" />
             </div>
             <div className="absolute left-[38%] z-30 w-[35%] -rotate-3 transform overflow-hidden rounded-2xl border border-zinc-700/80 shadow-2xl max-sm:top-2 sm:left-[40%] sm:top-[-40px] sm:rounded-3xl">
                <img src="https://picsum.photos/seed/art2/400/400" alt="jp-art" className="h-full w-full object-cover" />
             </div>
          </div>
          <div className="order-2 min-w-0 space-y-5 sm:space-y-8">
            <h3 className="text-2xl font-bold sm:text-4xl">Kana Master</h3>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'ReactNative', 'Redux Toolkit', 'i18n', 'iOS'].map((tag) => (
                <span key={tag} className={techTagClass}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={projectCopyGlass}>
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-lg">
                Kana Master — это <span className="text-white">iOS приложение</span>, предназначенное для{' '}
                <span className="text-white">изучения Катаканы и Хираганы</span>. Оно включает различные тесты и практические упражнения.
                <br />
                <br />
                Приложение также предлагает <span className="text-white italic">аудиотренировки</span> для правильного произношения и демонстрирует, как
                правильно <span className="text-white">рисовать каждый символ</span>.
              </p>
            </div>
            <div className="flex gap-4">
               <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-xl transition-transform hover:scale-110">
                 <ArrowUpRight size={24} />
               </button>
            </div>
          </div>
        </div>
      </article>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={openMoreProjects}
          className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-bold text-black shadow-[0_14px_44px_rgba(0,0,0,0.28)] transition-all hover:bg-zinc-200 active:scale-[0.98] sm:px-7 sm:py-4"
        >
          Остальные проекты
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-0.5">
            <ArrowUpRight size={16} />
          </span>
        </button>
      </div>
    </section>
  );
};

export default Projects;
