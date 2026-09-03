import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getContentBlocks, block, getVisibleSponsors } from "@/data/content";
import { Sponsor } from "@/data/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Támogatóink",
  description: "Köszönjük azoknak a cégeknek, vállalkozásoknak és magánszemélyeknek, akik támogatják a Cat TNR Fehérvár mentő munkáját.",
  alternates: { canonical: "/tamogatoink" },
};

function paragraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="flex flex-col gap-5 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-wrap items-center gap-4">
        {sponsor.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sponsor.logoUrl}
            alt={sponsor.name}
            className="h-16 w-16 shrink-0 rounded-xl border border-ink-100 object-contain p-2"
          />
        ) : (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-marmalade-100 text-2xl">
            🌿
          </span>
        )}
        <div>
          <h3 className="font-display text-xl font-semibold text-ink-900">{sponsor.name}</h3>
          {sponsor.supportType && (
            <Badge tone="sage" className="mt-1.5">
              {sponsor.supportType}
            </Badge>
          )}
        </div>
      </div>

      {sponsor.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={sponsor.imageUrl} alt="" className="max-h-64 w-full rounded-lg object-cover" />
      )}

      {sponsor.shortBio && (
        <p className="text-sm leading-relaxed text-ink-700">{sponsor.shortBio}</p>
      )}

      {sponsor.description && (
        <div className="flex flex-col gap-2 text-sm leading-relaxed text-ink-500">
          {paragraphs(sponsor.description).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {sponsor.referralUrl && (
          <LinkButton href={sponsor.referralUrl} target="_blank" rel="noreferrer" variant="primary">
            {sponsor.referralButtonText || "Ugrás a weboldalra"}
          </LinkButton>
        )}
        {sponsor.websiteUrl && (
          <LinkButton href={sponsor.websiteUrl} target="_blank" rel="noreferrer" variant="outline" size="sm">
            Weboldal
          </LinkButton>
        )}
        {sponsor.facebookUrl && (
          <a
            href={sponsor.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring text-sm font-semibold text-ink-500 hover:text-marmalade-600"
          >
            Facebook
          </a>
        )}
      </div>
    </div>
  );
}

export default async function SponsorsPage() {
  const [blocks, sponsors] = await Promise.all([getContentBlocks(), getVisibleSponsors()]);

  const ctaButtonUrl = block(blocks, "tamogatoink.cta.button_url", "/kapcsolat");
  const isInternalCta = ctaButtonUrl.startsWith("/");

  return (
    <>
      <PageHeader
        eyebrow={block(blocks, "tamogatoink.header.eyebrow", "Támogatóink")}
        title={block(blocks, "tamogatoink.header.title", "🐾 Segítség nem csak pénzben érkezhet 🐾")}
      />

      <Section tone="white" className="pt-0">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-ink-700">
          {paragraphs(
            block(
              blocks,
              "tamogatoink.header.intro",
              "Nem csak anyagi támogatással lehet segíteni a mentett cicákat. Örömmel fogadnánk olyan cégek, vállalkozások jelentkezését, akik táppal, konzervvel, alommal, immunerősítőkkel vagy egyéb hasznos termékekkel tudnák támogatni a munkánkat."
            )
          ).map((p) => (
            <p key={p} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {sponsors.length > 0 && (
        <Section tone="cream">
          <h2 className="text-center font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            {block(blocks, "tamogatoink.list.title", "❤️ Támogatóink")}
          </h2>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-6">
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="ink" className="text-center">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          {block(blocks, "tamogatoink.cta.title", "💙 Legyél te is a támogatóink egyike!")}
        </h2>
        <div className="mx-auto mt-4 flex max-w-xl flex-col gap-3 text-cream-100/80">
          {paragraphs(
            block(
              blocks,
              "tamogatoink.cta.text",
              "Ha cégeddel, vállalkozásoddal vagy magánszemélyként szeretnéd támogatni a mentett cicákat, vedd fel velünk a kapcsolatot!"
            )
          ).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-7">
          <LinkButton
            href={ctaButtonUrl}
            variant="primary"
            size="lg"
            target={isInternalCta ? undefined : "_blank"}
            rel={isInternalCta ? undefined : "noreferrer"}
          >
            {block(blocks, "tamogatoink.cta.button_text", "Kapcsolatfelvétel")}
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
