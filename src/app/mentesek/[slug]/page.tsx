import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { stories, getStoryBySlug } from "@/data/stories";
import { getCatBySlug } from "@/data/cats";
import { Section, Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const story = getStoryBySlug(params.slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `/mentesek/${story.slug}` },
  };
}

const stageLabels: Record<string, string> = {
  utcarol: "Az utcáról",
  mentes: "Mentés",
  gyogyulas: "Gyógyulás",
  uj_otthon: "Új otthon",
};

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug);
  if (!story) notFound();

  const relatedCat = story.catSlug ? getCatBySlug(story.catSlug) : undefined;

  return (
    <>
      <Section tone="cream" className="pb-10 pt-10">
        <Container className="max-w-3xl">
          <nav className="mb-6 text-sm text-ink-400">
            <Link href="/mentesek" className="focus-ring hover:text-marmalade-600">
              Történeteink
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-700">{story.title}</span>
          </nav>
          <div className="flex items-center gap-3">
            <Badge tone="sage">{stageLabels[story.stage]}</Badge>
            <span className="text-sm text-ink-400">{formatDate(story.date)}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl">
            {story.title}
          </h1>
          <p className="mt-4 text-lg text-ink-500">{story.excerpt}</p>
        </Container>
      </Section>

      <Section tone="white" className="pt-0">
        <Container className="max-w-3xl">
          <div className="grid grid-cols-3 gap-3">
            {story.images.map((img) => (
              <PlaceholderImage key={img} seed={img} aspect="aspect-square" />
            ))}
          </div>
          <div className="prose prose-ink mt-10 flex flex-col gap-5 text-base leading-relaxed text-ink-700">
            {story.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {relatedCat && (
            <div className="mt-10 flex items-center justify-between rounded-xl2 border border-ink-100 bg-cream-200 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-ink-300">A történet cicája</p>
                <p className="font-display text-lg font-semibold text-ink-900">{relatedCat.name}</p>
              </div>
              <LinkButton href={`/macskak/${relatedCat.slug}`} size="sm">
                Adatlap megtekintése
              </LinkButton>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3 border-t border-ink-100 pt-8">
            <LinkButton href="/mentesek" variant="outline">
              Több mentési történet
            </LinkButton>
            <LinkButton href="/segits" variant="primary">
              Segítek a következő mentésben
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
