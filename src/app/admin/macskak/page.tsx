import Link from "next/link";
import { getCats } from "@/data/cats";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCat } from "./actions";

const statusLabels: Record<string, string> = {
  gazdit_keres: "Gazdit keres",
  foglalt: "Foglalt",
  orokbefogadva: "Örökbefogadva",
};

export default async function AdminCatsPage() {
  const cats = await getCats();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-ink-400 hover:text-marmalade-600">
            ← Admin főoldal
          </Link>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Cicák</h1>
        </div>
        <LogoutButton />
      </div>

      <Link
        href="/admin/macskak/uj"
        className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-marmalade-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-marmalade-600"
      >
        + Új cica hozzáadása
      </Link>

      <div className="mt-8 flex flex-col gap-3">
        {cats.length === 0 && (
          <p className="text-sm text-ink-400">Még nincs egy cica sem az adatbázisban.</p>
        )}
        {cats.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl2 border border-ink-100 bg-white p-4"
          >
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">
                {cat.name}
                {cat.featured && (
                  <span className="ml-2 rounded-full bg-marmalade-100 px-2 py-0.5 text-xs font-semibold text-marmalade-700">
                    Kiemelt
                  </span>
                )}
              </p>
              <p className="text-sm text-ink-400">
                {statusLabels[cat.status]} · {cat.ageLabel} · /macskak/{cat.slug}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/macskak/${cat.id}`}
                className="focus-ring rounded-full border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 hover:border-marmalade-300"
              >
                Szerkesztés
              </Link>
              <DeleteButton
                action={deleteCat.bind(null, cat.id, cat.slug, cat.images)}
                confirmText={`Biztosan törlöd ${cat.name} adatlapját? Ez nem vonható vissza.`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
