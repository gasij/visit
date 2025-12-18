
import React from 'react';

const Experience: React.FC = () => {
  const jobs = [
    { period: '2022 - настоящее время', duration: '1 год 3 месяца', company: 'ITHUB', role: 'Frontend разработчик | React & Vue', active: false },
    { period: '2021 - 2022', duration: '8 месяцев', company: 'VK Development Lab', role: 'Frontend разработчик | React', active: true },
    { period: '2020 - 2021', duration: '9 месяцев', company: 'SN Inc.', role: 'Fullstack разработчик | JavaScript & Python', active: false },
    { period: '2018 - 2020', duration: '1 год 11 месяцев', company: 'Business Up', role: 'Fullstack разработчик | JavaScript & Python', active: false },
  ];

  return (
    <section className="py-32 px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-baseline mb-20">
        <h2 className="text-8xl font-black uppercase tracking-tighter">Работа</h2>
      </div>

      <div className="space-y-2">
        {jobs.map((job, i) => (
          <div 
            key={i} 
            className={`group grid grid-cols-1 md:grid-cols-12 items-center p-8 transition-all ${
              job.active 
                ? 'bg-white text-black rounded-lg' 
                : 'border-b border-zinc-900 hover:bg-zinc-900/50'
            }`}
          >
            <div className="md:col-span-3 space-y-1">
              <div className="font-mono text-lg">{job.period}</div>
              <div className="text-xs uppercase opacity-50 tracking-widest">{job.duration}</div>
            </div>
            <div className="md:col-span-4 text-2xl font-bold tracking-tight py-4 md:py-0">
              {job.company}
              {job.active && <span className="ml-4 inline-block w-2 h-2 bg-black rounded-full animate-pulse"></span>}
            </div>
            <div className="md:col-span-5 text-zinc-500 font-mono text-right group-hover:text-current transition-colors">
              {job.role}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-right">
        <span className="text-zinc-500 uppercase tracking-widest text-xs mr-4">Опыт работы</span>
        <span className="italic text-2xl font-bold">4 года 9 месяцев</span>
      </div>
    </section>
  );
};

export default Experience;
