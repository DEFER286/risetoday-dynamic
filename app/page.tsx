"use client";

import { useState, useEffect } from "react";

interface Comment {
  _id: string;
  name: string;
  text: string;
  createdAt: string;
}

export default function HomePage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
    const savedLikes = localStorage.getItem("rise_today_likes");
    if (savedLikes) setLikes(parseInt(savedLikes));
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) setComments(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;
    setLoading(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });
      const data = await res.json();
      if (data.success) {
        setName("");
        setText("");
        fetchComments();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem("rise_today_likes", newLikes.toString());
  };

  return (
    <div style={{ backgroundColor: "#0a0a0a", color: "white", fontFamily: "Arial, sans-serif", minHeight: "100vh" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", background: "rgba(0, 0, 0, 0.92)", display: "flex", alignItems: "center", padding: "15px 24px", boxSizing: "border-box", zIndex: 1000, borderBottom: "1px solid rgba(255, 152, 0, 0.1)" }}>
        <div style={{ fontWeight: "bold", fontSize: "18px", color: "#FF9800", letterSpacing: "1px" }}>
          ⚡ RISE TODAY
        </div>
      </nav>

      <section style={{ height: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "20px", marginTop: "60px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "14px", color: "#FF9800", fontWeight: "bold" }}>
          RISE TODAY - Gorsa Jireenyaa
        </h1>
        <p style={{ color: "#aaa", fontSize: "15px", marginBottom: "32px", maxWidth: "380px", lineHeight: 1.6 }}>
          Tarkaanfii tokko fudhu... Milkaa'inni si eega jira 🔥
        </p>
        <button onClick={handleLike} style={{ background: "linear-gradient(135deg, #FF9800, #ffb74d)", color: "#000", border: "none", padding: "12px 28px", borderRadius: "40px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
          ❤️ Reaction ({likes})
        </button>
      </section>

      <section style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", borderTop: "1px solid rgba(255,152,0,0.2)" }}>
        <h3 style={{ color: "#FF9800", marginBottom: "15px", textAlign: "center" }}>Yaada Keessan Kennaa</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
          <input type="text" placeholder="Maqaa kee..." value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#111", color: "white" }} required />
          <textarea placeholder="Yaada kee asitti dhiisi..." value={text} onChange={(e) => setText(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#111", color: "white", minHeight: "80px" }} required />
          <button type="submit" disabled={loading} style={{ background: "#FF9800", color: "black", padding: "12px", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer" }}>
            {loading ? "Ergamaa..." : "Yaada Ergi"}
          </button>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {comments.map((c) => (
            <div key={c._id} style={{ backgroundColor: "#111", padding: "12px", borderRadius: "8px", borderLeft: "4px solid #FF9800" }}>
              <b style={{ color: "#FF9800", fontSize: "14px" }}>{c.name}</b>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#ddd" }}>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: "#0d0d0d", textAlign: "center", padding: "30px 20px", marginTop: "40px", borderTop: "1px solid rgba(255,152,0,0.12)" }}>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0 }}>
          &copy; 2026 <span style={{ color: "#FF9800", fontWeight: "bold" }}>RISE TODAY</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
