import React from 'react';

type SectionPathProps = {
  items: string[];
  className?: string;
};

const SectionPath: React.FC<SectionPathProps> = ({ items, className = '' }) => {
  return (
    <div
      className={`font-mono text-[11px] sm:text-sm text-zinc-400 drop-shadow-[0_1px_12px_rgba(0,0,0,0.85)] ${className}`}
      aria-label={`Путь: ${items.join(' / ')}`}
    >
      <span className="text-zinc-600">...</span>
      {items.map((item) => (
        <React.Fragment key={item}>
          <span className="mx-1 text-zinc-600">/</span>
          <span>{item}</span>
        </React.Fragment>
      ))}
      <span className="ml-1 text-zinc-600">...</span>
    </div>
  );
};

export default SectionPath;
