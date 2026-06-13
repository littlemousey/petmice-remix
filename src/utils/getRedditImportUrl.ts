import type { ViewType } from "../types/reddit";

interface RedditImportUrl {
  url: string;
  label: string;
}

const SUBREDDIT = "petmice";

export function getRedditImportUrl(view: ViewType): RedditImportUrl {
  switch (view) {
    case "rainbow":
      return {
        url: `https://www.reddit.com/r/${SUBREDDIT}/search.json?q=flair%3A%22Rainbow+Bridge%22&restrict_sr=1&sort=new&limit=100&raw_json=1`,
        label: `r/${SUBREDDIT}/search.json (Rainbow Bridge)`,
      };
    case "cute-mouse-media":
      return {
        url: `https://www.reddit.com/r/${SUBREDDIT}/search.json?q=flair_name%3A%22Cute+Mouse+Media%22&restrict_sr=1&sort=new&limit=100&raw_json=1`,
        label: `r/${SUBREDDIT}/search.json (Cute Mouse Media)`,
      };
    case "all":
      return {
        url: `https://www.reddit.com/r/${SUBREDDIT}/top.json?limit=25&t=all&raw_json=1`,
        label: `r/${SUBREDDIT}/top.json`,
      };
    case "week":
      return {
        url: `https://www.reddit.com/r/${SUBREDDIT}/new.json?limit=100&raw_json=1`,
        label: `r/${SUBREDDIT}/new.json`,
      };
    case "hot":
    default:
      return {
        url: `https://www.reddit.com/r/${SUBREDDIT}/hot.json?limit=100&raw_json=1`,
        label: `r/${SUBREDDIT}/hot.json`,
      };
  }
}
