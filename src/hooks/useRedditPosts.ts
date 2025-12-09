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
  timeFilter: "week" | "all" = "week"
): UseRedditPostsResult {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(
    async (afterParam: string | null = null) => {
      try {
        const url = afterParam
          ? `https://www.reddit.com/r/${subreddit}/top.json?limit=25&t=${timeFilter}&after=${afterParam}&raw_json=1`
          : `https://www.reddit.com/r/${subreddit}/top.json?limit=25&t=${timeFilter}&raw_json=1`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok === false) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data?.children === undefined) {
          throw new Error("Invalid response format");
        }

        const newPosts = data.data.children.map((child: any) => child.data);

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
