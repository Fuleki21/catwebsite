import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Eyebrow } from "@/components/ui/Container";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import {
  IconCar,
  IconCheck,
  IconHeart,
  IconMail,
  IconPaw,
  IconUsers,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Önkéntes leszek",
  description: "Nem kell cicát örökbe fogadnod ahhoz, hogy életet ments — nézd meg, hogyan lehetsz önkéntes.",
  alternates: { canonical: "/onkentes" },
};

const opportunities = [
  { icon: IconMail, title: "Posztírás", description: "Segíts megírni a cicák bemutató szövegeit és a híreket." },
  { icon: IconPaw, title: "Fotózás", description: "Készíts minőségi, szerethető fotókat a mentett cicákról." },
  { icon: IconUsers, title: "Videózás", description: "Rövid videók, amik megmutatják egy-egy cica személyiségét." },
  { icon: IconHeart, title: "Gazdikeresés", description: "Segíts megtalálni a tökéletes családot egy-egy cicához." },
  { icon: IconUsers, title: "Social media", description: "Facebook és Instagram tartalom tervezése, kezelése." },
  { icon: IconCar, title: "Cégek megkeresése", description: "Támogatói kapcsolatok építése helyi vállalkozásokkal." },
  { icon: IconHeart, title: "Adománygyűjtés", description: "Kampányok és gyűjtések szervezése, lebonyolítása." },
  { icon: IconMail, title: "Kapcsolattartás", description: "Jelentkezők és érdeklődők megkeresésének koordinálása." },
  { icon: IconUsers, title: "Események", description: "Részvétel és segítség rendezvényeken, akciónapokon." },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Csatlakozz"
        title="Nem kell cicát örökbe fogadnod ahhoz, hogy életet ments."
        description="Az önkéntesek nélkül nem működne a Cat TNR Fehérvár. Sokféle módon segíthetsz, akkor is, ha épp nincs otthon helyed egy cicának."
      />

      <Section tone="white" className="pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-xl2 border border-ink-100 bg-cream-200 p-5">
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
            <Eyebrow>Miért fontos?</Eyebrow>
            <h2 className="font-display text-3xl font-semibold text-ink-900">Amit egy önkéntes ad, azt semmi más nem pótolja</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Több időnk jut a cicák közvetlen gondozására",
                "Gyorsabban találunk gazdit a várakozóknak",
                "Szélesebb kört érünk el a támogatásgyűjtésben",
                "Erősebb, megbízhatóbb közösség épül köréd",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-ink-600">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div id="jelentkezes" className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-display text-xl font-semibold text-ink-900">Önkéntes jelentkezés</h2>
            <p className="mt-2 text-sm text-ink-500">Válaszd ki, miben tudsz segíteni — a többit megbeszéljük.</p>
            <div className="mt-6">
              <VolunteerForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
