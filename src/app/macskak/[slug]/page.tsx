import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCats, getCatBySlug } from "@/data/cats";
import { Section } from "@/components/ui/Container";
import { ImageTile } from "@/components/ui/PhotoTile";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { IconCheck, IconX } from "@/components/ui/Icons";
import { CatCard } from "@/components/cats/CatCard";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cats = await getCats();
  return cats.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = await getCatBySlug(params.slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — gazdit keres`,
    description: cat.shortDescription,
    alternates: { canonical: `/macskak/${cat.slug}` },
    openGraph: { title: `${cat.name} — Cat TNR Fehérvár`, description: cat.shortDescription },
  };
}

function TriBoolRow({ label, value }: { label: string; value: boolean | "ismeretlen" }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-100 py-3 text-sm last:border-0">
      <span className="text-ink-500">{label}</span>
      {value === "ismeretlen" ? (
        <span className="text-ink-300">Ismeretlen</span>
      ) : value ? (
        <span className="inline-flex items-center gap-1 font-semibold text-sage-600">
          <IconCheck className="h-4 w-4" /> Igen
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 font-semibold text-ink-300">
          <IconX className="h-4 w-4" /> Nem
        </span>
      )}
    </div>
  );
}

export default async function CatDetailPage({ params }: { params: { slug: string } }) {
  const cat = await getCatBySlug(params.slug);
  if (!cat) notFound();

  const allCats = await getCats();
  const similar = allCats.filter((c) => c.slug !== cat.slug && c.status === "gazdit_keres").slice(0, 3);

  return (
    <>
      <Section tone="cream" className="pb-10 pt-10">
        <nav className="mb-6 text-sm text-ink-400">
          <Link href="/macskak" className="focus-ring hover:text-marmalade-600">
            Gazdira váró cicák
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink-700">{cat.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="grid grid-cols-2 gap-3">
              <ImageTile
                src={cat.images[0] ?? cat.slug}
                aspect="aspect-[4/5]"
                className="col-span-2 sm:col-span-1"
                label={`${cat.name} fő fotója`}
                priority
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                {(cat.images.length > 1 ? cat.images.slice(1) : [`${cat.slug}-alt-1`, `${cat.slug}-alt-2`]).map(
                  (img, i) => (
                    <ImageTile key={img + i} src={img} aspect="aspect-square" />
                  )
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <StatusBadge status={cat.status} />
              <span className="text-sm text-ink-400">Nálunk {formatDate(cat.arrivalDate)} óta</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">{cat.name}</h1>
            <p className="mt-2 text-ink-500">
              {cat.gender === "nőstény" ? "Nőstény" : "Kandúr"} · {cat.ageLabel}
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink-600">{cat.shortDescription}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {cat.temperament.map((trait) => (
                <Badge key={trait} tone="marmalade">
                  {trait}
                </Badge>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {cat.status === "gazdit_keres" ? (
                <LinkButton href={`/orokbefogadas?cat=${cat.slug}#jelentkezes`} size="lg">
                  Érdekel ez a cica
                </LinkButton>
              ) : (
                <LinkButton href="/macskak" size="lg" variant="outline">
                  Nézz meg más gazdit kereső cicát
                </LinkButton>
              )}
              <LinkButton href="/kapcsolat" size="lg" variant="ghost">
                Kérdésem van
              </LinkButton>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" className="py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">Története</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{cat.story}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">Egészségügyi információk</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{cat.health}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">Milyen otthont keres?</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{cat.seekingHome}</p>
            </div>
          </div>

          <div className="rounded-xl2 border border-ink-100 bg-cream-200 p-6">
            <h2 className="font-display text-lg font-semibold text-ink-900">Gyors adatok</h2>
            <div className="mt-2">
              <TriBoolRow label="Ivartalanított" value={cat.neutered} />
              <TriBoolRow label="Oltott" value={cat.vaccinated} />
              <TriBoolRow label="Chipes" value={cat.chipped} />
              <TriBoolRow label="Kizárólag lakásba" value={cat.indoorOnly} />
              <TriBoolRow label="Gyerekekkel jól kijön" value={cat.goodWithChildren} />
              <TriBoolRow label="Más cicákkal jól kijön" value={cat.goodWithCats} />
              <TriBoolRow label="Kutyákkal jól kijön" value={cat.goodWithDogs} />
            </div>
          </div>
        </div>
      </Section>

      {similar.length > 0 && (
        <Section tone="cream">
          <h2 className="font-display text-2xl font-semibold text-ink-900">Más cicák, akik gazdit keresnek</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((c) => (
              <CatCard key={c.id} cat={c} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
