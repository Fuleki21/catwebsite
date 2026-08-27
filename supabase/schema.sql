-- Cat TNR Fehérvár — Supabase séma és minta-adat feltöltés
--
-- HASZNÁLAT: Supabase dashboard -> SQL Editor -> New query -> illeszd be ezt a
-- teljes fájlt -> Run. Egyszer kell lefuttatni. Utána a "storage.buckets" és
-- a két tábla (cats, stories) létrejön, feltöltve a jelenlegi minta-adatokkal,
-- amiket az admin felületen bármikor szerkeszthetsz/törölhetsz.

create extension if not exists pgcrypto;

-- ============ CATS ============
create table if not exists public.cats (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  age_label text not null default '',
  age_months_approx integer not null default 0,
  gender text not null check (gender in ('nőstény', 'kandúr')),
  neutered boolean not null default false,
  vaccinated boolean not null default false,
  chipped boolean not null default false,
  indoor_only boolean not null default true,
  -- NULL = "ismeretlen" (ismeretlen/nem tudni)
  good_with_children boolean,
  good_with_cats boolean,
  good_with_dogs boolean,
  temperament text[] not null default '{}',
  status text not null default 'gazdit_keres' check (status in ('gazdit_keres', 'foglalt', 'orokbefogadva')),
  featured boolean not null default false,
  short_description text not null default '',
  story text not null default '',
  health text not null default '',
  seeking_home text not null default '',
  images text[] not null default '{}',
  arrival_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ STORIES ============
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text[] not null default '{}',
  cat_slug text,
  date date not null default current_date,
  featured boolean not null default false,
  stage text not null default 'utcarol' check (stage in ('utcarol', 'mentes', 'gyogyulas', 'uj_otthon')),
  images text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- updated_at automatikus frissítése
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists cats_set_updated_at on public.cats;
create trigger cats_set_updated_at before update on public.cats
  for each row execute function public.set_updated_at();

drop trigger if exists stories_set_updated_at on public.stories;
create trigger stories_set_updated_at before update on public.stories
  for each row execute function public.set_updated_at();

-- ============ RLS: mindenki olvashat, csak a szerver (service role) írhat ============
alter table public.cats enable row level security;
alter table public.stories enable row level security;

drop policy if exists "Public read cats" on public.cats;
create policy "Public read cats" on public.cats for select using (true);

drop policy if exists "Public read stories" on public.stories;
create policy "Public read stories" on public.stories for select using (true);

-- (Nincs insert/update/delete policy anon/authenticated szerepkörre — az admin
-- felület a service role kulccsal ír, ami mindig megkerüli az RLS-t.)

-- ============ STORAGE: "photos" bucket a fotóknak ============
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

drop policy if exists "Public read photos" on storage.objects;
create policy "Public read photos" on storage.objects
  for select using (bucket_id = 'photos');

-- ============ MINTA ADATOK (a jelenlegi demó-tartalom átköltöztetve) ============
-- Ezeket bármikor szerkesztheted/törölheted az admin felületen — csak azért
-- kerülnek be, hogy ne induljon üresen az oldal.

insert into public.cats
  (slug, name, age_label, age_months_approx, gender, neutered, vaccinated, chipped, indoor_only,
   good_with_children, good_with_cats, good_with_dogs, temperament, status, featured,
   short_description, story, health, seeking_home, images, arrival_date)
values
  ('morzsa', 'Morzsa', '8 hónapos', 8, 'nőstény', true, true, true, true,
   true, true, null, array['játékos','dorombolós','ölbemászó'], 'gazdit_keres', true,
   'Kíváncsi, játékos kis cirmos, aki imád ölbe bújni esténként.',
   'Morzsát pár hónapos korában találtuk egy fehérvári udvarban, testvéreivel együtt. A többiek már gazdira leltek, Morzsa még minket vár.',
   'Egészséges, rendszeres állatorvosi ellenőrzésen átesett.',
   'Nyugodt, lakásbeli otthont keresünk neki, ahol van ideje játékra és bújásra egyaránt.',
   array['cat-morzsa-1','cat-morzsa-2'], '2026-03-12'),

  ('cirmi', 'Cirmi', '2 éves', 24, 'kandúr', true, true, true, false,
   true, true, true, array['nyugodt','önálló'], 'gazdit_keres', true,
   'Higgadt, barátságos fickó, aki minden élőlénnyel megtalálja a hangot.',
   'Cirmit egy TNR-akció során fogtuk be ivartalanításra, de kiderült, hogy nem is annyira vad — inkább csak magára hagyott házi cica volt.',
   'Egészséges. Enyhén érzékeny gyomra van, speciális tápot igényel.',
   'Kertes házba is költözhetne, kijárós életmódhoz szokott, de lakásban is jól érzi magát.',
   array['cat-cirmi-1','cat-cirmi-2'], '2025-11-02'),

  ('tappancs', 'Tappancs', '4 hónapos', 4, 'kandúr', false, true, false, true,
   true, true, null, array['játékos','bátor'], 'gazdit_keres', true,
   'Aprócska energiabomba, akinek sosem áll meg a farka.',
   'Tappancsot és két testvérét egy pincéből mentettük ki, ahol az anyjuk hagyta őket néhány hetesen.',
   'Ivartalanítás előtt áll, ideiglenes befogadónál nő fel örökbefogadásig.',
   'Türelmes gazdit keresünk, aki elviseli egy kiscica energiáit — vagy inkább kettőt fogad örökbe egyszerre.',
   array['cat-tappancs-1'], '2026-06-20'),

  ('luna', 'Luna', '5 éves', 60, 'nőstény', true, true, true, true,
   false, false, false, array['félénk','nyugodt'], 'gazdit_keres', false,
   'Csendes, visszahúzódó hölgy, akinek türelmes, egyedülálló otthon dukál.',
   'Luna egy idős gazdija elvesztése után került hozzánk. Nehezen nyílik meg, de akiben megbízik, azt élete végéig szereti.',
   'Egészséges, éves kontrollra jár. Kissé túlsúlyos, diétás tápra van szüksége.',
   'Egyedüli cicaként, nyugodt háztartásba illik, ahol van ideje lassan megismerkedni.',
   array['cat-luna-1'], '2025-09-15'),

  ('gesztenye', 'Gesztenye', '1 éves', 12, 'kandúr', true, true, true, false,
   true, true, true, array['dorombolós','ölbemászó','nyugodt'], 'foglalt', false,
   'Mindenki kedvence — most épp ismerkedik leendő családjával.',
   'Gesztenyét kölyökként mentettük az útról, azóta sokat fejlődött. Hamarosan hazaköltözik.',
   'Egészséges, minden oltása megvan.',
   'Már folyamatban van egy jelentkezés, de tartalék érdeklődőket is szívesen fogadunk.',
   array['cat-gesztenye-1'], '2025-08-01'),

  ('picur', 'Picur', '10 hónapos', 10, 'nőstény', true, true, true, true,
   true, true, null, array['játékos','bátor','dorombolós'], 'gazdit_keres', true,
   'Apró termetű, de annál bátrabb — imádja felfedezni a lakást.',
   'Picur és testvérei egy garázsban születtek. A testvérei már gazdisak, ő még minket vár.',
   'Egészséges, ivartalanítva.',
   'Egy másik, barátságos cica mellé is szívesen költözne, de egyedüliként is boldogul.',
   array['cat-picur-1'], '2026-01-18'),

  ('felho', 'Felhő', '3 éves', 36, 'nőstény', true, true, true, true,
   true, false, false, array['nyugodt','önálló','dorombolós'], 'gazdit_keres', false,
   'Szürke bundájú szépség, aki kizárólagos figyelemre vágyik.',
   'Felhőt egy költözés után hagyták az utcán. Azóta nálunk vár egy család, aki csak neki szurkol.',
   'Egészséges, ivartalanítva, oltva.',
   'Egyedüli cicaként keres otthont, ahol ő az egyetlen kedvenc.',
   array['cat-felho-1'], '2025-12-05'),

  ('borsika', 'Borsika', '6 hónapos', 6, 'nőstény', false, true, false, true,
   true, true, null, array['játékos','bátor','ölbemászó'], 'gazdit_keres', false,
   'Kis csibész, aki azonnal beköltözik a szívekbe — és az ölbe.',
   'Borsikát anyjával együtt mentettük egy elhagyatott telekről. Azóta virul.',
   'Ivartalanítás előtt áll, oltásai folyamatban.',
   'Játékos otthonba, ahol lesz ideje kibontakozni.',
   array['cat-borsika-1'], '2026-05-02'),

  ('samu', 'Samu', '7 éves', 84, 'kandúr', true, true, true, true,
   true, true, true, array['nyugodt','dorombolós'], 'gazdit_keres', false,
   'Idősebb úriember, aki már csak egy nyugodt kanapét és egy kedves kezet kér.',
   'Samu gazdája idősotthonba költözött, és nem vihette magával. Azóta ideiglenes befogadónál él.',
   'Krónikus, de jól kezelt vesebetegsége van, rendszeres kontroll mellett.',
   'Nyugodt, türelmes otthonba, ahol megbecsülik az időskort is.',
   array['cat-samu-1'], '2025-07-22')
on conflict (slug) do nothing;

insert into public.stories (slug, title, excerpt, content, cat_slug, date, featured, stage, images)
values
  ('az-utcarol-az-uj-otthonig', 'Az utcáról az új otthonig',
   'Egy hideg téli reggelen találtunk rá — ma már egy meleg nappaliban dorombol.',
   array[
     'Egy januári reggelen kaptunk bejelentést egy sérült, kóbor cicáról a belváros egyik hátsó udvarában. Amikor odaértünk, egy sovány, megfázott állatot találtunk, aki alig mert megmozdulni.',
     'Azonnal állatorvoshoz vittük. Kiderült, hogy fertőzése és alultápláltsága mellett szerencsére nem volt komolyabb sérülése. Néhány hetes gyógykezelés és egy türelmes ideiglenes befogadó után teljesen megváltozott.',
     'Ma már egy szerető családnál él, ahol a kedvenc helye a fűtött ablakpárkány. Ez a történet emlékeztet minket arra, miért fontos minden egyes bejelentés, amit komolyan veszünk.'
   ],
   null, '2026-02-14', true, 'uj_otthon', array['story-utcarol-1','story-utcarol-2','story-utcarol-3']),

  ('egy-felos-cica-elso-biztonsagos-ejszakaja', 'Egy félős cica első biztonságos éjszakája',
   'Hetekig bujkált egy ipari terület mögött, mire sikerült biztonságba helyeznünk.',
   array[
     'Hetekig figyeltük és etettük egy elvadult, rendkívül félénk cicát egy ipari terület mögött, mire sikerült csapdával biztonságosan befogni.',
     'Az első éjszakát nálunk, egy csendes, elkülönített szobában töltötte. Napokig csak a szoba sarkából figyelt minket, de a türelem meghozta gyümölcsét.',
     'Ma már ideiglenes befogadónál van, ahol lassan, a saját tempójában bizalmat épít. A célunk, hogy amikor készen áll, egy hozzá illő, nyugodt otthonba kerülhessen.'
   ],
   'luna', '2025-12-20', true, 'gyogyulas', array['story-felos-1','story-felos-2']),

  ('surgos-mentesbol-boldog-gazdis-cica', 'Sürgős mentésből boldog gazdis cica',
   'Egy éjszakai segélyhívásból indult, ma pedig egy kertes ház lakója.',
   array[
     'Éjjel kaptunk hívást egy balesetet szenvedett cicáról az egyik fehérvári kertvárosi utcában. Önkéntesünk azonnal a helyszínre sietett, majd sürgősségi ellátásra vitte.',
     'A gyógyulás lassú, de biztos volt. Az állatorvosi költségeket a támogatóink adományaiból tudtuk fedezni — enélkül nem lett volna esélye.',
     'Néhány hónappal később egy kertes házba került örökbe, ahol azóta is biztonságban és szeretetben él.'
   ],
   'cirmi', '2025-10-05', false, 'uj_otthon', array['story-surgos-1'])
on conflict (slug) do nothing;
