
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MagicBento from './components/MagicBento';
import About from './components/About';
import StudioLeaders from './components/StudioLeaders';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ArticleList from './components/ArticleList';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import LiquidEther from './components/LiquidEther';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [liteBg, setLiteBg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)');
    const sync = () => setLiteBg(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      <div className={`min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Фон: на мобилке и при reduce-motion — статика (без WebGL) */}
        <div className="fixed inset-0 z-0">
          {liteBg ? (
            <div
              className="absolute inset-0 bg-[#060010]"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 120% 80% at 20% 30%, rgba(82,39,255,0.35), transparent 50%), radial-gradient(ellipse 90% 70% at 80% 70%, rgba(255,159,252,0.2), transparent 45%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(177,158,239,0.15), transparent 40%)',
              }}
            />
          ) : (
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={16}
              cursorSize={90}
              isViscous
              viscous={28}
              iterationsViscous={10}
              iterationsPoisson={10}
              resolution={0.28}
              isBounce={false}
              autoDemo
              autoSpeed={0.35}
              autoIntensity={1.6}
              takeoverDuration={0.25}
              autoResumeDelay={4000}
              autoRampDuration={0.6}
            />
          )}
        </div>
        {/* Background Ornaments */}
        <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full border border-zinc-800 opacity-20 transform -translate-y-1/2"></div>
          <div className="absolute bottom-[20%] left-[-15%] w-[60vw] h-[60vw] rounded-full border border-zinc-800 opacity-10"></div>
        </div>

        <div className="relative z-10 w-full min-w-0 overflow-x-hidden">
          <Header />
          <main className="w-full min-w-0 overflow-x-hidden">
            <Hero />
            <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
              <div className="text-center mb-8 md:mb-10">
                <span className="font-mono text-zinc-500 text-sm">... / команда ...</span>
              </div>
              <MagicBento
                textAutoHide
                enableStars={false}
                enableSpotlight={false}
                enableBorderGlow
                enableTilt={false}
                enableMagnetism={false}
                clickEffect={false}
                spotlightRadius={280}
                particleCount={0}
                glowColor="132, 0, 255"
                disableAnimations={false}
              />
            </section>
            <StudioLeaders />
            <About />
            <Experience />
            <Projects />
            <ArticleList />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
