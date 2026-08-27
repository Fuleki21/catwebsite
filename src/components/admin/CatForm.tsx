"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Cat, CatTemperament } from "@/data/types";
import { Field, TextInput, TextArea, Select, CheckboxRow } from "@/components/forms/FormField";
import { PhotoDropzone } from "@/components/admin/PhotoDropzone";

const temperamentOptions: CatTemperament[] = [
  "bátor",
  "félénk",
  "játékos",
  "nyugodt",
  "dorombolós",
  "önálló",
  "ölbemászó",
];

type FormState = { error?: string };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring self-start rounded-full bg-marmalade-500 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-marmalade-600 disabled:opacity-60"
    >
      {pending ? "Mentés…" : "Mentés"}
    </button>
  );
}

function triBoolDefault(value: boolean | "ismeretlen" | undefined) {
  if (value === true) return "true";
  if (value === false) return "false";
  return "ismeretlen";
}

export function CatForm({
  action,
  initial,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initial?: Cat;
}) {
  const [state, formAction] = useFormState(action, {});
  const [temperament, setTemperament] = useState<CatTemperament[]>(initial?.temperament ?? []);

  function toggleTemperament(t: CatTemperament) {
    setTemperament((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="temperament" value={temperament.join(",")} />

      {state.error && (
        <p className="rounded-lg bg-blush-50 px-4 py-3 text-sm font-medium text-blush-600" role="alert">
          {state.error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Név" htmlFor="name" required>
          <TextInput id="name" name="name" defaultValue={initial?.name} required />
        </Field>
        <Field
          label="Egyedi azonosító (URL)"
          htmlFor="slug"
          hint="Üresen hagyva a névből készül automatikusan. Pl.: morzsa"
        >
          <TextInput id="slug" name="slug" defaultValue={initial?.slug} placeholder="pl. morzsa" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Kor (szövegesen)" htmlFor="ageLabel" hint='pl. "8 hónapos", "2 éves"'>
          <TextInput id="ageLabel" name="ageLabel" defaultValue={initial?.ageLabel} />
        </Field>
        <Field label="Kor hónapban (kb.)" htmlFor="ageMonthsApprox" hint="Szűréshez/rendezéshez kell">
          <TextInput
            id="ageMonthsApprox"
            name="ageMonthsApprox"
            type="number"
            min={0}
            defaultValue={initial?.ageMonthsApprox ?? 0}
          />
        </Field>
        <Field label="Nem" htmlFor="gender">
          <Select id="gender" name="gender" defaultValue={initial?.gender ?? "nőstény"}>
            <option value="nőstény">Nőstény</option>
            <option value="kandúr">Kandúr</option>
          </Select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Állapot" htmlFor="status">
          <Select id="status" name="status" defaultValue={initial?.status ?? "gazdit_keres"}>
            <option value="gazdit_keres">Gazdit keres</option>
            <option value="foglalt">Foglalt</option>
            <option value="orokbefogadva">Örökbefogadva</option>
          </Select>
        </Field>
        <Field label="Érkezés dátuma" htmlFor="arrivalDate">
          <TextInput
            id="arrivalDate"
            name="arrivalDate"
            type="date"
            defaultValue={initial?.arrivalDate?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
          />
        </Field>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 rounded-xl2 border border-ink-100 bg-white p-5">
        <CheckboxRow id="featured" name="featured" label="Kiemelt (megjelenik a főoldalon)" defaultChecked={initial?.featured} />
        <CheckboxRow id="neutered" name="neutered" label="Ivartalanított" defaultChecked={initial?.neutered} />
        <CheckboxRow id="vaccinated" name="vaccinated" label="Oltott" defaultChecked={initial?.vaccinated} />
        <CheckboxRow id="chipped" name="chipped" label="Chipes" defaultChecked={initial?.chipped} />
        <CheckboxRow id="indoorOnly" name="indoorOnly" label="Kizárólag lakásba" defaultChecked={initial?.indoorOnly} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Gyerekekkel jól kijön" htmlFor="goodWithChildren">
          <Select id="goodWithChildren" name="goodWithChildren" defaultValue={triBoolDefault(initial?.goodWithChildren)}>
            <option value="ismeretlen">Ismeretlen</option>
            <option value="true">Igen</option>
            <option value="false">Nem</option>
          </Select>
        </Field>
        <Field label="Más cicákkal jól kijön" htmlFor="goodWithCats">
          <Select id="goodWithCats" name="goodWithCats" defaultValue={triBoolDefault(initial?.goodWithCats)}>
            <option value="ismeretlen">Ismeretlen</option>
            <option value="true">Igen</option>
            <option value="false">Nem</option>
          </Select>
        </Field>
        <Field label="Kutyákkal jól kijön" htmlFor="goodWithDogs">
          <Select id="goodWithDogs" name="goodWithDogs" defaultValue={triBoolDefault(initial?.goodWithDogs)}>
            <option value="ismeretlen">Ismeretlen</option>
            <option value="true">Igen</option>
            <option value="false">Nem</option>
          </Select>
        </Field>
      </div>

      <Field label="Temperamentum" htmlFor="temperament-group">
        <div id="temperament-group" className="flex flex-wrap gap-2">
          {temperamentOptions.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleTemperament(t)}
              className={`focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                temperament.includes(t)
                  ? "border-marmalade-500 bg-marmalade-50 text-marmalade-700"
                  : "border-ink-100 bg-white text-ink-500 hover:border-marmalade-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Rövid leírás" htmlFor="shortDescription" hint="Ez jelenik meg a kártyákon (1-2 mondat).">
        <TextArea id="shortDescription" name="shortDescription" defaultValue={initial?.shortDescription} />
      </Field>

      <Field label="Története" htmlFor="story">
        <TextArea id="story" name="story" defaultValue={initial?.story} />
      </Field>

      <Field label="Egészségügyi információk" htmlFor="health">
        <TextArea id="health" name="health" defaultValue={initial?.health} />
      </Field>

      <Field label="Milyen otthont keres" htmlFor="seekingHome">
        <TextArea id="seekingHome" name="seekingHome" defaultValue={initial?.seekingHome} />
      </Field>

      <Field label="Fotók" htmlFor="photos" hint="Húzz ide fotókat, vagy kattints a tallózáshoz. Több fotó is feltölthető egyszerre.">
        <PhotoDropzone initialImages={initial?.images ?? []} />
      </Field>

      <SubmitButton />
    </form>
  );
}
