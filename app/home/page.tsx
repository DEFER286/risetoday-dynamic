"use client";
import { useState, useEffect } from "react";

interface PostItem {
  title: string;
  slug: string;
  image?: string;
  description?: string;
  body?: string;
  date?: string;
  Guyyaa?: string;
}

interface CombinedPost {
  cat: string;
  item: PostItem;
  idx: number;
}

export default function HomePage() {
  const [allPosts, setAllPosts] = useState<CombinedPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<CombinedPost[]>([]);
  const [activeCat, setActiveCat] = useState<string>("all");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(" ");

  useEffect(() => {
    let localPosts: CombinedPost[] = [];
    let loaded = 0;

    const tryRender = () => {
      loaded++;
      if (loaded === 3) {
        const now = new Date();
        // Calaluu (Filter out future posts)
        let filtered = localPosts.filter((p) => {
          const postDate = new Date(p.item.date || p.item.Guyyaa || 0);
          return postDate <= now;
        });
        // Hiriirsuu (Sort by date descending)
        filtered.sort((a, b) => {
          const dateA = new Date(a.item.date || a.item.Guyyaa || 0);
          const dateB = new Date(b.item.date || b.item.Guyyaa || 0);
          return dateB.getTime() - dateA.getTime();
        });
        setAllPosts(filtered);
        setFilteredPosts(filtered);
      }
    };

    // Fetch Motivation
    fetch("/data/motivation.json")
      .then((r) => r.json())
      .then((data) => {
        if (data.items) {
          data.items.forEach((item: PostItem, i: number) =>
            localPosts.push({ cat: "motivation", item, idx: i })
          );
        }
        tryRender();
      })
      .catch(() => tryRender());

    // Fetch Stories
    fetch("/data/stories.json")
      .then((r) => r.json())
      .then((data) => {
        if (data.items) {
          data.items.forEach((item: PostItem, i: number) =>
            localPosts.push({ cat: "stories", item, idx: i })
          );
        }
        tryRender();
      })
      .catch(() => tryRender());

    // Fetch Education
    fetch("/data/education.json")
      .then((r) => r.json())
      .then((data) => {
        if (data.items) {
          data.items.forEach((item: PostItem, i: number) =>
            localPosts.push({ cat: "education", item, idx: i })
          );
        }
        tryRender();
      })
      .catch(() => tryRender());
  }, []);

  // Filter by Category and Search
  useEffect(() => {
    let res = allPosts;
    if (activeCat !== "all") {
      res = res.filter((p) => p.cat === activeCat);
    }
    if (searchQuery.trim() !== "") {
      res = res.filter((p) =>
        p.item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredPosts(res);
  }, [activeCat, searchQuery, allPosts]);

  const stripHtmlAndMarkdown = (raw: string) => {
    return raw
      .replace(/<[^>]*>/g, " ")
      .replace(/#{1,6}\s*/g, "")
      .replace(/\*{1,2 Suf}([^*]*)\*{1,2}/g, "$1")
      .replace(/[-•*]\s+/g, " ")
      .replace(/\\n/g, " ")
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #110A1C, #1A0D2E, #0A1C2A)", backgroundAttachment: "fixed", margin: 0, minHeight: "100vh", paddingBottom: "30px", fontFamily: "sans-serif" }}>
      
      {/* Hamburger Button */}
      <div onClick={() => setIsMenuOpen(true)} style={{ cursor: "pointer", position: "fixed", top: "12px", left: "12px", z-index: 10000, background: "rgba(0,0,0,0.45)", borderRadius: "8px", padding: "6px 10px", backdropFilter: "blur(4px)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </div>

      {/* Side Menu */}
      {isMenuOpen && (
        <div style={{ backgroundColor: "#0D0D0D", position: "fixed", top: 0, left: 0, width: "75%", maxWidth: "300px", height: "100%", zIndex: 9999, paddingTop: "60px", overflowY: "auto" }}>
          <div onClick={() => setIsMenuOpen(false)} style={{ position: "absolute", top: "15px", right: "20px", fontSize: "28px", color: "white", cursor: "pointer" }}>✕</div>
          <div style={{ padding: "0 18px 16px", borderBottom: "1px solid #2a2a2a" }}>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="🔍 Search..." style={{ width: "100%", boxSizing: "border-box", padding: "11px 16px", borderRadius: "50px", border: "1.5px solid #FF9800", fontSize: "14px", outline: "none", background: "#1a1a1a", color: "white" }} />
          </div>
          <a href="/home" style={{ display: "block", color: "#FF9800", textDecoration: "none", fontSize: "17px", fontWeight: "bold", padding: "16px 25px", borderBottom: "1px solid #2a2a2a" }}>🏠 Home</a>
          <a href="/motivation" style={{ display: "block", color: "white", textDecoration: "none", fontSize: "17px", padding: "16px 25px", borderBottom: "1px solid #2a2a2a" }}>🔥 Motivation</a>
          <a href="/stories" style={{ display: "block", color: "white", textDecoration: "none", fontSize: "17px", padding: "16px 25px", borderBottom: "1px solid #2a2a2a" }}>📚 Seenaa</a>
          <a href="/education" style={{ display: "block", color: "white", textDecoration: "none", fontSize: "17px", padding: "16px 25px", borderBottom: "1px solid #2a2a2a" }}>🎓 Gorsa</a>
        </div>
      )}

      {/* Hero Section */}
      <div style={{ backgroundImage: "linear-gradient(rgba(10, 5, 30, 0.60), rgba(10, 5, 30, 0.60)), url('/images/hero-bg.webp')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "0 0 24px 24px", paddingBottom: "30px", paddingTop: "80px", textAlign: "center" }}>
        <h1 style={{ color: "#ff9800", fontSize: "2em", marginTop: "30px", marginBottom: "10px", fontWeight: "800" }}>JIREENYA SIMACHUUFI 🫂</h1>
        <p style={{ color: "#ddd", marginBottom: "30px" }}>Baga nagaan Dhufte!🙏</p>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", padding: "0 10px" }}>
          <button onClick={() => setActiveCat("all")} style={{ background: activeCat === "all" ? "#FF9800" : "rgba(255,152,0,0.1)", border: "1.5px solid #FF9800", color: activeCat === "all" ? "#111" : "#FF9800", borderRadius: "50px", padding: "7px 20px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>✨ Hundaa</button>
          <button onClick={() => setActiveCat("motivation")} style={{ background: activeCat === "motivation" ? "#FF9800" : "rgba(255,152,0,0.1)", border: "1.5px solid #FF9800", color: activeCat === "motivation" ? "#111" : "#FF9800", borderRadius: "50px", padding: "7px 20px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>🔥 Motivation</button>
          <button onClick={() => setActiveCat("stories")} style={{ background: activeCat === "stories" ? "#00BCD4" : "rgba(0,188,212,0.1)", border: "1.5px solid #00BCD4", color: activeCat === "stories" ? "#111" : "#00BCD4", borderRadius: "50px", padding: "7px 20px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>📚 Seenaa</button>
          <button onClick={() => setActiveCat("education")} style={{ background: activeCat === "education" ? "#8BC34A" : "rgba(139,195,74,0.1)", border: "1.5px solid #8BC34A", color: activeCat === "education" ? "#111" : "#8BC34A", borderRadius: "50px", padding: "7px 20px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>🎓 Gorsa</button>
        </div>
      </div>

      {/* Grid Content */}
      <div style={{ padding: "0 16px", marginTop: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "14px" }}>
          {filteredPosts.map((p, index) => {
            const rawDesc = p.item.description || p.item.body || "";
            const plainDesc = stripHtmlAndMarkdown(rawDesc).substring(0, 80) + "...";
            const emoji = p.cat === "motivation" ? "🔥" : p.cat === "stories" ? "📚" : "🎓";
            const linkColor = p.cat === "motivation" ? "#FF9800" : p.cat === "stories" ? "#00BCD4" : "#8BC34A";

            return (
              <a href={`/${p.cat}/${p.item.slug}`} key={index} style={{ backgroundColor: "#1F1A3A", borderRadius: "10px", overflow: "hidden", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}>
                {p.item.image ? (
                  <img src={p.item.image} alt={p.item.title} style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                ) : (
                  <div style={{ height: "130px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", background: "linear-gradient(135deg,#1F1A3A,#2d1f5e)" }}>{emoji}</div>
                )}
                <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ color: "#fff", fontSize: "13px", fontWeight: "bold", margin: "0 0 6px", lineHeight: "1.4" }}>{p.item.title}</h3>
                  <p style={{ color: "#bbb", fontSize: "12px", lineHeight: "1.4", marginBottom: "8px" }}>{plainDesc}</p>
                  <span style={{ fontSize: "12px", fontWeight: "bold", marginTop: "auto", color: linkColor }}>Dubbisi ➔</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
