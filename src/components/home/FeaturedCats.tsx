import { Section, Eyebrow } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { CatCard } from "@/components/cats/CatCard";
import { getFeaturedCats } from "@/data/cats";

export async function FeaturedCats() {
  const cats = (await getFeaturedCats()).slice(0, 6);
  if (cats.length === 0) return null;
  return (
    <Section tone="cream">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>Örökbefogadás</Eyebrow>
          <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">Ők most gazdit keresnek</h2>
        </div>
        <LinkButton href="/macskak" variant="ghost" className="shrink-0">
          Összes gazdit kereső cica →
        </LinkButton>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((cat) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
    </Section>
  );
}
