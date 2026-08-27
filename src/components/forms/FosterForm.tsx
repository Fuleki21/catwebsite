"use client";

import { FormEvent } from "react";
import { Field, TextInput, TextArea } from "./FormField";
import { FormError, FormSuccess } from "./FormStatus";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "@/lib/useFormSubmit";

export function FosterForm({
  successTitle = "Köszönjük a jelentkezésedet!",
  successDescription = "Nagyon sokat jelent, hogy otthont adnál egy rászoruló cicának. Hamarosan jelentkezünk a részletekkel.",
}: {
  successTitle?: string;
  successDescription?: string;
} = {}) {
  const { status, errorMessage, submit } = useFormSubmit("/api/ideiglenes-jelentkezes");

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
        <Field label="Teljes név" htmlFor="f-name" required>
          <TextInput id="f-name" name="name" required placeholder="Kovács Anna" />
        </Field>
        <Field label="E-mail cím" htmlFor="f-email" required>
          <TextInput id="f-email" name="email" type="email" required placeholder="nev@example.com" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telefonszám" htmlFor="f-phone" required>
          <TextInput id="f-phone" name="phone" type="tel" required placeholder="+36 20 000 0000" />
        </Field>
        <Field label="Mettől tudnál befogadni?" htmlFor="availableFrom" required>
          <TextInput id="availableFrom" name="availableFrom" required placeholder="pl. azonnal, jövő hónaptól" />
        </Field>
      </div>
      <Field label="Lakhely és lakáskörülmények" htmlFor="f-living" hint="Van-e külön szoba, erkély, más állat a háztartásban?">
        <TextArea id="f-living" name="livingSituation" placeholder="Meséld el röviden a körülményeidet." />
      </Field>
      <Field label="Egyéb megjegyzés" htmlFor="f-message" hint="Opcionális">
        <TextArea id="f-message" name="message" placeholder="Bármi, amit fontosnak tartasz elmondani." />
      </Field>

      {status === "error" && <FormError message={errorMessage} />}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Küldés..." : "Jelentkezem befogadónak"}
      </Button>
    </form>
  );
}
