import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { LinkButton } from "@/components/ui/Button";
import { IconFacebook } from "@/components/ui/Icons";
import { siteConfig } from "@/data/site";
import { getContentBlocks, block } from "@/data/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Kapcsolat",
  description: "Vedd fel velünk a kapcsolatot — kérdésed van örökbefogadásról, önkéntességről vagy támogatásról?",
  alternates: { canonical: "/kapcsolat" },
};

export default async function ContactPage() {
  const blocks = await getContentBlocks();
  const facebookUrl = block(blocks, "site.facebook_url", siteConfig.facebookUrl);
  const operatingArea = block(blocks, "site.operating_area", siteConfig.operatingArea);

  return (
    <>
      <PageHeader
        eyebrow={block(blocks, "kapcsolat.header.eyebrow", "Kapcsolat")}
        title={block(blocks, "kapcsolat.header.title", "Írj nekünk bátran")}
        description={block(
          blocks,
          "kapcsolat.header.description",
          "Kérdésed van egy cicáról, az örökbefogadásról vagy arról, hogyan tudsz segíteni? Vedd fel velünk a kapcsolatot."
        )}
      />

      <Section tone="white" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-xl2 border border-ink-100 bg-cream-200 p-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-wide text-ink-300">Elérhetőségünk</p>
              <p className="text-sm text-ink-600">
                A kapcsolattartás kizárólag Facebookon keresztül történik — írj nekünk üzenetet, vagy töltsd ki az
                alábbi űrlapot.
              </p>
              <LinkButton href={facebookUrl} target="_blank" rel="noreferrer" variant="primary" className="mt-4">
                <IconFacebook className="h-4 w-4" />
                Facebook oldalunk
              </LinkButton>
              <p className="mt-5 text-xs text-ink-400">Működési terület: {operatingArea}</p>
            </div>
            <p className="text-sm leading-relaxed text-ink-500">
              {block(
                blocks,
                "kapcsolat.urgent_note",
                "Sürgős, bajba jutott cicával kapcsolatos bejelentés esetén kérjük, jelezd ezt üzeneted elején — így soron kívül kezeljük."
              )}
            </p>
          </div>

          <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
            <ContactForm
              successTitle={block(blocks, "forms.contact.success_title", "Üzenetedet megkaptuk!")}
              successDescription={block(blocks, "forms.contact.success_description", "Hamarosan válaszolunk a megadott e-mail címre.")}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
