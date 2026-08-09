"use client";

import { FormEvent, useState } from "react";
import { Field, TextInput, TextArea, Select, CheckboxRow } from "./FormField";
import { FormError, FormSuccess } from "./FormStatus";
import { Button } from "@/components/ui/Button";
import { Cat } from "@/data/types";

export function AdoptionForm({ cats, preselectedSlug }: { cats: Cat[]; preselectedSlug?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasOtherPets, setHasOtherPets] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/orokbefogadas-jelentkezes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Váratlan hiba történt.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Váratlan hiba történt.");
    }
  }

  if (status === "success") {
    return (
      <FormSuccess
        title="Megkaptuk a jelentkezésedet!"
        description="Köszönjük, hogy örökbefogadáson gondolkodsz. Hamarosan e-mailben vagy telefonon jelentkezünk egy rövid beszélgetésre."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Teljes név" htmlFor="name" required>
          <TextInput id="name" name="name" required placeholder="Kovács Anna" />
        </Field>
        <Field label="E-mail cím" htmlFor="email" required>
          <TextInput id="email" name="email" type="email" required placeholder="nev@example.com" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telefonszám" htmlFor="phone" required>
          <TextInput id="phone" name="phone" type="tel" required placeholder="+36 20 000 0000" />
        </Field>
        <Field label="Lakhely (település)" htmlFor="address" required>
          <TextInput id="address" name="address" required placeholder="Székesfehérvár" />
        </Field>
      </div>

      <Field label="Melyik cicát szeretnéd örökbefogadni?" htmlFor="catSlug" required>
        <Select id="catSlug" name="catSlug" required defaultValue={preselectedSlug ?? ""}>
          <option value="" disabled>
            Válassz cicát
          </option>
          {cats.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name} ({cat.ageLabel})
            </option>
          ))}
          <option value="meg-nem-dontottem">Még nem döntöttem, szeretnék tanácsot kérni</option>
        </Select>
      </Field>

      <Field
        label="Milyenek a lakáskörülményeid?"
        htmlFor="livingSituation"
        required
        hint="Pl. panellakás erkéllyel, kertes ház, hányan éltek együtt."
      >
        <TextArea id="livingSituation" name="livingSituation" required placeholder="Meséld el röviden, hol és hogyan élnétek a cicával." />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <CheckboxRow
            id="hasOtherPets"
            name="hasOtherPets"
            label="Van másik állatom is otthon"
            checked={hasOtherPets}
            onChange={(e) => setHasOtherPets(e.target.checked)}
          />
          {hasOtherPets && (
            <TextInput name="otherPetsDetails" placeholder="Milyen állatok, hány évesek?" />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <CheckboxRow
            id="hasChildren"
            name="hasChildren"
            label="Van gyermekem otthon"
            checked={hasChildren}
            onChange={(e) => setHasChildren(e.target.checked)}
          />
          {hasChildren && <TextInput name="childrenDetails" placeholder="Hány évesek a gyerekek?" />}
        </div>
      </div>

      <Field label="Miért szeretnéd örökbefogadni ezt a cicát?" htmlFor="motivation" required>
        <TextArea id="motivation" name="motivation" required placeholder="Meséld el, mi vonz ehhez a döntéshez." />
      </Field>

      <Field label="Egyéb megjegyzés" htmlFor="message" hint="Opcionális">
        <TextArea id="message" name="message" placeholder="Bármi, amit még fontosnak tartasz elmondani." />
      </Field>

      {status === "error" && <FormError message={errorMessage} />}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Küldés..." : "Jelentkezés elküldése"}
      </Button>
    </form>
  );
}
