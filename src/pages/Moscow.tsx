export default function Moscow() {
  return (
    <>
      <div className="grain-overlay" />

      <header className="header">
        <div className="logo">ОЧКИ*ПЛЮС</div>
        <nav>
          <a href="/">Главная</a>
          <a href="#">Услуги</a>
          <a href="#">Контакты</a>
        </nav>
        <a href="https://t.me/+79141160007" target="_blank" rel="noreferrer" className="btn-cta">Записаться</a>
      </header>

      <main>
        <section style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--cream)",
          padding: "80px 20px",
        }}>
          <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>

            <div style={{
              display: "inline-block",
              background: "var(--accent)",
              color: "var(--dark)",
              fontWeight: 900,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: 3,
              padding: "8px 20px",
              border: "2px solid var(--dark)",
              borderRadius: 100,
              marginBottom: 32,
            }}>
              Новый филиал
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(52px, 10vw, 96px)",
              lineHeight: 0.95,
              fontWeight: 900,
              color: "var(--dark)",
              marginBottom: 24,
              textTransform: "uppercase",
            }}>
              СКОРО В<br />
              <span style={{ color: "var(--primary)" }}>МОСКВЕ</span>
            </h1>

            <p style={{
              fontSize: 18,
              color: "#555",
              lineHeight: 1.6,
              marginBottom: 48,
              maxWidth: 480,
              margin: "0 auto 48px",
            }}>
              Мастерская «Очки Плюс» открывает филиал в Москве. Тот же уровень качества и скорости — уже скоро в вашем городе.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
              marginBottom: 48,
            }}>
              {[
                { icon: "⚡", text: "Ремонт за час" },
                { icon: "🔬", text: "Замена линз" },
                { icon: "🛠️", text: "Очки на заказ" },
              ].map((item) => (
                <div key={item.text} style={{
                  background: "white",
                  border: "2px solid var(--dark)",
                  borderRadius: 12,
                  padding: "20px 16px",
                  boxShadow: "4px 4px 0 var(--dark)",
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 14, textTransform: "uppercase" }}>{item.text}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: "var(--dark)",
              color: "white",
              borderRadius: 16,
              padding: "32px 24px",
              border: "3px solid var(--dark)",
              boxShadow: "6px 6px 0 var(--primary)",
              marginBottom: 32,
            }}>
              <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Хотите узнать первым об открытии?</p>
              <p style={{ color: "#aaa", fontSize: 14, marginBottom: 20 }}>Напишите нам — мы сообщим, как только откроемся</p>
              <a
                href="https://t.me/+79141160007"
                target="_blank"
                rel="noreferrer"
                className="btn-cta"
                style={{ background: "var(--accent)", color: "var(--dark)", display: "inline-block" }}
              >
                Написать в Telegram
              </a>
            </div>

            <a href="/" style={{
              color: "var(--dark)",
              fontWeight: 700,
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 1,
              textDecoration: "underline",
            }}>
              ← Вернуться на главную
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
