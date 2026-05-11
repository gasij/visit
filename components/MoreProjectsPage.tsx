import React from 'react';
import { ArrowLeft, ArrowUpRight, CalendarDays, Layers3 } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SectionPath from './SectionPath';

const otherProjects = [
  {
    title: 'Aperta',
    type: 'Brand site',
    year: '2026',
    summary:
      'Минималистичный сайт для технологического продукта: быстрый первый экран, аккуратная типографика и система повторяемых секций для команды.',
    stack: ['React', 'Tailwind', 'Motion', 'Design system'],
    accent: 'from-cyan-400/18 via-sky-500/10 to-transparent',
  },
  {
    title: 'Bloom Code',
    type: 'Education platform',
    year: '2025',
    summary:
      'Платформа для обучения разработке с личным кабинетом, каталогом материалов и сценариями прогресса для студентов.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Analytics'],
    accent: 'from-fuchsia-400/16 via-violet-500/10 to-transparent',
  },
  {
    title: 'Forma CRM',
    type: 'Internal tool',
    year: '2025',
    summary:
      'Внутренний CRM-инструмент для обработки лидов, статусов сделок и ежедневной операционной работы менеджеров.',
    stack: ['React', 'Node.js', 'Redis', 'Integrations'],
    accent: 'from-emerald-400/14 via-teal-500/10 to-transparent',
  },
  {
    title: 'Northline',
    type: 'Corporate website',
    year: '2024',
    summary:
      'Корпоративный сайт с понятной структурой услуг, редакторскими страницами и адаптивной дизайн-системой.',
    stack: ['Vite', 'CMS', 'SEO', 'Performance'],
    accent: 'from-amber-400/14 via-orange-500/10 to-transparent',
  },
];

const goHome = () => {
  window.history.pushState(null, '', '/');
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
};

const MoreProjectsPage: React.FC = () => {
  return (
    <div className="relative w-full min-w-0 overflow-x-hidden">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pt-32 md:px-8">
        <button
          type="button"
          onClick={goHome}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
        >
          <ArrowLeft size={16} />
          На главную
        </button>

        <div className="mb-10 space-y-5 sm:mb-14">
          <SectionPath items={['проекты', 'архив']} />
          <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl">
            Остальные проекты
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-lg">
            Несколько дополнительных кейсов и направлений, которые показывают разные форматы работы: от
            брендовых сайтов до внутренних инструментов и образовательных платформ.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {otherProjects.map((project) => (
            <article
              key={project.title}
              className="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/[0.12] bg-zinc-950/45 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_56px_rgba(0,0,0,0.22)] backdrop-blur-md transition-colors hover:border-white/20 sm:p-8"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent}`} />
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl transition-opacity group-hover:opacity-80" />

              <div className="relative z-10 flex h-full min-h-[300px] flex-col">
                <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5">
                    <Layers3 size={14} />
                    {project.type}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5">
                    <CalendarDays size={14} />
                    {project.year}
                  </span>
                </div>

                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{project.title}</h2>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-300 sm:text-base">{project.summary}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[11px] text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-105"
                    aria-label={`Открыть проект ${project.title}`}
                  >
                    <ArrowUpRight size={20} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MoreProjectsPage;
