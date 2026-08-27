import Link from "next/link";
import { getStories } from "@/data/stories";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteStory } from "./actions";
import { formatDate } from "@/lib/utils";

export default async function AdminStoriesPage() {
  const stories = await getStories();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-ink-400 hover:text-marmalade-600">
            ← Admin főoldal
          </Link>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Mentési történetek</h1>
        </div>
        <LogoutButton />
      </div>

      <Link
        href="/admin/tortenetek/uj"
        className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-marmalade-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-marmalade-600"
      >
        + Új történet hozzáadása
      </Link>

      <div className="mt-8 flex flex-col gap-3">
        {stories.length === 0 && (
          <p className="text-sm text-ink-400">Még nincs egy történet sem az adatbázisban.</p>
        )}
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl2 border border-ink-100 bg-white p-4"
          >
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">
                {story.title}
                {story.featured && (
                  <span className="ml-2 rounded-full bg-marmalade-100 px-2 py-0.5 text-xs font-semibold text-marmalade-700">
                    Kiemelt
                  </span>
                )}
              </p>
              <p className="text-sm text-ink-400">
                {formatDate(story.date)} · /mentesek/{story.slug}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/tortenetek/${story.id}`}
                className="focus-ring rounded-full border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 hover:border-marmalade-300"
              >
                Szerkesztés
              </Link>
              <DeleteButton
                action={deleteStory.bind(null, story.id, story.slug, story.images)}
                confirmText={`Biztosan törlöd a(z) "${story.title}" történetet? Ez nem vonható vissza.`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
