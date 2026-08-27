import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const fields: ContentField[] = [
  { key: "segits.header.eyebrow", label: "Felirat", sectionHeading: "Fejléc" },
  { key: "segits.header.title", label: "Cím" },
  { key: "segits.header.description", label: "Leírás", multiline: true },

  { key: "segits.transparency.eyebrow", label: "Felirat", sectionHeading: "„Mire használjuk a támogatást” szekció" },
  { key: "segits.transparency.title", label: "Cím" },

  { key: "segits.other_ways.title", label: "Cím", sectionHeading: "„Másképp is segíthetsz” szekció" },
  { key: "segits.other_ways.text", label: "Szöveg", multiline: true },
];

export default async function AdminSegitsPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Segíts oldal" />
      <p className="mt-1 text-sm text-ink-400">
        A „mire megy a támogatás” tételek listája külön menüpontban kezelhető (admin főoldal).
      </p>
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
