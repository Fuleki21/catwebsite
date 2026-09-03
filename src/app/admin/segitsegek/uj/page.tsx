import Link from "next/link";
import { HelpCategoryForm } from "@/components/admin/HelpCategoryForm";
import { getHelpCategories } from "@/data/content";
import { createHelpCategory } from "../actions";

export default async function NewHelpCategoryPage() {
  const items = await getHelpCategories();
  const nextPosition = items.length > 0 ? Math.max(...items.map((i) => i.position)) + 1 : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/segitsegek" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← További segítési lehetőségek
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Új lehetőség hozzáadása</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <HelpCategoryForm action={createHelpCategory} nextPosition={nextPosition} />
      </div>
    </div>
  );
}
