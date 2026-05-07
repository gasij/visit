import React from 'react';
import SectionPath from './SectionPath';

const introPanelClass =
  'rounded-2xl border border-white/10 bg-zinc-950/25 px-4 py-3 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]';

const TECH_CHIP_CLASS =
  'font-mono text-[11px] sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 text-zinc-200 bg-zinc-950/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-200 hover:border-white/15 hover:bg-zinc-900/45 hover:text-white group-hover:border-white/15 group-hover:bg-zinc-900/45 group-hover:text-white';

const stackGroups = [
  {
    title: 'Frontend',
    subtitle: 'Интерфейсы и SPA',
    items: [
      'React',
      'Next.js',
      'Vue',
      'TypeScript',
      'JavaScript',
      'HTML / CSS',
      'Vite',
    ],
  },
  {
    title: 'Backend & API',
    subtitle: 'Сервисы и данные',
    items: [
      'Node.js',
      '.NET',
      'Python',
      'PHP',
      'REST',
      'GraphQL',
    ],
  },
  {
    title: 'Данные, CMS, интеграции',
    subtitle: 'Хранилища и учёт',
    items: [
      'PostgreSQL',
      'Directus',
      'Docker',
      '1С — обмен',
    ],
  },
  {
    title: 'Инфра и качество',
    subtitle: 'Сборка, деплой, процесс',
    items: ['Git', 'CI/CD', 'Тестирование', 'Code review'],
  },
];

const Experience: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full min-w-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 sm:gap-5 mb-8 sm:mb-10 md:mb-12">
        <div className="space-y-3 sm:space-y-4">
          <SectionPath items={['стек']} />
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Стек
          </h2>
        </div>
        <div className="max-w-lg md:text-right">
          <div className={`${introPanelClass} md:ml-auto max-w-lg`}>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed text-left">
              Технологии, на которых строим продукты: от прототипа до продакшена. Один стиль кода, предсказуемое
              масштабирование и аккуратные мосты к CRM, 1С и вашему текущему контуру.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {stackGroups.map((group, i) => (
          <div
            key={i}
            className="group grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-4 items-start p-4 sm:p-6 md:p-8 border-b border-zinc-900 hover:bg-zinc-900/50 transition-all rounded-xl sm:rounded-lg"
          >
            <div className="md:col-span-4 space-y-1">
              <div className="text-xl sm:text-2xl font-bold tracking-tight">{group.title}</div>
              <div className="text-[10px] sm:text-xs uppercase text-zinc-500 tracking-widest">{group.subtitle}</div>
            </div>
            <div className="md:col-span-8 flex flex-wrap gap-1.5 sm:gap-2 md:justify-end">
              {group.items.map((tag) => (
                <span key={tag} className={TECH_CHIP_CLASS}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 text-left sm:text-right flex flex-col sm:block gap-1">
        <span className="text-zinc-500 tracking-widest text-[10px] sm:text-xs sm:mr-4">AQUM</span>
        <span className="italic text-base sm:text-xl md:text-2xl font-bold text-white break-words">
          React · Next.js · .NET · Node · Directus · PostgreSQL · 1С
        </span>
      </div>
    </section>
  );
};

export default Experience;
