import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/data/site";

export const metadata: Metadata = {
  title: "GYIK",
  description: "Gyakran ismételt kérdések örökbefogadásról, önkéntességről, ideiglenes befogadásról és támogatásról.",
  alternates: { canonical: "/gyik" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader eyebrow="GYIK" title="Gyakori kérdések" description="Nem találod a válaszod? Írj nekünk a Kapcsolat oldalon." />
      <Section tone="white" className="pt-0">
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqItems} />
        </div>
      </Section>
    </>
  );
}
