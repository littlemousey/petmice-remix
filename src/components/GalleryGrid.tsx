import type { RedditPost } from "../types/reddit";
import MediaCard from "./MediaCard";
import { getMediaInfo } from "../utils/reddit";

interface GalleryGridProps {
  posts: RedditPost[];
  showRanking?: boolean;
}

export default function GalleryGrid({
  posts,
  showRanking = false,
}: GalleryGridProps) {
  const postsWithMedia = posts.filter((post) => getMediaInfo(post).mediaUrl);

  return (
    <div className="mouse-grid">
      {postsWithMedia.map((post, index) => {
        const { mediaUrl, mediaType } = getMediaInfo(post);

        return (
          <MediaCard
            key={post.id}
            mediaUrl={mediaUrl!}
            mediaType={mediaType}
            title={post.title}
            ranking={showRanking ? index + 1 : undefined}
            onError={() => {
              // Remove the figure element on image load error
              const element = document.querySelector(
                `figure:has([alt="${post.title}"])`
              );
              element?.remove();
            }}
          />
        );
      })}
    </div>
  );
}
