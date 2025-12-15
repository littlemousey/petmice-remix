import { useState } from "react";
import Credits from "./Credits";

export default function Footer() {
  const [showCredits, setShowCredits] = useState(false);

  const buttonStyling = {
    background: "black",
    fontSize: "16px",
    fontWeight: "600",
    border: "1px solid black",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    padding: "7px",
  };

  return (
    <>
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          marginTop: "40px",
          borderTop: "2px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => window.open("https://www.reddit.com/r/PetMice/")}
            style={buttonStyling}
          >
            🧭 Go to Reddit
          </button>
          <button onClick={() => setShowCredits(true)} style={buttonStyling}>
            📚 Credits
          </button>
        </div>
      </footer>

      {showCredits && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
          onClick={() => setShowCredits(false)}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              maxWidth: "500px",
              color: "black",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Credits />
            <button
              onClick={() => setShowCredits(false)}
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
