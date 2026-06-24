import { useState } from "react";
import { useLocationModal } from "@/components/LocationModal";

const SEND_URL = "https://functions.poehali.dev/628efe3f-9fea-498f-8213-c50b009e9e11";

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setPhone(""); setComment("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacts" className="section-padding" style={{ background: "var(--bg-section)" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: 12 }}>Оставить заявку</h2>
        <p style={{ textAlign: "center", color: "var(--gray)", marginBottom: 36, fontSize: 16, lineHeight: 1.6 }}>
          Опишите проблему — мы свяжемся с вами в Telegram или по телефону
        </p>
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "48px 24px", borderRadius: 20, background: "white", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontWeight: 600, fontSize: 22, marginBottom: 8, letterSpacing: "-0.5px" }}>Заявка отправлена!</h3>
            <p style={{ color: "var(--gray)", marginBottom: 24 }}>Мы свяжемся с вами в ближайшее время.</p>
            <button className="btn-cta" style={{ background: "var(--primary)", color: "white" }} onClick={() => setStatus("idle")}>Отправить ещё</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, background: "white", padding: 32, borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
            <div>
              <label style={{ fontWeight: 500, fontSize: 13, color: "var(--gray)", display: "block", marginBottom: 6 }}>Ваше имя</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Иван"
                required
                style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border 0.2s" }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 500, fontSize: 13, color: "var(--gray)", display: "block", marginBottom: 6 }}>Телефон</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+7 914 000-00-00"
                required
                style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ fontWeight: 500, fontSize: 13, color: "var(--gray)", display: "block", marginBottom: 6 }}>Что случилось с очками?</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Сломалась дужка, нужна замена линз..."
                rows={3}
                style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, fontSize: 16, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>
            {status === "error" && <p style={{ color: "#ff3b30", fontSize: 14 }}>Ошибка отправки. Попробуйте ещё раз или напишите нам в Telegram.</p>}
            <button
              type="submit"
              className="btn-cta"
              disabled={status === "loading"}
              style={{ background: "var(--primary)", color: "white", width: "100%", padding: "14px", fontSize: 16, borderRadius: 12, marginTop: 4, opacity: status === "loading" ? 0.7 : 1 }}
            >
              {status === "loading" ? "Отправляю..." : "Отправить заявку"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

const SERVICES = [
  {
    name: "Ремонт оправы",
    price: "от 500 ₽",
    desc: "Пайка, замена винтов, носоупоры, дужки",
    tag: "Срочно",
    image: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/7152e9f6-0c1e-4107-ba7f-41291ec29d23.png",
    details: "Восстановим оправу любой сложности — пайка металла, замена винтиков, носоупоров и дужек. Большинство работ выполняем при вас за 30–60 минут.",
    options: [
      { label: "Пайка титановых оправ", price: "от 500 ₽" },
      { label: "Пайка металлических оправ", price: "от 500 ₽" },
      { label: "Пайка пластиковых оправ", price: "от 500 ₽" },
      { label: "Замена флекса", price: "от 500 ₽" },
      { label: "Замена шарнира", price: "от 500 ₽" },
      { label: "Замена лески", price: "от 500 ₽" },
      { label: "Выправка", price: "от 500 ₽" },
      { label: "Замена наконечников", price: "от 500 ₽" },
    ],
  },
  {
    name: "Замена линз",
    price: "от 1 200 ₽",
    desc: "Линзы по рецепту, антиблик, UV-защита",
    tag: "Популярно",
    image: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/294a42a5-2f5a-4720-932e-c545b1a2b7fd.png",
    details: "Изготавливаем линзы по вашему рецепту. Широкий выбор покрытий: антибликовое, UV-защита, фотохромные, голубой фильтр.",
    options: [
      { label: "Однофокальные", price: "от 1 200 ₽" },
      { label: "Бифокальные", price: "от 2 500 ₽" },
      { label: "Прогрессивные", price: "от 4 000 ₽" },
      { label: "С антибликом", price: "+500 ₽" },
    ],
  },
  {
    name: "Очки на заказ",
    price: "от 2 500 ₽",
    desc: "Подбор оправы + изготовление под рецепт",
    tag: null,
    image: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/b3bbbb83-833c-47ce-b566-f3887b12534f.jpg",
    details: "Поможем подобрать оправу из нашего каталога и изготовим линзы по рецепту врача. Готовые очки — в течение 1–3 дней.",
    options: [
      { label: "Оправа + однофокальные линзы", price: "от 2 500 ₽" },
      { label: "Оправа + прогрессивные линзы", price: "от 6 000 ₽" },
      { label: "Детские очки", price: "от 2 000 ₽" },
      { label: "Солнцезащитные с диоптриями", price: "от 3 500 ₽" },
    ],
  },
  {
    name: "Очистка очков",
    price: "Бесплатно",
    desc: "Профессиональная чистка линз и оправы",
    tag: null,
    image: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/5e67fde2-52a6-487d-8972-0610fd3e93e0.png",
    details: "Профессиональная ультразвуковая очистка очков. Удаляем загрязнения, жировые следы и налёт с линз и оправы.",
    options: [
      { label: "Ультразвуковая очистка", price: "Бесплатно" },
      { label: "Полировка линз", price: "от 300 ₽" },
      { label: "Обработка антизапотевателем", price: "от 200 ₽" },
    ],
  },
  {
    name: "Регулировка очков",
    price: "от 200 ₽",
    desc: "Подгонка по форме лица, натяжка дужек",
    tag: null,
    image: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/cc3ad788-3458-4225-9786-8fa0c961aa88.jpg",
    details: "Отрегулируем очки точно по форме вашего лица — выровняем дужки, подберём посадку, чтобы очки сидели удобно.",
    options: [
      { label: "Регулировка дужек", price: "200 ₽" },
      { label: "Подгонка носоупоров", price: "200 ₽" },
      { label: "Полная регулировка", price: "400 ₽" },
    ],
  },
  {
    name: "Замена стёкол",
    price: "от 800 ₽",
    desc: "Вставка стёкол в готовую оправу",
    tag: null,
    image: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/7744f9d3-3466-4466-b715-28dace115192.jpg",
    details: "Вставим готовые стёкла в вашу оправу. Работаем с пластиковыми, металлическими и безободковыми оправами.",
    options: [
      { label: "Изготовление очков в ободковую оправу", price: "от 800 ₽" },
      { label: "Изготовление очков в лесочную оправу", price: "от 800 ₽" },
      { label: "Изготовление очков в винтовую и втулочную оправу", price: "от 800 ₽" },
      { label: "Доплата за срочность", price: "по запросу" },
      { label: "Доплата за сложность", price: "по запросу" },
    ],
  },
  {
    name: "Курьер для юр. лиц",
    price: "Бесплатно",
    desc: "Забираем и привозим очки — бесплатно для организаций",
    tag: "Юр. лица",
    image: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/8e118df9-f805-43c9-8205-7ea65ccfb4b5.jpg",
    details: "Для организаций и компаний — выезжаем к вам, забираем очки сотрудников, ремонтируем и возвращаем. Без лишних поездок.",
    options: [
      { label: "Выезд курьера", price: "Бесплатно" },
      { label: "Корпоративный договор", price: "По запросу" },
    ],
  },
  {
    name: "Специальное предложение для юридических лиц",
    price: "По запросу",
    desc: "Корпоративное обслуживание сотрудников на выгодных условиях",
    tag: "Юр. лица",
    image: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/576dd011-505d-4701-8d0b-5b5083bfb01a.jpg",
    details: "Предлагаем организациям выгодные условия на обслуживание очков сотрудников. Корпоративный договор, бесплатный выезд курьера, приоритетное выполнение заказов и скидки на весь спектр услуг.",
    options: [
      { label: "Корпоративная скидка на ремонт", price: "По запросу" },
      { label: "Корпоративная скидка на изготовление очков", price: "По запросу" },
      { label: "Бесплатный выезд курьера", price: "Бесплатно" },
      { label: "Приоритетное выполнение заказов", price: "Бесплатно" },
      { label: "Заключение корпоративного договора", price: "По запросу" },
    ],
  },
];

function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const actions = [
    { icon: "📞", label: "Позвонить", href: "tel:+79141160007" },
    { icon: "💬", label: "WhatsApp", href: "https://wa.me/79141160007" },
    { icon: "✈️", label: "Telegram", href: "https://t.me/+79141160007" },
    { icon: "📋", label: "Заказать звонок", href: "#contacts", scroll: true },
    { icon: "📍", label: "Маршрут", href: "https://2gis.ru/yakutsk/search/Очки Плюс" },
  ];
  return (
    <div style={{ position: "fixed", right: 20, bottom: 32, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
      {expanded && actions.map(a => (
        <a
          key={a.label}
          href={a.href}
          target={a.scroll ? undefined : "_blank"}
          rel="noreferrer"
          onClick={a.scroll ? (e) => { e.preventDefault(); document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }); setExpanded(false); } : () => setExpanded(false)}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "white", color: "var(--dark)",
            padding: "10px 18px", borderRadius: 980,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            fontWeight: 500, fontSize: 14, textDecoration: "none",
            whiteSpace: "nowrap", transition: "transform 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span style={{ fontSize: 18 }}>{a.icon}</span> {a.label}
        </a>
      ))}
      <button
        onClick={() => setExpanded(v => !v)}
        style={{
          width: 56, height: 56, borderRadius: "50%",
          background: expanded ? "var(--dark)" : "var(--primary)",
          color: "white", border: "none", cursor: "pointer",
          fontSize: 24, boxShadow: "0 6px 24px rgba(0,113,227,0.4)",
          transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {expanded ? "✕" : "📞"}
      </button>
    </div>
  );
}

export default function Index() {
  const { open } = useLocationModal();
  const [openService, setOpenService] = useState<string | null>(null);
  return (
    <>
      <header className="header">
        <div className="logo">Очки Плюс</div>
        <nav>
          <a href="#services" onClick={e => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }}>Услуги</a>
          <a href="#about" onClick={e => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>О нас</a>
          <a href="#gallery" onClick={e => { e.preventDefault(); document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" }); }}>Галерея</a>
          <a href="#contacts" onClick={e => { e.preventDefault(); document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }); }}>Контакты</a>
          <a href="/" style={{ color: "var(--primary)" }}>📍 Якутск</a>
          <a href="/moscow" style={{ color: "var(--gray)" }}>📍 Москва</a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={open} className="btn-cta" style={{ background: "rgba(0,113,227,0.12)", color: "var(--primary)", fontSize: 12, border: "none" }}>📍 Якутск</button>
          <a href="https://t.me/+79141160007" target="_blank" rel="noreferrer" className="btn-cta" style={{ background: "var(--primary)", color: "white", fontSize: 12 }}>Записаться</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Срочное изготовление
              <br />
              и ремонт очков <span>за час</span>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--gray)", marginBottom: 32, maxWidth: 420, fontWeight: 400 }}>
              Оптическая мастерская в Якутске — срочное изготовление очков по рецепту, замена линз, ремонт оправ любой сложности. Более 10 лет опыта, гарантия на каждую работу.
            </p>
            <div style={{ display: "flex", flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
              <a href="https://t.me/+79141160007" target="_blank" rel="noreferrer" className="btn-cta" style={{ background: "var(--primary)", color: "white", fontSize: 15, padding: "12px 24px" }}>
                Записаться
              </a>
              <button onClick={() => document.getElementById("prices")?.scrollIntoView({ behavior: "smooth" })} className="btn-cta" style={{ background: "rgba(0,0,0,0.07)", color: "var(--dark)", fontSize: 15, padding: "12px 24px" }}>
                Услуги и цены
              </button>
            </div>
          </div>
          <div className="hero-img">
            <div className="sticker">
              РЕМОНТ
              <br />
              ЗА ЧАС
            </div>
            <div className="floating-tag hidden md:block" style={{ top: "20%", left: "10%" }}>
              #ЯКУТСК
            </div>
            <div className="floating-tag hidden md:block" style={{ bottom: "30%", right: "20%" }}>
              ГАРАНТИЯ
            </div>
          </div>
        </section>

        <div className="marquee">
          <div className="marquee-content">
            &nbsp; * РЕМОНТ ОПРАВ * ЗАМЕНА ЛИНЗ * ОЧКИ НА ЗАКАЗ * СРОЧНО ЗА ЧАС * ГАРАНТИЯ КАЧЕСТВА * МАСТЕРА ЯКУТСКА *
            РЕМОНТ ОПРАВ * ЗАМЕНА ЛИНЗ * ОЧКИ НА ЗАКАЗ * СРОЧНО ЗА ЧАС * ГАРАНТИЯ КАЧЕСТВА * МАСТЕРА ЯКУТСКА
          </div>
        </div>

        <section id="services" className="section-padding">
          <div className="section-header">
            <h2 className="section-title">Наши услуги</h2>
            <a
              href="#"
              style={{ color: "var(--primary)", fontWeight: 500, fontSize: 15 }}
            >
              Все цены →
            </a>
          </div>

          <div className="menu-grid">
            {/* Item 1 */}
            <div className="menu-card">
              <span className="menu-tag">Срочно</span>
              <img
                src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/d84de801-f02b-47c1-8ceb-184f8320f6ce.jpg"
                alt="Ремонт оправы"
              />
              <div className="menu-card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3>Ремонт оправы</h3>
                  <span className="price">от 500 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Пайка металла, замена винтов и носоупоров, восстановление дужек — вернём очки в строй за час.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--secondary)" }}>
                Точность
              </span>
              <img
                src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/5f1d99da-f588-4d48-9de5-2edcc11beccd.jpg"
                alt="Замена линз"
              />
              <div className="menu-card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3>Замена линз</h3>
                  <span className="price">от 1 200 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Изготовим и установим линзы по вашему рецепту с антибликом и защитой от UV.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--accent)", color: "var(--dark)" }}>
                Под ключ
              </span>
              <img
                src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/60e46d97-41ed-4613-8f88-442fa30a06d0.jpg"
                alt="Очки на заказ"
              />
              <div className="menu-card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3>Очки на заказ</h3>
                  <span className="price">от 2 500 ₽</span>
                </div>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Подберём оправу и соберём очки полностью под ваше зрение и стиль.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "white", borderRadius: 24, margin: "12px 0" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 40 }}>Дополнительно</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 800, margin: "0 auto" }}>
            <div style={{ borderRadius: 18, padding: 32, background: "var(--bg)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 42, marginBottom: 16 }}>🏢</div>
              <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 10, letterSpacing: "-0.3px" }}>Работаем с юр. лицами</h3>
              <p style={{ color: "var(--gray)", fontSize: 14, lineHeight: 1.7 }}>Заключаем договоры, выставляем счета и предоставляем все необходимые документы для бухгалтерии.</p>
            </div>
            <div style={{ borderRadius: 18, padding: 32, background: "var(--bg)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 42, marginBottom: 16 }}>💳</div>
              <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 10, letterSpacing: "-0.3px" }}>Любая форма оплаты</h3>
              <p style={{ color: "var(--gray)", fontSize: 14, lineHeight: 1.7 }}>Принимаем наличные, карты, безналичный расчёт и оплату по счёту для организаций.</p>
            </div>
          </div>
        </section>

        <section id="about" className="retro-vibe">
          <div>
            <h2 className="vibe-title">Оптическая мастерская полного цикла.</h2>
            <p className="vibe-text">
              Мы не просто ремонтируем очки — мы создаём комфортное зрение для каждого клиента в Якутске. Срочное изготовление очков, замена линз, ремонт оправ. Более 10 лет опыта и гарантия качества на каждую работу.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 28px", display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "Срочное изготовление очков",
                "Установка линз в оправу клиента",
                "Ремонт оправ любой сложности",
                "Детские линзы против миопии",
                "Профессиональная диагностика и сервис",
              ].map(item => (
                <li key={item} style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "var(--accent)", fontSize: 18 }}>◆</span> {item}
                </li>
              ))}
            </ul>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginBottom: 24, fontWeight: 600, letterSpacing: 1 }}>
              БЫСТРО. ТОЧНО. НАДЁЖНО.
            </p>
            <a href="https://t.me/+79141160007" target="_blank" rel="noreferrer" className="btn-cta" style={{ background: "white", color: "var(--primary)", display: "inline-block" }}>
              Записаться
            </a>
          </div>
          <div className="vibe-img"></div>
        </section>

        <section id="gallery" className="section-padding">
          <h2 className="section-title" style={{ marginBottom: "12px", textAlign: "center" }}>
            Наши работы
          </h2>
          <p style={{ textAlign: "center", color: "var(--gray)", marginBottom: 40, fontSize: 16 }}>До и после ремонта</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, maxWidth: 1100, margin: "0 auto 48px" }}>
            {[
              { src: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/4e50a895-8345-4087-bc44-c1a2bc1e1f2a.png", alt: "До и после ремонта оправы" },
              { src: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/34be55b3-c5a7-4607-947f-df4292b40df0.png", alt: "До и после ремонта очков" },
              { src: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/90b2cd4d-0c6a-4c3e-9f66-201367be5b06.png", alt: "Очки в мастерской" },
              { src: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/2675f085-318e-4ad7-995a-b9da2b08347a.jpeg", alt: "Очки на заказ" },
              { src: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/dd35a0e4-d54b-417e-a21a-d8948f6f98b8.png", alt: "Работа мастерской" },
              { src: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/16503f70-e163-4a92-952c-7ef8c8981b78.png", alt: "Работа мастерской" },
              { src: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/23c21043-ca62-429b-a944-4c1d416df996.jpg", alt: "Работа мастерской" },
              { src: "https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/1bfaf060-2d73-4d24-ade0-628d06b0ab27.jpg", alt: "Работа мастерской" },
            ].map((img, i) => (
              <div key={i} style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", aspectRatio: "4/3" }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </section>

        {/* О КОМПАНИИ */}
        <section className="section-padding" style={{ background: "white", borderRadius: 24, margin: "12px 0" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }}>
              <div>
                <div style={{ display: "inline-block", background: "rgba(0,113,227,0.1)", color: "var(--primary)", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 980, marginBottom: 20 }}>
                  О компании
                </div>
                <h2 className="section-title" style={{ marginBottom: 24 }}>Очки Плюс —<br />с 2015 года</h2>
                <p style={{ fontSize: 17, color: "var(--gray)", lineHeight: 1.75, marginBottom: 20 }}>
                  Мы основали мастерскую в 2015 году с одной целью — делать качественные очки быстро и честно. За эти годы тысячи жителей Якутска доверили нам своё зрение.
                </p>
                <p style={{ fontSize: 17, color: "var(--gray)", lineHeight: 1.75, marginBottom: 36 }}>
                  В нашей команде работают профессионалы с многолетним опытом. Мы ценим качество каждой работы и даём гарантию на все наши услуги.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                  {[
                    { num: "10+", label: "лет на рынке" },
                    { num: "5 000+", label: "довольных клиентов" },
                    { num: "1 час", label: "срок большинства работ" },
                  ].map((stat) => (
                    <div key={stat.label} style={{ textAlign: "center", padding: "20px 12px", borderRadius: 16, background: "var(--bg)", border: "1px solid rgba(0,0,0,0.06)" }}>
                      <div style={{ fontSize: 26, fontWeight: 700, color: "var(--primary)", letterSpacing: "-1px", marginBottom: 4 }}>{stat.num}</div>
                      <div style={{ fontSize: 12, color: "var(--gray)", lineHeight: 1.4 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ЦЕНЫ */}
        <section id="prices" className="section-padding" style={{ background: "white", borderRadius: 24, margin: "12px 0" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 12 }}>Цены</h2>
          <p style={{ textAlign: "center", color: "var(--gray)", marginBottom: 48, fontSize: 16 }}>Прозрачные цены без скрытых доплат — нажмите на услугу</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 720, margin: "0 auto" }}>
            {SERVICES.map((item) => {
              const isOpen = openService === item.name;
              return (
                <div key={item.name} style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", boxShadow: isOpen ? "0 6px 32px rgba(0,0,0,0.10)" : "0 2px 8px rgba(0,0,0,0.04)", transition: "box-shadow 0.3s" }}>
                  {/* Шапка карточки */}
                  <button
                    onClick={() => setOpenService(isOpen ? null : item.name)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: isOpen ? "var(--primary)" : "var(--bg)", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.25s" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                      <div>
                        {item.tag && (
                          <span style={{ display: "inline-block", background: isOpen ? "rgba(255,255,255,0.25)" : "var(--primary)", color: "white", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 980, marginBottom: 4 }}>{item.tag}</span>
                        )}
                        <div style={{ marginBottom: 2 }}>
                          <span style={{ fontSize: 16, fontWeight: 700, color: isOpen ? "white" : "var(--dark)", letterSpacing: "-0.3px" }}>{item.name}</span>
                        </div>
                        <div style={{ fontSize: 13, color: isOpen ? "rgba(255,255,255,0.75)" : "var(--gray)" }}>{item.desc}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                      <span style={{ fontSize: 17, fontWeight: 700, color: isOpen ? "white" : "var(--primary)" }}>{item.price}</span>
                      <span style={{ fontSize: 20, color: isOpen ? "white" : "var(--gray)", transition: "transform 0.25s", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
                    </div>
                  </button>

                  {/* Раскрывающееся содержимое */}
                  {isOpen && (
                    <div style={{ background: "white" }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
                      <div style={{ padding: "20px 24px 24px" }}>
                        <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.7, marginBottom: 20 }}>{item.details}</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                          {item.options.map((opt) => (
                            <div key={opt.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 10, background: "var(--bg)", border: "1px solid rgba(0,0,0,0.06)" }}>
                              <span style={{ fontSize: 14, color: "var(--dark)" }}>{opt.label}</span>
                              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--primary)", whiteSpace: "nowrap", marginLeft: 12 }}>{opt.price}</span>
                            </div>
                          ))}
                        </div>
                        <a href="https://t.me/+79141160007" target="_blank" rel="noreferrer" className="btn-cta" style={{ display: "block", textAlign: "center", background: "var(--primary)", color: "white", padding: "13px 24px", fontSize: 15 }}>
                          Записаться
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* НАШИ ФИЛИАЛЫ */}
        <section className="section-padding">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 12 }}>Наши филиалы</h2>
          <p style={{ textAlign: "center", color: "var(--gray)", marginBottom: 48, fontSize: 16 }}>Работаем в двух городах</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, maxWidth: 800, margin: "0 auto" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ background: "linear-gradient(135deg, #0071e3, #0099fa)", padding: "28px 28px 20px", color: "white" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}>Якутск</div>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>Главный филиал</div>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <div style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.8 }}>
                  <div>📌 ул. Орджоникидзе, 20, каб. 207</div>
                  <div>🕐 Пн–Сб: 10:00 – 18:00</div>
                  <div>📞 +7 914 116-00-07</div>
                </div>
                <a href="/" className="btn-cta" style={{ display: "inline-block", marginTop: 20, background: "var(--primary)", color: "white", fontSize: 13 }}>
                  Перейти на страницу →
                </a>
              </div>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ background: "linear-gradient(135deg, #1d1d1f, #444)", padding: "28px 28px 20px", color: "white" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}>Москва</div>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>Новый филиал</div>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <div style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.8 }}>
                  <div>📌 Адрес уточняется</div>
                  <div>🕐 Пн–Сб: 10:00 – 18:00</div>
                  <div>📞 По Telegram</div>
                </div>
                <a href="/moscow" className="btn-cta" style={{ display: "inline-block", marginTop: 20, background: "var(--dark)", color: "white", fontSize: 13 }}>
                  Перейти на страницу →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ОТЗЫВЫ */}
        <section className="section-padding">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 8 }}>Отзывы клиентов</h2>
          <p style={{ textAlign: "center", color: "var(--gray)", marginBottom: 48, fontSize: 16 }}>Более 500 довольных клиентов в Якутске</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
            {[
              { name: "Анна М.", text: "Сделали очки за 40 минут, качество отличное. Очень довольна результатом!", stars: 5, date: "2 дня назад" },
              { name: "Дмитрий К.", text: "Сломал оправу утром — к обеду уже ходил в починенных очках. Работают быстро и аккуратно.", stars: 5, date: "1 неделю назад" },
              { name: "Светлана П.", text: "Заменили линзы по рецепту, подобрали антиблик. Мастера объяснили всё подробно. Рекомендую!", stars: 5, date: "2 недели назад" },
              { name: "Игорь В.", text: "Обращаюсь уже третий раз. Всегда быстро, всегда качественно. Цены адекватные.", stars: 5, date: "3 недели назад" },
              { name: "Мария Н.", text: "Ребёнку сделали детские линзы против миопии. Специалисты грамотные, всё объяснили.", stars: 5, date: "1 месяц назад" },
              { name: "Алексей С.", text: "Паяли металлическую оправу — сделали идеально. Даже следа не осталось. Спасибо мастерам!", stars: 5, date: "1 месяц назад" },
            ].map((r, i) => (
              <div key={i} style={{ background: "white", borderRadius: 18, padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {"⭐".repeat(r.stars)}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--dark)", margin: 0 }}>«{r.text}»</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--dark)" }}>{r.name}</span>
                  <span style={{ fontSize: 12, color: "var(--gray)" }}>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* НАША МАСТЕРСКАЯ */}
        <section className="section-padding" style={{ background: "white", borderRadius: 24, margin: "12px 0" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 12 }}>Наша мастерская</h2>
          <p style={{ textAlign: "center", color: "var(--gray)", marginBottom: 48, fontSize: 16 }}>Профессиональное оборудование и опытные мастера</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, maxWidth: 960, margin: "0 auto 48px" }}>
            {[
              { icon: "🔧", title: "10+ лет опыта", desc: "Работаем с 2013 года, тысячи довольных клиентов" },
              { icon: "⚡", title: "Ремонт за час", desc: "Большинство работ выполняем прямо при вас" },
              { icon: "🔬", title: "Проф. оборудование", desc: "Современное оборудование для точной работы с линзами" },
              { icon: "✅", title: "Гарантия на работу", desc: "Даём гарантию на каждую выполненную работу" },
            ].map((item) => (
              <div key={item.title} style={{ textAlign: "center", padding: "28px 20px", borderRadius: 18, background: "var(--bg)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.3px" }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, maxWidth: 700, margin: "0 auto", borderRadius: 20, overflow: "hidden" }}>
            <img src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/fe0893cd-6cb4-4bd0-bb15-6769a876f4b7.png" alt="Очки Плюс — оптическая мастерская" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 16 }} />
            <img src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/90b2cd4d-0c6a-4c3e-9f66-201367be5b06.png" alt="Мастерская" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 16 }} />
          </div>
        </section>

        <ContactForm />

        <section className="section-padding" style={{ paddingTop: "0" }}>
          <h2 className="section-title" style={{ marginBottom: "12px", textAlign: "center" }}>
            Как нас найти
          </h2>
          <p style={{ textAlign: "center", marginBottom: "32px", color: "var(--gray)", fontSize: "16px" }}>
            г. Якутск, ул. Орджоникидзе, 20, каб. 207
          </p>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?text=Якутск+ул+Орджоникидзе+20&z=16&l=map"
              width="100%"
              height="420"
              frameBorder="0"
              allowFullScreen
              style={{ display: "block" }}
              title="Карта мастерской"
            />
          </div>
        </section>
      <FloatingActions />
      </main>

      <footer>
        <div>
          <div className="footer-logo">Очки Плюс</div>
          <p style={{ color: "var(--gray)", lineHeight: 1.6, fontSize: 14 }}>
            Срочный ремонт и изготовление очков в Якутске. Возвращаем чёткость взгляда с заботой и гарантией.
          </p>
        </div>
        <div className="footer-links">
          <h4>Навигация</h4>
          <ul>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Услуги
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                О нас
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Галерея
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
                Контакты
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Часы работы</h4>
          <ul>
            <li>Пн-Сб: 10:00 - 18:00</li>
            <li>Вс: Выходной</li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Контакты</h4>
          <ul>
            <li>
              <a href="tel:+79141160007" style={{ color: "inherit", textDecoration: "none" }}>
                📞 +7 914 116-00-07
              </a>
            </li>
            <li>
              <a href="https://t.me/+79141160007" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                ✈️ Telegram
              </a>
            </li>
            <li>
              <a href="https://wa.me/79141160007" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                💬 WhatsApp
              </a>
            </li>
            <li>
              <a href="https://maxim-messenger.com" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                🟡 Мессенджер Макс
              </a>
            </li>
            <li>
              <a
                href="https://yandex.ru/maps/?text=Якутск+ул+Орджоникидзе+20"
                target="_blank"
                rel="noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                📍 ул. Орджоникидзе, 20, каб. 207
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>2025 ОЧКИ ПЛЮС</span>
          <span>г. Якутск, ул. Орджоникидзе, 20</span>
          <span>РЕМОНТ ЗА ЧАС</span>
        </div>
      </footer>
    </>
  );
}