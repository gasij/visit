
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [percent, setPercent] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setExit(true), 500);
          setTimeout(onFinished, 1200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${exit ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="relative overflow-hidden mb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase animate-pulse">
          sopranos studio
        </h1>
      </div>
      
      <div className="w-64 h-[1px] bg-zinc-800 relative overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-white transition-all duration-300 ease-out" 
          style={{ width: `${percent}%` }}
        />
      </div>
      
      <div className="mt-4 font-mono text-zinc-500 text-sm tracking-widest">
        {percent.toString().padStart(3, '0')}%
      </div>
      
      <div className="absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-zinc-700">
        Установка соединения с портфолио
      </div>
    </div>
  );
};

export default LoadingScreen;
