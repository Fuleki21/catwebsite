import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconPaw } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-marmalade-100 text-marmalade-600">
        <IconPaw className="h-7 w-7" />
      </span>
      <h1 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        Ez az oldal elkóborolt, mint egy cica.
      </h1>
      <p className="max-w-md text-ink-500">
        A keresett oldal nem található. Talán elköltözött, vagy sosem létezett — de a gazdit kereső cicáink
        biztosan itt vannak.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <LinkButton href="/">Vissza a főoldalra</LinkButton>
        <LinkButton href="/macskak" variant="outline">
          Gazdira váró cicák
        </LinkButton>
      </div>
    </Container>
  );
}
