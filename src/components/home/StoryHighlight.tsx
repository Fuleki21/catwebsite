import { Section, Eyebrow } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getFeaturedStory } from "@/data/stories";

const timeline = ["Előtte", "Mentés", "Gyógyulás", "Új otthon"];

export function StoryHighlight() {
  const story = getFeaturedStory();
  if (!story) return null;

  return (
    <Section tone="sage">
      <Eyebrow className="text-cream-100/80">Egy mentés története</Eyebrow>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">{story.title}</h2>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-cream-100/80">
            {timeline.map((step, index) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1">{step}</span>
                {index < timeline.length - 1 && <span className="text-cream-100/40">→</span>}
              </span>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-cream-100/85">{story.excerpt}</p>
          <LinkButton href={`/mentesek/${story.slug}`} variant="primary" size="lg" className="mt-8">
            Elolvasom a teljes történetet
          </LinkButton>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <PlaceholderImage seed={`${story.slug}-a`} aspect="aspect-[4/5]" className="col-span-2 sm:col-span-1" />
          <div className="grid gap-4">
            <PlaceholderImage seed={`${story.slug}-b`} aspect="aspect-square" />
            <PlaceholderImage seed={`${story.slug}-c`} aspect="aspect-square" />
          </div>
        </div>
      </div>
      <div className="mt-14 text-center">
        <LinkButton href="/mentesek" variant="outline" className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-sage-800">
          Több mentési történet
        </LinkButton>
      </div>
    </Section>
  );
}
