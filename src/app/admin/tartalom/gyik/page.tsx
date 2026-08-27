import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const fields: ContentField[] = [
  { key: "gyik.header.eyebrow", label: "Felirat", sectionHeading: "Fejléc" },
  { key: "gyik.header.title", label: "Cím" },
  { key: "gyik.header.description", label: "Leírás", multiline: true },
];

export default async function AdminGyikHeaderPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="GYIK oldal fejléce" />
      <p className="mt-1 text-sm text-ink-400">
        A konkrét kérdés-válasz párokat a „GYIK-kérdések” menüpontban tudod hozzáadni, szerkeszteni vagy törölni
        (admin főoldal).
      </p>
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
