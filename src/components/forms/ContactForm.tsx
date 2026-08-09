"use client";

import { FormEvent } from "react";
import { Field, TextInput, TextArea } from "./FormField";
import { FormError, FormSuccess } from "./FormStatus";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "@/lib/useFormSubmit";

export function ContactForm() {
  const { status, errorMessage, submit } = useFormSubmit("/api/kapcsolat");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await submit(Object.fromEntries(formData.entries()));
  }

  if (status === "success") {
    return <FormSuccess title="Üzenetedet megkaptuk!" description="Hamarosan válaszolunk a megadott e-mail címre." />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label="Teljes név" htmlFor="c-name" required>
        <TextInput id="c-name" name="name" required placeholder="Kovács Anna" />
      </Field>
      <Field label="E-mail cím" htmlFor="c-email" required>
        <TextInput id="c-email" name="email" type="email" required placeholder="nev@example.com" />
      </Field>
      <Field label="Üzenet" htmlFor="c-message" required>
        <TextArea id="c-message" name="message" required placeholder="Miben segíthetünk?" />
      </Field>

      {status === "error" && <FormError message={errorMessage} />}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Küldés..." : "Üzenet küldése"}
      </Button>
    </form>
  );
}
