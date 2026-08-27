import { Section, Eyebrow } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { getHelpBudgetItems } from "@/data/content";
import { getContentBlocks, block } from "@/data/content";
import { IconBowl, IconHeart, IconHome, IconSyringe } from "@/components/ui/Icons";

const icons = [IconSyringe, IconSyringe, IconSyringe, IconSyringe, IconBowl, IconHome];

export async function WhyWeNeed() {
  const [blocks, helpBudgetItems] = await Promise.all([getContentBlocks(), getHelpBudgetItems()]);
  const eyebrow = block(blocks, "home.why_need.eyebrow", "Miért van szükségünk rád?");
  const title = block(blocks, "home.why_need.title", "Minden adomány közvetlenül a cicákhoz kerül.");
  const text = block(
    blocks,
    "home.why_need.text",
    "A mentett és gondozott cicák ellátása folyamatos költséget jelent. Mutatjuk, mire fordítjuk a segítséget, amit tőled kapunk."
  );

  return (
    <Section tone="cream">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">{title}</h2>
          <p className="mt-5 text-base leading-relaxed text-ink-500">{text}</p>
          <LinkButton href="/segits" size="lg" className="mt-7">
            Segítek
          </LinkButton>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {helpBudgetItems.map((item, index) => {
            const Icon = icons[index] ?? IconHeart;
            return (
              <div key={item.id} className="rounded-xl2 bg-white p-5 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marmalade-100 text-marmalade-600">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 font-display text-base font-semibold text-ink-900">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-400">{item.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
