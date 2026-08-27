import Link from "next/link";
import { Cat } from "@/data/types";
import { CoverTile } from "@/components/ui/PhotoTile";
import { StatusBadge } from "@/components/ui/Badge";
import { IconArrowRight } from "@/components/ui/Icons";

export function CatCard({ cat }: { cat: Cat }) {
  return (
    <Link
      href={`/macskak/${cat.slug}`}
      className="focus-ring group flex flex-col overflow-hidden rounded-xl2 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-500 group-hover:scale-105">
          <CoverTile images={cat.images} seed={cat.slug} aspect="aspect-[4/3]" label={`${cat.name} fotója`} />
        </div>
        <div className="absolute left-3 top-3">
          <StatusBadge status={cat.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-semibold text-ink-900">{cat.name}</h3>
          <span className="text-sm text-ink-300">{cat.ageLabel}</span>
        </div>
        <p className="text-xs font-medium uppercase tracking-wide text-marmalade-600">
          {cat.gender === "nőstény" ? "Nőstény" : "Kandúr"}
        </p>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-500">{cat.shortDescription}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-marmalade-600">
          Megnézem
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
