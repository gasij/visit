
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedArticles from './components/FeaturedArticles';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ArticleList from './components/ArticleList';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      <div className={`min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background Ornaments */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full border border-zinc-800 opacity-20 transform -translate-y-1/2"></div>
          <div className="absolute bottom-[20%] left-[-15%] w-[60vw] h-[60vw] rounded-full border border-zinc-800 opacity-10"></div>
        </div>

        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <FeaturedArticles />
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
