import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const fields: ContentField[] = [
  { key: "tamogatoink.header.eyebrow", label: "Felirat", sectionHeading: "Fejléc" },
  { key: "tamogatoink.header.title", label: "Cím" },
  { key: "tamogatoink.header.intro", label: "Bevezető szöveg", multiline: true },

  { key: "tamogatoink.list.title", label: "Cím", sectionHeading: "Támogatók listája" },

  { key: "tamogatoink.cta.title", label: "Cím", sectionHeading: "„Legyél te is a támogatóink egyike” szekció" },
  { key: "tamogatoink.cta.text", label: "Szöveg", multiline: true },
  { key: "tamogatoink.cta.button_text", label: "Gomb szövege" },
  { key: "tamogatoink.cta.button_url", label: "Gomb URL-je", hint: "Belső link (pl. /kapcsolat) vagy teljes URL." },
];

export default async function AdminTamogatoinkPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Támogatóink oldal" />
      <p className="mt-1 text-sm text-ink-400">
        Maguk a támogatók (pl. Natural Pet Care System) külön menüpontban kezelhetők: admin főoldal → „Támogatóink”.
      </p>
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
