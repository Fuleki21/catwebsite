import Link from "next/link";
import { siteConfig } from "@/data/site";
import { block } from "@/data/content";
import { IconFacebook, IconPaw } from "@/components/ui/Icons";
import { primaryNavLinks, joinDropdownLinks, secondaryNavLinks } from "./nav-links";

export function Footer({ blocks }: { blocks: Record<string, string> }) {
  const description = block(blocks, "site.description", siteConfig.description);
  const facebookUrl = block(blocks, "site.facebook_url", siteConfig.facebookUrl);
  const legalStatusNote = block(blocks, "site.legal_status_note", siteConfig.legalStatusNote);

  return (
    <footer className="border-t border-ink-800 bg-ink-900 pb-28 pt-16 text-cream-100 lg:pb-16">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="focus-ring flex items-center gap-2 rounded-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marmalade-500 text-cream-100">
                <IconPaw className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-semibold">Cat TNR Fehérvár</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-100/70">{description}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-marmalade-500"
                aria-label="Facebook"
              >
                <IconFacebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-cream-100/50">Cicák</p>
            <ul className="space-y-2.5 text-sm">
              {primaryNavLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="focus-ring text-cream-100/80 transition-colors hover:text-marmalade-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-cream-100/50">Csatlakozz</p>
            <ul className="space-y-2.5 text-sm">
              {joinDropdownLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="focus-ring text-cream-100/80 transition-colors hover:text-marmalade-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-cream-100/50">Elérhetőség</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring flex items-center gap-2 text-cream-100/80 transition-colors hover:text-marmalade-300"
                >
                  <IconFacebook className="h-4 w-4 shrink-0" />
                  Facebook oldalunk
                </a>
              </li>
              {secondaryNavLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="focus-ring text-cream-100/80 transition-colors hover:text-marmalade-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-cream-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Cat TNR Fehérvár. Minden jog fenntartva.</p>
          <p className="max-w-xl">{legalStatusNote}</p>
        </div>
      </div>
    </footer>
  );
}
