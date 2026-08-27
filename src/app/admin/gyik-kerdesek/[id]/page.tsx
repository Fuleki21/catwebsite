import Link from "next/link";
import { notFound } from "next/navigation";
import { getFaqItemById } from "@/data/content";
import { FaqForm } from "@/components/admin/FaqForm";
import { updateFaqItem } from "../actions";

export default async function EditFaqItemPage({ params }: { params: { id: string } }) {
  const item = await getFaqItemById(params.id);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/gyik-kerdesek" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← GYIK kérdések
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Kérdés szerkesztése</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <FaqForm action={updateFaqItem} initial={item} nextPosition={item.position} />
      </div>
    </div>
  );
}
