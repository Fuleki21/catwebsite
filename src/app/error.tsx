"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconX } from "@/components/ui/Icons";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blush-100 text-blush-500">
        <IconX className="h-6 w-6" />
      </span>
      <h2 className="font-display text-2xl font-semibold text-ink-900">Hoppá, hiba történt.</h2>
      <p className="max-w-sm text-sm text-ink-500">
        Valami elromlott az oldal betöltése közben. Próbáld meg újra, vagy térj vissza néhány perc múlva.
      </p>
      <Button onClick={() => reset()}>Újrapróbálom</Button>
    </Container>
  );
}
