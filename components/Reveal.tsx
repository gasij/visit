
import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  /** Above-the-fold content: start visible so it's never transparent */
  defaultVisible?: boolean;
}

const Reveal: React.FC<RevealProps> = ({ children, width = "fit-content", delay = 0, defaultVisible = false }) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [defaultVisible]);

  return (
    <div 
      ref={ref} 
      // Merged width, position, overflow, and transitionDelay into a single style object
      style={{
        width,
        maxWidth: '100%',
        position: 'relative',
        overflow: 'hidden',
        transitionDelay: `${delay}s`,
      }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

export default Reveal;
