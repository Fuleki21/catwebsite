import Link from "next/link";
import { HelpBudgetForm } from "@/components/admin/HelpBudgetForm";
import { getHelpBudgetItems } from "@/data/content";
import { createHelpBudgetItem } from "../actions";

export default async function NewHelpBudgetItemPage() {
  const items = await getHelpBudgetItems();
  const nextPosition = items.length > 0 ? Math.max(...items.map((i) => i.position)) + 1 : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/koltsegtetelek" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← „Mire megy a támogatás” tételek
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Új tétel hozzáadása</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <HelpBudgetForm action={createHelpBudgetItem} nextPosition={nextPosition} />
      </div>
    </div>
  );
}
