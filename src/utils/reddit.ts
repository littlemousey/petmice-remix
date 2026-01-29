import type { RedditPost } from "../types/reddit";

export function getMediaInfo(entry: RedditPost): {
  mediaUrl: string | null;
  mediaType: "image" | "video";
  upvotes: string;
  allMediaUrls?: Array<{ url: string; type: "image" | "video" }>;
} {
  let mediaUrl: string | null = null;
  let mediaType: "image" | "video" = "image";
  let allMediaUrls:
    | Array<{ url: string; type: "image" | "video" }>
    | undefined = undefined;

  // Handle gallery posts first
  if (entry.is_gallery && entry.media_metadata) {
    const mediaIds = Object.keys(entry.media_metadata);
    const galleryMedia = mediaIds
      .map((id) => {
        const mediaItem = entry.media_metadata![id];
        if (mediaItem.s?.u) {
          return {
            url: mediaItem.s.u.replace(/&amp;/g, "&"),
            type: "image" as "image" | "video",
          };
        }
        return null;
      })
      .filter(
        (item): item is { url: string; type: "image" | "video" } =>
          item !== null
      );

    if (galleryMedia.length > 0) {
      allMediaUrls = galleryMedia;
      mediaUrl = galleryMedia[0].url;
      mediaType = "image";
    }
  } else if (
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
  } else if (
    entry.thumbnail &&
    entry.thumbnail !== "self" &&
    entry.thumbnail !== "default" &&
    entry.thumbnail !== "nsfw"
  ) {
    mediaUrl = entry.thumbnail;
    mediaType = "image";
  }

  return { mediaUrl, mediaType, upvotes: entry.ups, allMediaUrls };
}
