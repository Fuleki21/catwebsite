import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Eyebrow } from "@/components/ui/Container";
import { TransportForm } from "@/components/forms/TransportForm";
import { IconCar, IconHome, IconPaw, IconSyringe } from "@/components/ui/Icons";
import { getContentBlocks, block } from "@/data/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Szállító leszek",
  description: "Van autód és néha 1-2 órád? Segíts a cicák eljuttatásában állatorvoshoz, ideiglenes helyre vagy új gazdihoz.",
  alternates: { canonical: "/szallito" },
};

const useCaseMeta = [
  { icon: IconSyringe, defaultTitle: "Állatorvoshoz", defaultDescription: "Kontrollra, oltásra vagy sürgősségi ellátásra viszel egy cicát." },
  { icon: IconHome, defaultTitle: "Ideiglenes helyre", defaultDescription: "Egy frissen mentett cica eljuttatása egy befogadóhoz." },
  { icon: IconPaw, defaultTitle: "Új gazdihoz", defaultDescription: "Az örökbefogadás utolsó lépése — hazajuttatod a cicát." },
  { icon: IconCar, defaultTitle: "Mentéshez", defaultDescription: "Segítesz kijutni egy helyszínre egy bejelentett mentésnél." },
];

export default async function TransportPage() {
  const blocks = await getContentBlocks();
  const useCases = useCaseMeta.map((item, i) => ({
    icon: item.icon,
    title: block(blocks, `szallito.usecases.${i}.title`, item.defaultTitle),
    description: block(blocks, `szallito.usecases.${i}.description`, item.defaultDescription),
  }));

  return (
    <>
      <PageHeader
        eyebrow={block(blocks, "szallito.header.eyebrow", "Csatlakozz")}
        title={block(blocks, "szallito.header.title", "Van autód és néha 1-2 órád?")}
        description={block(
          blocks,
          "szallito.header.description",
          "A szállítás sokszor a mentés legkritikusabb láncszeme. Ha van egy kis szabad időd és autód, rengeteget segíthetsz."
        )}
      />

      <Section tone="white" className="pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-xl2 border border-ink-100 bg-cream-200 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marmalade-100 text-marmalade-600">
                <item.icon className="h-5 w-5" />
              </span>
              <p className="font-display font-semibold text-ink-900">{item.title}</p>
              <p className="text-sm text-ink-500">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" id="jelentkezes">
        <Eyebrow>{block(blocks, "szallito.form.eyebrow", "Jelentkezés")}</Eyebrow>
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
          {block(blocks, "szallito.form.title", "Szállító leszek")}
        </h2>
        <div className="mt-8 max-w-2xl rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <TransportForm
            successTitle={block(blocks, "forms.transport.success_title", "Köszönjük a jelentkezésedet!")}
            successDescription={block(
              blocks,
              "forms.transport.success_description",
              "Amint szállítási segítségre lesz szükség a közeledben, keresünk."
            )}
          />
        </div>
      </Section>
    </>
  );
}
