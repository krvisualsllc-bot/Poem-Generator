import { useEffect, useState } from "react";

export default function Loader({ visible = true }) {
  if (!visible) return null;

  return (
    <>
      <style>
        {`
          @keyframes sonar {
            0% {
              transform: scale(0.6);
              opacity: 0.8;
            }
            100% {
              transform: scale(2.5);
              opacity: 0;
            }
          }
        `}
      </style>
      <div style={styles.wrapper}>
        <div style={styles.circle}></div>
        <div style={{ ...styles.circle, animationDelay: "0.5s" }}></div>
        <div style={{ ...styles.circle, animationDelay: "1s" }}></div>
      </div>
    </>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    width: "40px",
    height: "40px",
    margin: "0 auto",
  },
  circle: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "radial-gradient(circle at center, #6a11cb, #2575fc)",
    opacity: 0.8,
    animation: "sonar 1.5s infinite ease-out",
  },
};
