import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const fields: ContentField[] = [
  { key: "ideiglenes.header.eyebrow", label: "Felirat", sectionHeading: "Fejléc" },
  { key: "ideiglenes.header.title", label: "Cím" },
  { key: "ideiglenes.header.description", label: "Leírás", multiline: true },

  ...[0, 1, 2, 3, 4].flatMap((i) => [
    {
      key: `ideiglenes.faqs.${i}.question`,
      label: `${i + 1}. kérdés`,
      sectionHeading: i === 0 ? "Gyakori kérdések (ezen az oldalon)" : undefined,
    },
    { key: `ideiglenes.faqs.${i}.answer`, label: `${i + 1}. válasz`, multiline: true },
  ]),

  { key: "ideiglenes.form.eyebrow", label: "Felirat", sectionHeading: "Jelentkezés" },
  { key: "ideiglenes.form.title", label: "Cím" },
];

export default async function AdminIdeiglenesPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Ideiglenes befogadó oldal" />
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
