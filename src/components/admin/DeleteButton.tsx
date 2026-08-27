"use client";

import { FormEvent, useTransition } from "react";

export function DeleteButton({
  action,
  confirmText,
}: {
  action: () => Promise<void>;
  confirmText: string;
}) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!confirm(confirmText)) return;
    startTransition(() => {
      action();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={pending}
        className="focus-ring rounded-full border border-blush-300 px-3 py-1.5 text-xs font-semibold text-blush-500 transition-colors hover:bg-blush-50 disabled:opacity-60"
      >
        {pending ? "Törlés…" : "Törlés"}
      </button>
    </form>
  );
}
