import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Eyebrow } from "@/components/ui/Container";
import { FosterForm } from "@/components/forms/FosterForm";
import { IconCheck } from "@/components/ui/Icons";
import { getContentBlocks, block } from "@/data/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ideiglenes befogadó leszek",
  description: "Adj otthont egy cicának a gyógyulás vagy a gazdikeresés idejére — így leszel ideiglenes befogadó.",
  alternates: { canonical: "/ideiglenes-befogado" },
};

const faqDefaults = [
  {
    question: "Mi az ideiglenes befogadás?",
    answer:
      "Otthont adsz egy cicának egy meghatározott, előre egyeztetett időszakra — amíg gyógyul, felnő, vagy amíg gazdit talál. Nem örökbefogadás, a cica továbbra is a szervezet felügyelete alatt marad.",
  },
  {
    question: "Milyen cicáknak van erre szükségük?",
    answer:
      "Leggyakrabban kölyköknek, gyógyulófélben lévő vagy félénk cicáknak, illetve olyanoknak, akiknek egyszerűen nincs még hely az állandó befogadóhelyünkön.",
  },
  {
    question: "Mire számíthatsz befogadóként?",
    answer:
      "Napi gondoskodásra, etetésre, alomtisztításra, és arra, hogy figyeld a cica állapotát, viselkedését. Cserébe az egyik legközvetlenebb élményt kapod: látod, ahogy egy cica sorsa jobbra fordul.",
  },
  {
    question: "Mit biztosít a szervezet?",
    answer:
      "Az állatorvosi költségeket, a szükséges felszerelést (pl. szállítóbox, alom, adott esetben táp) és folyamatos szakmai támogatást a befogadás alatt.",
  },
  {
    question: "Milyen időtartamra van szükség?",
    answer:
      "Ez cicánként eltérő — pár héttől néhány hónapig terjedhet. Ezt mindig előre egyeztetjük, és tartjuk a kapcsolatot a befogadás alatt.",
  },
];

export default async function FosterPage() {
  const blocks = await getContentBlocks();
  const faqs = faqDefaults.map((item, i) => ({
    question: block(blocks, `ideiglenes.faqs.${i}.question`, item.question),
    answer: block(blocks, `ideiglenes.faqs.${i}.answer`, item.answer),
  }));

  return (
    <>
      <PageHeader
        eyebrow={block(blocks, "ideiglenes.header.eyebrow", "Csatlakozz")}
        title={block(blocks, "ideiglenes.header.title", "Adj otthont egy cicának — egy időre.")}
        description={block(
          blocks,
          "ideiglenes.header.description",
          "Az ideiglenes befogadás híd a mentés és az örökbefogadás között. Nem kell örökre vállalnod — csak addig, amíg szükség van rád."
        )}
      />

      <Section tone="white" className="pt-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {faqs.map((item, i) => (
            <div key={i} className="rounded-xl2 border border-ink-100 bg-cream-200 p-6">
              <h3 className="flex items-start gap-2 font-display text-lg font-semibold text-ink-900">
                <IconCheck className="mt-1 h-4 w-4 shrink-0 text-sage-600" />
                {item.question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" id="jelentkezes">
        <Eyebrow>{block(blocks, "ideiglenes.form.eyebrow", "Jelentkezés")}</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
          {block(blocks, "ideiglenes.form.title", "Befogadó leszek")}
        </h2>
        <div className="mt-8 max-w-2xl rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <FosterForm
            successTitle={block(blocks, "forms.foster.success_title", "Köszönjük a jelentkezésedet!")}
            successDescription={block(
              blocks,
              "forms.foster.success_description",
              "Nagyon sokat jelent, hogy otthont adnál egy rászoruló cicának. Hamarosan jelentkezünk a részletekkel."
            )}
          />
        </div>
      </Section>
    </>
  );
}
