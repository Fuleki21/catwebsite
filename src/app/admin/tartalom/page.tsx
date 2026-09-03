import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

const sections = [
  { href: "/admin/tartalom/alapadatok", label: "Alapadatok", desc: "Elérhetőségek, közösségi média, rövid leírás" },
  { href: "/admin/tartalom/fooldal", label: "Főoldal", desc: "Fejléc, segítés módjai, lépések" },
  { href: "/admin/tartalom/segits", label: "Segíts oldal", desc: "Fejléc, szövegek" },
  { href: "/admin/tartalom/onkentes", label: "Önkéntes oldal", desc: "Fejléc, lehetőségek, előnyök" },
  { href: "/admin/tartalom/ideiglenes-befogado", label: "Ideiglenes befogadó oldal", desc: "Fejléc, gyakori kérdések" },
  { href: "/admin/tartalom/szallito", label: "Szállító oldal", desc: "Fejléc, felhasználási esetek" },
  { href: "/admin/tartalom/rolunk", label: "Rólunk oldal", desc: "Bemutatkozás, értékeink" },
  { href: "/admin/tartalom/kapcsolat", label: "Kapcsolat oldal", desc: "Fejléc, sürgősségi megjegyzés" },
  { href: "/admin/tartalom/gyik", label: "GYIK oldal fejléce", desc: "A kérdés-válaszok a „GYIK-kérdések” menüpontban vannak" },
  { href: "/admin/tartalom/orokbefogadas", label: "Örökbefogadás menete", desc: "Fejléc, lépések, jelentkezési szöveg" },
  { href: "/admin/tartalom/urlapok", label: "Űrlapok köszönő üzenetei", desc: "Mind az 5 jelentkezési űrlap" },
  { href: "/admin/tartalom/tamogatoink", label: "Támogatóink oldal", desc: "Fejléc, bevezető, „legyél te is támogatónk” szekció" },
];

export default function AdminContentIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-sm text-ink-400 hover:text-marmalade-600">
            ← Admin főoldal
          </Link>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Oldalszövegek</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-500">
            Itt szerkesztheted az egyes oldalak fejléceit, bekezdéseit és fix listáit. A cicák, mentési
            történetek, GYIK-kérdések és a „mire megy a támogatás” tételek külön menüpontban kezelhetők (az
            admin főoldalról).
          </p>
        </div>
        <LogoutButton />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="focus-ring rounded-xl2 border border-ink-100 bg-white p-5 shadow-card transition-transform hover:-translate-y-1 hover:shadow-lift"
          >
            <p className="font-display text-base font-semibold text-ink-900">{s.label}</p>
            <p className="mt-1 text-xs text-ink-400">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
