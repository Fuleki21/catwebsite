-- Cat TNR Fehérvár — bővített tartalomkezelés (2. kör)
--
-- HASZNÁLAT: Supabase dashboard -> SQL Editor -> New query -> illeszd be ezt a
-- teljes fájlt -> Run. Ez a supabase/schema.sql UTÁN futtatandó (azt már
-- lefuttattad). Ez a fájl három új táblát hoz létre:
--   - content_blocks: minden oldal fejléce, bekezdései, fix listái (kulcs -> szöveg)
--   - faq_items: a GYIK oldal + örökbefogadás oldal kérdés-válaszai (bővíthető lista)
--   - help_budget_items: a "Mire megy a támogatás" tételei (bővíthető lista)
-- Mindegyik fel van töltve a jelenlegi weboldal-szöveggel, hogy ne induljon
-- üresen egyik admin űrlap se.

-- ============ CONTENT BLOCKS (kulcs -> szöveg) ============
create table if not exists public.content_blocks (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.content_blocks enable row level security;
drop policy if exists "Public read content_blocks" on public.content_blocks;
create policy "Public read content_blocks" on public.content_blocks for select using (true);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists content_blocks_set_updated_at on public.content_blocks;
create trigger content_blocks_set_updated_at before update on public.content_blocks
  for each row execute function public.set_updated_at();

insert into public.content_blocks (key, value) values
  ('site.tagline', 'Minden cica megérdemel egy esélyt.'),
  ('site.description', 'A Cat TNR Fehérvár gazdátlan, kóbor és rászoruló cicák mentésén, rehabilitációján és gazdásításán dolgozik Székesfehérváron és környékén.'),
  ('site.email', 'PLACEHOLDER@example.com'),
  ('site.phone', 'PLACEHOLDER'),
  ('site.facebook_url', 'https://www.facebook.com/PLACEHOLDER'),
  ('site.instagram_url', 'https://www.instagram.com/PLACEHOLDER'),
  ('site.operating_area', 'Székesfehérvár és környéke'),
  ('site.legal_status_note', 'Közösségi kezdeményezésként működünk — nem vagyunk bejegyzett alapítvány. (Ez az állítás megerősítésre vár; frissítsd, ha a szervezeti forma változik.)'),

  ('home.hero.badge', 'Székesfehérvár és környéke'),
  ('home.hero.headline', 'Minden cica megérdemel egy esélyt.'),
  ('home.hero.subtext', 'A Cat TNR Fehérvár gazdátlan, kóbor és rászoruló cicák mentésén, rehabilitációján és gazdásításán dolgozik.'),
  ('home.hero.stat_number', '80+ cica'),
  ('home.hero.stat_caption', 'kapott már segítséget'),
  ('home.help_ways.eyebrow', 'Csatlakozz'),
  ('home.help_ways.title', 'Így segíthetsz'),
  ('home.help_ways.0.title', 'Támogass anyagilag'),
  ('home.help_ways.0.description', 'Már egy kisebb rendszeres összeg is fedez egy oltást vagy egy hét tápot egy mentett cicának.'),
  ('home.help_ways.1.title', 'Legyél ideiglenes befogadó'),
  ('home.help_ways.1.description', 'Adj otthont egy cicának a gyógyulás vagy a gazdikeresés idejére.'),
  ('home.help_ways.2.title', 'Segíts szállítással'),
  ('home.help_ways.2.description', 'Vidd el egy cicát az állatorvoshoz, ideiglenes helyre vagy új gazdijához.'),
  ('home.help_ways.3.title', 'Legyél önkéntes'),
  ('home.help_ways.3.description', 'Posztírás, fotózás, gazdikeresés, események — sokféleképp segíthetsz.'),
  ('home.why_need.eyebrow', 'Miért van szükségünk rád?'),
  ('home.why_need.title', 'Minden adomány közvetlenül a cicákhoz kerül.'),
  ('home.why_need.text', 'A mentett és gondozott cicák ellátása folyamatos költséget jelent. Mutatjuk, mire fordítjuk a segítséget, amit tőled kapunk.'),
  ('home.adoption_steps.eyebrow', 'Örökbefogadnál?'),
  ('home.adoption_steps.title', 'Egyszerű, 4 lépéses folyamat'),
  ('home.adoption_steps.0.title', 'Nézd meg a cicákat'),
  ('home.adoption_steps.0.description', 'Böngéssz a gazdit kereső cicáink között, és találd meg, aki hozzád illik.'),
  ('home.adoption_steps.1.title', 'Töltsd ki az adatlapot'),
  ('home.adoption_steps.1.description', 'Mesélj magadról és az otthonodról egy rövid örökbefogadási űrlapon.'),
  ('home.adoption_steps.2.title', 'Beszélünk veled'),
  ('home.adoption_steps.2.description', 'Felvesszük veled a kapcsolatot, hogy jobban megismerjük egymást.'),
  ('home.adoption_steps.3.title', 'Megismerkedtek'),
  ('home.adoption_steps.3.description', 'Személyesen találkoztok, és ha minden stimmel, hazaviheted.'),
  ('home.featured_cats.eyebrow', 'Örökbefogadás'),
  ('home.featured_cats.title', 'Ők most gazdit keresnek'),
  ('home.story_highlight.eyebrow', 'Egy mentés története'),

  ('segits.header.eyebrow', 'Segíts'),
  ('segits.header.title', 'Már egy kisebb összeg is hatalmas segítség.'),
  ('segits.header.description', 'Támogatásod közvetlenül a mentett cicák ellátására megy — állatorvosi költségre, gyógyszerre, tápra, ivartalanításra.'),
  ('segits.transparency.eyebrow', 'Átláthatóság'),
  ('segits.transparency.title', 'Mire használjuk a támogatást?'),
  ('segits.other_ways.title', 'Másképp is segíthetsz'),
  ('segits.other_ways.text', 'Nem csak pénzzel lehet támogatni — az idő, a figyelem és egy megosztás is sokat számít.'),

  ('onkentes.header.eyebrow', 'Csatlakozz'),
  ('onkentes.header.title', 'Nem kell cicát örökbe fogadnod ahhoz, hogy életet ments.'),
  ('onkentes.header.description', 'Az önkéntesek nélkül nem működne a Cat TNR Fehérvár. Sokféle módon segíthetsz, akkor is, ha épp nincs otthon helyed egy cicának.'),
  ('onkentes.opportunities.0.title', 'Posztírás'),
  ('onkentes.opportunities.0.description', 'Segíts megírni a cicák bemutató szövegeit és a híreket.'),
  ('onkentes.opportunities.1.title', 'Fotózás'),
  ('onkentes.opportunities.1.description', 'Készíts minőségi, szerethető fotókat a mentett cicákról.'),
  ('onkentes.opportunities.2.title', 'Videózás'),
  ('onkentes.opportunities.2.description', 'Rövid videók, amik megmutatják egy-egy cica személyiségét.'),
  ('onkentes.opportunities.3.title', 'Gazdikeresés'),
  ('onkentes.opportunities.3.description', 'Segíts megtalálni a tökéletes családot egy-egy cicához.'),
  ('onkentes.opportunities.4.title', 'Social media'),
  ('onkentes.opportunities.4.description', 'Facebook és Instagram tartalom tervezése, kezelése.'),
  ('onkentes.opportunities.5.title', 'Cégek megkeresése'),
  ('onkentes.opportunities.5.description', 'Támogatói kapcsolatok építése helyi vállalkozásokkal.'),
  ('onkentes.opportunities.6.title', 'Adománygyűjtés'),
  ('onkentes.opportunities.6.description', 'Kampányok és gyűjtések szervezése, lebonyolítása.'),
  ('onkentes.opportunities.7.title', 'Kapcsolattartás'),
  ('onkentes.opportunities.7.description', 'Jelentkezők és érdeklődők megkeresésének koordinálása.'),
  ('onkentes.opportunities.8.title', 'Események'),
  ('onkentes.opportunities.8.description', 'Részvétel és segítség rendezvényeken, akciónapokon.'),
  ('onkentes.why.eyebrow', 'Miért fontos?'),
  ('onkentes.why.title', 'Amit egy önkéntes ad, azt semmi más nem pótolja'),
  ('onkentes.why.benefits.0', 'Több időnk jut a cicák közvetlen gondozására'),
  ('onkentes.why.benefits.1', 'Gyorsabban találunk gazdit a várakozóknak'),
  ('onkentes.why.benefits.2', 'Szélesebb kört érünk el a támogatásgyűjtésben'),
  ('onkentes.why.benefits.3', 'Erősebb, megbízhatóbb közösség épül köréd'),
  ('onkentes.form.title', 'Önkéntes jelentkezés'),
  ('onkentes.form.intro', 'Válaszd ki, miben tudsz segíteni — a többit megbeszéljük.'),

  ('ideiglenes.header.eyebrow', 'Csatlakozz'),
  ('ideiglenes.header.title', 'Adj otthont egy cicának — egy időre.'),
  ('ideiglenes.header.description', 'Az ideiglenes befogadás híd a mentés és az örökbefogadás között. Nem kell örökre vállalnod — csak addig, amíg szükség van rád.'),
  ('ideiglenes.faqs.0.question', 'Mi az ideiglenes befogadás?'),
  ('ideiglenes.faqs.0.answer', 'Otthont adsz egy cicának egy meghatározott, előre egyeztetett időszakra — amíg gyógyul, felnő, vagy amíg gazdit talál. Nem örökbefogadás, a cica továbbra is a szervezet felügyelete alatt marad.'),
  ('ideiglenes.faqs.1.question', 'Milyen cicáknak van erre szükségük?'),
  ('ideiglenes.faqs.1.answer', 'Leggyakrabban kölyköknek, gyógyulófélben lévő vagy félénk cicáknak, illetve olyanoknak, akiknek egyszerűen nincs még hely az állandó befogadóhelyünkön.'),
  ('ideiglenes.faqs.2.question', 'Mire számíthatsz befogadóként?'),
  ('ideiglenes.faqs.2.answer', 'Napi gondoskodásra, etetésre, alomtisztításra, és arra, hogy figyeld a cica állapotát, viselkedését. Cserébe az egyik legközvetlenebb élményt kapod: látod, ahogy egy cica sorsa jobbra fordul.'),
  ('ideiglenes.faqs.3.question', 'Mit biztosít a szervezet?'),
  ('ideiglenes.faqs.3.answer', 'Az állatorvosi költségeket, a szükséges felszerelést (pl. szállítóbox, alom, adott esetben táp) és folyamatos szakmai támogatást a befogadás alatt.'),
  ('ideiglenes.faqs.4.question', 'Milyen időtartamra van szükség?'),
  ('ideiglenes.faqs.4.answer', 'Ez cicánként eltérő — pár héttől néhány hónapig terjedhet. Ezt mindig előre egyeztetjük, és tartjuk a kapcsolatot a befogadás alatt.'),
  ('ideiglenes.form.eyebrow', 'Jelentkezés'),
  ('ideiglenes.form.title', 'Befogadó leszek'),

  ('szallito.header.eyebrow', 'Csatlakozz'),
  ('szallito.header.title', 'Van autód és néha 1-2 órád?'),
  ('szallito.header.description', 'A szállítás sokszor a mentés legkritikusabb láncszeme. Ha van egy kis szabad időd és autód, rengeteget segíthetsz.'),
  ('szallito.usecases.0.title', 'Állatorvoshoz'),
  ('szallito.usecases.0.description', 'Kontrollra, oltásra vagy sürgősségi ellátásra viszel egy cicát.'),
  ('szallito.usecases.1.title', 'Ideiglenes helyre'),
  ('szallito.usecases.1.description', 'Egy frissen mentett cica eljuttatása egy befogadóhoz.'),
  ('szallito.usecases.2.title', 'Új gazdihoz'),
  ('szallito.usecases.2.description', 'Az örökbefogadás utolsó lépése — hazajuttatod a cicát.'),
  ('szallito.usecases.3.title', 'Mentéshez'),
  ('szallito.usecases.3.description', 'Segítesz kijutni egy helyszínre egy bejelentett mentésnél.'),
  ('szallito.form.eyebrow', 'Jelentkezés'),
  ('szallito.form.title', 'Szállító leszek'),

  ('rolunk.header.eyebrow', 'Rólunk'),
  ('rolunk.header.title', 'Egy maroknyi ember, akiknek fontosak a gazdátlan cicák'),
  ('rolunk.header.description', 'Nem egy nagy szervezet vagyunk irodával és sok alkalmazottal — hétköznapi emberek, akik szabadidejükben mentenek, gondoznak és gazdit keresnek.'),
  ('rolunk.who.title', 'Kik vagyunk?'),
  ('rolunk.who.text', 'A Cat TNR Fehérvár egy Székesfehérváron és környékén tevékenykedő közösségi kezdeményezés, amely gazdátlan, kóbor és rászoruló cicák mentésével, ivartalanításával, gondozásával és gazdásításával foglalkozik.'),
  ('rolunk.why.title', 'Miért csináljuk?'),
  ('rolunk.why.text', 'Mert minden nap találkozunk olyan cicákkal, akiknek senki nem segítene, ha mi nem tesszük meg. A cél egyszerű: kevesebb szenvedés, több biztonságos, szerető otthon.'),
  ('rolunk.how.title', 'Hogyan dolgozunk?'),
  ('rolunk.how.text', 'Bejelentésekre reagálunk, TNR-akciókat (befogás–ivartalanítás–visszaengedés/gazdásítás) szervezünk, ideiglenes befogadóknál helyezzük el a rászorulókat, és alaposan felmérjük a jelentkező gazdikat, mielőtt egy cica hazakerül.'),
  ('rolunk.values.eyebrow', 'Amiben hiszünk'),
  ('rolunk.values.title', 'Az értékeink'),
  ('rolunk.values.0.title', 'Minden élet számít'),
  ('rolunk.values.0.description', 'Nem válogatunk aközött, kit érdemes segíteni — minden rászoruló cica esélyt kap.'),
  ('rolunk.values.1.title', 'Közösségi erő'),
  ('rolunk.values.1.description', 'Amit egyedül nem tudnánk megoldani, azt önkéntesekkel, befogadókkal, támogatókkal együtt igen.'),
  ('rolunk.values.2.title', 'Felelős gazdásítás'),
  ('rolunk.values.2.description', 'Nem csak kihelyezünk — utánkövetjük, hogy tartós, jó otthonra találjanak a cicák.'),
  ('rolunk.values.3.title', 'Gyors reagálás'),
  ('rolunk.values.3.description', 'Egy bejelentett vészhelyzetnél minden perc számít — igyekszünk azonnal cselekedni.'),
  ('rolunk.cta.title', 'Miért van szükségünk rád?'),
  ('rolunk.cta.text', 'Önkéntesek, befogadók és támogatók nélkül a legtöbb bejelentett cicának nem tudnánk segíteni. Bármilyen kis szerep sokat számít.'),

  ('kapcsolat.header.eyebrow', 'Kapcsolat'),
  ('kapcsolat.header.title', 'Írj nekünk bátran'),
  ('kapcsolat.header.description', 'Kérdésed van egy cicáról, az örökbefogadásról vagy arról, hogyan tudsz segíteni? Vedd fel velünk a kapcsolatot.'),
  ('kapcsolat.urgent_note', 'Sürgős, bajba jutott cicával kapcsolatos bejelentés esetén kérjük, jelezd ezt üzeneted elején — így soron kívül kezeljük.'),

  ('gyik.header.eyebrow', 'GYIK'),
  ('gyik.header.title', 'Gyakori kérdések'),
  ('gyik.header.description', 'Nem találod a válaszod? Írj nekünk a Kapcsolat oldalon.'),

  ('orokbefogadas.header.eyebrow', 'Örökbefogadás'),
  ('orokbefogadas.header.title', 'Így zajlik egy örökbefogadás'),
  ('orokbefogadas.header.description', 'Nem bürokrácia — beszélgetés. Azért kérdezünk sokat, hogy biztosan jó otthonra találjon a választott cica.'),
  ('orokbefogadas.steps.0.title', 'Ismerkedj a cicákkal'),
  ('orokbefogadas.steps.0.description', 'Nézd át a gazdit kereső cicáink adatlapjait, és találd meg, aki hozzád illik.'),
  ('orokbefogadas.steps.1.title', 'Töltsd ki a jelentkezési űrlapot'),
  ('orokbefogadas.steps.1.description', 'Meséld el, milyen otthont tudsz kínálni — ez segít abban, hogy jó párost találjunk.'),
  ('orokbefogadas.steps.2.title', 'Beszélgetünk'),
  ('orokbefogadas.steps.2.description', 'Felvesszük veled a kapcsolatot telefonon vagy e-mailben, hogy megismerjük egymást.'),
  ('orokbefogadas.steps.3.title', 'Személyes találkozó'),
  ('orokbefogadas.steps.3.description', 'Egyeztetünk egy időpontot, hogy találkozhass a kiválasztott cicával.'),
  ('orokbefogadas.steps.4.title', 'Hazaviheted'),
  ('orokbefogadas.steps.4.description', 'Ha minden stimmel, papírmunka és rövid eligazítás után elkezdődhet a közös élet.'),
  ('orokbefogadas.form.title', 'Örökbefogadási jelentkezés'),
  ('orokbefogadas.form.intro', 'Töltsd ki az alábbi űrlapot — minél részletesebben mesélsz magatokról, annál gyorsabban tudunk visszajelezni.'),

  ('forms.adoption.success_title', 'Megkaptuk a jelentkezésedet!'),
  ('forms.adoption.success_description', 'Köszönjük, hogy örökbefogadáson gondolkodsz. Hamarosan e-mailben vagy telefonon jelentkezünk egy rövid beszélgetésre.'),
  ('forms.volunteer.success_title', 'Köszönjük a jelentkezésedet!'),
  ('forms.volunteer.success_description', 'Örülünk, hogy csatlakoznál hozzánk. Hamarosan felvesszük veled a kapcsolatot a részletekről.'),
  ('forms.foster.success_title', 'Köszönjük a jelentkezésedet!'),
  ('forms.foster.success_description', 'Nagyon sokat jelent, hogy otthont adnál egy rászoruló cicának. Hamarosan jelentkezünk a részletekkel.'),
  ('forms.transport.success_title', 'Köszönjük a jelentkezésedet!'),
  ('forms.transport.success_description', 'Amint szállítási segítségre lesz szükség a közeledben, keresünk.'),
  ('forms.contact.success_title', 'Üzenetedet megkaptuk!'),
  ('forms.contact.success_description', 'Hamarosan válaszolunk a megadott e-mail címre.')
on conflict (key) do nothing;

-- ============ FAQ ITEMS (bővíthető lista — GYIK oldal + örökbefogadás oldal) ============
create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null default '',
  position integer not null default 0,
  show_in_adoption_page boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.faq_items enable row level security;
drop policy if exists "Public read faq_items" on public.faq_items;
create policy "Public read faq_items" on public.faq_items for select using (true);

drop trigger if exists faq_items_set_updated_at on public.faq_items;
create trigger faq_items_set_updated_at before update on public.faq_items
  for each row execute function public.set_updated_at();

insert into public.faq_items (question, answer, position, show_in_adoption_page) values
  ('Hogyan fogadhatok örökbe egy cicát?', 'Nézd át a gazdit kereső cicáink listáját, válaszd ki azt, aki megérintett, majd töltsd ki az örökbefogadási jelentkezési űrlapot. Ezt követően felvesszük veled a kapcsolatot egy rövid beszélgetésre, majd egyeztetünk egy személyes találkozót a kiválasztott cicával.', 0, true),
  ('Mennyibe kerül az örökbefogadás?', 'Az örökbefogadás részleteiről (esetleges hozzájárulás, ami az ivartalanítás/oltások költségeit fedezi) a jelentkezés után, személyes egyeztetés során tájékoztatunk. Ez oldalanként/cicánként eltérő lehet.', 1, true),
  ('Mit tartalmaz az örökbefogadás?', 'Minden általunk kihelyezett cica ivartalanított, oltott és chipes, amennyiben életkora és egészségi állapota ezt lehetővé teszi. Az örökbefogadás után is elérhetőek vagyunk kérdéseiddel.', 2, true),
  ('Lehetek ideiglenes befogadó?', 'Igen, mindig keresünk megbízható ideiglenes befogadókat, akik otthont adnak egy-egy cicának a gyógyulás vagy a gazdikeresés idejére. Részletekért látogass el az Ideiglenes befogadó oldalra.', 3, false),
  ('Hogyan tudok szállításban segíteni?', 'Ha van autód és időnként egy-két szabad órád, sokat segíthetsz azzal, hogy elviszel egy cicát az állatorvoshoz, egy ideiglenes helyre vagy az új gazdijához. Jelentkezz a Szállító leszek oldalon.', 4, false),
  ('Hogyan tudok pénzzel segíteni?', 'A Segíts/Támogass oldalon találsz erre lehetőséget, egyszeri vagy rendszeres formában is. Már egy kisebb összeg is számít.', 5, false),
  ('Mire használják az adományokat?', 'Elsősorban állatorvosi költségekre, gyógyszerekre, ivartalanításra, oltásokra, tápra és alomra, valamint sürgősségi mentésekre fordítjuk. A Segíts oldalon részletesen is bemutatjuk, mire megy a támogatás.', 6, false),
  ('Mi történik, ha nem tudom tovább vállalni az ideiglenesen befogadott cicát?', 'Ilyen esetben mindig keress meg minket előre egyeztetett időpontban — megoldást találunk együtt, legyen szó egy másik ideiglenes helyről vagy a gazdikeresés felgyorsításáról.', 7, false),
  ('Van lehetőség másik cica mellé örökbefogadni?', 'Igen, több cicánk kifejezetten macskatársat keres. A szűrők között a „másik cica mellé” opcióval könnyen megtalálod őket.', 8, true)
on conflict do nothing;

-- ============ HELP BUDGET ITEMS (bővíthető lista — "Mire megy a támogatás") ============
create table if not exists public.help_budget_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  note text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.help_budget_items enable row level security;
drop policy if exists "Public read help_budget_items" on public.help_budget_items;
create policy "Public read help_budget_items" on public.help_budget_items for select using (true);

drop trigger if exists help_budget_items_set_updated_at on public.help_budget_items;
create trigger help_budget_items_set_updated_at before update on public.help_budget_items
  for each row execute function public.set_updated_at();

insert into public.help_budget_items (label, note, position) values
  ('Állatorvosi ellátás', 'vizsgálat, kezelés, sürgősségi ellátás', 0),
  ('Ivartalanítás', 'a szaporulat megelőzése, TNR-programok', 1),
  ('Oltások', 'veszettség, macskanátha elleni védőoltások', 2),
  ('Gyógyszerek', 'antibiotikum, féreghajtó, bolhairtó', 3),
  ('Táp és alom', 'napi ellátás a mentett cicáknak', 4),
  ('Ideiglenes befogadás', 'szállás a gazdikeresés idejére', 5)
on conflict do nothing;
