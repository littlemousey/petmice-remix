import type { RedditPost } from "../types/reddit";

interface RedditChild {
  data: RedditPost;
  kind: string;
}

/**
 * Parses a Reddit listing response (the JSON returned by endpoints like
 * /r/PetMice/hot.json) into the flat RedditPost[] shape the gallery uses.
 * Throws if the payload isn't shaped like a Reddit listing.
 */
export function parseRedditListing(data: unknown): RedditPost[] {
  const children = (data as { data?: { children?: unknown } } | null)?.data
    ?.children;

  if (!Array.isArray(children)) {
    throw new Error("This doesn't look like a Reddit listing");
  }

  return (children as RedditChild[]).map((child) => child.data);
}
