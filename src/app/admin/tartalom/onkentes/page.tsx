import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const opportunityLabels = [
  "Posztírás",
  "Fotózás",
  "Videózás",
  "Gazdikeresés",
  "Social media",
  "Cégek megkeresése",
  "Adománygyűjtés",
  "Kapcsolattartás",
  "Események",
];

const fields: ContentField[] = [
  { key: "onkentes.header.eyebrow", label: "Felirat", sectionHeading: "Fejléc" },
  { key: "onkentes.header.title", label: "Cím" },
  { key: "onkentes.header.description", label: "Leírás", multiline: true },

  ...opportunityLabels.flatMap((label, i) => [
    {
      key: `onkentes.opportunities.${i}.title`,
      label: `${i + 1}. lehetőség címe (${label})`,
      sectionHeading: i === 0 ? "Önkéntes lehetőségek" : undefined,
    },
    { key: `onkentes.opportunities.${i}.description`, label: `${i + 1}. lehetőség szövege`, multiline: true },
  ]),

  { key: "onkentes.why.eyebrow", label: "Felirat", sectionHeading: "„Miért fontos” szekció" },
  { key: "onkentes.why.title", label: "Cím" },
  { key: "onkentes.why.benefits.0", label: "1. előny" },
  { key: "onkentes.why.benefits.1", label: "2. előny" },
  { key: "onkentes.why.benefits.2", label: "3. előny" },
  { key: "onkentes.why.benefits.3", label: "4. előny" },

  { key: "onkentes.form.title", label: "Jelentkezési blokk címe", sectionHeading: "Jelentkezés" },
  { key: "onkentes.form.intro", label: "Jelentkezési blokk bevezetője", multiline: true },
];

export default async function AdminOnkentesPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Önkéntes oldal" />
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
