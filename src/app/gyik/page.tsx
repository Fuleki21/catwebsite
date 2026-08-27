import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { getFaqItems, getContentBlocks, block } from "@/data/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "GYIK",
  description: "Gyakran ismételt kérdések örökbefogadásról, önkéntességről, ideiglenes befogadásról és támogatásról.",
  alternates: { canonical: "/gyik" },
};

export default async function FaqPage() {
  const [faqItems, blocks] = await Promise.all([getFaqItems(), getContentBlocks()]);

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
      <PageHeader
        eyebrow={block(blocks, "gyik.header.eyebrow", "GYIK")}
        title={block(blocks, "gyik.header.title", "Gyakori kérdések")}
        description={block(blocks, "gyik.header.description", "Nem találod a válaszod? Írj nekünk a Kapcsolat oldalon.")}
      />
      <Section tone="white" className="pt-0">
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqItems} />
        </div>
      </Section>
    </>
  );
}
