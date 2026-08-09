"use client";

import { useState } from "react";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

/**
 * Megosztott submit-állapot-kezelés a jelentkezési űrlapokhoz (örökbefogadás,
 * önkéntes, ideiglenes befogadó, szállító, kapcsolat). Minden űrlap ugyanazt
 * a POST -> validálás -> státusz mintát követi, ez a hook egyben tartja.
 */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(payload: Record<string, unknown>) {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(endpoint, {
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

  return { status, errorMessage, submit };
}
