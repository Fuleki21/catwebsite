import Link from "next/link";
import { getSponsors } from "@/data/content";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSponsor, toggleSponsorVisibility } from "./actions";

export default async function AdminSponsorsListPage() {
  const items = await getSponsors();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-ink-400 hover:text-marmalade-600">
            ← Admin főoldal
          </Link>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Támogatóink</h1>
          <p className="mt-1 text-sm text-ink-400">
            Az oldal fejléc- és köszönő-szövege az „Oldalszövegek → Támogatóink oldal” menüpontban szerkeszthető.
          </p>
        </div>
        <LogoutButton />
      </div>

      <Link
        href="/admin/tamogatok/uj"
        className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-marmalade-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-marmalade-600"
      >
        + Új támogató hozzáadása
      </Link>

      <div className="mt-8 flex flex-col gap-3">
        {items.length === 0 && <p className="text-sm text-ink-400">Még nincs egy támogató sem.</p>}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl2 border border-ink-100 bg-white p-4"
          >
            <div className="flex items-center gap-3">
              {item.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.logoUrl} alt="" className="h-10 w-10 shrink-0 rounded-lg border border-ink-100 object-contain p-1" />
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dashed border-ink-200 text-[0.6rem] text-ink-300">
                  Nincs logó
                </span>
              )}
              <div>
                <p className="font-display text-base font-semibold text-ink-900">
                  {item.name}
                  {!item.visible && (
                    <span className="ml-2 rounded-full bg-ink-100 px-2 py-0.5 text-xs font-semibold text-ink-500">
                      Rejtett
                    </span>
                  )}
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-ink-400">{item.supportType || item.shortBio}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <form action={toggleSponsorVisibility.bind(null, item.id, !item.visible)}>
                <button
                  type="submit"
                  className="focus-ring rounded-full border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 hover:border-marmalade-300"
                >
                  {item.visible ? "Elrejtés" : "Megjelenítés"}
                </button>
              </form>
              <Link
                href={`/admin/tamogatok/${item.id}`}
                className="focus-ring rounded-full border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 hover:border-marmalade-300"
              >
                Szerkesztés
              </Link>
              <DeleteButton
                action={deleteSponsor.bind(null, item.id, item.logoUrl, item.imageUrl)}
                confirmText="Biztosan törlöd ezt a támogatót? Ez nem vonható vissza."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
