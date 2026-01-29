import { useState } from "react";
import type { ViewType } from "../types/reddit";

interface MediaCardProps {
  mediaUrl: string;
  mediaType: "image" | "video";
  title: string;
  ranking?: number;
  filter: ViewType;
  upVotes: string;
  onError: () => void;
  allMediaUrls?: Array<{ url: string; type: "image" | "video" }>; // New prop for multiple media
}

export default function MediaCard({
  mediaUrl,
  mediaType,
  title,
  ranking,
  filter,
  upVotes,
  onError,
  allMediaUrls,
}: MediaCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isRainbowBridge = filter === "rainbow";
  const hasMultipleMedia = allMediaUrls && allMediaUrls.length > 1;

  const currentMedia = hasMultipleMedia
    ? allMediaUrls[currentIndex]
    : { url: mediaUrl, type: mediaType };

  const goToPrevious = () => {
    if (!hasMultipleMedia) return;
    setCurrentIndex((prev) =>
      prev === 0 ? allMediaUrls.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    if (!hasMultipleMedia) return;
    setCurrentIndex((prev) =>
      prev === allMediaUrls.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <figure
      title={title}
      style={
        isRainbowBridge
          ? {
              background: "#000",
              border: "2px solid #444",
              position: "relative",
            }
          : { position: "relative" }
      }
    >
      {ranking && <div className="ranking-badge">#{ranking}</div>}
      {isRainbowBridge && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            fontSize: "24px",
            zIndex: 10,
            background: "rgba(0, 0, 0, 0.6)",
            borderRadius: "50%",
            padding: "4px 8px",
            backdropFilter: "blur(4px)",
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
          }}
        >
          🕯️
        </div>
      )}
      {currentMedia.type === "video" ? (
        <video src={currentMedia.url} controls muted loop preload="metadata" />
      ) : (
        <img src={currentMedia.url} alt={title} onError={onError} />
      )}
      {hasMultipleMedia && (
        <>
          <button
            onClick={goToPrevious}
            className="media-nav-button media-nav-prev"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={goToNext}
            className="media-nav-button media-nav-next"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="media-indicator">
            {currentIndex + 1} / {allMediaUrls.length}
          </div>
        </>
      )}
      <figcaption style={isRainbowBridge ? { color: "#fff" } : {}}>
        {title}
      </figcaption>
      {filter === "all" && <div className="upvotes-tag">⬆️ {upVotes}</div>}
    </figure>
  );
}
