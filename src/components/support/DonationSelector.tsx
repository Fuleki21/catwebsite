"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/forms/FormField";
import { formatHuf } from "@/lib/utils";
import { cn } from "@/lib/utils";

const presetAmounts = [1000, 5000, 10000];

export function DonationSelector() {
  const [selected, setSelected] = useState<number | "custom">(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const amount = selected === "custom" ? Number(customAmount) || 0 : selected;

  return (
    <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {presetAmounts.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setSelected(preset)}
            className={cn(
              "focus-ring rounded-xl border-2 px-4 py-4 text-center font-display text-lg font-semibold transition-all",
              selected === preset
                ? "border-marmalade-500 bg-marmalade-50 text-marmalade-700"
                : "border-ink-100 text-ink-700 hover:border-marmalade-200"
            )}
          >
            {formatHuf(preset)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setSelected("custom")}
          className={cn(
            "focus-ring rounded-xl border-2 px-4 py-4 text-center font-semibold transition-all",
            selected === "custom"
              ? "border-marmalade-500 bg-marmalade-50 text-marmalade-700"
              : "border-ink-100 text-ink-700 hover:border-marmalade-200"
          )}
        >
          Egyedi összeg
        </button>
      </div>

      {selected === "custom" && (
        <div className="mt-4">
          <TextInput
            type="number"
            min={1}
            placeholder="Összeg forintban"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
          />
        </div>
      )}

      <Button size="lg" className="mt-6 w-full" onClick={() => setShowInfo(true)} disabled={amount <= 0}>
        Támogatok — {amount > 0 ? formatHuf(amount) : "válassz összeget"}
      </Button>

      {showInfo && (
        <div className="mt-5 rounded-xl border border-dashed border-marmalade-300 bg-marmalade-50 p-4 text-sm text-marmalade-800">
          <p className="font-semibold">Ez a lépés a fizetési szolgáltató integrálására vár (PLACEHOLDER).</p>
          <p className="mt-1 text-marmalade-700">
            Éles indításkor itt egy online fizetési folyamat (pl. bankkártyás vagy utalásos) indulna el a
            kiválasztott {formatHuf(amount)} összeggel. Addig is köszönjük a szándékodat — vedd fel velünk a
            kapcsolatot a Kapcsolat oldalon az átutalási adatokért.
          </p>
        </div>
      )}
    </div>
  );
}
