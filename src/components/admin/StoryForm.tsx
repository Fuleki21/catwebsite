"use client";

import { useFormState, useFormStatus } from "react-dom";
import { RescueStory } from "@/data/types";
import { Field, TextInput, TextArea, Select } from "@/components/forms/FormField";
import { PhotoDropzone } from "@/components/admin/PhotoDropzone";

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

export function StoryForm({
  action,
  initial,
  catOptions,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initial?: RescueStory;
  catOptions: { slug: string; name: string }[];
}) {
  const [state, formAction] = useFormState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}

      {state.error && (
        <p className="rounded-lg bg-blush-50 px-4 py-3 text-sm font-medium text-blush-600" role="alert">
          {state.error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Cím" htmlFor="title" required>
          <TextInput id="title" name="title" defaultValue={initial?.title} required />
        </Field>
        <Field
          label="Egyedi azonosító (URL)"
          htmlFor="slug"
          hint="Üresen hagyva a címből készül automatikusan."
        >
          <TextInput id="slug" name="slug" defaultValue={initial?.slug} />
        </Field>
      </div>

      <Field label="Rövid kivonat" htmlFor="excerpt" hint="Ez jelenik meg a kártyákon (1 mondat).">
        <TextArea id="excerpt" name="excerpt" defaultValue={initial?.excerpt} />
      </Field>

      <Field
        label="Teljes szöveg"
        htmlFor="content"
        hint="Minden bekezdést egy üres sorral válassz el egymástól."
      >
        <TextArea
          id="content"
          name="content"
          className="min-h-[220px]"
          defaultValue={initial?.content?.join("\n\n")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Kapcsolódó cica" htmlFor="catSlug" hint="Nem kötelező">
          <Select id="catSlug" name="catSlug" defaultValue={initial?.catSlug ?? ""}>
            <option value="">Nincs kapcsolódó cica</option>
            {catOptions.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Szakasz" htmlFor="stage">
          <Select id="stage" name="stage" defaultValue={initial?.stage ?? "utcarol"}>
            <option value="utcarol">Az utcáról</option>
            <option value="mentes">Mentés</option>
            <option value="gyogyulas">Gyógyulás</option>
            <option value="uj_otthon">Új otthon</option>
          </Select>
        </Field>
        <Field label="Dátum" htmlFor="date">
          <TextInput
            id="date"
            name="date"
            type="date"
            defaultValue={initial?.date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
          />
        </Field>
      </div>

      <label htmlFor="featured" className="flex w-fit cursor-pointer items-center gap-3 text-sm text-ink-700">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={initial?.featured}
          className="focus-ring h-4 w-4 rounded border-ink-300 text-marmalade-500"
        />
        Kiemelt történet (megjelenik a főoldalon)
      </label>

      <Field label="Fotók" htmlFor="photos" hint="Húzz ide fotókat, vagy kattints a tallózáshoz.">
        <PhotoDropzone initialImages={initial?.images ?? []} />
      </Field>

      <SubmitButton />
    </form>
  );
}
