"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";

interface PostItem {
  title: string;
  slug: string;
  image?: string;
  description?: string;
  body?: string;
  date?: string;
  Guyyaa?: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const category = params?.category as string;
  const slug = params?.slug as string;

  const [post, setPost] = useState<PostItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");

  useEffect(() => {
    if (!category || !slug) return;

    fetch(`/data/${category}.json`)
      .then((r) => r.json())
      .then((data) => {
        if (data.items) {
          const found = data.items.find((item: PostItem) => item.slug === slug);
          setPost(found || null);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const docRef = doc(db, "interactions", slug);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const dbData = docSnap.data();
        setLikes(dbData.likes || 0);
        setComments(dbData.comments || []);
      } else {
        setDoc(docRef, { likes: 0, comments: [] });
      }
    });
  }, [category, slug]);

  const handleLike = async () => {
    if (!slug) return;
    const docRef = doc(db, "interactions", slug);

    if (isLiked) {
      setLikes((prev) => prev - 1);
      await updateDoc(docRef, { likes: increment(-1) });
    } else {
      setLikes((prev) => prev + 1);
      await updateDoc(docRef, { likes: increment(1) });
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    alert(isSaved ? "Barreeffamni kun saved irraa haqameera! ❌" : "Barreeffamni kun ol-kaawwameera! 💾");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link'n barreeffama kanaa copy ta'eera! 🔗");
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !slug) return;

    const newComment = commentText.trim();
    setComments((prev) => [...prev, newComment]);
    setCommentText("");

    const docRef = doc(db, "interactions", slug);
    await updateDoc(docRef, {
      comments: arrayUnion(newComment)
    });
  };

  if (loading) {
    return (
      <div style={{ background: "#110A1C", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ background: "#110A1C", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", gap: "20px" }}>
        <p>Barreeffamni kun hin argamne! 🔍</p>
        <button onClick={() => router.push("/home")} style={{ background: "#FF9800", color: "white", border: "none", borderRadius: "50px", padding: "10px 20px", cursor: "pointer" }}>Gara Home Deebi'i</button>
      </div>
    );
  }

  const emoji = category === "motivation" ? "🔥" : category === "stories" ? "📚" : "🎓";

  return (
    <div style={{ background: "linear-gradient(135deg, #110A1C, #1A0D2E, #0A1C2A)", backgroundAttachment: "fixed", minHeight: "100vh", color: "white", padding: "15px", fontFamily: "sans-serif" }}>
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", background: "rgba(0,0,0,0.3)", padding: "10px 15px", borderRadius: "10px" }}>
        <button onClick={() => router.push("/home")} style={{ background: "none", border: "none", color: "#FF9800", fontSize: "16px", cursor: "pointer", fontWeight: "bold" }}>
          ⬅ Deebi'i
        </button>
        <span style={{ fontSize: "14px", textTransform: "uppercase", color: "#aaa", fontWeight: "bold" }}>
          {emoji} {category}
        </span>
      </div>

      <div style={{ maxWidth: "650px", margin: "0 auto", background: "#1F1A3A", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
        
        {post.image ? (
          <img src={post.image} alt={post.title} style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />
        ) : (
          <div style={{ height: "160px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", background: "linear-gradient(135deg,#1F1A3A,#2d1f5e)" }}>{emoji}</div>
        )}

        <div style={{ padding: "20px" }}>
          <h1 style={{ fontSize: "22px", color: "#FF9800", marginBottom: "10px", lineHeight: "1.4" }}>{post.title}</h1>
          <p style={{ color: "#888", fontSize: "12px", marginBottom: "20px" }}>
            📅 {post.date || post.Guyyaa || "Gootamaa jira..."}
          </p>

          <div 
            style={{ color: "#ddd", fontSize: "16px", lineHeight: "1.7", whiteSpace: "pre-wrap", marginBottom: "25px" }}
            dangerouslySetInnerHTML={{ __html: post.body || post.description || "" }}
          />

          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", marginBottom: "15px" }} />

          <p style={{ fontSize: "14px", fontWeight: "bold", color: "#FF9800", marginBottom: "12px", textAlign: "center" }}>What do you think? 🤔</p>
          
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 0" }}>
            <div onClick={handleLike} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", color: isLiked ? "#FF9800" : "#bbb" }}>
              <span style={{ fontSize: "22px" }}>{isLiked ? "❤️" : "🤍"}</span>
              <span style={{ fontSize: "11px", marginTop: "4px" }}>{likes} Likes</span>
            </div>

            <div onClick={handleSave} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", color: isSaved ? "#FF9800" : "#bbb" }}>
              <span style={{ fontSize: "22px" }}>{isSaved ? "🔖" : "📑"}</span>
              <span style={{ fontSize: "11px", marginTop: "4px" }}>{isSaved ? "Saved" : "Save"}</span>
            </div>

            <div onClick={handleShare} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", color: "#bbb" }}>
              <span style={{ fontSize: "22px" }}>🔗</span>
              <span style={{ fontSize: "11px", marginTop: "4px" }}>Share</span>
            </div>
          </div>

        </div>
      </div>

      <div style={{ maxWidth: "650px", margin: "20px auto 0", background: "#1F1A3A", borderRadius: "16px", padding: "20px" }}>
        <h3 style={{ fontSize: "16px", color: "#FF9800", marginBottom: "15px" }}>Yaada Keessan Lakkisaa (Comments) 💬</h3>
        
        <form onSubmit={handleAddComment} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input 
            type="text" 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Yaada kee asitti barreessi..." 
            style={{ flex: 1, background: "#110A1C", border: "1px solid #FF9800", borderRadius: "20px", padding: "10px 15px", color: "white", fontSize: "14px", outline: "none" }}
          />
          <button type="submit" style={{ background: "#FF9800", color: "white", border: "none", borderRadius: "20px", padding: "0 18px", fontWeight: "bold", cursor: "pointer" }}>Ergi</button>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {comments.length === 0 ? (
            <p style={{ color: "#888", fontSize: "13px", textAlign: "center" }}>Yaanni dabalamaa hin jiru. Jalqabaa ta'i!</p>
          ) : (
            comments.map((c, i) => (
              <div key={i} style={{ background: "rgba(0,0,0,0.2)", padding: "10px 14px", borderRadius: "10px", fontSize: "14px", borderLeft: "3px solid #FF9800" }}>
                <p style={{ color: "#FF9800", fontSize: "11px", fontWeight: "bold", margin: "0 0 4px" }}>👤 Keessummaa</p>
                <p style={{ margin: 0, color: "#eee" }}>{c}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px", color: "rgba(255,255,255,0.4)", fontSize: "12px", display: "flex", justifyContent: "center" }}>
        <b>RISE TODAY — MULDHATA KEE DHUGOOMSI</b>
      </div>

    </div>
  );
}
