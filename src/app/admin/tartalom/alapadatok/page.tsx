import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const fields: ContentField[] = [
  { key: "site.tagline", label: "Mottó (rövid szlogen)" },
  { key: "site.description", label: "Rövid leírás a szervezetről", multiline: true },
  { key: "site.email", label: "E-mail cím" },
  { key: "site.phone", label: "Telefonszám" },
  { key: "site.facebook_url", label: "Facebook link" },
  { key: "site.instagram_url", label: "Instagram link" },
  { key: "site.operating_area", label: "Működési terület" },
  { key: "site.legal_status_note", label: "Szervezeti forma megjegyzés", multiline: true },
];

export default async function AdminAlapadatokPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Alapadatok" />
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
