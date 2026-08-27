import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const stepLabels = ["Ismerkedj a cicákkal", "Töltsd ki a jelentkezési űrlapot", "Beszélgetünk", "Személyes találkozó", "Hazaviheted"];

const fields: ContentField[] = [
  { key: "orokbefogadas.header.eyebrow", label: "Felirat", sectionHeading: "Fejléc" },
  { key: "orokbefogadas.header.title", label: "Cím" },
  { key: "orokbefogadas.header.description", label: "Leírás", multiline: true },

  ...stepLabels.flatMap((label, i) => [
    {
      key: `orokbefogadas.steps.${i}.title`,
      label: `${i + 1}. lépés címe (${label})`,
      sectionHeading: i === 0 ? "Örökbefogadás lépései" : undefined,
    },
    { key: `orokbefogadas.steps.${i}.description`, label: `${i + 1}. lépés szövege`, multiline: true },
  ]),

  { key: "orokbefogadas.form.title", label: "Jelentkezési blokk címe", sectionHeading: "Jelentkezés" },
  { key: "orokbefogadas.form.intro", label: "Jelentkezési blokk bevezetője", multiline: true },
];

export default async function AdminOrokbefogadasPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Örökbefogadás menete oldal" />
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
