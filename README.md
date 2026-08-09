# Cat TNR Fehérvár — weboldal

Next.js 14 (App Router) + TypeScript + Tailwind CSS alapú, mobil-first weboldal a Cat TNR Fehérvár macskamentő közösség számára.

## Indítás

Ez a projekt **fejlesztői sandboxban készült internet-hozzáférés nélkül**, ezért a `node_modules` nincs telepítve. A te gépeden, internet-kapcsolattal:

```bash
npm install
npm run dev
```

Nyisd meg: http://localhost:3000

Build ellenőrzéshez:

```bash
npm run build
```

> A kód TypeScript szintaxis-ellenőrzésen átesett (`tsc --noEmit`), de a teljes `next build` futtatása és a vizuális ellenőrzés a te géped internetkapcsolatával lehetséges (a Next.js/React csomagok letöltéséhez, illetve a Google Fonts betöltéséhez).

## Mit tartalmaz

- **13 oldal**: főoldal, gazdira váró cicák (szűrhető katalógus), cica adatlap, örökbefogadás menete + jelentkezési űrlap, segíts/támogass, önkéntes, ideiglenes befogadó, szállító, mentéseink (lista + egyedi történet), rólunk, kapcsolat, GYIK.
- **Admin-ra felkészített adatréteg** (`src/data/types.ts`, `src/data/cats.ts`, `src/data/stories.ts`): a `Cat` és `RescueStory` típusok megfelelnek egy jövőbeli CMS/Supabase tábla mezőinek, így a mock adatok egyszerűen lecserélhetők valós lekérdezésekre.
- **API route-ok** (`src/app/api/*/route.ts`): validálják az örökbefogadási, önkéntes, ideiglenes befogadói, szállítói és kapcsolatfelvételi űrlapokat, és Resenden keresztül e-mail értesítést küldenek a szervezetnek. Adatbázisba egyelőre nem írnak — ez a következő fejlesztési lépés helye (komment jelzi a kódban).
- **SEO**: dinamikus `sitemap.xml`, `robots.txt`, oldalankénti metaadatok, Open Graph, NGO és FAQPage strukturált adat (JSON-LD).
- **Akadálymentesség**: fókusz-jelölés, "ugrás a tartalomra" link, szemantikus címkék, `aria-*` attribútumok az interaktív elemeken.
- **Reszponzív navigáció**: felül sticky header (asztali), lent mobil alsó navigáció (mobil).

## Placeholder tartalom — mit kell lecserélni éles indítás előtt

A specifikáció kifejezetten tiltotta a kitalált szervezeti adatok (bankszámla, adószám, telefonszám, statisztikák, sikertörténetek) generálását. Ezért a következő helyeken **jól látható PLACEHOLDER jelölés** szerepel:

- `src/data/site.ts` — e-mail cím, telefonszám, közösségimédia-linkek, statisztikák egy része, havi átláthatósági jelentés, testimonialok.
- `src/data/cats.ts`, `src/data/stories.ts` — minta cicaprofilok és mentési történetek a katalógus/rendszer bemutatásához. Cseréld valós cicákra és esetekre.
- Fotók: mivel nem álltak rendelkezésre valós cicafotók, egy egységes, márkaszínekkel illeszkedő `PlaceholderImage` komponens jeleníti meg a fotók helyét. Amint vannak valós fotók (pl. feltöltve egy tárhelyre / Supabase Storage-ba), a `Cat.images` / `RescueStory.images` mezőket URL-ekre cserélve könnyen bevezethető a valós `next/image`.

## E-mail értesítések (Resend)

Minden űrlap beküldésekor e-mail értesítést kap a szervezet a Resend szolgáltatáson keresztül.

1. Regisztrálj a [resend.com](https://resend.com)-on (ingyenes), és hozz létre egy API kulcsot.
2. Másold a `.env.local.example` fájlt `.env.local` néven, és töltsd ki:
   - `RESEND_API_KEY` — a Resend API kulcsod.
   - `RESEND_FROM_EMAIL` — hagyd üresen, amíg nincs saját, Resendnél hitelesített domained (ilyenkor a teszt-feladót használja a kód, ami csak a Resend-fiókod e-mail címére tud kézbesíteni). Ha van hitelesített domain, add meg pl. `"Cat TNR Fehérvár <ertesites@cattnrfehervar.hu>"` formában.
   - `RESEND_TO_EMAIL` — ide érkezzenek az értesítések. Ha üresen hagyod, a `siteConfig.email` értékét használja.
3. `npm install` (ez telepíti a `resend` csomagot is), majd `npm run dev`.

A `.env.local` soha nem kerül git-be (a `.gitignore` kizárja) — a titkos kulcsot csak a saját géped ismeri.

## Szerkezet

```
src/
  app/            # oldalak (App Router)
  components/
    layout/       # header, footer, mobil navigáció
    ui/           # gombok, kártyák, badge-ek, placeholder kép, accordion
    home/         # főoldal szekciók
    cats/         # cica katalógus és kártya
    stories/      # mentési történet kártya
    forms/        # jelentkezési űrlapok
    support/      # támogatási összegválasztó
  data/           # típusok + mock adatok (CMS-re felkészítve)
  lib/            # segédfüggvények, validáció
```

## Következő lépések (fejlesztői csapatnak)

1. Valós szervezeti adatok pótlása (`src/data/site.ts`).
2. CMS/adatbázis bekötése (pl. Supabase) — a `Cat`/`RescueStory` típusok és az API route-ok erre vannak előkészítve.
3. Valós cicafotók feltöltése és a `PlaceholderImage` lecserélése `next/image`-re.
4. Fizetési szolgáltató integrálása a Segíts oldalon (`DonationSelector` komponens jelzi a helyét).
5. Admin felület kialakítása a `Cat`, `RescueStory`, `VolunteerApplication`, `AdoptionApplication` entitásokhoz.
