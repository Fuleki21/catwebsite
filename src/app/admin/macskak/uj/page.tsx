import Link from "next/link";
import { CatForm } from "@/components/admin/CatForm";
import { createCat } from "../actions";

export default function NewCatPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <Link href="/admin/macskak" className="text-sm text-ink-400 hover:text-marmalade-600">
        ← Cicák
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">Új cica hozzáadása</h1>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <CatForm action={createCat} />
      </div>
    </div>
  );
}
