
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowDown, X } from 'lucide-react';

type Article = {
  id: number;
  title: string;
  description: string;
  content: string;
};

const ALL_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'AI-first студия для малого и среднего бизнеса',
    description:
      'Делаем пакетные решения: AI-ассистент для отдела продаж, AI-оператор заявок с сайта и мессенджеров, база знаний для сотрудников, модули под КП, брифы, FAQ и карточки товаров.',
    content: `Мы позиционируем студию как **AI-first**: искусственный интеллект не «дополнение», а нормальный слой в продуктах для малого и среднего бизнеса.

**Пакетные направления**
• **AI-ассистент для отдела продаж** — подсказки по диалогу, квалификация лида, черновики ответов, напоминания по воронке.
• **AI-оператор** — единая точка приёма заявок с сайта, Telegram и WhatsApp: без потери контекста между каналами.
• **AI-база знаний** — для сотрудников: регламенты, скрипты, ответы на типовые вопросы клиентов в одном месте с поиском по смыслу.
• **Контент-модули** — черновики КП, брифов, FAQ, карточек товаров: меньше рутины, единый тон коммуникации.

Такой набор можно внедрять поэтапно: сначала оператор и сайт, затем CRM и ассистент продаж — без «большого взрыва» на старте.`,
  },
  {
    id: 2,
    title: 'Стек, на котором строим',
    description:
      'В основе: .NET, Node.js, React, Next.js, Directus, Docker, PostgreSQL, интеграции с 1С и PHP там, где уже живёт ваш контур. Единая среда под сайт, кабинет и интеграции.',
    content: `**Основной контур разработки**
• **.NET** — надёжные API и сервисы там, где важны производительность и экосистема Microsoft.
• **Node.js** — быстрые интеграции, очереди, webhooks, real-time.
• **React / Next.js** — сайты, личные кабинеты, админки с SSR и SEO где нужно.
• **Directus** — headless CMS и гибкая модель контента без привязки к одному шаблону.
• **Docker** — одинаковые среды от ноутбука до продакшена.
• **PostgreSQL** — основное хранилище данных.

**Интеграции**
• **1С** — обмен номенклатурой, заказами, контрагентами — по вашему контуру (не ломаем то, что уже работает).
• **PHP** — поддержка и доработка существующих сайтов и скриптов на стороне клиента.

Идея простая: не навязываем «один язык на всё», а собираем стек под задачу — с возможностью постепенно выводить легаси в единый контур.`,
  },
  {
    id: 3,
    title: 'Сайт как хаб для бизнеса',
    description:
      'Концепт под задачи: сайт + CRM, сайт + 1С, сайт + склад/ERP, сайт + телефония, сайт + сквозная аналитика, сайт + документооборот, сайт + AI-обработка входящих лидов.',
    content: `Сайт для нас — не только «визитка», а **точка входа** в цифровой контур компании.

**Типовые связки**
• **Сайт + CRM** — заявки, звонки, статусы сделок без ручного переноса.
• **Сайт + 1С** — каталог, остатки, заказы (в рамках согласованной схемы обмена).
• **Сайт + склад / ERP** — актуальность предложений и сроков.
• **Сайт + телефония** — коллтрекинг, обратный звонок, маршрутизация на отдел.
• **Сквозная аналитика** — от клика до сделки в одной воронке отчётности.
• **Документооборот** — заявки и договорные шаги там, где у вас уже живут документы.
• **AI-обработка лидов** — первичная квалификация, теги, маршрутизация менеджеру.

Мы проектируем связки так, чтобы менеджеру не приходилось копировать одно и то же в три системы.`,
  },
  {
    id: 4,
    title: 'Что входит в типовой контур',
    description:
      'Сайт и личный кабинет, CRM-интеграции, AI-консультант, аналитика, воронки продаж, шаблоны контента и сценарии автоматизации — собираем под ваш процесс.',
    content: `**Слой «витрина»**
Публичный сайт, лендинги, SEO-страницы, формы и виджеты.

**Личный кабинет**
Заказы, документы, обращения, статусы — что нужно именно вашей модели (B2B / B2C / сервис).

**CRM-интеграции**
Синхронизация контактов, сделок, задач — без дублирования вручную.

**AI-консультант**
На сайте или внутри кабинета: ответы по базе знаний, сбор контактов, мягкая квалификация.

**Аналитика и воронки**
Цели, события, сквозка до CRM — чтобы видеть, что реально продаёт.

**Шаблоны и автоматизация**
Письма, SMS, мессенджеры, напоминания — сценарии под ваш цикл сделки.

Состав всегда **собирается под процесс**: можно начать с сайта + CRM + аналитики, AI и кабинет подключить следующим этапом.`,
  },
  {
    id: 5,
    title: 'AI-ассистент и AI-оператор',
    description:
      'Ассистент для продаж: квалификация лида, ответы на частые вопросы, подбор тарифа. Оператор — единая обработка заявок с сайта, Telegram и WhatsApp без потери контекста.',
    content: `**AI-ассистент (продажи)**  
Работает рядом с менеджером: черновики ответов, выжимка из переписки, подсказки по этапу воронки, контроль обещаний клиенту. Данные можно ограничить политикой компании (что можно отправлять в модель, что нет).

**AI-оператор (каналы)**  
Один сценарий на **сайт + Telegram + WhatsApp**: посетитель или клиент пишет откуда удобно — история и статус заявки не теряются. Первичная квалификация, сбор телефона/почты, ответы по FAQ, эскалация живому человеку при сложном запросе.

Оба модуля можно включать поэтапно и измерять эффект: время ответа, доля закрытых без менеджера, качество лидов.`,
  },
  {
    id: 6,
    title: 'AI-виджет продаж для сайтов (в планах)',
    description:
      'Умный слой поверх сайта: встречает посетителя, понимает запрос, квалифицирует лид, собирает контакты, доводит до заявки, звонка, записи или заказа. Модель — подписка.',
    content: `Это **отдельный продукт на ближайшее будущее**: виджет, который ставится на сайт и ведёт себя как умный слой продаж.

**Что делает виджет**
• Встречает посетителя в контексте страницы (услуга, товар, акция).
• Уточняет задачу простым языком.
• Квалифицирует лид (B2B/B2C, срочность, бюджет — по вашей матрице).
• Собирает контакты и согласия.
• Отвечает на частые вопросы по базе знаний.
• Доводит до целевого действия: заявка, звонок, запись, заказ, подбор тарифа.

**Монетизация**  
Планируем **подписку** (по трафику / по количеству диалогов / по сайтам) — без огромного внедрения на старте.

Сейчас блок в статусе концепта; когда появится пилот — можно будет подключиться к раннему доступу.`,
  },
  {
    id: 7,
    title: 'Смесь инструментов в одном виджете',
    description:
      'По сути: онлайн-консультант + мини-CRM-форма + AI-ассистент + элементы автоворонки. Один контур вместо разрозненных форм и чатов.',
    content: `Вместо пяти разных кнопок на сайте («написать», «оставить заявку», «чат», «заказать звонок») — **один виджет**, внутри которого:

• **Онлайн-консультант** — живой диалог или бот по сценарию.
• **Мини-CRM** — заявка сразу попадает в вашу CRM с тегами и источником.
• **AI-ассистент** — ответы 24/7 по одобренным материалам.
• **Автоворонка** — напоминание, если клиент не дошёл до конца; повторный контакт по правилам.

Меньше потерянных лидов, меньше «я оставил заявку, никто не ответил». Один стиль общения и одна воронка данных.`,
  },
  {
    id: 8,
    title: 'AI-база знаний и контент-модули',
    description:
      'Внутренняя база для сотрудников и AI-модуль для подготовки коммерческих предложений, брифов, FAQ и карточек товаров — меньше рутины, быстрее ответ клиенту.',
    content: `**База знаний**  
Регламенты, прайсы, типовые возражения, инструкции — структурировано и с поиском. Сотрудник быстрее находит ответ; AI на сайте и в операторе опирается на те же источники (без «галлюцинаций» вне базы).

**Контент-модули**  
• Черновики **коммерческих предложений** под сегмент клиента.  
• **Брифы** на разработку или запуск.  
• **FAQ** для сайта и поддержки.  
• **Карточки товаров** в едином стиле.

Везде заложена идея **человек утверждает, AI ускоряет**: финальное слово за вашей командой.`,
  },
];

function ArticleModal({
  article,
  onClose,
}: {
  article: Article | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!article) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [article, onClose]);

  if (!article) return null;

  const paragraphs = article.content.split('\n\n').filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Закрыть"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[min(88vh,720px)] flex flex-col rounded-2xl sm:rounded-3xl border border-zinc-700 bg-zinc-950 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-zinc-800 shrink-0">
          <h3
            id="article-modal-title"
            className="text-lg sm:text-xl font-bold font-mono text-white leading-tight pr-2"
          >
            {article.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <p className="text-zinc-500 text-sm border-l-2 border-violet-500/60 pl-3 italic">
            {article.description}
          </p>
          {paragraphs.map((block, i) => {
            const lines = block.split('\n');
            const isBulletBlock = lines.some((l) => l.trim().startsWith('•'));
            if (isBulletBlock) {
              return (
                <div key={i} className="space-y-2">
                  {lines.map((line, j) => {
                    const t = line.trim();
                    if (!t) return null;
                    if (t.startsWith('•')) {
                      return (
                        <p key={j} className="flex gap-2 pl-1">
                          <span className="text-violet-400 shrink-0">•</span>
                          <span>{renderBold(t.replace(/^•\s*/, ''))}</span>
                        </p>
                      );
                    }
                    return (
                      <p key={j} className="font-semibold text-white pt-2 first:pt-0">
                        {renderBold(t)}
                      </p>
                    );
                  })}
                </div>
              );
            }
            return (
              <p key={i} className="whitespace-pre-line">
                {renderBold(block)}
              </p>
            );
          })}
        </div>
        <div className="p-4 sm:p-5 border-t border-zinc-800 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}

function renderBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  if (parts.length === 1) return text;
  const out: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i % 2 === 1) out.push(<strong key={i} className="text-white font-semibold">{part}</strong>);
    else if (part) out.push(<span key={i}>{part}</span>);
  });
  return <>{out}</>;
}

const ArticleList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openArticle, setOpenArticle] = useState<Article | null>(null);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(ALL_ARTICLES.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsAnimating(false);
    }, 400);
  };

  const closeModal = useCallback(() => setOpenArticle(null), []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = ALL_ARTICLES.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="articles" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full min-w-0 overflow-x-hidden">
      <ArticleModal article={openArticle} onClose={closeModal} />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-10 overflow-hidden">
        <p className="font-mono text-zinc-500 text-xs sm:text-sm max-w-xl leading-relaxed order-2 sm:order-1">
          Стек: .NET · Node.js · React · Next.js · Directus · Docker · PostgreSQL · 1С · PHP. Фокус — сайт, кабинет, CRM, AI и аналитика.
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-9xl font-black opacity-100 tracking-tighter md:translate-x-12 animate-[fadeIn_0.8s_ease-out] leading-none order-1 sm:order-2 shrink-0">
          Статьи
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        <div className="absolute left-[-60px] md:left-[-100px] top-0 hidden lg:flex flex-col gap-4 sticky h-fit">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handlePageChange(i + 1)}
              className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300 border ${
                currentPage === i + 1
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage === totalPages ? 1 : currentPage + 1)}
            className="w-14 h-14 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-500 transition-all active:scale-90"
          >
            <ArrowDown
              size={20}
              className={
                currentPage === totalPages
                  ? 'rotate-180 transition-transform duration-500'
                  : 'transition-transform duration-500'
              }
            />
          </button>
        </div>

        <div className="flex lg:hidden flex-wrap items-center justify-center gap-2 mb-8 col-span-full">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handlePageChange(i + 1)}
              className={`min-w-[40px] h-10 px-3 rounded-full flex items-center justify-center font-bold text-sm transition-all border ${
                currentPage === i + 1
                  ? 'bg-white text-black border-white'
                  : 'border-zinc-800 text-zinc-500 hover:border-zinc-500'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div
          className={`grid md:grid-cols-2 gap-4 sm:gap-8 md:col-span-2 transition-all duration-500 ease-in-out transform w-full min-w-0 ${
            isAnimating ? 'opacity-0 translate-y-8 blur-sm' : 'opacity-100 translate-y-0 blur-0'
          }`}
        >
          {currentArticles.map((article) => (
            <div
              key={article.id}
              className="bg-zinc-900/50 border border-zinc-800 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-[3.5rem] hover:bg-zinc-800/80 transition-all group sm:hover:scale-[1.02] min-w-0"
            >
              <h4 className="text-lg sm:text-2xl md:text-3xl font-bold font-mono mb-4 sm:mb-6 leading-tight group-hover:text-white transition-colors">
                {article.title}
              </h4>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-10 max-w-prose min-h-[3rem] overflow-hidden line-clamp-4 sm:line-clamp-3">
                {article.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setOpenArticle(article)}
                  className="bg-white text-black px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-zinc-200 transition-all active:scale-95"
                >
                  Читать далее
                </button>
                <button
                  type="button"
                  onClick={() => setOpenArticle(article)}
                  className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all text-zinc-400 hover:text-white"
                  aria-label="Открыть полный текст"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}

          {currentArticles.length < itemsPerPage &&
            [...Array(itemsPerPage - currentArticles.length)].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="hidden md:block p-12 border border-dashed border-zinc-900/50 rounded-[3.5rem]"
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleList;
