import Link from "next/link";
import { notFound } from "next/navigation";
import { getHelpBudgetItemById } from "@/data/content";
import { HelpBudgetForm } from "@/components/admin/HelpBudgetForm";
import { updateHelpBudgetItem } from "../actions";

export default async function EditHelpBudgetItemPage({ params }: { params: { id: string } }) {
  const item = await getHelpBudgetItemById(params.id);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/koltsegtetelek" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← „Mire megy a támogatás” tételek
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Tétel szerkesztése</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <HelpBudgetForm action={updateHelpBudgetItem} initial={item} nextPosition={item.position} />
      </div>
    </div>
  );
}
