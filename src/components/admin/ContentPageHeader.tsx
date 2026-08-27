import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

export function ContentPageHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Link href="/admin/tartalom" className="text-sm text-ink-400 hover:text-marmalade-600">
          ← Oldalszövegek
        </Link>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">{title}</h1>
      </div>
      <LogoutButton />
    </div>
  );
}
