"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/bejelentkezes");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="focus-ring text-sm font-semibold text-ink-400 hover:text-marmalade-600 disabled:opacity-60"
    >
      {loading ? "Kilépés…" : "Kilépés"}
    </button>
  );
}
