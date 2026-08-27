import Link from "next/link";
import { FaqForm } from "@/components/admin/FaqForm";
import { getFaqItems } from "@/data/content";
import { createFaqItem } from "../actions";

export default async function NewFaqItemPage() {
  const items = await getFaqItems();
  const nextPosition = items.length > 0 ? Math.max(...items.map((i) => i.position)) + 1 : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/gyik-kerdesek" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← GYIK kérdések
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Új kérdés hozzáadása</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <FaqForm action={createFaqItem} nextPosition={nextPosition} />
      </div>
    </div>
  );
}
