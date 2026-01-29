import type { ViewType } from "../types/reddit";

interface MediaCardProps {
  mediaUrl: string;
  mediaType: "image" | "video";
  title: string;
  ranking?: number;
  filter: ViewType;
  upVotes: string;
  onError: () => void;
}

export default function MediaCard({
  mediaUrl,
  mediaType,
  title,
  ranking,
  filter,
  upVotes,
  onError,
}: MediaCardProps) {
  const isRainbowBridge = filter === "rainbow";
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
          : {}
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
      {mediaType === "video" ? (
        <video src={mediaUrl} controls muted loop preload="metadata" />
      ) : (
        <img src={mediaUrl} alt={title} onError={onError} />
      )}
      <figcaption style={isRainbowBridge ? { color: "#fff" } : {}}>
        {title}
      </figcaption>
      {filter === "all" && <div className="upvotes-tag">⬆️ {upVotes}</div>}
    </figure>
  );
}
