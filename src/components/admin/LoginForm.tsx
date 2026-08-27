"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Hibás jelszó.");
        setLoading(false);
        return;
      }
      const from = searchParams.get("from") || "/admin";
      router.push(from);
      router.refresh();
    } catch {
      setError("Váratlan hiba történt. Próbáld újra.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="password" className="text-sm font-semibold text-ink-800">
          Jelszó
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          className="focus-ring mt-1.5 w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900"
        />
      </div>
      {error && (
        <p className="text-sm font-medium text-blush-500" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="focus-ring rounded-full bg-marmalade-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-marmalade-600 disabled:opacity-60"
      >
        {loading ? "Belépés…" : "Belépés"}
      </button>
    </form>
  );
}
