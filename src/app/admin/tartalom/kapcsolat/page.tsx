import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const fields: ContentField[] = [
  { key: "kapcsolat.header.eyebrow", label: "Felirat", sectionHeading: "Fejléc" },
  { key: "kapcsolat.header.title", label: "Cím" },
  { key: "kapcsolat.header.description", label: "Leírás", multiline: true },
  { key: "kapcsolat.urgent_note", label: "Sürgősségi megjegyzés", multiline: true, sectionHeading: "Egyéb" },
];

export default async function AdminKapcsolatPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Kapcsolat oldal" />
      <p className="mt-1 text-sm text-ink-400">
        Az e-mail cím, telefonszám és közösségi média linkek az „Alapadatok” menüpontban módosíthatók.
      </p>
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
