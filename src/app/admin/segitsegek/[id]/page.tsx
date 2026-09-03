import Link from "next/link";
import { notFound } from "next/navigation";
import { getHelpCategoryById } from "@/data/content";
import { HelpCategoryForm } from "@/components/admin/HelpCategoryForm";
import { updateHelpCategory } from "../actions";

export default async function EditHelpCategoryPage({ params }: { params: { id: string } }) {
  const item = await getHelpCategoryById(params.id);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/segitsegek" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← További segítési lehetőségek
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Lehetőség szerkesztése</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <HelpCategoryForm action={updateHelpCategory} initial={item} nextPosition={item.position} />
      </div>
    </div>
  );
}
