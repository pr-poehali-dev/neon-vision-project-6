import { useState, useEffect } from "react";

const ADMIN_URL = "https://functions.poehali.dev/d2091596-cb34-4d9a-b7c6-747429431795";

interface Review {
  id: number;
  name: string;
  text: string;
  stars: number;
  approved: boolean;
  date: string;
}

export default function AdminReviews() {
  const [password, setPassword] = useState(() => sessionStorage.getItem("admin_pwd") || "");
  const [input, setInput] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async (pwd: string) => {
    setLoading(true);
    setError("");
    const res = await fetch(ADMIN_URL, { headers: { "x-admin-password": pwd } });
    if (res.status === 401) { setError("Неверный пароль"); setLoading(false); return; }
    const data = await res.json();
    setReviews(data.reviews || []);
    setPassword(pwd);
    sessionStorage.setItem("admin_pwd", pwd);
    setLoading(false);
  };

  useEffect(() => { if (password) load(password); }, []);

  const toggle = async (r: Review) => {
    await fetch(ADMIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id: r.id, approved: !r.approved }),
    });
    setReviews(prev => prev.map(x => x.id === r.id ? { ...x, approved: !x.approved } : x));
  };

  const remove = async (id: number) => {
    if (!confirm("Удалить отзыв?")) return;
    await fetch(ADMIN_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });
    setReviews(prev => prev.filter(x => x.id !== id));
  };

  if (!password || error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f7" }}>
        <div style={{ background: "white", borderRadius: 20, padding: "40px 36px", width: 340, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: 36, textAlign: "center", marginBottom: 12 }}>🔐</div>
          <h2 style={{ textAlign: "center", margin: "0 0 24px", fontSize: 20, fontWeight: 700 }}>Панель модерации</h2>
          {error && <p style={{ color: "red", fontSize: 14, textAlign: "center", margin: "0 0 12px" }}>{error}</p>}
          <input
            type="password"
            placeholder="Введите пароль"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && load(input)}
            style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "12px 16px", fontSize: 15, marginBottom: 12, outline: "none", boxSizing: "border-box" }}
            autoFocus
          />
          <button
            onClick={() => load(input)}
            disabled={loading}
            style={{ width: "100%", background: "var(--primary, #2563eb)", color: "white", border: "none", borderRadius: 12, padding: "13px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </div>
      </div>
    );
  }

  const pending = reviews.filter(r => !r.approved);
  const approved = reviews.filter(r => r.approved);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f7", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Отзывы клиентов</h1>
          <button onClick={() => { sessionStorage.removeItem("admin_pwd"); setPassword(""); setInput(""); }}
            style={{ background: "none", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 14, color: "#666" }}>
            Выйти
          </button>
        </div>

        {pending.length > 0 && (
          <>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#f59e0b", margin: "0 0 12px" }}>⏳ Ожидают проверки ({pending.length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {pending.map(r => <ReviewCard key={r.id} r={r} onToggle={toggle} onDelete={remove} />)}
            </div>
          </>
        )}

        {approved.length > 0 && (
          <>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#16a34a", margin: "0 0 12px" }}>✅ Опубликованы ({approved.length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {approved.map(r => <ReviewCard key={r.id} r={r} onToggle={toggle} onDelete={remove} />)}
            </div>
          </>
        )}

        {reviews.length === 0 && !loading && (
          <div style={{ textAlign: "center", color: "#999", padding: "60px 0" }}>Отзывов пока нет</div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ r, onToggle, onDelete }: { r: Review; onToggle: (r: Review) => void; onDelete: (id: number) => void }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: "20px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: r.approved ? "1.5px solid #bbf7d0" : "1.5px solid #fde68a" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{r.name}</span>
            <span style={{ fontSize: 13 }}>{"⭐".repeat(r.stars)}</span>
            <span style={{ fontSize: 12, color: "#999" }}>{r.date}</span>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#333" }}>{r.text}</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button onClick={() => onToggle(r)}
            style={{ background: r.approved ? "#fef3c7" : "#dcfce7", border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: r.approved ? "#b45309" : "#15803d" }}>
            {r.approved ? "Скрыть" : "Опубликовать"}
          </button>
          <button onClick={() => onDelete(r.id)}
            style={{ background: "#fee2e2", border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#dc2626" }}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
