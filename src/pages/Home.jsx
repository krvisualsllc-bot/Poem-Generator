import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e, randomKeyword = null) => {
    e.preventDefault();

    const finalKeyword = randomKeyword || keyword;
    if (!finalKeyword) return alert("Por favor, introduce una palabra");

    console.clear();
    console.log("🚀 Enviando solicitud a: https://lighaisolutions.app.n8n.cloud/webhook/b1163409-be81-4501-9861-c9294b41b35e");
    console.log("🔑 Palabra clave:", finalKeyword);

    setLoading(true);

    try {
      const response = await fetch(
        "https://lighaisolutions.app.n8n.cloud/webhook/b1163409-be81-4501-9861-c9294b41b35e",
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

      console.log("📜 Respuesta del poema:", data);

      navigate("/results", { state: { data, keyword: finalKeyword } });
    } catch (err) {
      console.error("❌ Error al generar el poema:", err.message);
      alert("Ocurrió un error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const surpriseKeywords = ["Océano", "Estrellas", "Sueños", "Amor", "Otoño"];
  const getRandomKeyword =
    surpriseKeywords[Math.floor(Math.random() * surpriseKeywords.length)];

  // ✅ Generate particles only once
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
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
    });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.particleContainer}>{particles}</div>

      <h1 style={styles.title}>Generador de Poemas</h1>
      <p style={styles.subtitle}>
        Escribe una palabra y deja que florezca en poesía…
      </p>

      <form onSubmit={(e) => handleSubmit(e)} style={styles.form}>
        <input
          type="text"
          placeholder="Introduce una palabra..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? <Loader visible={loading} /> : "Generar poema"}
        </button>
      </form>

      <button
        style={{ ...styles.button, marginTop: "20px" }}
        onClick={(e) => handleSubmit(e, getRandomKeyword)}
      >
        Sorpréndeme 🌸
      </button>

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
