import { useState } from "react";
import "./index.css";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ViewToggle from "./components/ViewToggle";
import LoadingView from "./views/LoadingView";
import ErrorView from "./views/ErrorView";
import GalleryGrid from "./components/GalleryGrid";
import { useRedditPosts } from "./hooks/useRedditPosts";
import { useTheme } from "./hooks/useTheme";
import Snowfall from "./components/background/Snowfall";
import Clouds from "./components/background/Clouds";
import Hearts from "./components/background/Hearts";
import ChristmasMusic from "./components/background/ChristmasMusic";
import Footer from "./components/Footer";
import type { ViewType } from "./types/reddit";

function App() {
  const [view, setView] = useState<ViewType>("week");

  const isRainbowView = view === "rainbow";
  const { theme, handleThemeChange } = useTheme(isRainbowView);
  const {
    posts,
    loading,
    error,
    hasMore,
    isFallback,
    isUserData,
    loadMore,
    applyUserData,
    clearUserData,
  } = useRedditPosts("PetMice", view);

  const isChristmasTheme = theme === "christmas";
  const isSkyTheme = theme === "sky";
  const isHeartsTheme = theme === "hearts";
  const showChristmasElements = isChristmasTheme && !isRainbowView;

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
      {showChristmasElements && <ChristmasMusic />}
      {!isRainbowView && (
        <ThemeSwitcher theme={theme} onThemeChange={handleThemeChange} />
      )}

      <h1>🐁 Gallery of Cute Mice 🐁</h1>

      {isFallback && !isUserData && (
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

      {isUserData && (
        <p
          style={{
            textAlign: "center",
            opacity: 0.8,
            fontSize: "0.85rem",
            margin: "-8px 0 16px",
          }}
        >
          Showing your imported data.{" "}
          <button
            onClick={clearUserData}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "inherit",
              padding: 0,
            }}
          >
            Clear
          </button>
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

      <Footer onImportData={applyUserData} view={view} />
    </>
  );
}

export default App;
