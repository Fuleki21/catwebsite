import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { getCats } from "@/data/cats";
import { getStories } from "@/data/stories";
import { getFaqItems, getHelpBudgetItems, getHelpCategories, getSponsors } from "@/data/content";

export default async function AdminDashboardPage() {
  const [cats, stories, faqItems, budgetItems, helpCategories, sponsors] = await Promise.all([
    getCats(),
    getStories(),
    getFaqItems(),
    getHelpBudgetItems(),
    getHelpCategories(),
    getSponsors(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-marmalade-600">Admin felület</p>
          <h1 className="font-display text-3xl font-semibold text-ink-900">Cat TNR Fehérvár</h1>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <Link
          href="/admin/macskak"
          className="focus-ring rounded-xl2 border border-ink-100 bg-white p-6 shadow-card transition-transform hover:-translate-y-1 hover:shadow-lift"
        >
          <h2 className="font-display text-xl font-semibold text-ink-900">Cicák</h2>
          <p className="mt-2 text-sm text-ink-500">{cats.length} cica az adatbázisban</p>
          <p className="mt-4 text-sm font-semibold text-marmalade-600">Kezelés →</p>
        </Link>

        <Link
          href="/admin/tortenetek"
          className="focus-ring rounded-xl2 border border-ink-100 bg-white p-6 shadow-card transition-transform hover:-translate-y-1 hover:shadow-lift"
        >
          <h2 className="font-display text-xl font-semibold text-ink-900">Mentési történetek</h2>
          <p className="mt-2 text-sm text-ink-500">{stories.length} történet az adatbázisban</p>
          <p className="mt-4 text-sm font-semibold text-marmalade-600">Kezelés →</p>
        </Link>

        <Link
          href="/admin/tartalom"
          className="focus-ring rounded-xl2 border border-ink-100 bg-white p-6 shadow-card transition-transform hover:-translate-y-1 hover:shadow-lift"
        >
          <h2 className="font-display text-xl font-semibold text-ink-900">Oldalszövegek</h2>
          <p className="mt-2 text-sm text-ink-500">Fejlécek, bekezdések, alapadatok minden oldalon</p>
          <p className="mt-4 text-sm font-semibold text-marmalade-600">Kezelés →</p>
        </Link>

        <Link
          href="/admin/gyik-kerdesek"
          className="focus-ring rounded-xl2 border border-ink-100 bg-white p-6 shadow-card transition-transform hover:-translate-y-1 hover:shadow-lift"
        >
          <h2 className="font-display text-xl font-semibold text-ink-900">GYIK kérdések</h2>
          <p className="mt-2 text-sm text-ink-500">{faqItems.length} kérdés az adatbázisban</p>
          <p className="mt-4 text-sm font-semibold text-marmalade-600">Kezelés →</p>
        </Link>

        <Link
          href="/admin/koltsegtetelek"
          className="focus-ring rounded-xl2 border border-ink-100 bg-white p-6 shadow-card transition-transform hover:-translate-y-1 hover:shadow-lift"
        >
          <h2 className="font-display text-xl font-semibold text-ink-900">„Mire megy a támogatás”</h2>
          <p className="mt-2 text-sm text-ink-500">{budgetItems.length} tétel — jelenleg nincs hol megjelenítve</p>
          <p className="mt-4 text-sm font-semibold text-marmalade-600">Kezelés →</p>
        </Link>

        <Link
          href="/admin/segitsegek"
          className="focus-ring rounded-xl2 border border-ink-100 bg-white p-6 shadow-card transition-transform hover:-translate-y-1 hover:shadow-lift"
        >
          <h2 className="font-display text-xl font-semibold text-ink-900">További segítési lehetőségek</h2>
          <p className="mt-2 text-sm text-ink-500">{helpCategories.length} kártya a Segíts oldalon</p>
          <p className="mt-4 text-sm font-semibold text-marmalade-600">Kezelés →</p>
        </Link>

        <Link
          href="/admin/tamogatok"
          className="focus-ring rounded-xl2 border border-ink-100 bg-white p-6 shadow-card transition-transform hover:-translate-y-1 hover:shadow-lift"
        >
          <h2 className="font-display text-xl font-semibold text-ink-900">Támogatóink</h2>
          <p className="mt-2 text-sm text-ink-500">{sponsors.length} támogató az adatbázisban</p>
          <p className="mt-4 text-sm font-semibold text-marmalade-600">Kezelés →</p>
        </Link>
      </div>

      <p className="mt-10 text-sm text-ink-400">
        Amit itt elmentesz, azonnal megjelenik a nyilvános oldalon — nem kell semmit újratelepíteni.
      </p>
    </div>
  );
}
