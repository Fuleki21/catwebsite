import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Eyebrow } from "@/components/ui/Container";
import { DonationSelector } from "@/components/support/DonationSelector";
import { helpBudgetItems } from "@/data/site";
import { IconBowl, IconHeart, IconHome, IconSyringe } from "@/components/ui/Icons";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Segíts / Támogass",
  description: "Támogasd a Cat TNR Fehérvár munkáját — már egy kisebb összeg is hatalmas segítség a mentett cicáknak.",
  alternates: { canonical: "/segits" },
};

const icons = [IconSyringe, IconSyringe, IconSyringe, IconSyringe, IconBowl, IconHome];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Segíts"
        title="Már egy kisebb összeg is hatalmas segítség."
        description="Támogatásod közvetlenül a mentett cicák ellátására megy — állatorvosi költségre, gyógyszerre, tápra, ivartalanításra."
      />

      <Section tone="white" className="pt-0">
        <div className="mx-auto max-w-xl">
          <DonationSelector />
        </div>
      </Section>

      <Section tone="cream">
        <Eyebrow>Átláthatóság</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">Mire használjuk a támogatást?</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {helpBudgetItems.map((item, index) => {
            const Icon = icons[index] ?? IconHeart;
            return (
              <div key={item.label} className="flex items-start gap-4 rounded-xl2 bg-white p-5 shadow-card">
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
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">Másképp is segíthetsz</h2>
        <p className="mx-auto mt-3 max-w-xl text-cream-100/70">
          Nem csak pénzzel lehet támogatni — az idő, a figyelem és egy megosztás is sokat számít.
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
