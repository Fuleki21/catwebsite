import Link from "next/link";
import { getHelpBudgetItems } from "@/data/content";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteHelpBudgetItem } from "./actions";

export default async function AdminHelpBudgetListPage() {
  const items = await getHelpBudgetItems();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-ink-400 hover:text-marmalade-600">
            ← Admin főoldal
          </Link>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">„Mire megy a támogatás” tételek</h1>
        </div>
        <LogoutButton />
      </div>

      <Link
        href="/admin/koltsegtetelek/uj"
        className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-marmalade-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-marmalade-600"
      >
        + Új tétel hozzáadása
      </Link>

      <div className="mt-8 flex flex-col gap-3">
        {items.length === 0 && <p className="text-sm text-ink-400">Még nincs egy tétel sem.</p>}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl2 border border-ink-100 bg-white p-4"
          >
            <div>
              <p className="font-display text-base font-semibold text-ink-900">{item.label}</p>
              <p className="mt-1 text-sm text-ink-400">{item.note}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/koltsegtetelek/${item.id}`}
                className="focus-ring rounded-full border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 hover:border-marmalade-300"
              >
                Szerkesztés
              </Link>
              <DeleteButton
                action={deleteHelpBudgetItem.bind(null, item.id)}
                confirmText="Biztosan törlöd ezt a tételt? Ez nem vonható vissza."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
