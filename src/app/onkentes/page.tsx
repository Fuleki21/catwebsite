import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Eyebrow } from "@/components/ui/Container";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { getContentBlocks, block } from "@/data/content";
import {
  IconCar,
  IconCheck,
  IconHeart,
  IconMail,
  IconPaw,
  IconUsers,
} from "@/components/ui/Icons";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Önkéntes leszek",
  description: "Nem kell cicát örökbe fogadnod ahhoz, hogy életet ments — nézd meg, hogyan lehetsz önkéntes.",
  alternates: { canonical: "/onkentes" },
};

const opportunityMeta = [
  { icon: IconMail, defaultTitle: "Posztírás", defaultDescription: "Segíts megírni a cicák bemutató szövegeit és a híreket." },
  { icon: IconPaw, defaultTitle: "Fotózás", defaultDescription: "Készíts minőségi, szerethető fotókat a mentett cicákról." },
  { icon: IconUsers, defaultTitle: "Videózás", defaultDescription: "Rövid videók, amik megmutatják egy-egy cica személyiségét." },
  { icon: IconHeart, defaultTitle: "Gazdikeresés", defaultDescription: "Segíts megtalálni a tökéletes családot egy-egy cicához." },
  { icon: IconUsers, defaultTitle: "Social media", defaultDescription: "Facebook és Instagram tartalom tervezése, kezelése." },
  { icon: IconCar, defaultTitle: "Cégek megkeresése", defaultDescription: "Támogatói kapcsolatok építése helyi vállalkozásokkal." },
  { icon: IconHeart, defaultTitle: "Adománygyűjtés", defaultDescription: "Kampányok és gyűjtések szervezése, lebonyolítása." },
  { icon: IconMail, defaultTitle: "Kapcsolattartás", defaultDescription: "Jelentkezők és érdeklődők megkeresésének koordinálása." },
  { icon: IconUsers, defaultTitle: "Események", defaultDescription: "Részvétel és segítség rendezvényeken, akciónapokon." },
];

const benefitDefaults = [
  "Több időnk jut a cicák közvetlen gondozására",
  "Gyorsabban találunk gazdit a várakozóknak",
  "Szélesebb kört érünk el a támogatásgyűjtésben",
  "Erősebb, megbízhatóbb közösség épül köréd",
];

export default async function VolunteerPage() {
  const blocks = await getContentBlocks();
  const opportunities = opportunityMeta.map((item, i) => ({
    icon: item.icon,
    title: block(blocks, `onkentes.opportunities.${i}.title`, item.defaultTitle),
    description: block(blocks, `onkentes.opportunities.${i}.description`, item.defaultDescription),
  }));
  const benefits = benefitDefaults.map((text, i) => block(blocks, `onkentes.why.benefits.${i}`, text));

  return (
    <>
      <PageHeader
        eyebrow={block(blocks, "onkentes.header.eyebrow", "Csatlakozz")}
        title={block(blocks, "onkentes.header.title", "Nem kell cicát örökbe fogadnod ahhoz, hogy életet ments.")}
        description={block(
          blocks,
          "onkentes.header.description",
          "Az önkéntesek nélkül nem működne a Cat TNR Fehérvár. Sokféle módon segíthetsz, akkor is, ha épp nincs otthon helyed egy cicának."
        )}
      />

      <Section tone="white" className="pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((item, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl2 border border-ink-100 bg-cream-200 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-marmalade-100 text-marmalade-600">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-semibold text-ink-900">{item.title}</p>
                <p className="mt-1 text-sm text-ink-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>{block(blocks, "onkentes.why.eyebrow", "Miért fontos?")}</Eyebrow>
            <h2 className="font-display text-3xl font-semibold text-ink-900">
              {block(blocks, "onkentes.why.title", "Amit egy önkéntes ad, azt semmi más nem pótolja")}
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {benefits.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-ink-600">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div id="jelentkezes" className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-display text-xl font-semibold text-ink-900">
              {block(blocks, "onkentes.form.title", "Önkéntes jelentkezés")}
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              {block(blocks, "onkentes.form.intro", "Válaszd ki, miben tudsz segíteni — a többit megbeszéljük.")}
            </p>
            <div className="mt-6">
              <VolunteerForm
                successTitle={block(blocks, "forms.volunteer.success_title", "Köszönjük a jelentkezésedet!")}
                successDescription={block(
                  blocks,
                  "forms.volunteer.success_description",
                  "Örülünk, hogy csatlakoznál hozzánk. Hamarosan felvesszük veled a kapcsolatot a részletekről."
                )}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
