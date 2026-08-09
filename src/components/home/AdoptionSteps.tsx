import { Section, Eyebrow } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

const steps = [
  { title: "Nézd meg a cicákat", description: "Böngéssz a gazdit kereső cicáink között, és találd meg, aki hozzád illik." },
  { title: "Töltsd ki az adatlapot", description: "Mesélj magadról és az otthonodról egy rövid örökbefogadási űrlapon." },
  { title: "Beszélünk veled", description: "Felvesszük veled a kapcsolatot, hogy jobban megismerjük egymást." },
  { title: "Megismerkedtek", description: "Személyesen találkoztok, és ha minden stimmel, hazaviheted." },
];

export function AdoptionSteps() {
  return (
    <Section tone="white">
      <div className="text-center">
        <Eyebrow className="justify-center">Örökbefogadnál?</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">Egyszerű, 4 lépéses folyamat</h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.title} className="relative flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-marmalade-500 font-display text-xl font-semibold text-white shadow-card">
              {index + 1}
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.description}</p>
            {index < steps.length - 1 && (
              <span className="absolute right-[-1rem] top-7 hidden text-2xl text-marmalade-200 sm:block lg:right-[-1.5rem]">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <LinkButton href="/macskak" size="lg">
          Megnézem a cicákat
        </LinkButton>
      </div>
    </Section>
  );
}
