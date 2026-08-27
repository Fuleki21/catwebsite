"use client";

import { FormEvent } from "react";
import { Field, TextInput, TextArea } from "./FormField";
import { FormError, FormSuccess } from "./FormStatus";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "@/lib/useFormSubmit";

export function TransportForm({
  successTitle = "Köszönjük a jelentkezésedet!",
  successDescription = "Amint szállítási segítségre lesz szükség a közeledben, keresünk.",
}: {
  successTitle?: string;
  successDescription?: string;
} = {}) {
  const { status, errorMessage, submit } = useFormSubmit("/api/szallito-jelentkezes");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await submit(Object.fromEntries(formData.entries()));
  }

  if (status === "success") {
    return <FormSuccess title={successTitle} description={successDescription} />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Teljes név" htmlFor="t-name" required>
          <TextInput id="t-name" name="name" required placeholder="Kovács Anna" />
        </Field>
        <Field label="E-mail cím" htmlFor="t-email" required>
          <TextInput id="t-email" name="email" type="email" required placeholder="nev@example.com" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telefonszám" htmlFor="t-phone" required>
          <TextInput id="t-phone" name="phone" type="tel" required placeholder="+36 20 000 0000" />
        </Field>
        <Field label="Melyik területen tudsz segíteni?" htmlFor="area" required>
          <TextInput id="area" name="area" required placeholder="pl. Székesfehérvár és 20 km-es körzete" />
        </Field>
      </div>
      <Field label="Mikor érsz rá jellemzően?" htmlFor="t-message" hint="Opcionális">
        <TextArea id="t-message" name="message" placeholder="pl. hétköznap délután, hétvégén rugalmasan." />
      </Field>

      {status === "error" && <FormError message={errorMessage} />}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Küldés..." : "Jelentkezem szállítónak"}
      </Button>
    </form>
  );
}
