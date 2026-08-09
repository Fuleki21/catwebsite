import { LinkButton } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { IconPaw } from "@/components/ui/Icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-200 pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-marmalade-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-sage-100 blur-3xl" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-in-up">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-marmalade-600 shadow-card">
            <IconPaw className="h-3.5 w-3.5" />
            Székesfehérvár és környéke
          </span>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-ink-900 sm:text-5xl lg:text-6xl">
            Minden cica megérdemel egy esélyt.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-500">
            A Cat TNR Fehérvár gazdátlan, kóbor és rászoruló cicák mentésén, rehabilitációján és
            gazdásításán dolgozik.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/macskak" size="lg">
              Gazdira váró cicák
            </LinkButton>
            <LinkButton href="/segits" variant="outline" size="lg">
              Segítek
            </LinkButton>
          </div>
        </div>

        <div className="animate-fade-in relative [animation-delay:150ms]">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <PlaceholderImage seed="hero-cat" aspect="aspect-[5/6]" className="shadow-lift" label="Kiemelt cica fotó" />
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl2 bg-white p-4 shadow-lift sm:flex sm:items-center sm:gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                <IconPaw className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">80+ cica</p>
                <p className="text-xs text-ink-400">kapott már segítséget</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
