import Link from "next/next-link" or "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RISE TODAY — Muldhata Kee Dhugoomsi",
  description: "Bakka guddinaa, kaka'umsa guyyaa guyyaafi yaada jireenya kee itti dabalattu. Har'a irraa jijjiirama jalqabi!",
  keywords: ["RISE TODAY", "Afaan Oromo", "motivation", "gorsa jireenyaa", "seenaa", "personal growth", "self improvement", "Oromoo"],
  authors: [{ name: "Defera Dedecha" }],
  robots: "index, follow, max-image-preview:large",
  alternates: {
    canonical: "https://risetoday.vercel.app/",
  },
  openGraph: {
    type: "website",
    title: "RISE TODAY — Muldhata Kee Dhugoomsi",
    description: "Motivational content in Afaan Oromo: gorsa jireenyaa, seenaa barnoota qabu, personal growth, self improvement and success mindset every day",
    url: "https://risetoday.vercel.app/",
    images: [
      {
        url: "https://risetoday.vercel.app/images/og-image.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RISE TODAY — Muldhata Kee Dhugoomsi",
    description: "Start small. Grow daily. Become great. 🚀",
    images: ["https://risetoday.vercel.app/images/og-image.webp"],
  },
};

export default function IndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RISE TODAY",
    "url": "https://risetoday.vercel.app/",
    "description": "Motivational content in Afaan Oromo — gorsa jireenyaa, seenaa barnoota qabu, personal growth every day.", 
    "inLanguage": "om",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://risetoday.vercel.app/home?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Design kee akka jetti eeguuf CSS akkuma jirutti as keessa jira */}
      <style dangerouslySetInnerHTML={{ __html: `
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #0a0a0a;
          color: white;
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        /* NAVBAR */
        nav {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          padding: 15px 24px;
          box-sizing: border-box;
          z-index: 1000;
          border-bottom: 1px solid rgba(255,152,0,0.1);
        }

        .logo {
          font-weight: bold;
          font-size: 18px;
          color: #FF9800;
          letter-spacing: 1px;
        }

        /* HERO */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
          background-image:
            linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52)),
            url('/images/hero-index.webp');
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
          background-attachment: scroll;
        }

        .hero h1 {
          font-size: 40px;
          margin-bottom: 14px;
          letter-spacing: 2px;
          color: #FF9800;
          line-height: 1.2;
        }

        .hero p {
          color: #aaa;
          font-size: 15px;
          margin-bottom: 32px;
          max-width: 380px;
          line-height: 1.6;
        }

        .btn {
          background: linear-gradient(135deg, #FF9800, #ffb74d);
          color: #111;
          padding: 14px 34px;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          text-decoration: none;
          transition: 0.3s;
          display: inline-block;
        }

        .btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 28px rgba(255,152,0,0.45);
        }

        /* FOOTER */
        footer {
          background: #0d0d0d;
          text-align: center;
          padding: 30px 20px;
          border-top: 1px solid rgba(255,152,0,0.12);
        }

        footer a {
          color: #FF9800;
          text-decoration: none;
          margin: 0 10px;
          font-size: 14px;
        }

        footer a:hover { opacity: 0.75; }
      `}} />

      {/* NAVBAR */}
      <nav>
        <div className="logo">⚡ RISE TODAY</div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>RISE TODAY - Gorsa jireenyaa </h1>
        <p>Tarkaanfi tokko fudhu... Milkaa'inni si eega jira 🔥</p>
        <Link href="/home" className="btn">🚀 View Website</Link>
      </section>

      {/* FOOTER */}
      <footer id="footer">
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "16px" }}>Quick Links</p>
        <Link href="/home">Home</Link>
        <Link href="/motivation">Motivation</Link>
        <Link href="/stories">Seenaa</Link>
        <Link href="/education">Gorsa</Link>
        <Link href="/about">About Us</Link>

        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,153,0,0.1)" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: 0, letterSpacing: "1px" }}>
            &copy; 2026 <span style={{ color: "#FF9800", fontWeight: "bold" }}>RISE TODAY</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
