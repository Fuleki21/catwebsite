import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Eyebrow } from "@/components/ui/Container";
import { DonationSelector } from "@/components/support/DonationSelector";
import { getHelpBudgetItems } from "@/data/content";
import { getContentBlocks, block } from "@/data/content";
import { IconBowl, IconHeart, IconHome, IconSyringe } from "@/components/ui/Icons";
import { LinkButton } from "@/components/ui/Button";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Segíts / Támogass",
  description: "Támogasd a Cat TNR Fehérvár munkáját — már egy kisebb összeg is hatalmas segítség a mentett cicáknak.",
  alternates: { canonical: "/segits" },
};

const icons = [IconSyringe, IconSyringe, IconSyringe, IconSyringe, IconBowl, IconHome];

export default async function SupportPage() {
  const [blocks, helpBudgetItems] = await Promise.all([getContentBlocks(), getHelpBudgetItems()]);

  return (
    <>
      <PageHeader
        eyebrow={block(blocks, "segits.header.eyebrow", "Segíts")}
        title={block(blocks, "segits.header.title", "Már egy kisebb összeg is hatalmas segítség.")}
        description={block(
          blocks,
          "segits.header.description",
          "Támogatásod közvetlenül a mentett cicák ellátására megy — állatorvosi költségre, gyógyszerre, tápra, ivartalanításra."
        )}
      />

      <Section tone="white" className="pt-0">
        <div className="mx-auto max-w-xl">
          <DonationSelector />
        </div>
      </Section>

      <Section tone="cream">
        <Eyebrow>{block(blocks, "segits.transparency.eyebrow", "Átláthatóság")}</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
          {block(blocks, "segits.transparency.title", "Mire használjuk a támogatást?")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {helpBudgetItems.map((item, index) => {
            const Icon = icons[index] ?? IconHeart;
            return (
              <div key={item.id} className="flex items-start gap-4 rounded-xl2 bg-white p-5 shadow-card">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-marmalade-100 text-marmalade-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display font-semibold text-ink-900">{item.label}</p>
                  <p className="mt-1 text-sm text-ink-500">{item.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="ink" className="text-center">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          {block(blocks, "segits.other_ways.title", "Másképp is segíthetsz")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-cream-100/70">
          {block(blocks, "segits.other_ways.text", "Nem csak pénzzel lehet támogatni — az idő, a figyelem és egy megosztás is sokat számít.")}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <LinkButton href="/onkentes" variant="primary" size="lg">
            Önkéntes leszek
          </LinkButton>
          <LinkButton
            href="/ideiglenes-befogado"
            variant="outline"
            size="lg"
            className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-ink-900"
          >
            Ideiglenes befogadó leszek
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
