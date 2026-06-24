import { useState } from "react";

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
    <section className="section-padding" style={{ background: "var(--bg-section)" }}>
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

export default function Index() {
  return (
    <>
      <header className="header">
        <div className="logo">Очки Плюс</div>
        <nav>
          <a href="#">Услуги</a>
          <a href="#">О нас</a>
          <a href="#">Галерея</a>
          <a href="#">Контакты</a>
          <a href="/" style={{ color: "var(--primary)" }}>📍 Якутск</a>
          <a href="/moscow" style={{ color: "var(--gray)" }}>📍 Москва</a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="/" className="btn-cta" style={{ background: "rgba(0,113,227,0.12)", color: "var(--primary)", fontSize: 12 }}>📍 Якутск</a>
          <a href="/moscow" className="btn-cta" style={{ background: "rgba(0,0,0,0.06)", color: "var(--dark)", fontSize: 12 }}>📍 Москва</a>
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
              Более 10 лет изготавливаем и ремонтируем очки в Якутске. Очки по рецепту, большой выбор линз, гарантия на каждую работу.
            </p>
            <div style={{ display: "flex", flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
              <a href="https://t.me/+79141160007" target="_blank" rel="noreferrer" className="btn-cta" style={{ background: "var(--primary)", color: "white", fontSize: 15, padding: "12px 24px" }}>
                Записаться
              </a>
              <button className="btn-cta" style={{ background: "rgba(0,0,0,0.07)", color: "var(--dark)", fontSize: 15, padding: "12px 24px" }}>
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

        <section className="section-padding">
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

        <section className="retro-vibe">
          <div>
            <h2 className="vibe-title">Мастера своего дела.</h2>
            <p className="vibe-text">
              Более 10 лет изготавливаем и ремонтируем очки в Якутске. Работаем аккуратно, бережно, на профессиональном оборудовании и даём гарантию на каждую нашу работу. В нашей мастерской вы можете изготовить очки по вашему рецепту. Мы ценим ваше время.
            </p>
            <button className="btn-cta" style={{ background: "white", color: "var(--primary)" }}>
              О мастерской
            </button>
          </div>
          <div className="vibe-img"></div>
        </section>

        <section className="section-padding">
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
            Наши работы
          </h2>
          <div className="social-grid">
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/dd35a0e4-d54b-417e-a21a-d8948f6f98b8.png"
                alt="Работа 1"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/16503f70-e163-4a92-952c-7ef8c8981b78.png"
                alt="Работа 2"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/23c21043-ca62-429b-a944-4c1d416df996.jpg"
                alt="Работа 3"
              />
            </div>
            <div className="social-item">
              <img
                src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/1bfaf060-2d73-4d24-ade0-628d06b0ab27.jpg"
                alt="Работа 4"
              />
            </div>
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
              <a href="https://t.me/+79141160007" style={{ color: "inherit", textDecoration: "none" }}>
                Telegram: @+79141160007
              </a>
            </li>
            <li>
              <a href="tel:+79141160007" style={{ color: "inherit", textDecoration: "none" }}>
                Тел: +7 914 116-00-07
              </a>
            </li>
            <li>
              <a
                href="https://yandex.ru/maps/?text=Якутск+ул+Орджоникидзе+20"
                target="_blank"
                rel="noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                ул. Орджоникидзе, 20, каб. 207
              </a>
            </li>
            <li>г. Якутск</li>
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