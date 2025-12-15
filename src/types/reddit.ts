export interface RedditPost {
  id: string;
  title: string;
  url: string;
  post_hint?: string;
  is_gallery?: boolean;
  thumbnail?: string;
  link_flair_text?: string;
  preview?: {
    images: Array<{
      source: { url: string; width: number; height: number };
    }>;
  };
  media?: {
    reddit_video?: { fallback_url: string };
  };
  media_metadata?: {
    [key: string]: { s?: { u?: string } };
  };
}
