"use client";

import { FormEvent, useState } from "react";
import { Field, TextInput, TextArea } from "./FormField";
import { FormError, FormSuccess } from "./FormStatus";
import { Button } from "@/components/ui/Button";

export function TransportForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/szallito-jelentkezes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Váratlan hiba történt.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Váratlan hiba történt.");
    }
  }

  if (status === "success") {
    return (
      <FormSuccess
        title="Köszönjük a jelentkezésedet!"
        description="Amint szállítási segítségre lesz szükség a közeledben, keresünk."
      />
    );
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
