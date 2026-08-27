import { Section, Eyebrow } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ImageTile } from "@/components/ui/PhotoTile";
import { getFeaturedStory } from "@/data/stories";
import { getContentBlocks, block } from "@/data/content";

const timeline = ["Előtte", "Mentés", "Gyógyulás", "Új otthon"];

export async function StoryHighlight() {
  const [story, blocks] = await Promise.all([getFeaturedStory(), getContentBlocks()]);
  if (!story) return null;
  const eyebrow = block(blocks, "home.story_highlight.eyebrow", "Egy mentés története");

  return (
    <Section tone="sage">
      <Eyebrow className="text-cream-100/80">{eyebrow}</Eyebrow>
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
          <ImageTile
            src={story.images[0] ?? `${story.slug}-a`}
            aspect="aspect-[4/5]"
            className="col-span-2 sm:col-span-1"
          />
          <div className="grid gap-4">
            <ImageTile src={story.images[1] ?? `${story.slug}-b`} aspect="aspect-square" />
            <ImageTile src={story.images[2] ?? `${story.slug}-c`} aspect="aspect-square" />
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
