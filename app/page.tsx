"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #110A1C, #1A0D2E, #0A1C2A)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "sans-serif",
      color: "white",
      padding: "20px"
    }}>
      <h1 style={{ color: "#FF9800", fontSize: "2.5rem", marginBottom: "10px", fontWeight: "800" }}>
        RISE TODAY
      </h1>
      <p style={{ color: "#ddd", marginBottom: "30px", textAlign: "center" }}>
        Tarkaanfii tokko fudhu... Milkaa'inni si eega jira 🔥
      </p>

      {/* Button gara fuula guddaa 'home' tti geessu */}
      <Link href="/home">
        <button style={{
          backgroundColor: "#FF9800",
          color: "white",
          border: "none",
          borderRadius: "50px",
          padding: "14px 36px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(255, 152, 0, 0.4)",
          transition: "transform 0.2s"
        }}>
          Website Seeni ➔
        </button>
      </Link>

      <footer style={{ marginTop: "80px", color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
        &copy; 2026 <b>RISE TODAY</b>. All rights reserved.
      </footer>
    </div>
  );
}
