import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

const PANEL_TITLE = 'Ассистент webfoundry';
/** Оверлей чуть короче панели — ощущение глубины */
const OVERLAY_DURATION_MS = 420;
const PANEL_DURATION_MS = 560;
const PANEL_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const OVERLAY_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const AIAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  /** Панель в DOM; `entered` — конечное состояние анимации (видимо) */
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openPanel = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
    setMounted(true);
    if (reduceMotion) {
      setEntered(true);
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
  }, [reduceMotion]);

  const closePanel = useCallback(() => {
    setEntered(false);
    if (reduceMotion) {
      setMounted(false);
      setOpen(false);
      return;
    }
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setMounted(false);
      setOpen(false);
      closeTimerRef.current = null;
    }, PANEL_DURATION_MS);
  }, [reduceMotion]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && closePanel();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, closePanel]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setInput('');
  };

  const toggleFab = () => {
    if (open) closePanel();
    else openPanel();
  };

  const overlayTransition = reduceMotion
    ? ''
    : 'transition-[opacity,backdrop-filter] duration-[var(--ai-overlay-dur,420ms)] ease-[cubic-bezier(0.22,1,0.36,1)]';

  const panelTransition = reduceMotion
    ? ''
    : 'transform-gpu transition-[transform,opacity,box-shadow] duration-[var(--ai-panel-dur,560ms)] ease-[cubic-bezier(0.16,1,0.3,1)]';

  const innerStagger = reduceMotion
    ? ''
    : 'transition-[transform,opacity] duration-[var(--ai-inner-dur)] ease-[cubic-bezier(0.16,1,0.3,1)]';

  const overlayStyle: React.CSSProperties | undefined = reduceMotion
    ? undefined
    : {
        ['--ai-overlay-dur' as string]: `${OVERLAY_DURATION_MS}ms`,
        transitionTimingFunction: OVERLAY_EASE,
      };

  const panelStyle: React.CSSProperties | undefined = reduceMotion
    ? undefined
    : {
        ['--ai-panel-dur' as string]: `${PANEL_DURATION_MS}ms`,
        ['--ai-inner-dur' as string]: `${Math.round(PANEL_DURATION_MS * 0.72)}ms`,
        transitionTimingFunction: PANEL_EASE,
      };

  return (
    <>
      {mounted && (
        <button
          type="button"
          className={`fixed inset-0 z-[55] bg-black/50 md:bg-black/30 ${overlayTransition} ${
            entered ? 'opacity-100 backdrop-blur-sm md:backdrop-blur-md' : 'opacity-0 backdrop-blur-none'
          }`}
          style={overlayStyle}
          aria-label="Закрыть панель ассистента"
          onClick={closePanel}
        />
      )}

      <div className="pointer-events-none fixed bottom-0 right-0 z-[60] flex w-full max-w-[100vw] flex-col items-end gap-3 p-4 md:bottom-6 md:right-6 md:w-auto md:max-w-[min(100vw-2rem,420px)]">
        {mounted && (
          <div
            id="ai-assistant-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-assistant-title"
            className={`pointer-events-auto flex max-h-[min(72vh,560px)] w-full min-h-0 origin-bottom-right flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/92 shadow-2xl shadow-violet-950/20 backdrop-blur-xl md:rounded-2xl ${panelTransition} ${
              entered
                ? 'translate-x-0 translate-y-0 scale-100 opacity-100 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06),0_0_40px_-8px_rgba(139,92,246,0.18)]'
                : 'translate-x-3 translate-y-7 scale-[0.9] opacity-0 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] md:translate-x-2 md:translate-y-6'
            }`}
            style={panelStyle}
          >
            <div
              className={`flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 ${innerStagger} ${
                entered ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'
              }`}
              style={reduceMotion ? undefined : { transitionDelay: entered ? '60ms' : '0ms' }}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 text-violet-200">
                  <Sparkles size={18} strokeWidth={2} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h2 id="ai-assistant-title" className="truncate text-sm font-semibold text-white">
                    {PANEL_TITLE}
                  </h2>
                  <p className="text-xs text-zinc-500">Место под ИИ · скоро</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePanel}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className={`min-h-[200px] flex-1 overflow-y-auto px-4 py-4 ${innerStagger} ${
                entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
              style={reduceMotion ? undefined : { transitionDelay: entered ? '100ms' : '0ms' }}
            >
              <div className="rounded-xl border border-dashed border-zinc-700/80 bg-zinc-900/50 px-4 py-8 text-center">
                <p className="text-sm leading-relaxed text-zinc-400">
                  Здесь будет чат с ассистентом: ответы о студии, услугах и проектах. Подключите backend или виджет
                  (OpenAI, локальная модель и т.д.).
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`shrink-0 border-t border-white/10 p-3 ${innerStagger} ${
                entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
              style={reduceMotion ? undefined : { transitionDelay: entered ? '140ms' : '0ms' }}
            >
              <div className="flex gap-2 rounded-xl border border-white/10 bg-black/40 p-1.5 focus-within:border-violet-500/40">
                <label htmlFor="ai-assistant-input" className="sr-only">
                  Сообщение ассистенту
                </label>
                <input
                  id="ai-assistant-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Написать сообщение…"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black transition hover:bg-zinc-200 disabled:opacity-40"
                  disabled={!input.trim()}
                  aria-label="Отправить"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        )}

        <button
          type="button"
          onClick={toggleFab}
          className={`pointer-events-auto ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-zinc-950/85 text-white shadow-lg backdrop-blur-xl transition-[transform,box-shadow,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-violet-400/50 hover:bg-zinc-900 hover:shadow-violet-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 md:h-[3.75rem] md:w-[3.75rem] ${
            open ? 'scale-95' : 'scale-100 hover:scale-105 active:scale-95'
          }`}
          aria-expanded={open}
          aria-controls={mounted ? 'ai-assistant-panel' : undefined}
          title={open ? 'Закрыть ассистента' : 'Открыть ассистента'}
        >
          {open ? <X size={24} /> : <MessageSquare size={24} strokeWidth={1.75} />}
        </button>
      </div>
    </>
  );
};

export default AIAssistant;
