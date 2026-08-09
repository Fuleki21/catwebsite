import { Section, Eyebrow } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { IconCar, IconHeart, IconHome, IconUsers } from "@/components/ui/Icons";

const ways = [
  {
    icon: IconHeart,
    title: "Támogass anyagilag",
    description: "Már egy kisebb rendszeres összeg is fedez egy oltást vagy egy hét tápot egy mentett cicának.",
    href: "/segits",
    cta: "Támogatok",
  },
  {
    icon: IconHome,
    title: "Legyél ideiglenes befogadó",
    description: "Adj otthont egy cicának a gyógyulás vagy a gazdikeresés idejére.",
    href: "/ideiglenes-befogado",
    cta: "Befogadó leszek",
  },
  {
    icon: IconCar,
    title: "Segíts szállítással",
    description: "Vidd el egy cicát az állatorvoshoz, ideiglenes helyre vagy új gazdijához.",
    href: "/szallito",
    cta: "Szállító leszek",
  },
  {
    icon: IconUsers,
    title: "Legyél önkéntes",
    description: "Posztírás, fotózás, gazdikeresés, események — sokféleképp segíthetsz.",
    href: "/onkentes",
    cta: "Önkéntes leszek",
  },
];

export function HelpWaysSection() {
  return (
    <Section tone="white">
      <Eyebrow>Csatlakozz</Eyebrow>
      <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">Így segíthetsz</h2>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ways.map((way) => (
          <div
            key={way.title}
            className="group flex flex-col gap-4 rounded-xl2 border border-ink-100 bg-cream-200 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-marmalade-200 hover:shadow-lift"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-marmalade-100 text-marmalade-600 transition-colors group-hover:bg-marmalade-500 group-hover:text-white">
              <way.icon className="h-6 w-6" />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink-900">{way.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-ink-500">{way.description}</p>
            <LinkButton href={way.href} variant="ghost" size="sm" className="self-start !px-0 text-marmalade-600 hover:!bg-transparent hover:underline">
              {way.cta} →
            </LinkButton>
          </div>
        ))}
      </div>
    </Section>
  );
}
