import { NextResponse } from "next/server";

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const CACHE_DURATION = 60 * 60; // 1 hour in seconds

let cachedData: { posts: InstagramPost[]; timestamp: number } | null = null;

interface InstagramPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

export async function GET() {
  // Return cached data if fresh
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION * 1000) {
    return NextResponse.json({ posts: cachedData.posts });
  }

  if (!INSTAGRAM_TOKEN) {
    return NextResponse.json(
      { error: "Instagram access token not configured", posts: [] },
      { status: 200 }
    );
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&limit=8&access_token=${INSTAGRAM_TOKEN}`,
      { next: { revalidate: CACHE_DURATION } }
    );

    if (!res.ok) {
      throw new Error(`Instagram API error: ${res.status}`);
    }

    const data = await res.json();
    const posts: InstagramPost[] = (data.data || []).map((post: InstagramPost) => ({
      id: post.id,
      media_type: post.media_type,
      media_url: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
      permalink: post.permalink,
      caption: post.caption?.slice(0, 100) || "",
      timestamp: post.timestamp,
    }));

    cachedData = { posts, timestamp: Date.now() };

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("Instagram fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch", posts: [] }, { status: 200 });
  }
}
