import { useState, useEffect, useRef } from "react";
import "./index.css";
import ThemeSwitcher, { type Theme } from "./components/ThemeSwitcher";
import ViewToggle from "./components/ViewToggle";
import LoadingView from "./components/LoadingView";
import ErrorView from "./components/ErrorView";
import GalleryGrid from "./components/GalleryGrid";
import { useRedditPosts } from "./hooks/useRedditPosts";
import Snowfall from "./components/Snowfall";
import Clouds from "./components/Clouds";
import Hearts from "./components/Hearts";
import Footer from "./components/Footer";
import christmasMusic from "./assets/christmas-is-christmas-loop.mp3";
import type { ViewType } from "./types/reddit";

function App() {
  const [theme, setTheme] = useState<Theme>("default");
  const [view, setView] = useState<ViewType>("week");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { posts, loading, error, hasMore, isFallback, loadMore } =
    useRedditPosts("PetMice", view);

  const isRainbowView = view === "rainbow";
  const isChristmasTheme = theme === "christmas";
  const isSkyTheme = theme === "sky";
  const isHeartsTheme = theme === "hearts";
  const showChristmasElements = isChristmasTheme && !isRainbowView;

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") || "default") as Theme;
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    // Override theme when in rainbow bridge view
    if (isRainbowView) {
      document.body.setAttribute("data-theme", "rainbow-bridge");
    } else {
      const savedTheme = (localStorage.getItem("theme") || "default") as Theme;
      document.body.setAttribute("data-theme", savedTheme);
    }
  }, [view, isRainbowView]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);

    // Stop music when switching away from Christmas theme
    if (newTheme !== "christmas" && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading && posts.length === 0) {
    return <LoadingView />;
  }

  if (error && posts.length === 0) {
    return <ErrorView error={error} />;
  }

  return (
    <>
      {isSkyTheme && !isRainbowView && <Clouds />}
      {isHeartsTheme && !isRainbowView && <Hearts />}
      {showChristmasElements && <Snowfall />}
      {showChristmasElements && (
        <>
          <audio ref={audioRef} loop>
            <source src={christmasMusic} type="audio/mpeg" />
          </audio>
          <button
            onClick={toggleMusic}
            style={{
              position: "fixed",
              top: "20px",
              left: "10px",
              padding: "12px 20px",
              fontSize: "24px",
              background: "rgba(255, 255, 255, 0.9)",
              border: "2px solid #d4af37",
              borderRadius: "50px",
              cursor: "pointer",
              zIndex: 1000,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? "🔇" : "🎵"}
          </button>
        </>
      )}
      {!isRainbowView && (
        <ThemeSwitcher theme={theme} onThemeChange={handleThemeChange} />
      )}

      <h1>🐁 Gallery of Cute Mice 🐁</h1>

      {isFallback && (
        <p
          style={{
            textAlign: "center",
            opacity: 0.6,
            fontSize: "0.85rem",
            margin: "-8px 0 16px",
          }}
        >
          Showing older data from the Petmice subreddit — Reddit API is
          currently unavailable.
        </p>
      )}

      <ViewToggle currentView={view} onViewChange={setView} />

      <GalleryGrid posts={posts} showRanking={view === "all"} filter={view} />

      {hasMore && view !== "all" && (
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <button
            onClick={loadMore}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              background: isRainbowView
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(255, 255, 255, 0.9)",
              border: "2px solid white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              color: isRainbowView ? "white" : "inherit",
            }}
          >
            {isRainbowView ? "Load More 🕯️" : "Load More Mice 🐭"}
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
