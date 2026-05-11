import React, { useMemo, useState, useCallback } from 'react';
import { Calculator, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import SectionPath from './SectionPath';
import {
  CONTACT_CALC_PREFILL_KEY,
  CONTACT_CALC_PREFILL_EVENT,
  type CalcPrefillV1,
} from '@/lib/contactCalcPrefill';
import {
  calculateSiteCost,
  DESIGN,
  MOTION,
  SITE_OPTIONS,
  SPEED,
  type DesignTier,
  type MotionTier,
  type SiteKind,
  type SpeedTier,
} from '@/lib/siteCostCalculator';

const panelGlass =
  'rounded-2xl sm:rounded-3xl border border-white/[0.14] bg-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md';

const labelClass = 'block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3';

const fmt = (n: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(Math.round(n));

const SiteCostCalculator: React.FC = () => {
  const [kind, setKind] = useState<SiteKind>('corporate');
  const [pages, setPages] = useState(8);
  const [design, setDesign] = useState<DesignTier>('custom');
  const [motion, setMotion] = useState<MotionTier>('standard');
  const [speed, setSpeed] = useState<SpeedTier>('m1_2');
  const [cms, setCms] = useState(true);
  const [payments, setPayments] = useState(false);
  const [crm, setCrm] = useState(false);
  const [i18n, setI18n] = useState(false);

  const estimate = useMemo(
    () => calculateSiteCost({ kind, pages, design, motion, speed, cms, payments, crm, i18n }),
    [kind, pages, design, motion, speed, cms, payments, crm, i18n]
  );

  const goDiscussWithParams = useCallback(() => {
    const opt = SITE_OPTIONS.find((o) => o.id === kind)!;
    const payload: CalcPrefillV1 = {
      kindTitle: opt.title,
      pages,
      designLabel: DESIGN.find((x) => x.id === design)!.label,
      motionLabel: MOTION.find((x) => x.id === motion)!.label,
      speedLabel: SPEED.find((x) => x.id === speed)!.label,
      cms,
      payments,
      crm,
      i18n,
      budgetLow: estimate.low,
      budgetHigh: estimate.high,
      budgetMid: estimate.subtotal,
    };
    sessionStorage.setItem(CONTACT_CALC_PREFILL_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent(CONTACT_CALC_PREFILL_EVENT));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    try {
      window.history.replaceState(null, '', '#contact');
    } catch {
      /* ignore */
    }
  }, [kind, pages, design, motion, speed, cms, payments, crm, i18n, estimate]);

  const chipBase =
    'rounded-xl border px-3 py-2.5 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 sm:px-4';

  return (
    <section
      id="calculator"
      className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full min-w-0"
      aria-labelledby="calculator-heading"
    >
      <div className="mb-10 space-y-4 sm:mb-14">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-black/50 text-violet-200 backdrop-blur-md">
              <Calculator size={20} aria-hidden />
            </span>
            <SectionPath items={['стоимость']} />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <h2
            id="calculator-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)]"
          >
            Калькулятор стоимости сайта
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className={`${panelGlass} max-w-2xl px-5 py-4 sm:px-6 sm:py-5`}>
            <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
              Оценка по типовым вводным: итог — диапазон в рублях. Финальная смета после созвона и ТЗ; это не публичная оферта.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <aside className="order-1 w-full shrink-0 lg:order-2 lg:sticky lg:top-28 lg:w-[min(100%,340px)]">
          <Reveal delay={0.06} width="100%">
            <div
              className={`${panelGlass} border-violet-500/20 p-6 sm:p-8`}
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="mb-4 flex items-center gap-2 text-violet-200">
                <Sparkles size={18} aria-hidden />
                <span className="text-xs font-mono uppercase tracking-widest">Итог</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">Ориентировочный бюджет</p>
              <p className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                {fmt(estimate.low)} — {fmt(estimate.high)} ₽
              </p>
              <p className="mt-1 text-xs text-zinc-600">ориентир ~{fmt(estimate.subtotal)} ₽</p>
              <button
                type="button"
                onClick={goDiscussWithParams}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-white py-3.5 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-zinc-200"
              >
                Обсудить расчёт
              </button>
            </div>
          </Reveal>
        </aside>

        <div className="order-2 min-w-0 flex-1 space-y-8 lg:order-1">
          <Reveal delay={0.08} width="100%">
            <fieldset className={`${panelGlass} p-5 sm:p-7`}>
              <legend className={`${labelClass} mb-4 px-1`}>Тип проекта</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {SITE_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setKind(o.id)}
                    aria-pressed={kind === o.id}
                    className={`${chipBase} ${
                      kind === o.id
                        ? 'border-violet-500/50 bg-violet-500/15 text-white'
                        : 'border-white/[0.14] bg-black/45 text-zinc-400 hover:border-white/25 hover:bg-black/60 hover:text-zinc-200'
                    }`}
                  >
                    <span className="block font-semibold">{o.title}</span>
                    <span className="mt-0.5 block text-xs text-zinc-500">{o.hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.12} width="100%">
            <div className={`${panelGlass} p-5 sm:p-7`}>
              <label htmlFor="calc-pages" className={labelClass}>
                Страниц / разделов: <span className="text-white">{pages}</span>
              </label>
              <input
                id="calc-pages"
                type="range"
                min={1}
                max={40}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-800 accent-violet-500"
              />
              <p className="mt-2 text-xs text-zinc-600">Сверх пакета — доп. страницы по фикс. ставке в модели.</p>
            </div>
          </Reveal>

          <Reveal delay={0.16} width="100%">
            <fieldset className={`${panelGlass} p-5 sm:p-7`}>
              <legend className={`${labelClass} mb-4 px-1`}>Дизайн</legend>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {DESIGN.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDesign(d.id)}
                    aria-pressed={design === d.id}
                    className={`${chipBase} sm:min-w-[140px] ${
                      design === d.id
                        ? 'border-violet-500/50 bg-violet-500/15 text-white'
                        : 'border-white/[0.14] bg-black/45 text-zinc-400 hover:border-white/25 hover:bg-black/60 hover:text-zinc-200'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.2} width="100%">
            <fieldset className={`${panelGlass} p-5 sm:p-7`}>
              <legend className={`${labelClass} mb-4 px-1`}>Анимации и визуал</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {MOTION.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMotion(m.id)}
                    aria-pressed={motion === m.id}
                    className={`${chipBase} ${
                      motion === m.id
                        ? 'border-violet-500/50 bg-violet-500/15 text-white'
                        : 'border-white/[0.14] bg-black/45 text-zinc-400 hover:border-white/25 hover:bg-black/60 hover:text-zinc-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.24} width="100%">
            <fieldset className={`${panelGlass} p-5 sm:p-7`}>
              <legend className={`${labelClass} mb-4 px-1`}>Сроки</legend>
              <div className="flex flex-col gap-2 sm:flex-row">
                {SPEED.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSpeed(s.id)}
                    aria-pressed={speed === s.id}
                    className={`${chipBase} flex-1 ${
                      speed === s.id
                        ? 'border-violet-500/50 bg-violet-500/15 text-white'
                        : 'border-white/[0.14] bg-black/45 text-zinc-400 hover:border-white/25 hover:bg-black/60 hover:text-zinc-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.28} width="100%">
            <div className={`${panelGlass} p-5 sm:p-7`}>
              <p className={labelClass}>Интеграции</p>
              <div className="space-y-3">
                {[
                  { id: 'cms' as const, checked: cms, set: setCms, title: 'Админка / CMS', sub: 'редактирование контента' },
                  { id: 'pay' as const, checked: payments, set: setPayments, title: 'Оплаты онлайн', sub: 'эквайринг, подписки' },
                  { id: 'crm' as const, checked: crm, set: setCrm, title: 'CRM / заявки', sub: 'Bitrix24, Amo и т.п.' },
                  { id: 'i18n' as const, checked: i18n, set: setI18n, title: 'Мультиязычность', sub: '+22% к оценке' },
                ].map((row) => (
                  <label
                    key={row.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.14] bg-black/45 px-4 py-3 transition hover:border-white/25 hover:bg-black/60"
                  >
                    <input
                      type="checkbox"
                      checked={row.checked}
                      onChange={(e) => row.set(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-violet-600 focus:ring-violet-500/40"
                    />
                    <span>
                      <span className="block text-sm font-medium text-white">{row.title}</span>
                      <span className="block text-xs text-zinc-500">{row.sub}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default SiteCostCalculator;
