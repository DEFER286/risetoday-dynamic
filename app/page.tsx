"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ergaawwan database keessa jiran gadi fiduuf
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Ergaa haaraa gara database-tti erguuf
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return alert("Maaloo hunda guuti!");

    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setName("");
        setText("");
        fetchMessages(); // Battalatti galmee haaraa gadiitti fida
      } else {
        alert("Dogoggora: " + data.error);
      }
    } catch (err) {
      setLoading(false);
      alert("Gara database erguun hin danda'amne!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", fontFamily: "sans-serif", color: "#fff", backgroundColor: "#000", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>RISE TODAY</h2>
      <p style={{ fontWeight: "bold", color: "#aaa", textAlign: "center", marginBottom: "30px" }}>MULDHATA KEE DHUGOOMSI</p>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>Maqaa Kee:</label>
          <input
            type="text"
            placeholder="Maqaa kee asitti barreessi..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #444", color: "#000", background: "#fff", fontSize: "16px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", color: "#ccc" }}>Ergaa Kee:</label>
          <textarea
            placeholder="Ergaa kee asitti dhiisi..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #444", height: "120px", color: "#000", background: "#fff", fontSize: "16px", boxSizing: "border-box" }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: "12px", background: "#0070f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", marginTop: "10px" }}>
          {loading ? "Ergamaa jira..." : "Ergi"}
        </button>
      </form>

      <hr style={{ margin: "40px 0", borderColor: "#333" }} />

      <h3 style={{ marginBottom: "15px" }}>Ergaawwan Sif Kha'an:</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.length === 0 ? (
          <p style={{ color: "#aaa", fontStyle: "italic" }}>Hanga ammaati ergaan kuufame hin jiru.</p>
        ) : (
          messages.map((msg: any) => (
            <div key={msg._id} style={{ padding: "15px", background: "#111", borderRadius: "8px", border: "1px solid #222" }}>
              <strong style={{ color: "#0070f3", display: "block", marginBottom: "5px" }}>{msg.name}</strong>
              <p style={{ margin: 0, color: "#ddd", lineHeight: "1.5" }}>{msg.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

