import { useState, useEffect, useRef } from "react";
import "./index.css";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ViewToggle from "./components/ViewToggle";
import LoadingView from "./components/LoadingView";
import ErrorView from "./components/ErrorView";
import GalleryGrid from "./components/GalleryGrid";
import { useRedditPosts } from "./hooks/useRedditPosts";
import Snowfall from "./components/Snowfall";
import Footer from "./components/Footer";
import christmasMusic from "./assets/christmas-is-christmas-loop.mp3";

function App() {
  const [theme, setTheme] = useState("default");
  const [view, setView] = useState<"week" | "all" | "rainbow">("week");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { posts, loading, error, hasMore, loadMore } = useRedditPosts(
    "PetMice",
    view
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "default";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    // Override theme when in rainbow bridge view
    if (view === "rainbow") {
      document.body.setAttribute("data-theme", "rainbow-bridge");
    } else {
      const savedTheme = localStorage.getItem("theme") || "default";
      document.body.setAttribute("data-theme", savedTheme);
    }
  }, [view]);

  const handleThemeChange = (newTheme: string) => {
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
      {theme === "christmas" && view !== "rainbow" && <Snowfall />}
      {theme === "christmas" && view !== "rainbow" && (
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
      {view !== "rainbow" && (
        <ThemeSwitcher theme={theme} onThemeChange={handleThemeChange} />
      )}

      <h1>🐁 Gallery of Cute Mice 🐁</h1>

      <ViewToggle currentView={view} onViewChange={setView} />

      <GalleryGrid
        posts={posts}
        showRanking={view === "all"}
        isRainbowBridge={view === "rainbow"}
      />

      {hasMore && (view === "week" || view === "rainbow") && (
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <button
            onClick={loadMore}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              background:
                view === "rainbow"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(255, 255, 255, 0.9)",
              border: "2px solid white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              color: view === "rainbow" ? "white" : "inherit",
            }}
          >
            {view === "rainbow" ? "Load More 🕯️" : "Load More Mice 🐭"}
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
