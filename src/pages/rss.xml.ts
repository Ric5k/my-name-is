import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => {
    // draft 記事を除外
    return !data.draft;
  });

  return rss({
    title: "My Kanagawa Portfolio Blog",
    description: "Notes on web development, Astro, and learning in public.",
    site: "https://your-domain.com", // ← 必ず本番URLに
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description ?? "",
        pubDate: post.data.date,
        link: `/blog/${post.id}/`,
      })),
  });
}
