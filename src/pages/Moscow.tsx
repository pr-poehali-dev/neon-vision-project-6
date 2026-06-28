import { useLocationModal } from "@/components/LocationModal";

export default function Moscow() {
  const { open } = useLocationModal();
  return (
    <>
      <header className="header">
        <div className="logo">Очки Плюс</div>
        <nav>
          <a href="/">Главная</a>
          <a href="#services" onClick={e => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }}>Услуги</a>
          <a href="#contacts" onClick={e => { e.preventDefault(); document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }); }}>Контакты</a>
          <a href="/" style={{ color: "var(--gray)" }}>📍 Якутск</a>
          <a href="/moscow" style={{ color: "var(--primary)" }}>📍 Москва</a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={open} className="btn-cta" style={{ background: "rgba(0,113,227,0.12)", color: "var(--primary)", fontSize: 12, border: "none" }}>📍 Москва</button>
          <a href="tel:+79141160007" className="btn-cta" style={{ background: "rgba(0,113,227,0.12)", color: "var(--primary)", fontSize: 12 }}>📞 Позвонить</a>
          <a href="#contacts" className="btn-cta" style={{ background: "var(--primary)", color: "white", fontSize: 12 }}>Записаться</a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div style={{ display: "inline-block", background: "rgba(0,113,227,0.1)", color: "var(--primary)", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 980, marginBottom: 20, letterSpacing: 0.2 }}>
              Новый филиал — Москва
            </div>
            <h1 className="hero-title">
              Скоро откроемся<br />
              <span>в Москве</span>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--gray)", marginBottom: 32, maxWidth: 420, fontWeight: 400 }}>
              Мастерская «Очки Плюс» открывает филиал в Москве. Тот же уровень качества и скорости — уже скоро в вашем городе.
            </p>
            <div style={{ display: "flex", flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
              <a href="#contacts" target="_blank" rel="noreferrer" className="btn-cta" style={{ background: "var(--primary)", color: "white", fontSize: 15, padding: "12px 24px" }}>
                Узнать об открытии
              </a>
              <a href="/" className="btn-cta" style={{ background: "rgba(0,0,0,0.07)", color: "var(--dark)", fontSize: 15, padding: "12px 24px" }}>
                ← Якутск
              </a>
            </div>
          </div>
          <div className="hero-img" style={{ background: "linear-gradient(135deg, #0071e3 0%, #0099fa 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", color: "white" }}>
              <div style={{ fontSize: 96, marginBottom: 16 }}>🏙️</div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>Москва</div>
              <div style={{ fontSize: 14, opacity: 0.8, marginTop: 8 }}>Открытие — скоро</div>
            </div>
            <div className="sticker" style={{ background: "white", color: "var(--primary)" }}>
              СКОРО<br />ЗДЕСЬ
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee">
          <div className="marquee-content">
            &nbsp; * РЕМОНТ ОПРАВ * ЗАМЕНА ЛИНЗ * ОЧКИ НА ЗАКАЗ * СРОЧНО ЗА ЧАС * ГАРАНТИЯ КАЧЕСТВА * СКОРО В МОСКВЕ *
            РЕМОНТ ОПРАВ * ЗАМЕНА ЛИНЗ * ОЧКИ НА ЗАКАЗ * СРОЧНО ЗА ЧАС * ГАРАНТИЯ КАЧЕСТВА * СКОРО В МОСКВЕ
          </div>
        </div>

        {/* ЧТО БУДЕТ В МОСКВЕ */}
        <section id="services" className="section-padding">
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 12 }}>Что будет в филиале</h2>
          <p style={{ textAlign: "center", color: "var(--gray)", marginBottom: 48, fontSize: 16 }}>Все услуги якутской мастерской — в Москве</p>
          <div className="menu-grid">
            <div className="menu-card">
              <span className="menu-tag">Срочно</span>
              <img src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/7152e9f6-0c1e-4107-ba7f-41291ec29d23.png" alt="Ремонт оправы" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <h3 style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.3px" }}>Ремонт оправы</h3>
                  <span className="price">от 500 ₽</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.5 }}>Пайка металла, замена винтов, носоупоров, восстановление дужек.</p>
              </div>
            </div>
            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--secondary)" }}>Точность</span>
              <img src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/294a42a5-2f5a-4720-932e-c545b1a2b7fd.png" alt="Замена линз" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <h3 style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.3px" }}>Замена линз</h3>
                  <span className="price">от 1 200 ₽</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.5 }}>Линзы по рецепту с антибликом и защитой от UV.</p>
              </div>
            </div>
            <div className="menu-card">
              <span className="menu-tag" style={{ background: "var(--accent)", color: "var(--dark)" }}>Под ключ</span>
              <img src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/b3bbbb83-833c-47ce-b566-f3887b12534f.jpg" alt="Очки на заказ" />
              <div className="menu-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <h3 style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.3px" }}>Очки на заказ</h3>
                  <span className="price">от 2 500 ₽</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.5 }}>Подберём оправу и соберём очки полностью под ваше зрение.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ПОЧЕМУ МЫ */}
        <section className="retro-vibe">
          <div>
            <h2 className="vibe-title">Профессиональное изготовление очков — теперь ближе.</h2>
            <p className="vibe-text">
              За годы работы мы выстроили безупречную систему производства. Современное оборудование, высокие стандарты качества и быстрые сроки — теперь доступны в новой мастерской.
            </p>
            <a href="#contacts" target="_blank" rel="noreferrer" className="btn-cta" style={{ background: "white", color: "var(--primary)", display: "inline-block" }}>
              Написать в Telegram
            </a>
          </div>
          <div className="vibe-img"></div>
        </section>

        {/* ПРЕИМУЩЕСТВА */}
        <section className="section-padding" style={{ background: "white", borderRadius: 24, margin: "12px 0" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: 48 }}>Почему Очки Плюс</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
            {[
              { icon: "⚡", title: "Ремонт за час", desc: "Большинство работ выполняем прямо при вас" },
              { icon: "✅", title: "Гарантия", desc: "Гарантия на каждую выполненную работу" },
              { icon: "💳", title: "Любая оплата", desc: "Наличные, карты, безналичный расчёт" },
              { icon: "🏢", title: "Юр. лица", desc: "Договоры, счета, все документы для бухгалтерии" },
            ].map((item) => (
              <div key={item.title} style={{ textAlign: "center", padding: "28px 20px", borderRadius: 18, background: "var(--bg)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.3px" }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* УВЕДОМЛЕНИЕ */}
        <section id="contacts" className="section-padding">
          <div style={{ maxWidth: 560, margin: "0 auto", background: "white", borderRadius: 24, padding: "48px 40px", textAlign: "center", boxShadow: "0 8px 48px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 52, marginBottom: 20 }}>🔔</div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.8px" }}>Узнайте первым об открытии</h2>
            <p style={{ color: "var(--gray)", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
              Напишите нам в Telegram — мы сообщим, как только московский филиал откроет двери.
            </p>
            <a
              href="#contacts"
              target="_blank"
              rel="noreferrer"
              className="btn-cta"
              style={{ background: "var(--primary)", color: "white", fontSize: 16, padding: "14px 32px", display: "inline-block" }}
            >
              Написать в Telegram
            </a>
            <div style={{ marginTop: 24 }}>
              <a href="/" style={{ color: "var(--primary)", fontSize: 14, fontWeight: 500 }}>← Вернуться на главную (Якутск)</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <div className="footer-logo">Очки Плюс</div>
          <p style={{ color: "var(--gray)", lineHeight: 1.6, fontSize: 14 }}>
            Срочный ремонт и изготовление очков. Скоро в Москве.
          </p>
        </div>
        <div className="footer-links">
          <h4>Навигация</h4>
          <ul>
            <li><a href="/" style={{ color: "inherit", textDecoration: "none" }}>Якутск</a></li>
            <li><a href="/moscow" style={{ color: "inherit", textDecoration: "none" }}>Москва</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Услуги</a></li>
            <li><a href="#" style={{ color: "inherit", textDecoration: "none" }}>Контакты</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Контакты</h4>
          <ul>
            <li><a href="#contacts" style={{ color: "inherit", textDecoration: "none" }}>Telegram</a></li>
            <li><a href="tel:+79141160007" style={{ color: "inherit", textDecoration: "none" }}>+7 914 116-00-07</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>2025 Очки Плюс</span>
          <span>Москва — скоро открытие</span>
        </div>
      </footer>
    </>
  );
}