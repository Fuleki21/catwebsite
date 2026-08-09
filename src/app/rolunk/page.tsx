import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Eyebrow } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { IconHeart, IconUsers, IconCar, IconHome } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Rólunk",
  description: "Ismerd meg a Cat TNR Fehérvár közösségét — kik vagyunk, miért csináljuk, és hogyan dolgozunk.",
  alternates: { canonical: "/rolunk" },
};

const values = [
  { icon: IconHeart, title: "Minden élet számít", description: "Nem válogatunk aközött, kit érdemes segíteni — minden rászoruló cica esélyt kap." },
  { icon: IconUsers, title: "Közösségi erő", description: "Amit egyedül nem tudnánk megoldani, azt önkéntesekkel, befogadókkal, támogatókkal együtt igen." },
  { icon: IconHome, title: "Felelős gazdásítás", description: "Nem csak kihelyezünk — utánkövetjük, hogy tartós, jó otthonra találjanak a cicák." },
  { icon: IconCar, title: "Gyors reagálás", description: "Egy bejelentett vészhelyzetnél minden perc számít — igyekszünk azonnal cselekedni." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rólunk"
        title="Egy maroknyi ember, akiknek fontosak a gazdátlan cicák"
        description="Nem egy nagy szervezet vagyunk irodával és sok alkalmazottal — hétköznapi emberek, akik szabadidejükben mentenek, gondoznak és gazdit keresnek."
      />

      <Section tone="white" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <PlaceholderImage seed="rolunk-csapat" aspect="aspect-[4/3]" label="Csapatfotó helye" />
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">Kik vagyunk?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                A Cat TNR Fehérvár egy Székesfehérváron és környékén tevékenykedő közösségi kezdeményezés, amely
                gazdátlan, kóbor és rászoruló cicák mentésével, ivartalanításával, gondozásával és gazdásításával
                foglalkozik.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <PlaceholderBadge />
                <p className="text-xs text-ink-400">{siteConfig.legalStatusNote}</p>
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">Miért csináljuk?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Mert minden nap találkozunk olyan cicákkal, akiknek senki nem segítene, ha mi nem tesszük meg.
                A cél egyszerű: kevesebb szenvedés, több biztonságos, szerető otthon.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900">Hogyan dolgozunk?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Bejelentésekre reagálunk, TNR-akciókat (befogás–ivartalanítás–visszaengedés/gazdásítás)
                szervezünk, ideiglenes befogadóknál helyezzük el a rászorulókat, és alaposan felmérjük a
                jelentkező gazdikat, mielőtt egy cica hazakerül.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <Eyebrow>Amiben hiszünk</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">Az értékeink</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col gap-3 rounded-xl2 bg-white p-6 shadow-card">
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
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Miért van szükségünk rád?</h2>
        <p className="mx-auto mt-3 max-w-xl text-cream-100/70">
          Önkéntesek, befogadók és támogatók nélkül a legtöbb bejelentett cicának nem tudnánk segíteni.
          Bármilyen kis szerep sokat számít.
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
