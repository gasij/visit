import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, Send } from 'lucide-react';
import Reveal from './Reveal';
import {
  CONTACT_CALC_PREFILL_KEY,
  CONTACT_CALC_PREFILL_EVENT,
  formatCalcPrefillForMessage,
  readCalcPrefillPayload,
} from '@/lib/contactCalcPrefill';

/** Замените на свой email для отправки через почтовый клиент */
const CONTACT_MAIL_TO = 'hello@webfoundry.com';

/** Как у блоков описания в Projects: стеклянная панель */
const introGlass =
  'max-w-md rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-zinc-950/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl backdrop-saturate-150 px-5 py-5 sm:px-7 sm:py-6';

type Field = 'name' | 'email' | 'message';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const applyCalcPrefill = useCallback(() => {
    const p = readCalcPrefillPayload();
    if (!p) return;
    setMessage(formatCalcPrefillForMessage(p));
    sessionStorage.removeItem(CONTACT_CALC_PREFILL_KEY);
  }, []);

  useEffect(() => {
    applyCalcPrefill();
    window.addEventListener(CONTACT_CALC_PREFILL_EVENT, applyCalcPrefill);
    window.addEventListener('hashchange', applyCalcPrefill);
    return () => {
      window.removeEventListener(CONTACT_CALC_PREFILL_EVENT, applyCalcPrefill);
      window.removeEventListener('hashchange', applyCalcPrefill);
    };
  }, [applyCalcPrefill]);

  const errors: Partial<Record<Field, string>> = {};
  if (touched.name && !name.trim()) errors.name = 'Укажите имя';
  if (touched.email) {
    if (!email.trim()) errors.email = 'Укажите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Некорректный email';
  }
  if (touched.message && !message.trim()) errors.message = 'Напишите сообщение';

  const isValid =
    name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    message.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setStatus('sending');
    const subject = encodeURIComponent(`Сайт webfoundry — ${name.trim()}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}`
    );
    const href = `mailto:${CONTACT_MAIL_TO}?subject=${subject}&body=${body}`;

    window.location.href = href;
    setStatus('sent');
  };

  const inputClass =
    'w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-zinc-500';

  return (
    <section
      id="contact"
      className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full min-w-0"
      aria-labelledby="contact-heading"
    >
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="space-y-6 min-w-0">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-zinc-400 drop-shadow-[0_1px_12px_rgba(0,0,0,0.85)]">... /Связь ...</span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)]"
            >
              Расскажите о&nbsp;задаче
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <div className={introGlass}>
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                Опишите проект, сроки и бюджет — ответим в течение рабочего дня. Форма открывает почтовый
                клиент с заполненным письмом; адрес получателя задаётся в коде компонента.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} width="100%">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl sm:rounded-[2rem] border border-zinc-800 bg-zinc-950/40 p-6 sm:p-8 md:p-10 space-y-5 backdrop-blur-sm"
            noValidate
          >
            <div className="space-y-2">
              <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-widest text-zinc-500">
                Имя
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                className={inputClass}
                placeholder="Как к вам обращаться"
              />
              {errors.name && <p className="text-xs text-red-400/90">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-widest text-zinc-500">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={inputClass}
                placeholder="you@company.com"
              />
              {errors.email && <p className="text-xs text-red-400/90">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-widest text-zinc-500">
                Сообщение
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={8}
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                className={`${inputClass} min-h-[180px] resize-y`}
                placeholder="Кратко о продукте, стеке и сроках"
              />
              {errors.message && <p className="text-xs text-red-400/90">{errors.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-black transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Открываем почту…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden />
                    Отправить
                  </>
                )}
              </button>
              {status === 'sent' && (
                <p className="rounded-lg border border-zinc-800/80 bg-zinc-950/90 px-3 py-2 text-xs font-mono text-zinc-200 backdrop-blur-sm sm:ml-2">
                  Если почта не открылась, напишите на {CONTACT_MAIL_TO}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactForm;
