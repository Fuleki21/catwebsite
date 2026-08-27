import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Container";
import { StoryCard } from "@/components/stories/StoryCard";
import { getStories } from "@/data/stories";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Mentéseink és történeteink",
  description: "Valós mentési történetek a Cat TNR Fehérvártól — az utcáról az új otthonig.",
  alternates: { canonical: "/mentesek" },
};

export default async function StoriesPage() {
  const stories = await getStories();
  return (
    <>
      <PageHeader
        eyebrow="Történeteink"
        title="Mentéseink"
        description="Minden cica története más — de mindegyik ugyanott kezdődik: valaki észrevette, és nem nézte tovább tétlenül."
      />
      <Section tone="white" className="pt-0">
        {stories.length === 0 ? (
          <p className="text-ink-400">Hamarosan új történetekkel jelentkezünk.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
