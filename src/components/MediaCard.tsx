interface MediaCardProps {
  mediaUrl: string;
  mediaType: "image" | "video";
  title: string;
  ranking?: number;
  onError: () => void;
}

export default function MediaCard({
  mediaUrl,
  mediaType,
  title,
  ranking,
  onError,
}: MediaCardProps) {
  return (
    <figure title={title}>
      {ranking && <div className="ranking-badge">#{ranking}</div>}
      {mediaType === "video" ? (
        <video src={mediaUrl} controls muted loop preload="metadata" />
      ) : (
        <img src={mediaUrl} alt={title} onError={onError} />
      )}
      <figcaption>{title}</figcaption>
    </figure>
  );
}
