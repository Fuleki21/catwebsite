import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { getContentBlocks, block, blockList, getVisibleHelpCategories } from "@/data/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Segíts",
  description: "Nem csak pénzzel segíthetsz — tárgyi adománnyal, REPONT-tal, önkéntes munkával is támogathatod a Cat TNR Fehérvár munkáját.",
  alternates: { canonical: "/segits" },
};

function Chips({ items }: { items: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-ink-100 bg-cream-200 px-3 py-1 text-sm text-ink-700"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default async function SupportPage() {
  const [blocks, helpCategories] = await Promise.all([getContentBlocks(), getVisibleHelpCategories()]);

  const facebookUrl = block(blocks, "site.facebook_url", siteConfig.facebookUrl);
  const brands = blockList(blocks, "segits.material.brands_list", [
    "Felix",
    "Brit Care",
    "Royal Canin",
    "Real Nature",
    "Animonda",
    "CatShow",
    "Eukanuba",
    "Purina One",
    "Hills",
  ]);
  const kittenFood = blockList(blocks, "segits.material.kitten_list", ["Royal Canin Mother & BabyCat", "Smilla Kitten"]);
  const specialFood = blockList(blocks, "segits.material.special_list", [
    "Animonda Integra Protect Adult Diabetes",
    "Smilla Veterinary Diet Urinary",
    "Trovet Recovery Liquid",
  ]);
  const meds = blockList(blocks, "segits.material.meds_list", [
    "DmGuard T2",
    "Minera Béres csepp",
    "Complivit Paszta",
    "Flumax paszta",
    "Ferdocat féreghajtó paszta",
    "Gastroferm Cat probioticum",
    "Burgimmune",
    "Kék Lukács kenőcs",
    "Lepketapló gomba",
  ]);
  const equipment = blockList(blocks, "segits.material.equipment_list", [
    "🐈 Hordozók",
    "🐾 Nagyobb méretű macska ketrecek",
    "🪵 Kaparófák",
    "🎾 Cica játékok",
    "🛏️ Fekhelyek",
  ]);

  const qrImageUrl = blocks["segits.repont.qr_image_url"];

  return (
    <>
      <PageHeader
        eyebrow={block(blocks, "segits.header.eyebrow", "Segíts")}
        title={block(blocks, "segits.header.title", "Segíts, hogy minden cica otthonra találjon")}
        description={block(
          blocks,
          "segits.header.description",
          "Nem csak anyagi támogatással segíthetsz. Egy tál eledel, egy szükséges felszerelés, egy visszaváltott palack vagy akár egy megosztás is rengeteget jelenthet számunkra és a cicák számára."
        )}
      />

      {/* Tárgyi adományok */}
      <Section tone="white" className="pt-0">
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
          {block(blocks, "segits.material.title", "🛟 Mire van most szükségünk?")}
        </h2>

        <div className="mt-8 rounded-xl2 border border-ink-100 bg-cream-200 p-6 shadow-card sm:p-8">
          <h3 className="font-display text-xl font-semibold text-ink-900">
            {block(blocks, "segits.material.food_title", "🥫 Minőségi nedves eledel")}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            {block(
              blocks,
              "segits.material.food_intro",
              "A minőség számít! Nem a mennyiség, hanem a tápláló, prémium eledel adja meg az állatoknak az erőt és egészséget. 💛🐱"
            )}
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-ink-800">
                {block(blocks, "segits.material.brands_title", "⭐ Ajánlott márkák")}
              </p>
              <Chips items={brands} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-800">
                {block(blocks, "segits.material.kitten_title", "🐣 Kölyöktápok")}
              </p>
              <Chips items={kittenFood} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-800">
                {block(blocks, "segits.material.special_title", "⚕️ Speciális tápok")}
              </p>
              <Chips items={specialFood} />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-800">
                {block(blocks, "segits.material.meds_title", "🛡️ Élősködők elleni készítmények & immunerősítők")}
              </p>
              <Chips items={meds} />
              <p className="mt-2 text-xs italic text-ink-500">
                {block(blocks, "segits.material.meds_note", "Ezek életmentőek lehetnek a beteg, legyengült cicáknak. 💊🐾")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <h3 className="font-display text-xl font-semibold text-ink-900">
            {block(blocks, "segits.material.equipment_title", "🧺 Egyéb felszerelések")}
          </h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-700">
            {equipment.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-blush-300 bg-blush-50 p-4 text-sm text-blush-700">
          <p className="font-semibold">
            {block(blocks, "segits.material.warning_title", "⚠️ Fontos")}
          </p>
          <p className="mt-1">
            {block(
              blocks,
              "segits.material.warning_text",
              "Kérjük, ne hozzatok olyan adományokat (pl. ruhát, párnát), amelyeket nem tudunk hasznosítani. Köszönjük, hogy figyeltek erre! 💛🙏"
            )}
          </p>
        </div>
      </Section>

      {/* Adományok leadása */}
      <Section tone="cream">
        <h2 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
          {block(blocks, "segits.dropoff.title", "Hol tudod leadni az adományokat?")}
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink-900">
              {block(blocks, "segits.dropoff.personal_title", "🎁 Személyes átadás")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              {block(
                blocks,
                "segits.dropoff.personal_text",
                "Ha tárgyi adománnyal segítenél és személyesen adnád át: írj nekünk privát üzenetet a Facebook oldalunkon, és egyeztetünk! 💬🐱"
              )}
            </p>
            <div className="mt-5">
              <LinkButton href={facebookUrl} target="_blank" rel="noreferrer" variant="primary">
                {block(blocks, "segits.dropoff.personal_button", "Írj nekünk Facebookon")}
              </LinkButton>
            </div>
          </div>

          <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink-900">
              {block(blocks, "segits.dropoff.jopont_title", "🏪 JóPont adománybolt")}
            </h3>
            <p className="mt-2 text-sm text-ink-600">
              {block(blocks, "segits.dropoff.jopont_intro", "Tárgyi adományaidat a JóPont adományboltban is le tudod adni:")}
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-ink-700">
              <div className="rounded-lg bg-cream-200 p-3">
                <p className="font-semibold">{block(blocks, "segits.dropoff.jopont1_address", "📍 Agárd – Gárdonyi Géza u. 45")}</p>
                <p className="mt-1 text-ink-500">{block(blocks, "segits.dropoff.jopont1_hours", "Nyitva: H–P 9:00–17:00 | Szo–V 9:00–12:00")}</p>
                <p className="text-ink-500">{block(blocks, "segits.dropoff.jopont1_phone", "+36-30-086-3634")}</p>
              </div>
              <div className="rounded-lg bg-cream-200 p-3">
                <p className="font-semibold">{block(blocks, "segits.dropoff.jopont2_address", "📍 Székesfehérvár – Prohászka u. 12")}</p>
                <p className="mt-1 text-ink-500">{block(blocks, "segits.dropoff.jopont2_hours", "Nyitva: H–P 9:00–17:00 | Szo 9:00–13:00")}</p>
                <p className="text-ink-500">{block(blocks, "segits.dropoff.jopont2_phone", "+36-30-086-3892")}</p>
              </div>
            </div>
            <LinkButton
              href={block(blocks, "segits.dropoff.jopont_url", "https://www.jopontadomanybolt.hu/kapcsolat-32")}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              className="mt-5"
            >
              {block(blocks, "segits.dropoff.jopont_button", "További információ a JóPont oldalán")}
            </LinkButton>
          </div>
        </div>
      </Section>

      {/* REPONT */}
      <Section tone="sage">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          {block(blocks, "segits.repont.title", "♻️ Segíts a REponttal")}
        </h2>
        <p className="mt-3 max-w-2xl text-cream-100/80">
          {block(blocks, "segits.repont.intro", "A visszaváltott palackok értékét is felajánlhatod a cicák javára.")}
        </p>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {[
              {
                title: block(blocks, "segits.repont.step1_title", "1️⃣ Válaszd a bankszámlára utalást"),
                text: block(blocks, "segits.repont.step1_text", "A REponton válaszd, hogy a visszaváltás összegét bankszámlára kéred."),
              },
              {
                title: block(blocks, "segits.repont.step2_title", "2️⃣ Olvasd be a QR-kódot"),
                text: block(blocks, "segits.repont.step2_text", "Olvasd be az alábbi QR-kódot."),
              },
              {
                title: block(blocks, "segits.repont.step3_title", "3️⃣ Kész!"),
                text: block(blocks, "segits.repont.step3_text", "És máris a Cat TNR tappancsaihoz érkezik a támogatás!"),
              },
            ].map((step) => (
              <div key={step.title} className="rounded-xl2 bg-cream-100/10 p-5 backdrop-blur-sm">
                <p className="font-display font-semibold">{step.title}</p>
                <p className="mt-1 text-sm text-cream-100/75">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-3 rounded-xl2 bg-white p-5 text-center shadow-card lg:w-64 lg:shrink-0">
            {qrImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrImageUrl} alt="REPONT QR-kód" className="h-40 w-40 object-contain" />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-lg border border-dashed border-ink-200 text-center text-xs text-ink-400">
                QR-kód hamarosan
              </div>
            )}
            <p className="text-xs text-ink-500">
              {block(
                blocks,
                "segits.repont.save_note",
                "📱 Mentsd el a QR-kódot a telefonodra, így a jövőben is könnyedén tudtok támogatni bennünket minden visszaváltás alkalmával. 💞"
              )}
            </p>
          </div>
        </div>

        <p className="mt-8 font-display text-lg font-semibold">
          {block(blocks, "segits.repont.closing", "Kortyolj 🥤, mosolyogj 😊, és ments életeket 🐾❤️ – ennyire egyszerű!")}
        </p>
      </Section>

      {/* További segítési lehetőségek */}
      {helpCategories.length > 0 && (
        <Section tone="ink">
          <h2 className="text-center font-display text-3xl font-semibold sm:text-4xl">
            {block(blocks, "segits.other.title", "További segítési lehetőségek")}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {helpCategories.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-xl2 bg-cream-100/10 p-6 backdrop-blur-sm">
                <span className="text-2xl">{item.icon}</span>
                <p className="font-display text-lg font-semibold">{item.title}</p>
                <p className="flex-1 text-sm text-cream-100/75">{item.shortDescription}</p>
                {item.buttonText && item.buttonUrl && (
                  <LinkButton href={item.buttonUrl} variant="outline" size="sm" className="mt-2 self-start border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-ink-900">
                    {item.buttonText}
                  </LinkButton>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
