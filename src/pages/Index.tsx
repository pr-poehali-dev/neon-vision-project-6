export default function Index() {
  return (
    <>
      <div className="grain-overlay" />

      <header className="header">
        <div className="logo">ОЧКИ*МАСТЕР</div>
        <nav>
          <a href="#">Услуги</a>
          <a href="#">О нас</a>
          <a href="#">Галерея</a>
          <a href="#">Контакты</a>
        </nav>
        <button className="btn-cta">Записаться</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              СРОЧНЫЙ РЕМОНТ
              <br />
              ОЧКОВ <span>ЗА ЧАС</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed text-[#555]">
              Мастерская в Якутске. Чиним оправы, меняем линзы и собираем очки на заказ. Быстро, надёжно и с заботой о
              вашем зрении.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <button className="btn-cta" style={{ background: "var(--primary)", color: "white" }}>
                Записаться на ремонт
              </button>
              <button className="btn-cta" style={{ background: "white" }}>
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
            <h2 className="section-title">НАШИ УСЛУГИ</h2>
            <a
              href="#"
              className="text-sm md:text-base"
              style={{ color: "var(--dark)", fontWeight: 800, textTransform: "uppercase" }}
            >
              Все цены
            </a>
          </div>

          <div className="menu-grid">
            {/* Item 1 */}
            <div className="menu-card">
              <span className="menu-tag">Срочно</span>
              <img
                src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/aa2ecead-749c-415d-8ee9-8f74c7ca3672.jpg"
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
                src="https://cdn.poehali.dev/projects/437a93b1-5f82-4463-b584-1d03eba1ecc3/files/2d312fb3-39cf-4aa7-8dc8-27bca5ab95ca.jpg"
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
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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

        <section className="retro-vibe">
          <div>
            <h2 className="vibe-title">МАСТЕРА СВОЕГО ДЕЛА.</h2>
            <p className="vibe-text">
              Более 10 лет ремонтируем очки в Якутске. Работаем аккуратно, используем профессиональное оборудование и
              даём гарантию на каждую работу. Приходите — починим то, что другие отказались брать.
            </p>
            <button className="btn-cta" style={{ background: "var(--dark)", color: "white", borderColor: "white" }}>
              О мастерской
            </button>
          </div>
          <div className="vibe-img"></div>
        </section>

        <section className="section-padding">
          <h2 className="section-title" style={{ marginBottom: "40px", textAlign: "center" }}>
            НАШИ РАБОТЫ
          </h2>
          <div className="social-grid">
            <div className="social-item">
              <img
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Работа 1"
              />
            </div>
            <div className="social-item">
              <img
                src="https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Работа 2"
              />
            </div>
            <div className="social-item">
              <img
                src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Работа 3"
              />
            </div>
            <div className="social-item">
              <img
                src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Работа 4"
              />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <div className="footer-logo">ОЧКИ*МАСТЕР</div>
          <p style={{ color: "#666", lineHeight: 1.6 }}>
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
            <li>Пн-Пт: 10:00 - 19:00</li>
            <li>Сб: 11:00 - 17:00</li>
            <li>Вс: Выходной</li>
            <li>г. Якутск</li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>2025 ОЧКИ МАСТЕР</span>
          <span>ЯКУТСК</span>
          <span>РЕМОНТ ЗА ЧАС</span>
        </div>
      </footer>
    </>
  );
}