export type SiteKind = 'landing' | 'corporate' | 'catalog' | 'portal' | 'ecommerce';
export type DesignTier = 'template' | 'custom' | 'premium';
export type MotionTier = 'none' | 'standard' | 'rich' | 'webgl';
export type SpeedTier = 'm1' | 'm1_2' | 'm2';

export type SiteCostInput = {
  kind: SiteKind;
  pages: number;
  design: DesignTier;
  motion: MotionTier;
  speed: SpeedTier;
  cms: boolean;
  payments: boolean;
  crm: boolean;
  i18n: boolean;
};

export type SiteCostEstimate = {
  low: number;
  high: number;
  subtotal: number;
};

export const SITE_COST_MODEL = {
  siteOptions: [
    { id: 'landing', title: 'Лендинг', hint: '1 экран, заявки', base: 55_000, includedPages: 1 },
    { id: 'corporate', title: 'Корпоративный', hint: 'услуги, команда, блог', base: 95_000, includedPages: 6 },
    { id: 'catalog', title: 'Каталог', hint: 'фильтры, карточки', base: 135_000, includedPages: 8 },
    { id: 'portal', title: 'Сервис / ЛК', hint: 'роли, кабинеты', base: 195_000, includedPages: 10 },
    { id: 'ecommerce', title: 'Интернет-магазин', hint: 'корзина, оплата', base: 265_000, includedPages: 12 },
  ] as const satisfies readonly {
    id: SiteKind;
    title: string;
    hint: string;
    base: number;
    includedPages: number;
  }[],
  extraPagePrice: 7_500,
  designOptions: [
    { id: 'template', label: 'На базе готовой UI-системы', factor: 1 },
    { id: 'custom', label: 'Индивидуальный дизайн', factor: 1.32 },
    { id: 'premium', label: 'Премиум + микровзаимодействия', factor: 1.65 },
  ] as const satisfies readonly { id: DesignTier; label: string; factor: number }[],
  motionOptions: [
    { id: 'none', label: 'Минимум', factor: 1 },
    { id: 'standard', label: 'Стандартные анимации', factor: 1.08 },
    { id: 'rich', label: 'Сложный UI / скролл-стори', factor: 1.2 },
    { id: 'webgl', label: '3D / WebGL / тяжёлая графика', factor: 1.38 },
  ] as const satisfies readonly { id: MotionTier; label: string; factor: number }[],
  speedOptions: [
    { id: 'm1', label: 'до 1 мес.', factor: 1.08 },
    { id: 'm1_2', label: '1–2 мес.', factor: 1 },
    { id: 'm2', label: '2 мес.', factor: 0.96 },
  ] as const satisfies readonly { id: SpeedTier; label: string; factor: number }[],
  addons: {
    cms: 38_000,
    payments: 48_000,
    crm: 26_000,
    i18nFactor: 1.22,
  },
  estimateRange: {
    lowFactor: 0.88,
    highFactor: 1.12,
  },
  roundingStep: 10_000,
} as const;

export const SITE_OPTIONS = SITE_COST_MODEL.siteOptions;
export const DESIGN = SITE_COST_MODEL.designOptions;
export const MOTION = SITE_COST_MODEL.motionOptions;
export const SPEED = SITE_COST_MODEL.speedOptions;

const roundNice = (n: number) =>
  Math.round(n / SITE_COST_MODEL.roundingStep) * SITE_COST_MODEL.roundingStep;

export function calculateSiteCost(input: SiteCostInput): SiteCostEstimate {
  const site = SITE_COST_MODEL.siteOptions.find((o) => o.id === input.kind)!;
  const design = SITE_COST_MODEL.designOptions.find((o) => o.id === input.design)!;
  const motion = SITE_COST_MODEL.motionOptions.find((o) => o.id === input.motion)!;
  const speed = SITE_COST_MODEL.speedOptions.find((o) => o.id === input.speed)!;

  const extraPages = Math.max(0, input.pages - site.includedPages);
  let subtotal = site.base + extraPages * SITE_COST_MODEL.extraPagePrice;

  subtotal *= design.factor * motion.factor * speed.factor;

  if (input.cms) subtotal += SITE_COST_MODEL.addons.cms;
  if (input.payments) subtotal += SITE_COST_MODEL.addons.payments;
  if (input.crm) subtotal += SITE_COST_MODEL.addons.crm;
  if (input.i18n) subtotal *= SITE_COST_MODEL.addons.i18nFactor;

  return {
    low: roundNice(subtotal * SITE_COST_MODEL.estimateRange.lowFactor),
    high: roundNice(subtotal * SITE_COST_MODEL.estimateRange.highFactor),
    subtotal: roundNice(subtotal),
  };
}
