import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconPaw } from "@/components/ui/Icons";

export function FinalCta() {
  return (
    <section className="bg-ink-900 py-20 text-cream-100">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-marmalade-500">
          <IconPaw className="h-6 w-6" />
        </span>
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          Nem tudsz örökbe fogadni?
          <br />
          Attól még rengeteget segíthetsz.
        </h2>
        <p className="max-w-xl text-cream-100/70">
          Egy adomány, egy megosztás vagy néhány önkéntes óra is közelebb visz egy cicát az új otthonához.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <LinkButton href="/segits" size="lg">
            Támogatok
          </LinkButton>
          <LinkButton
            href="/onkentes"
            variant="outline"
            size="lg"
            className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-ink-900"
          >
            Önkéntes leszek
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
