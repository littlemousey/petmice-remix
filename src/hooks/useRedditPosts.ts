import { useState, useEffect, useCallback } from "react";
import type { RedditPost } from "../types/reddit";

interface UseRedditPostsResult {
  posts: RedditPost[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export function useRedditPosts(
  subreddit: string = "PetMice",
  timeFilter: "week" | "all" | "rainbow" = "week"
): UseRedditPostsResult {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(
    async (afterParam: string | null = null) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        // Build URL based on view type
        const buildUrl = (): string => {
          const baseParams = new URLSearchParams({ raw_json: "1" });

          if (timeFilter === "rainbow") {
            // Use search API with flair filter
            baseParams.set("q", 'flair:"Rainbow Bridge"');
            baseParams.set("restrict_sr", "1");
            baseParams.set("sort", "new");
            baseParams.set("limit", "100");
            if (afterParam) baseParams.set("after", afterParam);
            return `https://www.reddit.com/r/${subreddit}/search.json?${baseParams}`;
          } else {
            // Use top posts API
            const limit = timeFilter === "all" ? "25" : "100";
            baseParams.set("limit", limit);
            baseParams.set("t", timeFilter);
            if (afterParam) baseParams.set("after", afterParam);
            return `https://www.reddit.com/r/${subreddit}/top.json?${baseParams}`;
          }
        };

        const response = await fetch(buildUrl(), { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.data?.children) {
          throw new Error("Invalid response format");
        }

        const newPosts: RedditPost[] = data.data.children.map(
          (child: any) => child.data
        );

        setPosts((prev) => (afterParam ? [...prev, ...newPosts] : newPosts));
        setAfter(data.data.after);
        setHasMore(data.data.after !== null);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load posts");
        setLoading(false);
      }
    },
    [subreddit, timeFilter]
  );

  useEffect(() => {
    // Reset state when subreddit or timeFilter changes
    setPosts([]);
    setLoading(true);
    setError(null);
    setAfter(null);
    setHasMore(true);
    fetchPosts();
  }, [fetchPosts]);

  const loadMore = () => {
    if (hasMore && after !== null) {
      fetchPosts(after);
    }
  };

  return { posts, loading, error, hasMore, loadMore };
}
