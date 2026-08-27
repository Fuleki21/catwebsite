import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Eyebrow } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { getContentBlocks, block } from "@/data/content";
import { IconHeart, IconUsers, IconCar, IconHome } from "@/components/ui/Icons";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Rólunk",
  description: "Ismerd meg a Cat TNR Fehérvár közösségét — kik vagyunk, miért csináljuk, és hogyan dolgozunk.",
  alternates: { canonical: "/rolunk" },
};

const valueMeta = [
  { icon: IconHeart, defaultTitle: "Minden élet számít", defaultDescription: "Nem válogatunk aközött, kit érdemes segíteni — minden rászoruló cica esélyt kap." },
  { icon: IconUsers, defaultTitle: "Közösségi erő", defaultDescription: "Amit egyedül nem tudnánk megoldani, azt önkéntesekkel, befogadókkal, támogatókkal együtt igen." },
  { icon: IconHome, defaultTitle: "Felelős gazdásítás", defaultDescription: "Nem csak kihelyezünk — utánkövetjük, hogy tartós, jó otthonra találjanak a cicák." },
  { icon: IconCar, defaultTitle: "Gyors reagálás", defaultDescription: "Egy bejelentett vészhelyzetnél minden perc számít — igyekszünk azonnal cselekedni." },
];

export default async function AboutPage() {
  const blocks = await getContentBlocks();
  const values = valueMeta.map((v, i) => ({
    icon: v.icon,
    title: block(blocks, `rolunk.values.${i}.title`, v.defaultTitle),
    description: block(blocks, `rolunk.values.${i}.description`, v.defaultDescription),
  }));

  return (
    <>
      <PageHeader
        eyebrow={block(blocks, "rolunk.header.eyebrow", "Rólunk")}
        title={block(blocks, "rolunk.header.title", "Egy maroknyi ember, akiknek fontosak a gazdátlan cicák")}
        description={block(
          blocks,
          "rolunk.header.description",
          "Nem egy nagy szervezet vagyunk irodával és sok alkalmazottal — hétköznapi emberek, akik szabadidejükben mentenek, gondoznak és gazdit keresnek."
        )}
      />

      <Section tone="white" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <PlaceholderImage seed="rolunk-csapat" aspect="aspect-[4/3]" label="Csapatfotó helye" />
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                {block(blocks, "rolunk.who.title", "Kik vagyunk?")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {block(
                  blocks,
                  "rolunk.who.text",
                  "A Cat TNR Fehérvár egy Székesfehérváron és környékén tevékenykedő közösségi kezdeményezés, amely gazdátlan, kóbor és rászoruló cicák mentésével, ivartalanításával, gondozásával és gazdásításával foglalkozik."
                )}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <PlaceholderBadge />
                <p className="text-xs text-ink-400">{block(blocks, "site.legal_status_note", siteConfig.legalStatusNote)}</p>
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                {block(blocks, "rolunk.why.title", "Miért csináljuk?")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {block(
                  blocks,
                  "rolunk.why.text",
                  "Mert minden nap találkozunk olyan cicákkal, akiknek senki nem segítene, ha mi nem tesszük meg. A cél egyszerű: kevesebb szenvedés, több biztonságos, szerető otthon."
                )}
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                {block(blocks, "rolunk.how.title", "Hogyan dolgozunk?")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {block(
                  blocks,
                  "rolunk.how.text",
                  "Bejelentésekre reagálunk, TNR-akciókat (befogás–ivartalanítás–visszaengedés/gazdásítás) szervezünk, ideiglenes befogadóknál helyezzük el a rászorulókat, és alaposan felmérjük a jelentkező gazdikat, mielőtt egy cica hazakerül."
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <Eyebrow>{block(blocks, "rolunk.values.eyebrow", "Amiben hiszünk")}</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
          {block(blocks, "rolunk.values.title", "Az értékeink")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-xl2 bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marmalade-100 text-marmalade-600">
                <value.icon className="h-5 w-5" />
              </span>
              <p className="font-display font-semibold text-ink-900">{value.title}</p>
              <p className="text-sm leading-relaxed text-ink-500">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink" className="text-center">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          {block(blocks, "rolunk.cta.title", "Miért van szükségünk rád?")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-cream-100/70">
          {block(
            blocks,
            "rolunk.cta.text",
            "Önkéntesek, befogadók és támogatók nélkül a legtöbb bejelentett cicának nem tudnánk segíteni. Bármilyen kis szerep sokat számít."
          )}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <LinkButton href="/onkentes" size="lg">
            Önkéntes leszek
          </LinkButton>
          <LinkButton
            href="/segits"
            variant="outline"
            size="lg"
            className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-ink-900"
          >
            Támogatok
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
