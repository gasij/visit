
import React, { useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

const ALL_ARTICLES = [
  {
    id: 1,
    title: "Самый простой пример: Kafka + Golang",
    description: "В этой статье представлен простой способ реализации микросервисной архитектуры с использованием Kafka, Golang и Docker."
  },
  {
    id: 2,
    title: "Микросервисы с gRPC и Node.js",
    description: "Как построить сверхбыстрые слои коммуникации между вашими сервисами с использованием Protocol Buffers и gRPC."
  },
  {
    id: 3,
    title: "Освоение TypeScript 5.0",
    description: "Изучение декораторов, параметров типа const и множественного наследования конфигураций в последнем релизе TS."
  },
  {
    id: 4,
    title: "Эффективная индексация в Postgres",
    description: "Узнайте, как оптимизировать ваши запросы с помощью B-tree, GIN и GiST индексов для высоконагруженных приложений."
  },
  {
    id: 5,
    title: "Управление состоянием в 2024",
    description: "Сравнение Redux Toolkit, Zustand и signals в современных рабочих процессах разработки на React."
  },
  {
    id: 6,
    title: "Докеризация сложных приложений",
    description: "Лучшие практики для многоэтапных сборок и уменьшения размера образа для production окружений."
  }
];

const ArticleList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 4;
  
  const totalPages = Math.ceil(ALL_ARTICLES.length / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsAnimating(false);
    }, 400); // Duration of fade-out
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = ALL_ARTICLES.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="articles" className="py-32 px-8 max-w-7xl mx-auto">
      <div className="flex justify-end mb-20 overflow-hidden">
        <h2 className="text-6xl md:text-9xl font-black opacity-100 tracking-tighter transform md:translate-x-12 animate-[fadeIn_0.8s_ease-out]">
          Статьи
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* Functional Navigation Sidebar */}
        <div className="absolute left-[-60px] md:left-[-100px] top-0 hidden lg:flex flex-col gap-4 sticky h-fit">
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300 border ${
                currentPage === i + 1 
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(currentPage === totalPages ? 1 : currentPage + 1)}
            className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-500 transition-all active:scale-90"
          >
            <ArrowDown size={20} className={currentPage === totalPages ? "rotate-180 transition-transform duration-500" : "transition-transform duration-500"} />
          </button>
        </div>

        {/* Article Grid with Sliding Animation Container */}
        <div className={`grid md:grid-cols-2 gap-8 md:col-span-2 transition-all duration-500 ease-in-out transform ${
          isAnimating ? 'opacity-0 translate-y-8 blur-sm' : 'opacity-100 translate-y-0 blur-0'
        }`}>
          {currentArticles.map((article) => (
            <div 
              key={article.id} 
              className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-[3.5rem] hover:bg-zinc-800/80 transition-all group hover:scale-[1.02] cursor-pointer"
            >
              <h4 className="text-2xl md:text-3xl font-bold font-mono mb-6 leading-tight group-hover:text-white transition-colors">
                {article.title}
              </h4>
              <p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-sm h-12 overflow-hidden">
                {article.description}
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-zinc-200 transition-all group-active:scale-95">
                  Читать далее
                </button>
                <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          ))}
          
          {/* Fill empty spots to maintain grid layout height if last page has fewer items */}
          {currentArticles.length < itemsPerPage && 
            [...Array(itemsPerPage - currentArticles.length)].map((_, i) => (
              <div key={`empty-${i}`} className="hidden md:block p-12 border border-dashed border-zinc-900/50 rounded-[3.5rem]" />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default ArticleList;
