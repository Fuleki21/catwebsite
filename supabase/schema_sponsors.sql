-- Cat TNR Fehérvár — "Támogatóink" oldal (4. kör)
--
-- HASZNÁLAT: Supabase dashboard -> SQL Editor -> New query -> illeszd be ezt a
-- teljes fájlt -> Run. Ez a supabase/schema.sql, a supabase/schema_content.sql
-- és a supabase/schema_segits_redesign.sql UTÁN futtatandó (azokat már
-- lefuttattad).
--
-- Ez a fájl két dolgot csinál:
--   1. Létrehozza a sponsors táblát — a "Támogatóink" oldalon megjelenő,
--      admin felületről bővíthető támogatói kártyákat (cégek, vállalkozások,
--      magánszemélyek, akik támogatják a mentő munkát). Új támogató
--      hozzáadható, meglévő szerkeszthető, törölhető, ki-/bekapcsolható és
--      átrendezhető a kód módosítása nélkül.
--   2. Feltölti az oldal fejléc- és CTA-szövegeit a content_blocks táblába,
--      valamint az első támogatót: Natural Pet Care System / Burgimmune,
--      a megadott bemutatkozó szöveggel és a pontos ajánlói linkkel
--      (https://cattnrfehervar.naturalpetcaresystem.com — ez nem lett
--      módosítva vagy kitalálva, pontosan a megadott URL).

-- ============ SPONSORS (bővíthető lista — "Támogatóink") ============
create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null default '',
  image_url text not null default '',
  short_bio text not null default '',
  support_type text not null default '',
  description text not null default '',
  referral_url text not null default '',
  referral_button_text text not null default '',
  website_url text not null default '',
  facebook_url text not null default '',
  instagram_url text not null default '',
  visible boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sponsors enable row level security;
drop policy if exists "Public read sponsors" on public.sponsors;
create policy "Public read sponsors" on public.sponsors for select using (true);

-- A public.set_updated_at() függvény már létezik a schema_content.sql-ből.
drop trigger if exists sponsors_set_updated_at on public.sponsors;
create trigger sponsors_set_updated_at before update on public.sponsors
  for each row execute function public.set_updated_at();

insert into public.sponsors (
  name, logo_url, image_url, short_bio, support_type, description,
  referral_url, referral_button_text, website_url, facebook_url, instagram_url,
  visible, position
) values (
  'Natural Pet Care System / N.P.C.S.',
  '',
  '',
  '🌿🐾 A Natural Pet Care System természetes, prémium minőségű, állatorvosi fejlesztésű termékeivel nemcsak kedvenced egészségét támogatod, hanem a mentett cicák ellátásához is hozzájárulsz. ❤️',
  'Immunerősítő termékek (Burgimmune)',
  'Ha rendszeresen vásárolsz Burgimmune immunerősítő termékeket, az alábbi ajánló linken keresztül a cicáinknak is segíthetsz, plusz költség nélkül.',
  'https://cattnrfehervar.naturalpetcaresystem.com',
  '🐾 Vásárolj Burgimmune termékeket és támogasd a cicákat',
  '',
  '',
  '',
  true,
  0
)
on conflict do nothing;

-- ============ CONTENT BLOCKS: Támogatóink oldal fejléc + CTA ============
insert into public.content_blocks (key, value) values
  ('tamogatoink.header.eyebrow', 'Támogatóink'),
  ('tamogatoink.header.title', '🐾 Segítség nem csak pénzben érkezhet 🐾'),
  ('tamogatoink.header.intro', 'Nem csak anyagi támogatással lehet segíteni a mentett cicákat. Örömmel fogadnánk olyan cégek, vállalkozások jelentkezését, akik táppal, konzervvel, alommal, immunerősítőkkel vagy egyéb hasznos termékekkel tudnák támogatni a munkánkat.

Számunkra minden egyes zsák táp, doboz alom vagy konzerv kézzelfogható segítség. Ezekből lesznek a teli pocakok, a felépülő beteg cicák és az új esélyek.

💙 Ha céged szívesen állna egy jó ügy mellé, örömmel vesszük a kapcsolatfelvételt. Együtt még több bajba jutott cicának tudunk segíteni.

Mert egyetlen zsák táp is többet jelenthet, mint gondolnád: biztonságot, gyógyulást és reményt. 🐾'),
  ('tamogatoink.list.title', '❤️ Támogatóink'),
  ('tamogatoink.cta.title', '💙 Legyél te is a támogatóink egyike!'),
  ('tamogatoink.cta.text', 'Ha cégeddel, vállalkozásoddal vagy magánszemélyként szeretnéd támogatni a mentett cicákat, vedd fel velünk a kapcsolatot!

Legyen szó tápról, alomról, felszerelésről, immunerősítőről vagy bármilyen más hasznos segítségről, minden hozzájárulás számít.'),
  ('tamogatoink.cta.button_text', 'Kapcsolatfelvétel'),
  ('tamogatoink.cta.button_url', '/kapcsolat')
on conflict (key) do nothing;
