import { useState, useEffect } from "react";
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

// Detect if browser is Chrome (supports custom select styling)
const isChrome = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes("chrome") && !userAgent.includes("edg");
};

export default function ViewToggle({
  currentView,
  onViewChange,
}: ViewToggleProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [useCustomSelect, setUseCustomSelect] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    setUseCustomSelect(isChrome());
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile dropdown view
  if (isMobile) {
    return (
      <div className="view-toggle-container">
        <div className="view-select-wrapper">
          <select
            value={currentView}
            onChange={(e) => onViewChange(e.target.value as ViewType)}
            className={`view-select ${
              useCustomSelect ? "view-select-chrome" : "view-select-standard"
            }`}
          >
            {viewOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
          {!useCustomSelect && <span className="view-select-arrow">▼</span>}
        </div>
      </div>
    );
  }

  // Desktop button view
  return (
    <div className="view-toggle-container">
      <div className="view-toggle-buttons">
        {viewOptions.map((option) => {
          const isActive = currentView === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onViewChange(option.value)}
              className={`view-button ${isActive ? "view-button-active" : ""}`}
            >
              {option.icon} {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
