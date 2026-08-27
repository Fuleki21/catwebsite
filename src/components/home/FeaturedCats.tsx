import { Section, Eyebrow } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { CatCard } from "@/components/cats/CatCard";
import { getFeaturedCats } from "@/data/cats";
import { getContentBlocks, block } from "@/data/content";

export async function FeaturedCats() {
  const [cats, blocks] = await Promise.all([getFeaturedCats(), getContentBlocks()]);
  const featured = cats.slice(0, 6);
  if (featured.length === 0) return null;
  const eyebrow = block(blocks, "home.featured_cats.eyebrow", "Örökbefogadás");
  const title = block(blocks, "home.featured_cats.title", "Ők most gazdit keresnek");
  return (
    <Section tone="cream">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">{title}</h2>
        </div>
        <LinkButton href="/macskak" variant="ghost" className="shrink-0">
          Összes gazdit kereső cica →
        </LinkButton>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
    </Section>
  );
}
