"use client";

import { useFormState, useFormStatus } from "react-dom";
import { FaqItem } from "@/data/types";
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

export function FaqForm({
  action,
  initial,
  nextPosition,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initial?: FaqItem;
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

      <Field label="Kérdés" htmlFor="question" required>
        <TextInput id="question" name="question" defaultValue={initial?.question} required />
      </Field>

      <Field label="Válasz" htmlFor="answer" required>
        <TextArea id="answer" name="answer" defaultValue={initial?.answer} required />
      </Field>

      <Field label="Sorrend" htmlFor="position" hint="Kisebb szám = előrébb jelenik meg a listában.">
        <TextInput
          id="position"
          name="position"
          type="number"
          defaultValue={initial?.position ?? nextPosition}
        />
      </Field>

      <CheckboxRow
        id="showInAdoptionPage"
        name="showInAdoptionPage"
        label="Jelenjen meg az „Örökbefogadás menete” oldalon is"
        defaultChecked={initial?.showInAdoptionPage}
      />

      <SubmitButton />
    </form>
  );
}
