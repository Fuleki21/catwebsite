"use client";

import { useFormState, useFormStatus } from "react-dom";
import { HelpBudgetItem } from "@/data/types";
import { Field, TextInput } from "@/components/forms/FormField";

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

export function HelpBudgetForm({
  action,
  initial,
  nextPosition,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initial?: HelpBudgetItem;
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

      <Field label="Tétel neve" htmlFor="label" required>
        <TextInput id="label" name="label" defaultValue={initial?.label} required />
      </Field>

      <Field label="Rövid magyarázat" htmlFor="note">
        <TextInput id="note" name="note" defaultValue={initial?.note} />
      </Field>

      <Field label="Sorrend" htmlFor="position" hint="Kisebb szám = előrébb jelenik meg a listában.">
        <TextInput id="position" name="position" type="number" defaultValue={initial?.position ?? nextPosition} />
      </Field>

      <SubmitButton />
    </form>
  );
}
