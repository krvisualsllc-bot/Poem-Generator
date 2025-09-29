import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e, randomKeyword = null) => {
    e.preventDefault();

    const finalKeyword = randomKeyword || keyword;
    if (!finalKeyword) return alert("Please enter a keyword");

    setLoading(true);

    try {
      const response = await fetch(
        "https://lighaisolutions.app.n8n.cloud/webhook/b1163409-be81-4501-9861-c9294b41b35e", // ✅ production webhook
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword: finalKeyword }),
        }
      );

      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      navigate("/results", { state: { data, keyword: finalKeyword } });
    } catch (err) {
      alert("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const surpriseKeywords = ["Ocean", "Stars", "Dreams", "Love", "Autumn"];
  const getRandomKeyword =
    surpriseKeywords[Math.floor(Math.random() * surpriseKeywords.length)];

  return (
    <div style={styles.container}>
      {/* Particle Background */}
      <div style={styles.particleContainer}>
        {Array.from({ length: 25 }).map((_, i) => {
          const size = Math.random() * 6 + 4;
          const left = Math.random() * 100;
          const duration = Math.random() * 10 + 5;
          const delay = Math.random() * -20;

          return (
            <span
              key={i}
              style={{
                position: "absolute",
                bottom: "-10px",
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: "rgba(255,255,255,0.8)",
                borderRadius: "50%",
                animation: `floatUp ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            ></span>
          );
        })}
      </div>

      <h1 style={styles.title}>Poem Generator</h1>
      <p style={styles.subtitle}>
        Enter a word, and let it bloom into poetry…
      </p>

      <form onSubmit={(e) => handleSubmit(e)} style={styles.form}>
        <input
          type="text"
          placeholder="Enter a keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? <Loader visible={loading} /> : "Generate Poem"}
        </button>
      </form>

      <button
        style={{ ...styles.button, marginTop: "20px" }}
        onClick={(e) => handleSubmit(e, getRandomKeyword)}
      >
        Surprise Me 🌸
      </button>

      {/* Particle animation keyframes */}
      <style>
        {`
          @keyframes floatUp {
            from { transform: translateY(0); opacity: 0; }
            30% { opacity: 1; }
            to { transform: translateY(-110vh); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    padding: "40px 20px",
    color: "#fff",
    fontFamily: "'Merriweather', serif",
    textAlign: "center",
  },
  particleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: 0,
  },
  title: {
    fontSize: "3rem",
    marginBottom: "10px",
    fontFamily: "'Playfair Display', serif",
    zIndex: 1,
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "40px",
    opacity: 0.9,
    fontStyle: "italic",
    zIndex: 1,
  },
  form: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    zIndex: 1,
  },
  input: {
    padding: "12px 16px",
    fontSize: "1rem",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: "8px",
    width: "250px",
    outline: "none",
    zIndex: 1,
  },
  button: {
    padding: "12px 20px",
    fontSize: "1rem",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    transition: "all 0.2s ease",
    zIndex: 1,
  },
};
