import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatById } from "@/data/cats";
import { CatForm } from "@/components/admin/CatForm";
import { updateCat } from "../actions";

export default async function EditCatPage({ params }: { params: { id: string } }) {
  const cat = await getCatById(params.id);
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/macskak" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← Cicák
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">{cat.name} szerkesztése</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <CatForm action={updateCat} initial={cat} />
      </div>
    </div>
  );
}
