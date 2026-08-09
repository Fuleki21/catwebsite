"use client";

import { useMemo, useState } from "react";
import { Cat, CatGender } from "@/data/types";
import { CatCard } from "./CatCard";
import { CheckboxRow } from "@/components/forms/FormField";
import { IconPaw } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type AgeGroup = "kolyok" | "fiatal" | "felnott" | "idos";

const ageGroups: { id: AgeGroup; label: string; test: (months: number) => boolean }[] = [
  { id: "kolyok", label: "Kölyök (0–1 év)", test: (m) => m < 12 },
  { id: "fiatal", label: "Fiatal (1–3 év)", test: (m) => m >= 12 && m < 36 },
  { id: "felnott", label: "Felnőtt (3–7 év)", test: (m) => m >= 36 && m < 84 },
  { id: "idos", label: "Idős (7+ év)", test: (m) => m >= 84 },
];

interface Filters {
  ageGroups: AgeGroup[];
  genders: CatGender[];
  goodWithCats: boolean;
  goodWithChildren: boolean;
  indoorOnly: boolean;
  outdoorOk: boolean;
  neutered: boolean;
  vaccinated: boolean;
  onlyAvailable: boolean;
}

const emptyFilters: Filters = {
  ageGroups: [],
  genders: [],
  goodWithCats: false,
  goodWithChildren: false,
  indoorOnly: false,
  outdoorOk: false,
  neutered: false,
  vaccinated: false,
  onlyAvailable: true,
};

export function CatCatalog({ cats }: { cats: Cat[] }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function toggleArrayFilter<K extends "ageGroups" | "genders">(key: K, value: Filters[K][number]) {
    setFilters((prev) => {
      const list = prev[key] as unknown as string[];
      const next = list.includes(value as string) ? list.filter((v) => v !== value) : [...list, value];
      return { ...prev, [key]: next };
    });
  }

  const filtered = useMemo(() => {
    return cats.filter((cat) => {
      if (filters.onlyAvailable && cat.status !== "gazdit_keres") return false;
      if (filters.genders.length > 0 && !filters.genders.includes(cat.gender)) return false;
      if (
        filters.ageGroups.length > 0 &&
        !filters.ageGroups.some((group) => ageGroups.find((g) => g.id === group)?.test(cat.ageMonthsApprox))
      )
        return false;
      if (filters.goodWithCats && cat.goodWithCats !== true) return false;
      if (filters.goodWithChildren && cat.goodWithChildren !== true) return false;
      if (filters.indoorOnly && !cat.indoorOnly) return false;
      if (filters.outdoorOk && cat.indoorOnly) return false;
      if (filters.neutered && !cat.neutered) return false;
      if (filters.vaccinated && !cat.vaccinated) return false;
      return true;
    });
  }, [cats, filters]);

  const activeCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "onlyAvailable") return false;
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <button
        type="button"
        className="focus-ring flex items-center justify-between rounded-xl2 border border-ink-100 bg-white px-5 py-3 text-sm font-semibold text-ink-900 shadow-card lg:hidden"
        onClick={() => setMobileFiltersOpen((v) => !v)}
      >
        Szűrők {activeCount > 0 && `(${activeCount})`}
        <span className={cn("transition-transform", mobileFiltersOpen && "rotate-180")}>⌄</span>
      </button>

      <aside
        className={cn(
          "flex-col gap-6 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card lg:sticky lg:top-24 lg:flex lg:h-fit",
          mobileFiltersOpen ? "flex" : "hidden"
        )}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink-900">Szűrők</h2>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="focus-ring text-xs font-semibold text-marmalade-600 hover:underline"
            >
              Törlés
            </button>
          )}
        </div>

        <CheckboxRow
          id="onlyAvailable"
          label="Csak gazdit keresők"
          checked={filters.onlyAvailable}
          onChange={(e) => setFilters((f) => ({ ...f, onlyAvailable: e.target.checked }))}
        />

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-300">Kor</p>
          <div className="flex flex-col gap-2">
            {ageGroups.map((group) => (
              <CheckboxRow
                key={group.id}
                id={`age-${group.id}`}
                label={group.label}
                checked={filters.ageGroups.includes(group.id)}
                onChange={() => toggleArrayFilter("ageGroups", group.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-300">Nem</p>
          <div className="flex flex-col gap-2">
            {(["nőstény", "kandúr"] as CatGender[]).map((gender) => (
              <CheckboxRow
                key={gender}
                id={`gender-${gender}`}
                label={gender === "nőstény" ? "Nőstény" : "Kandúr"}
                checked={filters.genders.includes(gender)}
                onChange={() => toggleArrayFilter("genders", gender)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-300">Otthon típusa</p>
          <div className="flex flex-col gap-2">
            <CheckboxRow
              id="indoorOnly"
              label="Kizárólag lakásba"
              checked={filters.indoorOnly}
              onChange={(e) => setFilters((f) => ({ ...f, indoorOnly: e.target.checked }))}
            />
            <CheckboxRow
              id="outdoorOk"
              label="Kijárós is lehet"
              checked={filters.outdoorOk}
              onChange={(e) => setFilters((f) => ({ ...f, outdoorOk: e.target.checked }))}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-300">Illik hozzá</p>
          <div className="flex flex-col gap-2">
            <CheckboxRow
              id="goodWithCats"
              label="Másik cica mellé"
              checked={filters.goodWithCats}
              onChange={(e) => setFilters((f) => ({ ...f, goodWithCats: e.target.checked }))}
            />
            <CheckboxRow
              id="goodWithChildren"
              label="Gyerek mellé"
              checked={filters.goodWithChildren}
              onChange={(e) => setFilters((f) => ({ ...f, goodWithChildren: e.target.checked }))}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-300">Egészségügy</p>
          <div className="flex flex-col gap-2">
            <CheckboxRow
              id="neutered"
              label="Ivartalanított"
              checked={filters.neutered}
              onChange={(e) => setFilters((f) => ({ ...f, neutered: e.target.checked }))}
            />
            <CheckboxRow
              id="vaccinated"
              label="Oltott"
              checked={filters.vaccinated}
              onChange={(e) => setFilters((f) => ({ ...f, vaccinated: e.target.checked }))}
            />
          </div>
        </div>
      </aside>

      <div>
        <p className="mb-5 text-sm text-ink-400">{filtered.length} cica található a szűrési feltételeknek megfelelően</p>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl2 border border-dashed border-ink-200 bg-white py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-marmalade-100 text-marmalade-600">
              <IconPaw className="h-6 w-6" />
            </span>
            <p className="font-display text-lg font-semibold text-ink-900">Egyelőre nincs ilyen cicánk</p>
            <p className="max-w-sm text-sm text-ink-400">
              Próbálj meg kevesebb szűrőt beállítani, vagy nézz vissza hamarosan — folyamatosan bővül a listánk.
            </p>
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="focus-ring text-sm font-semibold text-marmalade-600 hover:underline"
            >
              Szűrők törlése
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((cat) => (
              <CatCard key={cat.id} cat={cat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
