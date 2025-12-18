
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-zinc-500">... /О себе ...</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <div className="text-3xl md:text-4xl leading-snug">
              Привет! Я Иван, я <span className="italic font-bold">full-stack разработчик</span>.<br />
              Более <span className="font-bold border-b-2 border-white">5 лет</span> опыта.
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Reveal delay={0.3} width="100%">
              <div className="bg-white text-black p-8 rounded-[3rem] h-full">
                <h4 className="text-lg font-bold mb-4 font-mono">Front-end</h4>
                <p className="text-sm leading-relaxed tracking-tight text-zinc-700">
                  TypeScript / React / Vue / Vuex / Redux Toolkit / NextJs / Nuxt / Jest / GraphQL / React Native / Puppeteer / Enzyme
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4} width="100%">
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] relative group h-full">
                <h4 className="text-lg font-bold mb-4 font-mono">Стили</h4>
                <p className="text-xs text-zinc-500 uppercase tracking-widest leading-loose">
                  SCSS / SASS / PostCSS / ANT-D / MUI / Material UI
                </p>
                <div className="absolute bottom-6 right-6 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.5} width="100%">
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] md:row-span-2 h-full">
                <h4 className="text-lg font-bold mb-4 font-mono">Back-end</h4>
                <p className="text-sm text-zinc-500 leading-loose">
                  Golang / Gin / GORM / PostgreSQL / MySQL / MongoDB / gRPC / Redis / Kafka / Node / Nest / TypeORM / Microservices
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.6} width="100%">
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] h-full">
                <h4 className="text-lg font-bold mb-4 font-mono">DevOps</h4>
                <p className="text-sm text-zinc-500 leading-loose">
                  Nginx / Oracle / Docker / (CI/CD) / K8s / Bash
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.4}>
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl -z-10 transform scale-110 group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="relative aspect-square max-w-md mx-auto">
               <div className="absolute inset-0 rounded-full border border-zinc-800 group-hover:border-zinc-500 transition-colors"></div>
               <img 
                 src="https://picsum.photos/seed/ivan/600/600" 
                 alt="Иван Жучков" 
                 className="w-[85%] h-[85%] object-cover rounded-[4rem] grayscale absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-700"
               />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
