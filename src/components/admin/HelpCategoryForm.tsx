"use client";

import { useFormState, useFormStatus } from "react-dom";
import { HelpCategory } from "@/data/types";
import { Field, TextInput, TextArea, CheckboxRow } from "@/components/forms/FormField";

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

export function HelpCategoryForm({
  action,
  initial,
  nextPosition,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initial?: HelpCategory;
  nextPosition: number;
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

      <div className="grid gap-5 sm:grid-cols-[1fr_120px]">
        <Field label="Cím" htmlFor="title" required>
          <TextInput id="title" name="title" defaultValue={initial?.title} required />
        </Field>
        <Field label="Emoji / ikon" htmlFor="icon" hint="pl. 🐾">
          <TextInput id="icon" name="icon" defaultValue={initial?.icon} placeholder="🐾" />
        </Field>
      </div>

      <Field label="Rövid leírás" htmlFor="shortDescription" hint="1-2 mondat, ez jelenik meg a kártyán.">
        <TextArea id="shortDescription" name="shortDescription" defaultValue={initial?.shortDescription} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Gomb szövege" htmlFor="buttonText">
          <TextInput id="buttonText" name="buttonText" defaultValue={initial?.buttonText} placeholder="pl. Önkéntes leszek" />
        </Field>
        <Field label="Gomb URL-je" htmlFor="buttonUrl" hint="Belső link (pl. /onkentes) vagy teljes URL.">
          <TextInput id="buttonUrl" name="buttonUrl" defaultValue={initial?.buttonUrl} placeholder="/onkentes" />
        </Field>
      </div>

      <Field label="Sorrend" htmlFor="position" hint="Kisebb szám = előrébb jelenik meg a listában.">
        <TextInput id="position" name="position" type="number" defaultValue={initial?.position ?? nextPosition} />
      </Field>

      <CheckboxRow id="visible" name="visible" label="Látható a nyilvános oldalon" defaultChecked={initial?.visible ?? true} />

      <SubmitButton />
    </form>
  );
}
