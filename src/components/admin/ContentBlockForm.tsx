"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Field, TextInput, TextArea } from "@/components/forms/FormField";

type FormState = { error?: string; ok?: boolean };

export interface ContentField {
  key: string;
  label: string;
  multiline?: boolean;
  hint?: string;
  /** Ha meg van adva, egy alcím jelenik meg ez előtt a mező előtt (csoportosításhoz). */
  sectionHeading?: string;
}

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

export function ContentBlockForm({
  action,
  fields,
  values,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  fields: ContentField[];
  values: Record<string, string>;
}) {
  const [state, formAction] = useFormState(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state.error && (
        <p className="rounded-lg bg-blush-50 px-4 py-3 text-sm font-medium text-blush-600" role="alert">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="rounded-lg bg-sage-50 px-4 py-3 text-sm font-medium text-sage-700" role="status">
          Elmentve — az oldalon már a frissített szöveg látszik.
        </p>
      )}

      {fields.map((field) => (
        <div key={field.key} className="contents">
          {field.sectionHeading && (
            <h2 className="-mb-2 mt-2 font-display text-lg font-semibold text-ink-900 first:mt-0">
              {field.sectionHeading}
            </h2>
          )}
          <Field label={field.label} htmlFor={field.key} hint={field.hint}>
            {field.multiline ? (
              <TextArea id={field.key} name={field.key} defaultValue={values[field.key] ?? ""} />
            ) : (
              <TextInput id={field.key} name={field.key} defaultValue={values[field.key] ?? ""} />
            )}
          </Field>
        </div>
      ))}

      <SubmitButton />
    </form>
  );
}
