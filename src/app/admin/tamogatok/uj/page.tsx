import Link from "next/link";
import { SponsorForm } from "@/components/admin/SponsorForm";
import { getSponsors } from "@/data/content";
import { createSponsor } from "../actions";

export default async function NewSponsorPage() {
  const items = await getSponsors();
  const nextPosition = items.length > 0 ? Math.max(...items.map((i) => i.position)) + 1 : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/tamogatok" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← Támogatóink
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Új támogató hozzáadása</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <SponsorForm action={createSponsor} nextPosition={nextPosition} />
      </div>
    </div>
  );
}
