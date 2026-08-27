import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryById } from "@/data/stories";
import { getCats } from "@/data/cats";
import { StoryForm } from "@/components/admin/StoryForm";
import { updateStory } from "../actions";

export default async function EditStoryPage({ params }: { params: { id: string } }) {
  const [story, cats] = await Promise.all([getStoryById(params.id), getCats()]);
  if (!story) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/tortenetek" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← Mentési történetek
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">{story.title} szerkesztése</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <StoryForm action={updateStory} initial={story} catOptions={cats.map((c) => ({ slug: c.slug, name: c.name }))} />
      </div>
    </div>
  );
}
