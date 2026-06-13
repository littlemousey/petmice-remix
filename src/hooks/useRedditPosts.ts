import { useState, useEffect, useCallback } from "react";
import type { RedditPost, ViewType } from "../types/reddit";
import { parseRedditListing } from "../utils/parseRedditListing";

interface UseRedditPostsResult {
  posts: RedditPost[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  isFallback: boolean;
  isUserData: boolean;
  loadMore: () => void;
  applyUserData: (rawJson: string) => void;
  clearUserData: () => void;
}

// Maps each view to its corresponding local fallback JSON file in public/data/
const fallbackFile: Record<ViewType, string> = {
  week: "new.json",
  hot: "hot.json",
  all: "top.json",
  rainbow: "rainbow.json",
  "cute-mouse-media": "cute-media.json",
};

export function useRedditPosts(
  subreddit: string = "PetMice",
  timeFilter: ViewType = "week"
): UseRedditPostsResult {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [userPosts, setUserPosts] = useState<RedditPost[] | null>(null);

  const buildRedditUrl = useCallback(
    (afterParam: string | null): string => {
      const baseParams = new URLSearchParams({ raw_json: "1" });
      if (afterParam) baseParams.set("after", afterParam);

      let endpoint: string;

      switch (timeFilter) {
        case "rainbow":
          baseParams.set("q", 'flair:"Rainbow Bridge"');
          baseParams.set("restrict_sr", "1");
          baseParams.set("sort", "new");
          baseParams.set("limit", "100");
          endpoint = `https://www.reddit.com/r/${subreddit}/search.json?${baseParams}`;
          break;

        case "cute-mouse-media":
          baseParams.set("q", 'flair_name:"Cute Mouse Media"');
          baseParams.set("restrict_sr", "1");
          baseParams.set("sort", "new");
          baseParams.set("limit", "100");
          endpoint = `https://www.reddit.com/r/${subreddit}/search.json?${baseParams}`;
          break;

        case "hot":
          baseParams.set("limit", "100");
          endpoint = `https://www.reddit.com/r/${subreddit}/hot.json?${baseParams}`;
          break;

        case "week":
          baseParams.set("limit", "100");
          endpoint = `https://www.reddit.com/r/${subreddit}/new.json?${baseParams}`;
          break;

        case "all":
          baseParams.set("limit", "25");
          baseParams.set("t", timeFilter);
          endpoint = `https://www.reddit.com/r/${subreddit}/top.json?${baseParams}`;
          break;

        default:
          baseParams.set("limit", "100");
          endpoint = `https://www.reddit.com/r/${subreddit}/new.json?${baseParams}`;
      }

      return `${endpoint}`;
    },
    [subreddit, timeFilter]
  );

  const fetchPosts = useCallback(
    async (afterParam: string | null = null) => {
      try {
        // Abort the request if it takes longer than 15 seconds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(buildRedditUrl(afterParam), {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();

        const newPosts = parseRedditListing(data);

        // Append on pagination, replace on fresh load
        setPosts((prev) => (afterParam ? [...prev, ...newPosts] : newPosts));
        setAfter(data.data.after);

        // Show "Load More" if we got an after token
        // OR if we received a full page of results (25+ posts suggests more might exist)
        if (newPosts.length === 0 && afterParam !== null) {
          // Empty response on pagination attempt - no more posts
          setHasMore(false);
        } else {
          setHasMore(data.data.after !== null || newPosts.length >= 25);
        }
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        // Only attempt fallback on the initial load (not during pagination)
        if (!afterParam) {
          try {
            const fallback = await fetch(
              `${import.meta.env.BASE_URL}data/${fallbackFile[timeFilter]}`
            );
            const fallbackData = await fallback.json();
            const fallbackPosts = parseRedditListing(fallbackData);
            setPosts(fallbackPosts);
            setHasMore(false);
            setIsFallback(true);
          } catch {
            setError(
              err instanceof Error ? err.message : "Failed to load posts"
            );
          }
        } else {
          setError(err instanceof Error ? err.message : "Failed to load posts");
        }
        setLoading(false);
      }
    },
    [buildRedditUrl, timeFilter]
  );

  useEffect(() => {
    // Reset state when subreddit or timeFilter changes
    setPosts([]);
    setLoading(true);
    setError(null);
    setAfter(null);
    setHasMore(true);
    setIsFallback(false);
    setUserPosts(null);
    fetchPosts();
  }, [fetchPosts]);

  const loadMore = () => {
    if (hasMore && after !== null) {
      fetchPosts(after);
    }
  };

  // Replace the gallery with a Reddit listing the user pasted/uploaded.
  // Throws (with a user-friendly message) on invalid JSON or shape so the
  // caller can surface it inline.
  const applyUserData = (rawJson: string) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawJson);
    } catch {
      throw new Error("That doesn't look like valid JSON");
    }
    const imported = parseRedditListing(parsed);
    setUserPosts(imported);
    setHasMore(false);
    setError(null);
  };

  // Drop imported data and fall back to the most recently fetched posts.
  const clearUserData = () => setUserPosts(null);

  return {
    posts: userPosts ?? posts,
    loading,
    error,
    hasMore,
    isFallback,
    isUserData: userPosts !== null,
    loadMore,
    applyUserData,
    clearUserData,
  };
}
