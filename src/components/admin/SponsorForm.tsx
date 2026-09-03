"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Sponsor } from "@/data/types";
import { Field, TextInput, TextArea, CheckboxRow } from "@/components/forms/FormField";
import { SingleImageDropzone } from "@/components/admin/SingleImageDropzone";

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

export function SponsorForm({
  action,
  initial,
  nextPosition,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initial?: Sponsor;
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

      <Field label="Támogató neve" htmlFor="name" required>
        <TextInput id="name" name="name" defaultValue={initial?.name} required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <SingleImageDropzone name="logo" currentUrl={initial?.logoUrl} label="Logó" />
        <SingleImageDropzone name="image" currentUrl={initial?.imageUrl} label="Opcionális kép" />
      </div>

      <Field label="Rövid bemutatkozás" htmlFor="shortBio" hint="Ez jelenik meg a kártya tetején.">
        <TextArea id="shortBio" name="shortBio" defaultValue={initial?.shortBio} />
      </Field>

      <Field label="Támogatás típusa" htmlFor="supportType" hint='pl. "Immunerősítő termékek", "Tápadomány"'>
        <TextInput id="supportType" name="supportType" defaultValue={initial?.supportType} />
      </Field>

      <Field label="Részletes leírás" htmlFor="description">
        <TextArea id="description" name="description" defaultValue={initial?.description} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ajánlói link" htmlFor="referralUrl" hint="Ha van kedvezményes / affiliate link.">
          <TextInput id="referralUrl" name="referralUrl" defaultValue={initial?.referralUrl} placeholder="https://" />
        </Field>
        <Field label="Ajánlói link gombjának szövege" htmlFor="referralButtonText">
          <TextInput id="referralButtonText" name="referralButtonText" defaultValue={initial?.referralButtonText} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Weboldal URL" htmlFor="websiteUrl">
          <TextInput id="websiteUrl" name="websiteUrl" defaultValue={initial?.websiteUrl} placeholder="https://" />
        </Field>
        <Field label="Facebook URL" htmlFor="facebookUrl">
          <TextInput id="facebookUrl" name="facebookUrl" defaultValue={initial?.facebookUrl} placeholder="https://facebook.com/…" />
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
