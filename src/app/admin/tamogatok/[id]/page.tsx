import Link from "next/link";
import { notFound } from "next/navigation";
import { getSponsorById } from "@/data/content";
import { SponsorForm } from "@/components/admin/SponsorForm";
import { updateSponsor } from "../actions";

export default async function EditSponsorPage({ params }: { params: { id: string } }) {
  const item = await getSponsorById(params.id);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/tamogatok" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← Támogatóink
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Támogató szerkesztése</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <SponsorForm action={updateSponsor} initial={item} nextPosition={item.position} />
      </div>
    </div>
  );
}
