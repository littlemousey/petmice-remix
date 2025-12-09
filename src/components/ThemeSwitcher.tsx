interface ThemeSwitcherProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

export default function ThemeSwitcher({
  theme,
  onThemeChange,
}: ThemeSwitcherProps) {
  return (
    <div className="theme-switcher">
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value)}
        className="theme-select"
      >
        <option value="default">🌈 Rainbow Theme</option>
        <option value="christmas">🎄 Christmas Theme</option>
      </select>
    </div>
  );
}
