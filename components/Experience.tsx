
import React from 'react';

const stackGroups = [
  {
    title: 'Frontend',
    subtitle: 'Интерфейсы и SPA',
    items: ['React', 'Vue', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Vite', 'Webpack'],
  },
  {
    title: 'Backend & API',
    subtitle: 'Сервисы и данные',
    items: ['Node.js', 'Python', 'REST', 'GraphQL'],
  },
  {
    title: 'Инфра и качество',
    subtitle: 'Сборка, деплой, процесс',
    items: ['Git', 'CI/CD', 'Docker', 'Тестирование', 'Code review'],
  },
];

const Experience: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full min-w-0">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
          Стек
        </h2>
        <p className="text-zinc-500 max-w-md md:text-right font-mono text-xs sm:text-sm leading-relaxed">
          Технологии, на которых строим продукты: от прототипа до продакшена — единый стиль кода и масштабирование.
        </p>
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
                <span
                  key={tag}
                  className="font-mono text-[11px] sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-zinc-800 text-zinc-300 group-hover:border-zinc-600 group-hover:text-white transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-12 text-left sm:text-right flex flex-col sm:block gap-1">
        <span className="text-zinc-500 uppercase tracking-widest text-[10px] sm:text-xs sm:mr-4">Bloom-studio</span>
        <span className="italic text-lg sm:text-2xl font-bold text-white break-words">
          React · Vue · JS · Python
        </span>
      </div>
    </section>
  );
};

export default Experience;
