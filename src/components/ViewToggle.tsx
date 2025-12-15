interface ViewToggleProps {
  currentView: "week" | "all";
  onViewChange: (view: "week" | "all") => void;
}

export default function ViewToggle({
  currentView,
  onViewChange,
}: ViewToggleProps) {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px 0",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          padding: "4px",
          marginBottom: "20px",
          gap: "4px",
        }}
      >
        <button
          onClick={() => onViewChange("week")}
          style={{
            padding: "8px 20px",
            fontSize: "16px",
            background:
              currentView === "week"
                ? "rgba(100, 100, 100, 0.2)"
                : "transparent",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: currentView === "week" ? "bold" : "normal",
            transition: "all 0.2s",
          }}
        >
          🗓️ Latest mice
        </button>
        <button
          onClick={() => onViewChange("all")}
          style={{
            padding: "8px 20px",
            fontSize: "16px",
            background:
              currentView === "all"
                ? "rgba(100, 100, 100, 0.2)"
                : "transparent",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: currentView === "all" ? "bold" : "normal",
            transition: "all 0.2s",
          }}
        >
          🏆 All Time Top 25
        </button>
      </div>
    </div>
  );
}
