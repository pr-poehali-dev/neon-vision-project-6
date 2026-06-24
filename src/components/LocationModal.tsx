import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LocationModal() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const chosen = localStorage.getItem("ochki_location");
    if (!chosen) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const choose = (city: "yakutsk" | "moscow") => {
    localStorage.setItem("ochki_location", city);
    setVisible(false);
    if (city === "moscow") navigate("/moscow");
    else navigate("/");
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }}>
      <div style={{
        background: "white",
        borderRadius: 28,
        padding: "48px 36px",
        maxWidth: 480,
        width: "100%",
        textAlign: "center",
        boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📍</div>
        <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.8px", marginBottom: 10, color: "var(--dark)" }}>
          Выберите ваш город
        </h2>
        <p style={{ color: "var(--gray)", fontSize: 15, lineHeight: 1.6, marginBottom: 36 }}>
          Мы работаем в двух городах. Выберите ближайший к вам филиал.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <button
            onClick={() => choose("yakutsk")}
            style={{
              borderRadius: 18, padding: "24px 16px", border: "2px solid transparent",
              background: "linear-gradient(135deg, #e8f4fd, #d0eaff)",
              cursor: "pointer", transition: "all 0.25s", textAlign: "center",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>🏔️</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--dark)", letterSpacing: "-0.4px", marginBottom: 4 }}>Якутск</div>
            <div style={{ fontSize: 12, color: "var(--gray)" }}>ул. Орджоникидзе, 20</div>
          </button>
          <button
            onClick={() => choose("moscow")}
            style={{
              borderRadius: 18, padding: "24px 16px", border: "2px solid transparent",
              background: "linear-gradient(135deg, #f0f0f5, #e8e8f0)",
              cursor: "pointer", transition: "all 0.25s", textAlign: "center",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--dark)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>🏙️</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--dark)", letterSpacing: "-0.4px", marginBottom: 4 }}>Москва</div>
            <div style={{ fontSize: 12, color: "var(--gray)" }}>Скоро открытие</div>
          </button>
        </div>
        <button
          onClick={() => { localStorage.setItem("ochki_location", "yakutsk"); setVisible(false); }}
          style={{ marginTop: 24, background: "none", border: "none", color: "var(--gray)", fontSize: 13, cursor: "pointer" }}
        >
          Пропустить
        </button>
      </div>
    </div>
  );
}
