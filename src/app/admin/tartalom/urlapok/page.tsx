import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const fields: ContentField[] = [
  { key: "forms.adoption.success_title", label: "Cím", sectionHeading: "Örökbefogadási űrlap" },
  { key: "forms.adoption.success_description", label: "Szöveg", multiline: true },

  { key: "forms.volunteer.success_title", label: "Cím", sectionHeading: "Önkéntes jelentkezési űrlap" },
  { key: "forms.volunteer.success_description", label: "Szöveg", multiline: true },

  { key: "forms.foster.success_title", label: "Cím", sectionHeading: "Ideiglenes befogadó űrlap" },
  { key: "forms.foster.success_description", label: "Szöveg", multiline: true },

  { key: "forms.transport.success_title", label: "Cím", sectionHeading: "Szállító űrlap" },
  { key: "forms.transport.success_description", label: "Szöveg", multiline: true },

  { key: "forms.contact.success_title", label: "Cím", sectionHeading: "Kapcsolatfelvételi űrlap" },
  { key: "forms.contact.success_description", label: "Szöveg", multiline: true },
];

export default async function AdminFormsPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Űrlapok köszönő üzenetei" />
      <p className="mt-1 text-sm text-ink-400">
        Ez a szöveg jelenik meg, miután valaki sikeresen elküldött egy jelentkezési űrlapot.
      </p>
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
