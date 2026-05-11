
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MagicBento from './components/MagicBento';
import About from './components/About';
import StudioLeaders from './components/StudioLeaders';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ArticleList from './components/ArticleList';
import SiteCostCalculator from './components/SiteCostCalculator';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ColorBends from './components/ColorBends';
import AIAssistant from './components/AIAssistant';
import MoreProjectsPage from './components/MoreProjectsPage';

const getRoute = () => (window.location.pathname === '/projects' ? 'projects' : 'home');

const App: React.FC = () => {
  const [route, setRoute] = useState<'home' | 'projects'>(getRoute);
  const [introVisible, setIntroVisible] = useState(() => getRoute() === 'home');
  const [mainEntered, setMainEntered] = useState(() => getRoute() !== 'home');
  const [liteBg, setLiteBg] = useState(false);

  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = getRoute();
      setRoute(nextRoute);
      if (nextRoute !== 'home') {
        setIntroVisible(false);
        setMainEntered(true);
      }
    };

    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setLiteBg(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <>
      {introVisible && (
        <LoadingScreen
          onExitStart={() => undefined}
          onFinished={() => {
            setIntroVisible(false);
            window.requestAnimationFrame(() => setMainEntered(true));
          }}
        />
      )}
      {/* Вне overflow-x-hidden: иначе на iOS fixed-фон «едет» вместе со скроллом предка */}
      <div
        className={`app-fixed-webgl-bg transition-opacity delay-[140ms] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mainEntered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden
      >
        {!mainEntered ? null : liteBg ? (
          <div
            className="absolute inset-0 bg-[#060010]"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 120% 80% at 20% 30%, rgba(82,39,255,0.35), transparent 50%), radial-gradient(ellipse 90% 70% at 80% 70%, rgba(255,159,252,0.2), transparent 45%), radial-gradient(ellipse 80% 60% at 50% 100%, rgba(177,158,239,0.15), transparent 40%)',
            }}
          />
        ) : (
          <ColorBends
            className="absolute inset-0 h-full w-full"
            colors={['#e85a78', '#7a62e8', '#35d4c4']}
            rotation={0}
            speed={0.2}
            scale={1}
            frequency={1}
            warpStrength={0.92}
            mouseInfluence={0.9}
            parallax={0.5}
            noise={0.1}
            transparent
            autoRotate={0}
          />
        )}
      </div>

      <div
        className={`relative z-10 min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden transition-[opacity,transform] delay-[140ms] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mainEntered ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.994] opacity-0'
        }`}
      >
        <div className="relative w-full min-w-0 overflow-x-hidden">
          {route === 'projects' ? (
            <MoreProjectsPage />
          ) : (
            <>
              <Header />
              <main className="w-full min-w-0 overflow-x-hidden">
                <Hero />
                <Projects />
                <Experience />

                <ArticleList />
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
                <StudioLeaders />
                <SiteCostCalculator />
                <ContactForm />
              </main>
              <Footer />
              <AIAssistant />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
