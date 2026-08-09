"use client";

import { FormEvent, useState } from "react";
import { Field, TextInput, TextArea, CheckboxRow } from "./FormField";
import { FormError, FormSuccess } from "./FormStatus";
import { Button } from "@/components/ui/Button";

const helpTypes = [
  "Posztírás / social media",
  "Fotózás",
  "Videózás",
  "Gazdikeresés",
  "Cégek megkeresése (támogatás)",
  "Adománygyűjtés szervezése",
  "Kapcsolattartás jelentkezőkkel",
  "Események, rendezvények",
  "Egyéb háttérmunka",
];

export function VolunteerForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  function toggleType(type: string) {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = { ...Object.fromEntries(formData.entries()), helpType: selectedTypes.join(", ") };

    try {
      const res = await fetch("/api/onkentes-jelentkezes", {
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
        description="Örülünk, hogy csatlakoznál hozzánk. Hamarosan felvesszük veled a kapcsolatot a részletekről."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Teljes név" htmlFor="v-name" required>
          <TextInput id="v-name" name="name" required placeholder="Kovács Anna" />
        </Field>
        <Field label="E-mail cím" htmlFor="v-email" required>
          <TextInput id="v-email" name="email" type="email" required placeholder="nev@example.com" />
        </Field>
      </div>
      <Field label="Telefonszám" htmlFor="v-phone" hint="Opcionális, de gyorsítja az egyeztetést.">
        <TextInput id="v-phone" name="phone" type="tel" placeholder="+36 20 000 0000" />
      </Field>

      <Field label="Miben tudsz és szeretnél segíteni?" htmlFor="helpType" required>
        <div className="grid gap-2 sm:grid-cols-2">
          {helpTypes.map((type) => (
            <CheckboxRow
              key={type}
              id={`help-${type}`}
              label={type}
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
            />
          ))}
        </div>
      </Field>

      <Field label="Mesélj magadról pár mondatban" htmlFor="v-message" hint="Opcionális">
        <TextArea id="v-message" name="message" placeholder="Tapasztalat, elérhető időpontok, bármi hasznos infó." />
      </Field>

      {status === "error" && <FormError message={errorMessage} />}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Küldés..." : "Jelentkezem önkéntesnek"}
      </Button>
    </form>
  );
}
