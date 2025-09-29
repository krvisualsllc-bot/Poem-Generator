import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const keyword = location.state?.keyword || "Untitled";

  const [copied, setCopied] = useState(false);
  const [showPoem, setShowPoem] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowPoem(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!data) {
    return (
      <div style={styles.container}>
        <h2>No poem was received</h2>
        <button style={styles.button} onClick={() => navigate("/")}>
          Back Home
        </button>
      </div>
    );
  }

  const poem =
    typeof data === "string"
      ? data
      : data.message || JSON.stringify(data, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(poem);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

      <h1 style={styles.title}>A Poem Written Just for You</h1>
      <h2 style={styles.subtitle}>Inspired by: {keyword}</h2>

      <p
        style={{
          ...styles.poem,
          opacity: showPoem ? 1 : 0,
          transform: showPoem ? "translateY(0)" : "translateY(15px)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
        }}
      >
        {poem}
      </p>

      <div style={styles.buttonRow}>
        <button style={styles.button} onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy Poem"}
        </button>
        <button style={styles.button} onClick={() => navigate("/")}>
          Generate Another
        </button>
        <button style={styles.button} onClick={() => navigate("/")}>
          Back Home
        </button>
      </div>

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
    fontSize: "2.5rem",
    marginBottom: "10px",
    fontFamily: "'Playfair Display', serif",
    zIndex: 1,
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    fontStyle: "italic",
    opacity: 0.9,
    zIndex: 1,
  },
  poem: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "12px",
    fontSize: "1.1rem",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    maxWidth: "600px",
    textAlign: "center",
    marginBottom: "30px",
    zIndex: 1,
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    zIndex: 1,
  },
  button: {
    padding: "10px 20px",
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
