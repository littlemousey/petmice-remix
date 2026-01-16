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
  timeFilter: "week" | "all" | "rainbow" | "hot" | "cute-mouse-media" = "week"
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
            return `https://corsproxy.io/?${encodeURIComponent(`https://www.reddit.com/r/${subreddit}/search.json?${baseParams}`)}`;
          } else if (timeFilter === "cute-mouse-media") {
            // Use search API with Cute Mouse Media flair filter
            baseParams.set("q", 'flair:"Cute Mouse Media"');
            baseParams.set("restrict_sr", "1");
            baseParams.set("sort", "new");
            baseParams.set("limit", "100");
            if (afterParam) baseParams.set("after", afterParam);
            return `https://corsproxy.io/?${encodeURIComponent(`https://www.reddit.com/r/${subreddit}/search.json?${baseParams}`)}`;
          } else if (timeFilter === "hot") {
            // Use hot posts API
            baseParams.set("limit", "100");
            if (afterParam) baseParams.set("after", afterParam);
            return `https://corsproxy.io/?${encodeURIComponent(`https://www.reddit.com/r/${subreddit}/hot.json?${baseParams}`)}`;
          }
          if (timeFilter === "week") {
            baseParams.set("limit", "100");
            // Use /new.json to get latest posts
            if (afterParam) baseParams.set("after", afterParam);
            return `https://corsproxy.io/?${encodeURIComponent(`https://www.reddit.com/r/${subreddit}/new.json?${baseParams}`)}`;
          } else {
            // timeFilter === "all" - get top 25 posts
            baseParams.set("limit", "25");
            baseParams.set("t", timeFilter);
            if (afterParam) baseParams.set("after", afterParam);
            return `https://corsproxy.io/?${encodeURIComponent(`https://www.reddit.com/r/${subreddit}/top.json?${baseParams}`)}`;
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

        interface RedditChild {
          data: RedditPost;
          kind: string;
        }
        const newPosts: RedditPost[] = data.data.children.map(
          (child: RedditChild) => child.data
        );

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
