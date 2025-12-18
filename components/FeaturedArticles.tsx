
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ARTICLES = [
  {
    title: "Самый простой пример: Kafka + Golang",
    description: "В этой статье представлен простой способ реализации микросервисной архитектуры с использованием Kafka, Golang и Docker.",
    img: "https://picsum.photos/seed/tech1/600/600"
  },
  {
    title: "Глубокое погружение в возможности React 19",
    description: "Изучение нового хука use(), серверных компонентов и улучшений производительности в последней версии React.",
    img: "https://picsum.photos/seed/tech2/600/600"
  },
  {
    title: "Микросервисы с gRPC и Node.js",
    description: "Как построить сверхбыстрые слои коммуникации между вашими сервисами с использованием Protocol Buffers и gRPC.",
    img: "https://picsum.photos/seed/tech3/600/600"
  }
];

const FeaturedArticles: React.FC = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % ARTICLES.length);
  const prev = () => setIndex((prev) => (prev - 1 + ARTICLES.length) % ARTICLES.length);

  const currentArticle = ARTICLES[index];
  const nextArticle = ARTICLES[(index + 1) % ARTICLES.length];
  const prevArticle = ARTICLES[(index - 1 + ARTICLES.length) % ARTICLES.length];

  return (
    <section className="py-20 px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center gap-8 justify-center relative">
        
        {/* Left Preview */}
        <div className="hidden lg:block min-w-[25%] opacity-20 grayscale blur-sm transform scale-90 transition-all duration-700">
           <ArticleCard title={prevArticle.title} />
        </div>

        {/* Main Card */}
        <div className="min-w-full lg:min-w-[50%] bg-zinc-900/80 rounded-[4rem] p-8 md:p-12 relative border border-zinc-800 flex flex-col md:flex-row gap-8 items-center transition-all duration-700 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <button 
              onClick={prev}
              className="absolute top-1/2 left-[-20px] md:left-[-30px] -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white text-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all z-20 shadow-xl"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="w-full md:w-1/2 overflow-hidden rounded-3xl">
                <img 
                  key={currentArticle.img}
                  src={currentArticle.img} 
                  alt="abstract" 
                  className="w-full h-auto aspect-square object-cover shadow-2xl animate-[fadeIn_0.5s_ease-out]"
                />
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold leading-tight font-mono min-h-[4rem]">
                  {currentArticle.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {currentArticle.description}
                </p>
                <div className="flex gap-3 pt-4">
                  <button className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-zinc-200 transition-colors">
                    Читать далее
                  </button>
                  <button 
                    onClick={next}
                    className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-colors"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
            </div>

            <button 
              onClick={next}
              className="absolute top-1/2 right-[-20px] md:right-[-30px] -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white text-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all z-20 shadow-xl"
            >
              <ArrowRight size={20} />
            </button>
        </div>

        {/* Right Preview */}
        <div className="hidden lg:block min-w-[25%] opacity-20 grayscale blur-sm transform scale-90 transition-all duration-700">
           <ArticleCard title={nextArticle.title} />
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-12">
        {ARTICLES.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-500 rounded-full ${i === index ? 'w-12 bg-white' : 'w-4 bg-zinc-800'}`} 
          />
        ))}
      </div>
    </section>
  );
};

const ArticleCard = ({ title }: { title: string }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 space-y-4">
    <h4 className="text-xl font-bold font-mono">{title}</h4>
    <p className="text-sm text-zinc-500">Предпросмотр предстоящей статьи...</p>
    <div className="flex gap-4 pt-4">
        <div className="bg-zinc-800 w-10 h-10 rounded-full"></div>
    </div>
  </div>
);

export default FeaturedArticles;
