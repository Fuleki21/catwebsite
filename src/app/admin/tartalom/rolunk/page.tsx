import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const valueLabels = ["Minden élet számít", "Közösségi erő", "Felelős gazdásítás", "Gyors reagálás"];

const fields: ContentField[] = [
  { key: "rolunk.header.eyebrow", label: "Felirat", sectionHeading: "Fejléc" },
  { key: "rolunk.header.title", label: "Cím" },
  { key: "rolunk.header.description", label: "Leírás", multiline: true },

  { key: "rolunk.who.title", label: "Cím", sectionHeading: "„Kik vagyunk?” blokk" },
  { key: "rolunk.who.text", label: "Szöveg", multiline: true },

  { key: "rolunk.why.title", label: "Cím", sectionHeading: "„Miért csináljuk?” blokk" },
  { key: "rolunk.why.text", label: "Szöveg", multiline: true },

  { key: "rolunk.how.title", label: "Cím", sectionHeading: "„Hogyan dolgozunk?” blokk" },
  { key: "rolunk.how.text", label: "Szöveg", multiline: true },

  { key: "rolunk.values.eyebrow", label: "Felirat", sectionHeading: "Értékeink szekció" },
  { key: "rolunk.values.title", label: "Cím" },
  ...valueLabels.flatMap((label, i) => [
    { key: `rolunk.values.${i}.title`, label: `${i + 1}. érték címe (${label})` },
    { key: `rolunk.values.${i}.description`, label: `${i + 1}. érték szövege`, multiline: true },
  ]),

  { key: "rolunk.cta.title", label: "Cím", sectionHeading: "Záró blokk" },
  { key: "rolunk.cta.text", label: "Szöveg", multiline: true },
];

export default async function AdminRolunkPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Rólunk oldal" />
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
