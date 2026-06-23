export default function Moscow() {
  return (
    <>
      <div className="grain-overlay" />

      <header className="header">
        <div className="logo">
          <img src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/f36cff9e-62bb-41f7-99d3-c166a3f83b88.png" alt="Очки Плюс" style={{ height: 44, objectFit: "contain" }} />
        </div>
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
          background: "linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 50%, #7c3aed 100%)",
          padding: "80px 20px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Декоративные круги */}
          <div style={{ position: "absolute", top: "-100px", right: "-100px", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
          {/* Декоративный текст на фоне */}
          <div style={{ position: "absolute", fontSize: "clamp(80px, 20vw, 180px)", fontWeight: 900, color: "rgba(255,255,255,0.05)", pointerEvents: "none", userSelect: "none", left: "50%", top: "50%", transform: "translate(-50%, -50%)", whiteSpace: "nowrap", fontFamily: "'Unbounded', sans-serif", letterSpacing: -4 }}>
            ОЧКИ ПЛЮС
          </div>
          <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>

            {/* Логотип */}
            <div style={{ marginBottom: 32 }}>
              <img
                src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/bucket/f36cff9e-62bb-41f7-99d3-c166a3f83b88.png"
                alt="Очки Плюс"
                style={{ height: 90, objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </div>

            <div style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 900,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: 3,
              padding: "8px 20px",
              border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: 100,
              marginBottom: 32,
              backdropFilter: "blur(10px)",
            }}>
              Новый филиал
            </div>

            <h1 style={{
              fontFamily: "'Unbounded', sans-serif",
              fontSize: "clamp(42px, 9vw, 86px)",
              lineHeight: 1,
              fontWeight: 900,
              color: "white",
              marginBottom: 24,
              textTransform: "uppercase",
            }}>
              СКОРО В<br />
              <span style={{ color: "#bff000" }}>МОСКВЕ</span>
            </h1>

            <p style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.8)",
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
                  background: "rgba(255,255,255,0.15)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: 12,
                  padding: "20px 16px",
                  backdropFilter: "blur(10px)",
                  color: "white",
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 800, fontSize: 14, textTransform: "uppercase" }}>{item.text}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(16px)",
              color: "white",
              borderRadius: 16,
              padding: "32px 24px",
              border: "2px solid rgba(255,255,255,0.3)",
              marginBottom: 32,
            }}>
              <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Хотите узнать первым об открытии?</p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginBottom: 20 }}>Напишите нам — мы сообщим, как только откроемся</p>
              <a
                href="https://t.me/+79141160007"
                target="_blank"
                rel="noreferrer"
                className="btn-cta"
                style={{ background: "#bff000", color: "#1a1a1a", display: "inline-block" }}
              >
                Написать в Telegram
              </a>
            </div>

            <a href="/" style={{
              color: "rgba(255,255,255,0.7)",
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