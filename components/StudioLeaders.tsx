import React from 'react';
import ProfileCard from './ProfileCard';
import Reveal from './Reveal';

const ICON_PATTERN =
  'https://www.transparenttextures.com/patterns/carbon-fibre.png';

const leaders = [
  {
    name: 'Иван Жучков',
    title: 'Tech Lead · Full-stack',
    handle: 'ivan_zh',
    status: 'В сети',
    contactText: 'Написать',
    avatarUrl: '/ivan-avatar.png',
    behindGlowColor: 'hsla(262, 100%, 70%, 0.55)',
    innerGradient:
      'linear-gradient(145deg,hsla(262, 45%, 40%, 0.14) 0%,hsla(280, 55%, 55%, 0.08) 100%)',
  },
  {
    name: 'Артём Горчев',
    title: 'Lead Frontend',
    handle: 'artem_g',
    status: 'В сети',
    contactText: 'Написать',
    avatarUrl: '/artem-gorchev.png',
    behindGlowColor: 'hsla(28, 95%, 58%, 0.45)',
    innerGradient:
      'linear-gradient(145deg,hsla(20, 50%, 35%, 0.14) 0%,hsla(35, 55%, 48%, 0.08) 100%)',
  },
  {
    name: 'Вадим Белозеров',
    title: 'Lead Backend',
    handle: 'vadim_b',
    status: 'В сети',
    contactText: 'Написать',
    avatarUrl: '/vadim-belozerov.png',
    behindGlowColor: 'hsla(0, 85%, 52%, 0.42)',
    innerGradient:
      'linear-gradient(145deg,hsla(0, 55%, 30%, 0.14) 0%,hsla(350, 45%, 40%, 0.08) 100%)',
  },
];

const StudioLeaders: React.FC = () => {
  return (
    <section
      id="leaders"
      className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-8 max-w-[1400px] mx-auto w-full min-w-0 relative z-10"
    >
      <Reveal>
        <div className="text-center mb-4">
          <span className="font-mono text-zinc-500 text-sm">... / лиды студии ...</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-center mb-12 md:mb-16">
          Команда
        </h2>
      </Reveal>

      <div
        className="grid gap-10 md:gap-8 xl:gap-10 items-start justify-items-stretch w-full"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
        }}
      >
        {leaders.map((L, i) => (
          <Reveal key={L.handle} delay={0.05 + i * 0.05} width="100%" defaultVisible>
            <div className="w-full flex justify-center min-h-[420px] py-1 box-border">
              <ProfileCard
                compact
                name={L.name}
                title={L.title}
                handle={L.handle}
                status={L.status}
                contactText={L.contactText}
                avatarUrl={L.avatarUrl}
                showUserInfo
                enableTilt={false}
                enableMobileTilt={false}
                onContactClick={() => {
                  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
                }}
                behindGlowColor={L.behindGlowColor}
                iconUrl={ICON_PATTERN}
                behindGlowEnabled
                innerGradient={L.innerGradient}
                behindGlowSize="55%"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default StudioLeaders;
