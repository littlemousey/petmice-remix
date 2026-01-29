import type { RedditPost, ViewType } from "../types/reddit";
import MediaCard from "./MediaCard";
import { getMediaInfo } from "../utils/reddit";

interface GalleryGridProps {
  posts: RedditPost[];
  showRanking?: boolean;
  filter: ViewType;
}

export default function GalleryGrid({
  posts,
  showRanking = false,
  filter,
}: GalleryGridProps) {
  const postsWithMedia = posts.filter((post) => getMediaInfo(post).mediaUrl);

  return (
    <div className="mouse-grid">
      {postsWithMedia.map((post, index) => {
        const { mediaUrl, mediaType, upvotes } = getMediaInfo(post);

        return (
          <MediaCard
            key={post.id}
            mediaUrl={mediaUrl!}
            mediaType={mediaType}
            title={post.title}
            ranking={showRanking ? index + 1 : undefined}
            filter={filter}
            upVotes={upvotes}
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
