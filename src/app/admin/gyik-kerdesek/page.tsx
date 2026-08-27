import Link from "next/link";
import { getFaqItems } from "@/data/content";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteFaqItem } from "./actions";

export default async function AdminFaqListPage() {
  const items = await getFaqItems();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-ink-400 hover:text-marmalade-600">
            ← Admin főoldal
          </Link>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">GYIK kérdések</h1>
        </div>
        <LogoutButton />
      </div>

      <Link
        href="/admin/gyik-kerdesek/uj"
        className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-marmalade-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-marmalade-600"
      >
        + Új kérdés hozzáadása
      </Link>

      <div className="mt-8 flex flex-col gap-3">
        {items.length === 0 && <p className="text-sm text-ink-400">Még nincs egy kérdés sem.</p>}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl2 border border-ink-100 bg-white p-4"
          >
            <div>
              <p className="font-display text-base font-semibold text-ink-900">
                {item.question}
                {item.showInAdoptionPage && (
                  <span className="ml-2 rounded-full bg-sage-100 px-2 py-0.5 text-xs font-semibold text-sage-700">
                    Örökbefogadás oldalon is
                  </span>
                )}
              </p>
              <p className="mt-1 line-clamp-1 text-sm text-ink-400">{item.answer}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/gyik-kerdesek/${item.id}`}
                className="focus-ring rounded-full border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 hover:border-marmalade-300"
              >
                Szerkesztés
              </Link>
              <DeleteButton
                action={deleteFaqItem.bind(null, item.id)}
                confirmText="Biztosan törlöd ezt a kérdést? Ez nem vonható vissza."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
