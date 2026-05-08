import React, {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type RefObject,
} from 'react';
import './VariableProximity.css';

type Falloff = 'linear' | 'exponential' | 'gaussian';

type VariableProximityProps = {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: RefObject<HTMLElement | null>;
  radius?: number;
  falloff?: Falloff;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

const parseSettings = (settings: string) =>
  new Map(
    settings
      .split(',')
      .map((setting) => setting.trim())
      .filter(Boolean)
      .map((setting) => {
        const [axis, value] = setting.split(/\s+/);
        return [axis.replace(/['"]/g, ''), parseFloat(value)];
      })
  );

const getFalloffValue = (distance: number, radius: number, falloff: Falloff) => {
  const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
  if (falloff === 'exponential') return norm ** 2;
  if (falloff === 'gaussian') return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
  return norm;
};

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (
    {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 100,
      falloff = 'linear',
      className = '',
      style,
      onClick,
    },
    ref
  ) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const pointerRef = useRef({ x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY });

    const parsedSettings = useMemo(() => {
      const fromSettings = parseSettings(fromFontVariationSettings);
      const toSettings = parseSettings(toFontVariationSettings);
      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    useEffect(() => {
      const updatePointer = (x: number, y: number) => {
        const container = containerRef.current;
        if (!container) {
          pointerRef.current = { x, y };
          return;
        }
        const rect = container.getBoundingClientRect();
        pointerRef.current = { x: x - rect.left, y: y - rect.top };
      };

      const onMouseMove = (event: MouseEvent) => updatePointer(event.clientX, event.clientY);
      const onTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (touch) updatePointer(touch.clientX, touch.clientY);
      };
      const onLeave = () => {
        pointerRef.current = { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY };
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('mouseleave', onLeave);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('mouseleave', onLeave);
      };
    }, [containerRef]);

    useEffect(() => {
      let frameId = 0;

      const animate = () => {
        const container = containerRef.current;
        if (!container) {
          frameId = requestAnimationFrame(animate);
          return;
        }

        const containerRect = container.getBoundingClientRect();
        const pointer = pointerRef.current;

        letterRefs.current.forEach((letter) => {
          if (!letter) return;

          const rect = letter.getBoundingClientRect();
          const letterX = rect.left + rect.width / 2 - containerRect.left;
          const letterY = rect.top + rect.height / 2 - containerRect.top;
          const distance = Math.hypot(pointer.x - letterX, pointer.y - letterY);

          if (distance >= radius) {
            letter.style.fontVariationSettings = fromFontVariationSettings;
            return;
          }

          const amount = getFalloffValue(distance, radius, falloff);
          letter.style.fontVariationSettings = parsedSettings
            .map(({ axis, fromValue, toValue }) => {
              const value = fromValue + (toValue - fromValue) * amount;
              return `'${axis}' ${value.toFixed(2)}`;
            })
            .join(', ');
        });

        frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }, [containerRef, falloff, fromFontVariationSettings, parsedSettings, radius]);

    const words = label.split(' ');
    let letterIndex = 0;

    return (
      <span
        ref={ref}
        className={`${className} variable-proximity`}
        onClick={onClick}
        style={{ display: 'inline', ...style }}
      >
        {words.map((word, wordIndex) => (
          <span className="variable-proximity__word" key={`${word}-${wordIndex}`}>
            {word.split('').map((letter) => {
              const currentIndex = letterIndex;
              letterIndex += 1;
              return (
                <span
                  aria-hidden="true"
                  className="variable-proximity__letter"
                  key={`${letter}-${currentIndex}`}
                  ref={(element) => {
                    letterRefs.current[currentIndex] = element;
                  }}
                  style={{ fontVariationSettings: fromFontVariationSettings }}
                >
                  {letter}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && <span aria-hidden="true">&nbsp;</span>}
          </span>
        ))}
        <span className="variable-proximity__sr-only">{label}</span>
      </span>
    );
  }
);

VariableProximity.displayName = 'VariableProximity';

export default VariableProximity;
