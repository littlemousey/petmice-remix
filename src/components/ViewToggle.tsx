import type { ViewType } from "../types/reddit";

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

interface ViewOption {
  value: ViewType;
  label: string;
  icon: string;
}

const viewOptions: ViewOption[] = [
  { value: "week", label: "Most recent", icon: "🗓️" },
  { value: "all", label: "All Time Top 25", icon: "🏆" },
  { value: "rainbow", label: "Rainbow Bridge", icon: "🕯️" },
  { value: "hot", label: "Hot", icon: "🔥" },
  { value: "cute-mouse-media", label: "Cute Mouse Media", icon: "🐭" },
];

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
        {viewOptions.map((option) => {
          const isActive = currentView === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onViewChange(option.value)}
              style={{
                padding: "8px 20px",
                fontSize: "16px",
                background: isActive
                  ? "rgba(100, 100, 100, 0.2)"
                  : "transparent",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: isActive ? "bold" : "normal",
                transition: "all 0.2s",
              }}
            >
              {option.icon} {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
