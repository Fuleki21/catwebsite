import { Section, Eyebrow } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { IconCar, IconHeart, IconHome, IconUsers } from "@/components/ui/Icons";
import { getContentBlocks, block } from "@/data/content";

const wayMeta = [
  { icon: IconHeart, href: "/segits", cta: "Támogatok", defaultTitle: "Támogass anyagilag", defaultDescription: "Már egy kisebb rendszeres összeg is fedez egy oltást vagy egy hét tápot egy mentett cicának." },
  { icon: IconHome, href: "/ideiglenes-befogado", cta: "Befogadó leszek", defaultTitle: "Legyél ideiglenes befogadó", defaultDescription: "Adj otthont egy cicának a gyógyulás vagy a gazdikeresés idejére." },
  { icon: IconCar, href: "/szallito", cta: "Szállító leszek", defaultTitle: "Segíts szállítással", defaultDescription: "Vidd el egy cicát az állatorvoshoz, ideiglenes helyre vagy új gazdijához." },
  { icon: IconUsers, href: "/onkentes", cta: "Önkéntes leszek", defaultTitle: "Legyél önkéntes", defaultDescription: "Posztírás, fotózás, gazdikeresés, események — sokféleképp segíthetsz." },
];

export async function HelpWaysSection() {
  const blocks = await getContentBlocks();
  const eyebrow = block(blocks, "home.help_ways.eyebrow", "Csatlakozz");
  const title = block(blocks, "home.help_ways.title", "Így segíthetsz");
  const ways = wayMeta.map((way, i) => ({
    ...way,
    title: block(blocks, `home.help_ways.${i}.title`, way.defaultTitle),
    description: block(blocks, `home.help_ways.${i}.description`, way.defaultDescription),
  }));

  return (
    <Section tone="white">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">{title}</h2>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ways.map((way) => (
          <div
            key={way.href}
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
