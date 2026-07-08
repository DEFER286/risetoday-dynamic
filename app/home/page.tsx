"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loadedCount = 0;
    let tempPosts: any[] = [];

    const tryRender = () => {
      loadedCount++;
      if (loadedCount === 3) {
        const now = new Date();
        const filtered = tempPosts.filter(p => {
          const postDate = new Date(p.item.date || p.item.Guyyaa || 0);
          return postDate <= now;
        });
        filtered.sort((a, b) => {
          const dateA = new Date(a.item.date || a.item.Guyyaa || 0);
          const dateB = new Date(b.item.date || b.item.Guyyaa || 0);
          return dateB.getTime() - dateA.getTime();
        });
        setAllPosts(filtered);
        setLoading(false);
      }
    };

    fetch('/data/motivation.json').then(r => r.json()).then(data => {
      if (data.items) data.items.forEach((item: any) => tempPosts.push({ cat: 'motivation', item }));
      tryRender();
    }).catch(() => tryRender());

    fetch('/data/stories.json').then(r => r.json()).then(data => {
      if (data.items) data.items.forEach((item: any) => tempPosts.push({ cat: 'stories', item }));
      tryRender();
    }).catch(() => tryRender());

    fetch('/data/education.json').then(r => r.json()).then(data => {
      if (data.items) data.items.forEach((item: any) => tempPosts.push({ cat: 'education', item }));
      tryRender();
    }).catch(() => tryRender());
  }, []);

  const getPlainDesc = (item: any) => {
    const raw = item.description || item.body || '';
    const plain = raw
      .replace(/<[^>]*>/g, ' ')
      .replace(/#{1,6}\s*/g, '')
      .replace(/\*{1,2}([^*]*)\*{1,2}/g, '$1')
      .replace(/[-•*]\s+/g, ' ')
      .replace(/\\n/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return plain.substring(0, 80) + (plain.length > 80 ? '...' : '');
  };

  const filteredPosts = allPosts.filter(p => {
    const matchesTab = activeTab === "all" || p.cat === activeTab;
    const matchesSearch = searchQuery === "" ||
      p.item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getPlainDesc(p.item).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ background: "linear-gradient(135deg, #110A1C, #1A0D2E, #0A1C2A)", backgroundAttachment: "fixed", margin: 0, minHeight: "100vh", fontFamily: "sans-serif", paddingBottom: "30px" }}>

      {/* Hamburger Button */}
      <div onClick={() => setIsMenuOpen(true)} style={{ cursor: "pointer", position: "fixed", top: "12px", left: "12px", zIndex: 10000, background: "rgba(0,0,0,0.45)", borderRadius: "8px", padding: "6px 10px", backdropFilter: "blur(4px)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </div>

      {/* Side Menu */}
      <div style={{ display: isMenuOpen ? "block" : "none", backgroundColor: "#0D0D0D", position: "fixed", top: 0, left: 0, width: "75%", maxWidth: "300px", height: "100%", zIndex: 9999, paddingTop: "60px", overflowY: "auto" }}>
        <div onClick={() => setIsMenuOpen(false)} style={{ position: "absolute", top: "15px", right: "20px", fontSize: "28px", color: "white", cursor: "pointer" }}>✕</div>

        {/* Search Bar */}
        <div style={{ padding: "0 18px 16px", borderBottom: "1px solid #2a2a2a" }}>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="🔍 Search..." style={{ width: "100%", boxSizing: "border-box", padding: "11px 16px", borderRadius: "50px", border: "1.5px solid #FF9800", fontSize: "14px", outline: "none", background: "#1a1a1a", color: "white" }} />
        </div>

        {/* Links */}
        <Link href="/home" onClick={() => setIsMenuOpen(false)} style={{ display: "block", color: "#FF9800", textDecoration: "none", fontSize: "17px", fontWeight: "bold", padding: "16px 25px", borderBottom: "1px solid #2a2a2a" }}>🏠 Home</Link>
        <Link href="/motivation" onClick={() => setIsMenuOpen(false)} style={{ display: "block", color: "white", textDecoration: "none", fontSize: "17px", padding: "16px 25px", borderBottom: "1px solid #2a2a2a" }}>🔥 Motivation</Link>
        <Link href="/stories" onClick={() => setIsMenuOpen(false)} style={{ display: "block", color: "white", textDecoration: "none", fontSize: "17px", padding: "16px 25px", borderBottom: "1px solid #2a2a2a" }}>📚 Seenaa</Link>
        <Link href="/education" onClick={() => setIsMenuOpen(false)} style={{ display: "block", color: "white", textDecoration: "none", fontSize: "17px", padding: "16px 25px", borderBottom: "1px solid #2a2a2a" }}>🎓 Gorsa</Link>
        <Link href="/saved" onClick={() => setIsMenuOpen(false)} style={{ display: "block", color: "white", textDecoration: "none", fontSize: "17px", padding: "16px 25px", borderBottom: "1px solid #2a2a2a" }}>⭐ Favorite</Link>

        {/* Follow Us */}
        <div style={{ padding: "20px 25px 30px" }}>
          <p style={{ color: "#888", fontSize: "12px", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>Follow Us</p>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <a href="https://www.facebook.com/imalakaayoo.vision" target="_blank" rel="noreferrer" style={{ width: "42px", height: "42px", background: "#1877F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="https://t.me/Imala_kaayoo" target="_blank" rel="noreferrer" style={{ width: "42px", height: "42px", background: "#229ED9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .126 4.073l3.9 1.205 1.312 4.282a1.5 1.5 0 0 0 2.56.5l1.91-2.348 3.96 2.916a2.25 2.25 0 0 0 3.528-1.306l2.7-13.5a2.25 2.25 0 0 0-2.474-2.537zM9.9 14.85l-.738 3.43-.738-2.41 6.9-6.63-6.424 5.61z"/></svg></a>
            <a href="https://t.me/rised_official" target="_blank" rel="noreferrer" style={{ width: "42px", height: "42px", background: "#1A6C9E", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg></a>
            <a href="https://wa.me/251923489484" target="_blank" rel="noreferrer" style={{ width: "42px", height: "42px", background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ backgroundImage: "linear-gradient(rgba(10, 5, 30, 0.60), rgba(10, 5, 30, 0.60)), url('/images/hero-bg.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", borderRadius: "0 0 24px 24px", paddingBottom: "30px", paddingTop: "80px", textAlign: "center" }}>
        <h1 style={{ color: "#FF9800", fontSize: "2em", textAlign: "center", marginTop: "30px", marginBottom: "10px", fontWeight: 800 }}>JIREENYA SIMACHUUFI 🫂</h1>
        <p style={{ textAlign: "center", color: "#ddd", marginBottom: "30px" }}>Baga nagaan Dhufte!🙏</p>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", padding: "0 10px" }}>
          <button onClick={() => setActiveTab("all")} style={{ background: activeTab === "all" ? "#FF9800" : "rgba(255,152,0,0.1)", border: "1.5px solid #FF9800", color: activeTab === "all" ? "#111" : "#FF9800", borderRadius: "50px", padding: "7px 20px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>✨ Hundaa</button>
          <button onClick={() => setActiveTab("motivation")} style={{ background: activeTab === "motivation" ? "#FF9800" : "rgba(255,152,0,0.1)", border: "1.5px solid #FF9800", color: activeTab === "motivation" ? "#111" : "#FF9800", borderRadius: "50px", padding: "7px 20px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>🔥 Motivation</button>
          <button onClick={() => setActiveTab("stories")} style={{ background: activeTab === "stories" ? "#00BCD4" : "rgba(0,188,212,0.1)", border: "1.5px solid #00BCD4", color: activeTab === "stories" ? "#111" : "#00BCD4", borderRadius: "50px", padding: "7px 20px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>📚 Seenaa</button>
          <button onClick={() => setActiveTab("education")} style={{ background: activeTab === "education" ? "#8BC34A" : "rgba(139,195,74,0.1)", border: "1.5px solid #8BC34A", color: activeTab === "education" ? "#111" : "#8BC34A", borderRadius: "50px", padding: "7px 20px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>🎓 Gorsa</button>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: "0 16px", marginTop: "20px" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>Loading...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
            {filteredPosts.map((p, index) => {
              const emoji = p.cat === 'motivation' ? '🔥' : p.cat === 'stories' ? '📚' : '🎓';
              const badgeClass = p.cat === 'motivation' ? 'rgba(255,152,0,0.2)' : p.cat === 'stories' ? 'rgba(0,188,212,0.2)' : 'rgba(139,195,74,0.2)';
              const badgeColor = p.cat === 'motivation' ? '#FF9800' : p.cat === 'stories' ? '#00BCD4' : '#8BC34A';
              const badgeLabel = p.cat === 'motivation' ? '🔥 Motivation' : p.cat === 'stories' ? '📚 Seenaa' : '🎓 Gorsa';

              return (
                <Link key={index} href={`/${p.cat}/${p.item.slug}`} style={{ backgroundColor: "#1F1A3A", borderRadius: "10px", overflow: "hidden", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "280px" }}>
                  {p.item.image ? (
                    <img src={p.item.image} alt={p.item.title} style={{ width: "100%", height: "130px", objectFit: "cover", display: "block" }} />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", background: "linear-gradient(135deg, #1F1A3A, #2d1f5e)", height: "130px" }}>{emoji}</div>
                  )}
                  <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <span style={{ display: "inline-block", fontSize: "11px", fontWeight: "bold", borderRadius: "50px", padding: "3px 10px", marginBottom: "6px", backgroundColor: badgeClass, color: badgeColor, width: "fit-content" }}>{badgeLabel}</span>
                    <h3 style={{ color: "#fff", fontSize: "13px", fontWeight: "bold", lineHeight: 1.4, margin: "0 0 6px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", maxHeight: "36px" }}>{p.item.title}</h3>
                    <p style={{ color: "#bbb", fontSize: "12px", lineHeight: 1.4, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", maxHeight: "34px" }}>{getPlainDesc(p.item)}</p>
                    <span style={{ fontSize: "12px", fontWeight: "bold", marginTop: "auto", color: badgeColor }}>Dubbisi ➔</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Subscribe */}
      <div style={{ backgroundColor: "#1F1A3A", borderTop: "5px solid white", borderRadius: "15px", padding: "30px", textAlign: "center", margin: "40px 16px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
          <div style={{ color: "white", fontSize: "20px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}><span style={{ fontSize: "24px" }}>📩</span> Subscribe</div>
          <p style={{ color: "#ddd", fontSize: "16px", margin: 0 }}>Enter your Email</p>
          <form action="https://formspree.io/f/xbdbaolp" method="POST" style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "320px", justifyContent: "center" }}>
            <input type="email" name="email" placeholder="email..." required style={{ backgroundColor: "white", color: "#333", border: "1px solid #ddd", borderRadius: "50px", padding: "10px 15px", width: "60%", fontSize: "14px", outline: "none" }} />
            <button type="submit" style={{ backgroundColor: "#FF9800", color: "white", border: "none", borderRadius: "50px", padding: "10px 18px", fontWeight: "bold", cursor: "pointer", fontSize: "14px", whiteSpace: "nowrap" }}>Subscribe</button>
          </form>
        </div>
      </div>

    </div>
  );
}
