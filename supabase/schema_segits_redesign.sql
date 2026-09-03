-- Cat TNR Fehérvár — "Segíts" oldal újratervezése (3. kör)
--
-- HASZNÁLAT: Supabase dashboard -> SQL Editor -> New query -> illeszd be ezt a
-- teljes fájlt -> Run. Ez a supabase/schema.sql és a supabase/schema_content.sql
-- UTÁN futtatandó (azokat már lefuttattad).
--
-- Ez a fájl két dolgot csinál:
--   1. Felülírja a Segíts oldal fejlécének szövegét (a régi, kifejezetten
--      anyagi támogatásra utaló szöveget lecseréli az új, sokféle segítségre
--      utaló szövegre) — mivel ezek a sorok már léteznek a content_blocks
--      táblában a korábbi seedelésből, itt explicit UPDATE-tel írjuk felül,
--      nem "on conflict do nothing"-gal (az nem írna felül semmit).
--   2. Létrehozza a help_categories táblát — a Segíts oldal alján megjelenő,
--      admin felületről bővíthető kártyasort (pl. Önkéntesség, Ideiglenes
--      befogadás, Örökbefogadás, Megosztás, Egyéb segítség). Új kártya
--      adható hozzá, meglévő szerkeszthető, törölhető, ki-/bekapcsolható
--      és átrendezhető a kód módosítása nélkül.
--
-- A Tárgyi adományok és a REPONT szekciók szövegei (fix felépítésűek) új
-- content_blocks kulcsokként kerülnek be — ezek is itt vannak feltöltve.

-- ============ 1. Segíts fejléc felülírása (nem "do nothing", hanem explicit UPDATE) ============
update public.content_blocks set value = 'Segíts, hogy minden cica otthonra találjon' where key = 'segits.header.title';
update public.content_blocks set value = 'Nem csak anyagi támogatással segíthetsz. Egy tál eledel, egy szükséges felszerelés, egy visszaváltott palack vagy akár egy megosztás is rengeteget jelenthet számunkra és a cicák számára.' where key = 'segits.header.description';

-- ============ 2. Új content_blocks kulcsok: Tárgyi adományok, Adományok leadása, REPONT ============
insert into public.content_blocks (key, value) values
  ('segits.material.title', '🛟 Mire van most szükségünk?'),
  ('segits.material.food_title', '🥫 Minőségi nedves eledel'),
  ('segits.material.food_intro', 'A minőség számít! Nem a mennyiség, hanem a tápláló, prémium eledel adja meg az állatoknak az erőt és egészséget. 💛🐱'),
  ('segits.material.brands_title', '⭐ Ajánlott márkák'),
  ('segits.material.brands_list', 'Felix
Brit Care
Royal Canin
Real Nature
Animonda
CatShow
Eukanuba
Purina One
Hills'),
  ('segits.material.kitten_title', '🐣 Kölyöktápok'),
  ('segits.material.kitten_list', 'Royal Canin Mother & BabyCat
Smilla Kitten'),
  ('segits.material.special_title', '⚕️ Speciális tápok'),
  ('segits.material.special_list', 'Animonda Integra Protect Adult Diabetes
Smilla Veterinary Diet Urinary
Trovet Recovery Liquid'),
  ('segits.material.meds_title', '🛡️ Élősködők elleni készítmények & immunerősítők'),
  ('segits.material.meds_list', 'DmGuard T2
Minera Béres csepp
Complivit Paszta
Flumax paszta
Ferdocat féreghajtó paszta
Gastroferm Cat probioticum
Burgimmune
Kék Lukács kenőcs
Lepketapló gomba'),
  ('segits.material.meds_note', 'Ezek életmentőek lehetnek a beteg, legyengült cicáknak. 💊🐾'),
  ('segits.material.equipment_title', '🧺 Egyéb felszerelések'),
  ('segits.material.equipment_list', '🐈 Hordozók
🐾 Nagyobb méretű macska ketrecek
🪵 Kaparófák
🎾 Cica játékok
🛏️ Fekhelyek'),
  ('segits.material.warning_title', '⚠️ Fontos'),
  ('segits.material.warning_text', 'Kérjük, ne hozzatok olyan adományokat (pl. ruhát, párnát), amelyeket nem tudunk hasznosítani. Köszönjük, hogy figyeltek erre! 💛🙏'),

  ('segits.dropoff.title', 'Hol tudod leadni az adományokat?'),
  ('segits.dropoff.personal_title', '🎁 Személyes átadás'),
  ('segits.dropoff.personal_text', 'Ha tárgyi adománnyal segítenél és személyesen adnád át: írj nekünk privát üzenetet a Facebook oldalunkon, és egyeztetünk! 💬🐱'),
  ('segits.dropoff.personal_button', 'Írj nekünk Facebookon'),
  ('segits.dropoff.jopont_title', '🏪 JóPont adománybolt'),
  ('segits.dropoff.jopont_intro', 'Tárgyi adományaidat a JóPont adományboltban is le tudod adni:'),
  ('segits.dropoff.jopont1_address', '📍 Agárd – Gárdonyi Géza u. 45'),
  ('segits.dropoff.jopont1_hours', 'Nyitva: H–P 9:00–17:00 | Szo–V 9:00–12:00'),
  ('segits.dropoff.jopont1_phone', '+36-30-086-3634'),
  ('segits.dropoff.jopont2_address', '📍 Székesfehérvár – Prohászka u. 12'),
  ('segits.dropoff.jopont2_hours', 'Nyitva: H–P 9:00–17:00 | Szo 9:00–13:00'),
  ('segits.dropoff.jopont2_phone', '+36-30-086-3892'),
  ('segits.dropoff.jopont_button', 'További információ a JóPont oldalán'),
  ('segits.dropoff.jopont_url', 'https://www.jopontadomanybolt.hu/kapcsolat-32'),

  ('segits.repont.eyebrow', '♻️ Segíts a REponttal'),
  ('segits.repont.title', 'Segíts a REponttal'),
  ('segits.repont.intro', 'A visszaváltott palackok értékét is felajánlhatod a cicák javára.'),
  ('segits.repont.step1_title', '1️⃣ Válaszd a bankszámlára utalást'),
  ('segits.repont.step1_text', 'A REponton válaszd, hogy a visszaváltás összegét bankszámlára kéred.'),
  ('segits.repont.step2_title', '2️⃣ Olvasd be a QR-kódot'),
  ('segits.repont.step2_text', 'Olvasd be az alábbi QR-kódot.'),
  ('segits.repont.step3_title', '3️⃣ Kész!'),
  ('segits.repont.step3_text', 'És máris a Cat TNR tappancsaihoz érkezik a támogatás!'),
  ('segits.repont.save_note', '📱 Mentsd el a QR-kódot a telefonodra, így a jövőben is könnyedén tudtok támogatni bennünket minden visszaváltás alkalmával. 💞'),
  ('segits.repont.closing', 'Kortyolj 🥤, mosolyogj 😊, és ments életeket 🐾❤️ – ennyire egyszerű!'),
  ('segits.repont.qr_image_url', ''),

  ('segits.other.title', 'További segítési lehetőségek')
on conflict (key) do nothing;

-- ============ 3. HELP CATEGORIES (bővíthető kártyasor — "További segítési lehetőségek") ============
create table if not exists public.help_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null default '',
  short_description text not null default '',
  button_text text not null default '',
  button_url text not null default '',
  visible boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.help_categories enable row level security;
drop policy if exists "Public read help_categories" on public.help_categories;
create policy "Public read help_categories" on public.help_categories for select using (true);

-- A public.set_updated_at() függvény már létezik a schema_content.sql-ből.
drop trigger if exists help_categories_set_updated_at on public.help_categories;
create trigger help_categories_set_updated_at before update on public.help_categories
  for each row execute function public.set_updated_at();

insert into public.help_categories (title, icon, short_description, button_text, button_url, visible, position) values
  ('Önkéntesség', '🐾', 'Posztírás, fotózás, gazdikeresés, események — sokféleképp segíthetsz, akkor is, ha épp nincs otthon helyed egy cicának.', 'Önkéntes leszek', '/onkentes', true, 0),
  ('Ideiglenes befogadás', '🏠', 'Adj otthont egy cicának a gyógyulás vagy a gazdikeresés idejére.', 'Ideiglenes befogadó leszek', '/ideiglenes-befogado', true, 1),
  ('Örökbefogadás', '🏡', 'Fogadj örökbe egy gazdit kereső cicát, és adj neki végleges, szerető otthont.', 'Örökbefogadok', '/orokbefogadas', true, 2),
  ('Megosztás / közösségi média', '📣', 'Egy megosztás is rengeteget számít — segíts eljuttatni a mentett cicák történetét minél többekhez.', 'Kövess minket Facebookon', 'https://www.facebook.com/PLACEHOLDER', true, 3),
  ('Egyéb segítség', '❤️', 'Van más ötleted, ahogy segítenél? Írj nekünk, biztosan találunk rá módot.', 'Írj nekünk', '/kapcsolat', true, 4)
on conflict do nothing;
