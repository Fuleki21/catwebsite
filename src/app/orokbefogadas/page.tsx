import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Eyebrow } from "@/components/ui/Container";
import { AdoptionForm } from "@/components/forms/AdoptionForm";
import { Accordion } from "@/components/ui/Accordion";
import { getAvailableCats } from "@/data/cats";
import { getAdoptionFaqItems, getContentBlocks, block } from "@/data/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Örökbefogadás menete",
  description: "Így zajlik egy örökbefogadás a Cat TNR Fehérvárnál — 4 egyszerű lépésben.",
  alternates: { canonical: "/orokbefogadas" },
};

const stepDefaults = [
  { title: "Ismerkedj a cicákkal", description: "Nézd át a gazdit kereső cicáink adatlapjait, és találd meg, aki hozzád illik." },
  { title: "Töltsd ki a jelentkezési űrlapot", description: "Meséld el, milyen otthont tudsz kínálni — ez segít abban, hogy jó párost találjunk." },
  { title: "Beszélgetünk", description: "Felvesszük veled a kapcsolatot telefonon vagy e-mailben, hogy megismerjük egymást." },
  { title: "Személyes találkozó", description: "Egyeztetünk egy időpontot, hogy találkozhass a kiválasztott cicával." },
  { title: "Hazaviheted", description: "Ha minden stimmel, papírmunka és rövid eligazítás után elkezdődhet a közös élet." },
];

export default async function AdoptionPage({ searchParams }: { searchParams: { cat?: string } }) {
  const [availableCats, adoptionFaq, blocks] = await Promise.all([
    getAvailableCats(),
    getAdoptionFaqItems(),
    getContentBlocks(),
  ]);
  const steps = stepDefaults.map((step, i) => ({
    title: block(blocks, `orokbefogadas.steps.${i}.title`, step.title),
    description: block(blocks, `orokbefogadas.steps.${i}.description`, step.description),
  }));

  return (
    <>
      <PageHeader
        eyebrow={block(blocks, "orokbefogadas.header.eyebrow", "Örökbefogadás")}
        title={block(blocks, "orokbefogadas.header.title", "Így zajlik egy örökbefogadás")}
        description={block(
          blocks,
          "orokbefogadas.header.description",
          "Nem bürokrácia — beszélgetés. Azért kérdezünk sokat, hogy biztosan jó otthonra találjon a választott cica."
        )}
      />

      <Section tone="white" className="pt-0">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col gap-3 rounded-xl2 border border-ink-100 bg-cream-200 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marmalade-500 font-display font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="font-display text-base font-semibold text-ink-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-ink-500">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" id="jelentkezes">
        <Eyebrow>Jelentkezés</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
          {block(blocks, "orokbefogadas.form.title", "Örökbefogadási jelentkezés")}
        </h2>
        <p className="mt-3 max-w-2xl text-ink-500">
          {block(
            blocks,
            "orokbefogadas.form.intro",
            "Töltsd ki az alábbi űrlapot — minél részletesebben mesélsz magatokról, annál gyorsabban tudunk visszajelezni."
          )}
        </p>
        <div className="mt-8 max-w-2xl rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <AdoptionForm
            cats={availableCats}
            preselectedSlug={searchParams.cat}
            successTitle={block(blocks, "forms.adoption.success_title", "Megkaptuk a jelentkezésedet!")}
            successDescription={block(
              blocks,
              "forms.adoption.success_description",
              "Köszönjük, hogy örökbefogadáson gondolkodsz. Hamarosan e-mailben vagy telefonon jelentkezünk egy rövid beszélgetésre."
            )}
          />
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>GYIK</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">Gyakori kérdések örökbefogadásról</h2>
        <div className="mt-8 max-w-3xl">
          <Accordion items={adoptionFaq} />
        </div>
      </Section>
    </>
  );
}
