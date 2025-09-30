import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, keyword } = location.state || { data: "No se encontró poema", keyword: "" };

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

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Un poema escrito solo para ti</h1>
        <p style={styles.subtitle}>
          Palabra clave: <strong>{keyword}</strong>
        </p>

        {/* Poem Box */}
        <div style={styles.poemBox}>
          <p style={styles.poem} className="fade-in">
            {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
          </p>
        </div>

        {/* Button */}
        <button onClick={() => navigate("/")} style={styles.button}>
          Generar otro poema ✨
        </button>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes floatUp {
            from { transform: translateY(0); opacity: 0; }
            30% { opacity: 1; }
            to { transform: translateY(-110vh); opacity: 0; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fade-in {
            animation: fadeIn 1s ease forwards;
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
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #2575fc, #6a11cb)",
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
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "10px",
    fontFamily: "'Playfair Display', serif",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "40px",
    opacity: 0.9,
    fontStyle: "italic",
  },
  poemBox: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "700px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    marginBottom: "40px",
  },
  poem: {
    fontSize: "1.2rem",
    lineHeight: "1.8",
    textAlign: "left",
  },
  button: {
    padding: "14px 24px",
    fontSize: "1.1rem",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.4)",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    transition: "all 0.2s ease",
  },
};
