export type Theme = "default" | "christmas";

interface ThemeSwitcherProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSwitcher({
  theme,
  onThemeChange,
}: ThemeSwitcherProps) {
  return (
    <div className="theme-switcher">
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value as Theme)}
        className="theme-select"
      >
        <option value="default">🌈 Rainbow Theme</option>
        <option value="christmas">🎄 Christmas Theme</option>
      </select>
    </div>
  );
}
