import { supabase } from "@/lib/supabase";
import { RescueStory } from "./types";

type StoryRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[] | null;
  cat_slug: string | null;
  date: string;
  featured: boolean;
  stage: RescueStory["stage"];
  images: string[] | null;
};

function mapRow(row: StoryRow): RescueStory {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content ?? [],
    catSlug: row.cat_slug ?? undefined,
    date: row.date,
    featured: row.featured,
    stage: row.stage,
    images: row.images ?? [],
  };
}

/** Az összes mentési történet, legújabb elöl. */
export async function getStories(): Promise<RescueStory[]> {
  const { data, error } = await supabase.from("stories").select("*").order("date", { ascending: false });
  if (error) {
    console.error("[getStories] Supabase hiba:", error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}

export async function getFeaturedStory(): Promise<RescueStory | undefined> {
  const stories = await getStories();
  return stories.find((story) => story.featured) ?? stories[0];
}

export async function getStoryBySlug(slug: string): Promise<RescueStory | undefined> {
  const { data, error } = await supabase.from("stories").select("*").eq("slug", slug).maybeSingle();
  if (error) {
    console.error("[getStoryBySlug] Supabase hiba:", error.message);
    return undefined;
  }
  return data ? mapRow(data) : undefined;
}

/** Admin felülethez: egyetlen történet lekérése id alapján (szerkesztéshez). */
export async function getStoryById(id: string): Promise<RescueStory | undefined> {
  const { data, error } = await supabase.from("stories").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[getStoryById] Supabase hiba:", error.message);
    return undefined;
  }
  return data ? mapRow(data) : undefined;
}
