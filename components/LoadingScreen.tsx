
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Prism from './Prism';

interface LoadingScreenProps {
  onFinished: () => void;
  onExitStart: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished, onExitStart }) => {
  const [exit, setExit] = useState(false);
  const startedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const startExit = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setExit(true);
    onExitStart();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    window.setTimeout(onFinished, 760);
  }, [onExitStart, onFinished]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) > 4 || Math.abs(event.deltaX) > 10) startExit();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;
      if (startY == null || currentY == null) return;
      if (startY - currentY > 18) startExit();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        startExit();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [startExit]);

  return (
    <div
      className={`aqum-intro-gate fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black ${
        exit ? 'aqum-intro-gate--exit' : ''
      }`}
      aria-label="Вход на сайт AQUM"
    >
      <div className="absolute inset-0 opacity-80">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>
      <div className="absolute inset-0 bg-black/35" aria-hidden />
      <div
        className={`aqum-intro-word relative z-10 flex justify-center px-4 sm:px-6 ${
          exit ? 'aqum-intro-word--exit' : ''
        }`}
      >
        <div className="text-[clamp(5.75rem,20vw,18rem)] font-black leading-none tracking-normal text-white">
          AQUM
        </div>
      </div>
      <div className={`aqum-scroll-cue z-10 ${exit ? 'aqum-scroll-cue--exit' : ''}`} aria-hidden="true">
        <span className="aqum-scroll-cue__arrow" />
      </div>
    </div>
  );
};

export default LoadingScreen;
