import type { RedditPost } from "../types/reddit";

export function getMediaInfo(entry: RedditPost): {
  mediaUrl: string | null;
  mediaType: "image" | "video";
} {
  let mediaUrl: string | null = null;
  let mediaType: "image" | "video" = "image";

  if (
    entry.post_hint === "image" ||
    (entry.url &&
      (entry.url.endsWith(".jpg") ||
        entry.url.endsWith(".jpeg") ||
        entry.url.endsWith(".png") ||
        entry.url.endsWith(".gif")))
  ) {
    mediaUrl = entry.url;
    mediaType = "image";
  } else if (
    entry.post_hint === "hosted:video" ||
    entry.post_hint === "rich:video"
  ) {
    if (entry.media?.reddit_video?.fallback_url) {
      mediaUrl = entry.media.reddit_video.fallback_url;
      mediaType = "video";
    } else if (entry.preview?.images?.[0]?.source) {
      mediaUrl = entry.preview.images[0].source.url.replace(/&amp;/g, "&");
      mediaType = "image";
    }
  } else if (entry.preview?.images?.[0]?.source) {
    mediaUrl = entry.preview.images[0].source.url.replace(/&amp;/g, "&");
    mediaType = "image";
  } else if (entry.is_gallery && entry.media_metadata) {
    const mediaIds = Object.keys(entry.media_metadata);
    if (mediaIds.length > 0) {
      const mediaItem = entry.media_metadata[mediaIds[0]];
      if (mediaItem.s?.u) {
        mediaUrl = mediaItem.s.u.replace(/&amp;/g, "&");
        mediaType = "image";
      }
    }
  } else if (
    entry.thumbnail &&
    entry.thumbnail !== "self" &&
    entry.thumbnail !== "default" &&
    entry.thumbnail !== "nsfw"
  ) {
    mediaUrl = entry.thumbnail;
    mediaType = "image";
  }

  return { mediaUrl, mediaType };
}
