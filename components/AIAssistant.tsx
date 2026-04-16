import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

const PANEL_TITLE = 'Ассистент Bloom';

const AIAssistant: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open]);

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

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-[2px] md:bg-black/30"
          aria-label="Закрыть панель ассистента"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="pointer-events-none fixed bottom-0 right-0 z-[60] flex w-full max-w-[100vw] flex-col items-end gap-3 p-4 md:bottom-6 md:right-6 md:w-auto md:max-w-[min(100vw-2rem,420px)]">
        {open && (
          <div
            id="ai-assistant-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-assistant-title"
            className="pointer-events-auto flex max-h-[min(72vh,560px)] w-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/92 shadow-2xl backdrop-blur-xl md:rounded-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
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
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>
            </div>

            <div className="min-h-[200px] flex-1 overflow-y-auto px-4 py-4">
              <div className="rounded-xl border border-dashed border-zinc-700/80 bg-zinc-900/50 px-4 py-8 text-center">
                <p className="text-sm leading-relaxed text-zinc-400">
                  Здесь будет чат с ассистентом: ответы о студии, услугах и проектах. Подключите backend или виджет
                  (OpenAI, локальная модель и т.д.).
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="shrink-0 border-t border-white/10 p-3">
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
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-zinc-950/85 text-white shadow-lg backdrop-blur-xl transition hover:border-violet-400/50 hover:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 md:h-[3.75rem] md:w-[3.75rem]"
          aria-expanded={open}
          aria-controls={open ? 'ai-assistant-panel' : undefined}
          title={open ? 'Закрыть ассистента' : 'Открыть ассистента'}
        >
          {open ? <X size={24} /> : <MessageSquare size={24} strokeWidth={1.75} />}
        </button>
      </div>
    </>
  );
};

export default AIAssistant;
