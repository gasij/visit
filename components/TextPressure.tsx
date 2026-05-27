// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
// Font used - https://compressa.preusstype.com/

import { useEffect, useRef, useState, useMemo, useCallback, type FC } from 'react';

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func: () => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(), delay);
  };
};

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
  /** hidden обрезает глифы при variable font; visible — для длинных строк в узком блоке */
  overflow?: 'hidden' | 'visible';
  /** Вертикаль внутри контейнера + точка масштаба (важно для двух строк в ряд) */
  verticalAlign?: 'start' | 'center' | 'end';
  /** Одинаковые буквы: без анимации wght/wdth от курсора */
  uniformGlyphs?: boolean;
  fixedWght?: number;
  /** Цвет каждой буквы меняется вместе с осями переменного начертания (движение от курсора) */
  colorFollowsMotion?: boolean;
  /** Центр + gap вместо space-between — визуально ровнее */
  evenLetterGap?: boolean;
  /** Доп. масштаб кегля после расчёта (например 0.9) */
  fontScale?: number;
}

const TextPressure: FC<TextPressureProps> = ({
  text = 'Compressa',
  fontFamily = 'Compressa VF',
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',
  minFontSize = 24,
  overflow = 'visible',
  verticalAlign = 'center',
  uniformGlyphs = false,
  fixedWght = 700,
  colorFollowsMotion = false,
  evenLetterGap = false,
  fontScale = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [scaleX, setScaleX] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.replace(/\n+/g, ' ').trim().split('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + w / 2;
      mouseRef.current.y = top + h / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    // Делаем буквы меньше, контейнер не меняем (0.75 = 75% от растянутого размера)
    newFontSize = newFontSize * 0.75;
    newFontSize = Math.max(newFontSize, minFontSize);
    const maxFontByHeight = containerH * 0.88;
    newFontSize = Math.min(newFontSize, maxFontByHeight);
    newFontSize *= fontScale;

    setFontSize(newFontSize);
    setScaleY(1);
    setScaleX(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current || !containerRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      if (textRect.width > containerRect.width && containerRect.width > 0) {
        setScaleX(containerRect.width / textRect.width);
      }

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale, fontScale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    if (uniformGlyphs) return;

    let rafId: number;
    let frame = 0;
    const animate = () => {
      frame += 1;
      const follow = 10;
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / follow;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / follow;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;
        const tickFont = frame % 2 === 0;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : '0';
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : '1';

          const newFontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

          if (tickFont) {
            if (span.style.fontVariationSettings !== newFontVariationSettings) {
              span.style.fontVariationSettings = newFontVariationSettings;
            }
            if (alpha && span.style.opacity !== alphaVal) {
              span.style.opacity = alphaVal;
            }
          }
          if (colorFollowsMotion) {
            const tW = (wght - 100) / 800;
            const tWd = (wdth - 5) / 195;
            const tDist = Math.min(1, d / maxDist);
            // Широкий сдвиг по кругу (≈160°+), заметные скачки насыщенности и контраста
            let hue = 185 + tW * 130 + tWd * 72 + (1 - tDist) * 88;
            hue = ((hue % 360) + 360) % 360;
            const sat = 88 + tW * 11 + (1 - tDist) * 10;
            const light = 68 + tDist * 20 + tW * 10 + tWd * 5;
            const nextColor = `hsl(${hue.toFixed(1)}, ${sat.toFixed(1)}%, ${light.toFixed(1)}%)`;
            if (span.style.color !== nextColor) {
              span.style.color = nextColor;
            }
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [uniformGlyphs, width, weight, italic, alpha, colorFollowsMotion]);

  const styleElement = useMemo(
    () => (
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }

        .text-pressure-flex {
          display: flex;
          justify-content: space-between;
        }

        .text-pressure-flex.text-pressure-flex--gap {
          justify-content: center;
          gap: clamp(0.06em, 1.5vw, 0.18em);
        }

        .text-pressure-stroke span {
          position: relative;
          color: ${textColor};
        }
        .text-pressure-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
        }
      `}</style>
    ),
    [fontFamily, fontUrl, textColor, strokeColor]
  );

  const dynamicClassName = [
    className,
    flex ? 'text-pressure-flex' : '',
    flex && evenLetterGap ? 'text-pressure-flex--gap' : '',
    stroke ? 'text-pressure-stroke' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const uniformVariation: string | undefined = uniformGlyphs ? `'wght' ${fixedWght}` : undefined;

  const justify =
    verticalAlign === 'start' ? 'flex-start' : verticalAlign === 'end' ? 'flex-end' : 'center';

  const transformOrigin =
    verticalAlign === 'start'
      ? 'center top'
      : verticalAlign === 'end'
        ? 'center bottom'
        : 'center center';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent',
        overflow,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justify,
      }}
    >
      {styleElement}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: fontSize,
          lineHeight: uniformGlyphs ? 1.05 : lineHeight,
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin,
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: uniformGlyphs ? fixedWght : 100,
          width: '100%',
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            style={{
              display: 'inline-block',
              flex: evenLetterGap ? '0 0 auto' : undefined,
              color: stroke ? undefined : textColor,
              fontVariationSettings: uniformVariation,
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
