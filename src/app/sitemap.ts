import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getCats } from "@/data/cats";
import { getStories } from "@/data/stories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cats, stories] = await Promise.all([getCats(), getStories()]);

  const staticRoutes = [
    "",
    "/macskak",
    "/orokbefogadas",
    "/segits",
    "/onkentes",
    "/ideiglenes-befogado",
    "/szallito",
    "/mentesek",
    "/rolunk",
    "/kapcsolat",
    "/gyik",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const catRoutes = cats.map((cat) => ({
    url: `${siteConfig.url}/macskak/${cat.slug}`,
    lastModified: new Date(cat.arrivalDate),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const storyRoutes = stories.map((story) => ({
    url: `${siteConfig.url}/mentesek/${story.slug}`,
    lastModified: new Date(story.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...catRoutes, ...storyRoutes];
}
