export const CONTACT_CALC_PREFILL_KEY = 'aqum:calc-prefill-v1';

/** Событие после записи в sessionStorage — форма связи подставляет текст */
export const CONTACT_CALC_PREFILL_EVENT = 'aqum:contact-prefill';

export type CalcPrefillV1 = {
  kindTitle: string;
  pages: number;
  designLabel: string;
  motionLabel: string;
  speedLabel: string;
  cms: boolean;
  payments: boolean;
  crm: boolean;
  i18n: boolean;
  budgetLow: number;
  budgetHigh: number;
  budgetMid: number;
};

const fmtRub = (n: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(Math.round(n));

export function formatCalcPrefillForMessage(p: CalcPrefillV1): string {
  const integ: string[] = [];
  if (p.cms) integ.push('админка / CMS');
  if (p.payments) integ.push('оплаты онлайн');
  if (p.crm) integ.push('CRM / заявки');
  if (p.i18n) integ.push('мультиязычность');
  const integLine = integ.length ? integ.join(', ') : 'без отмеченных модулей';

  return [
    'Здравствуйте! Хочу обсудить расчёт из калькулятора на сайте.',
    '',
    'Параметры:',
    `• Тип проекта: ${p.kindTitle}`,
    `• Страниц / разделов: ${p.pages}`,
    `• Дизайн: ${p.designLabel}`,
    `• Анимации: ${p.motionLabel}`,
    `• Сроки: ${p.speedLabel}`,
    `• Интеграции: ${integLine}`,
    '',
    `Ориентир бюджета: ${fmtRub(p.budgetLow)} — ${fmtRub(p.budgetHigh)} ₽ (≈ ${fmtRub(p.budgetMid)} ₽).`,
    '',
    'Готов(а) созвониться и уточнить детали.',
  ].join('\n');
}

export function readCalcPrefillPayload(): CalcPrefillV1 | null {
  try {
    const raw = sessionStorage.getItem(CONTACT_CALC_PREFILL_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as CalcPrefillV1;
    if (typeof p?.kindTitle !== 'string' || typeof p?.pages !== 'number') return null;
    return p;
  } catch {
    return null;
  }
}
