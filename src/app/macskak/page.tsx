import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Container";
import { CatCatalog } from "@/components/cats/CatCatalog";
import { getCats } from "@/data/cats";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gazdira váró cicák",
  description:
    "Böngéssz a Cat TNR Fehérvár gazdit kereső cicái között — szűrj kor, nem, temperamentum és otthontípus szerint.",
  alternates: { canonical: "/macskak" },
};

export default async function CatsPage() {
  const cats = await getCats();
  return (
    <>
      <PageHeader
        eyebrow="Örökbefogadás"
        title="Gazdira váró cicák"
        description="Minden cicánk ivartalanítva, oltva és felmérve érkezik hozzád — csak rád vár, hogy megtaláljátok egymást."
      />
      <Section tone="cream" className="pt-0">
        <CatCatalog cats={cats} />
      </Section>
    </>
  );
}
