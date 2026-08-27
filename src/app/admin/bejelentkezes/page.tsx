import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin belépés",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-200 px-4">
      <div className="w-full max-w-sm rounded-xl2 border border-ink-100 bg-white p-8 shadow-card">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Cat TNR Fehérvár</h1>
        <p className="mt-1 text-sm text-ink-500">Admin belépés</p>
        <div className="mt-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
