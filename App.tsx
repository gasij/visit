
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MagicBento from './components/MagicBento';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ArticleList from './components/ArticleList';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import LiquidEther from './components/LiquidEther';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      <div className={`min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Liquid background */}
        <div className="fixed inset-0 z-0">
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
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
                enableStars
                enableSpotlight
                enableBorderGlow
                enableTilt={false}
                enableMagnetism={false}
                clickEffect
                spotlightRadius={400}
                particleCount={12}
                glowColor="132, 0, 255"
                disableAnimations={false}
              />
            </section>
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
