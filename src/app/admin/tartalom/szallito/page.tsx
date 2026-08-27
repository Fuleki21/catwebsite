import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const useCaseLabels = ["Állatorvoshoz", "Ideiglenes helyre", "Új gazdihoz", "Mentéshez"];

const fields: ContentField[] = [
  { key: "szallito.header.eyebrow", label: "Felirat", sectionHeading: "Fejléc" },
  { key: "szallito.header.title", label: "Cím" },
  { key: "szallito.header.description", label: "Leírás", multiline: true },

  ...useCaseLabels.flatMap((label, i) => [
    {
      key: `szallito.usecases.${i}.title`,
      label: `${i + 1}. doboz címe (${label})`,
      sectionHeading: i === 0 ? "Felhasználási esetek" : undefined,
    },
    { key: `szallito.usecases.${i}.description`, label: `${i + 1}. doboz szövege`, multiline: true },
  ]),

  { key: "szallito.form.eyebrow", label: "Felirat", sectionHeading: "Jelentkezés" },
  { key: "szallito.form.title", label: "Cím" },
];

export default async function AdminSzallitoPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Szállító oldal" />
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
