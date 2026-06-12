import { useState, useEffect } from "react";
import type { Theme } from "../components/ThemeSwitcher";

export function useTheme(isRainbowView: boolean) {
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") || "default") as Theme;
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.setAttribute(
      "data-theme",
      isRainbowView ? "rainbow-bridge" : theme
    );
  }, [theme, isRainbowView]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return { theme, handleThemeChange };
}
