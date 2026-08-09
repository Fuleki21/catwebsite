import { FaqItem, Testimonial } from "./types";

export const siteConfig = {
  name: "Cat TNR Fehérvár",
  tagline: "Minden cica megérdemel egy esélyt.",
  description:
    "A Cat TNR Fehérvár gazdátlan, kóbor és rászoruló cicák mentésén, rehabilitációján és gazdásításán dolgozik Székesfehérváron és környékén.",
  url: "https://www.cattnrfehervar.hu",
  // PLACEHOLDER — cserélendő a szervezet valós elérhetőségeire.
  email: "PLACEHOLDER@example.com",
  phone: "PLACEHOLDER",
  facebookUrl: "https://www.facebook.com/PLACEHOLDER",
  instagramUrl: "https://www.instagram.com/PLACEHOLDER",
  operatingArea: "Székesfehérvár és környéke",
  legalStatusNote:
    "Közösségi kezdeményezésként működünk — nem vagyunk bejegyzett alapítvány. (Ez az állítás megerősítésre vár; frissítsd, ha a szervezeti forma változik.)",
};

// Ezek a számok demonstrációs jellegűek — a valós, aktuális statisztikákkal
// kell frissíteni admin felületről. Ahol nincs megbízható adat, "PLACEHOLDER"
// szerepel a szám helyén.
export const stats = [
  { label: "gondozott cica eddig", value: "80+", isPlaceholder: false },
  { label: "sikeres örökbefogadás", value: "PLACEHOLDER", isPlaceholder: true },
  { label: "aktív önkéntes", value: "PLACEHOLDER", isPlaceholder: true },
  { label: "ivartalanított cica", value: "PLACEHOLDER", isPlaceholder: true },
];

export const helpBudgetItems = [
  { label: "Állatorvosi ellátás", note: "vizsgálat, kezelés, sürgősségi ellátás" },
  { label: "Ivartalanítás", note: "a szaporulat megelőzése, TNR-programok" },
  { label: "Oltások", note: "veszettség, macskanátha elleni védőoltások" },
  { label: "Gyógyszerek", note: "antibiotikum, féreghajtó, bolhairtó" },
  { label: "Táp és alom", note: "napi ellátás a mentett cicáknak" },
  { label: "Ideiglenes befogadás", note: "szállás a gazdikeresés idejére" },
];

// PLACEHOLDER havi bontás — cseréld valós, havonta frissülő adatra.
export const transparencyMonth = {
  monthLabel: "PLACEHOLDER hónap",
  income: "PLACEHOLDER Ft",
  expenses: [
    { label: "Állatorvosi költség", amount: "PLACEHOLDER Ft" },
    { label: "Táp és alom", amount: "PLACEHOLDER Ft" },
    { label: "Ivartalanítás", amount: "PLACEHOLDER Ft" },
    { label: "Egyéb (szállítás, felszerelés)", amount: "PLACEHOLDER Ft" },
  ],
  note: "Ez a szekció a szervezet valós, havi átláthatósági jelentésének a helye. Kérjük, töltsd fel a tényleges bevétel/kiadás adatokkal, amint rendelkezésre állnak.",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ez egy példa gazdi-visszajelzés helye. Cseréld le egy valós örökbefogadó szavaira, amint rendelkezésre áll.",
    name: "PLACEHOLDER név",
    context: "örökbefogadó szülő",
    isPlaceholder: true,
  },
  {
    quote:
      "Ez egy példa önkéntesi visszajelzés helye. Cseréld le egy valós önkéntes szavaira, amint rendelkezésre áll.",
    name: "PLACEHOLDER név",
    context: "önkéntes",
    isPlaceholder: true,
  },
  {
    quote:
      "Ez egy példa ideiglenes befogadói visszajelzés helye. Cseréld le valós történetre.",
    name: "PLACEHOLDER név",
    context: "ideiglenes befogadó",
    isPlaceholder: true,
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Hogyan fogadhatok örökbe egy cicát?",
    answer:
      "Nézd át a gazdit kereső cicáink listáját, válaszd ki azt, aki megérintett, majd töltsd ki az örökbefogadási jelentkezési űrlapot. Ezt követően felvesszük veled a kapcsolatot egy rövid beszélgetésre, majd egyeztetünk egy személyes találkozót a kiválasztott cicával.",
  },
  {
    question: "Mennyibe kerül az örökbefogadás?",
    answer:
      "Az örökbefogadás részleteiről (esetleges hozzájárulás, ami az ivartalanítás/oltások költségeit fedezi) a jelentkezés után, személyes egyeztetés során tájékoztatunk. Ez oldalanként/cicánként eltérő lehet.",
  },
  {
    question: "Mit tartalmaz az örökbefogadás?",
    answer:
      "Minden általunk kihelyezett cica ivartalanított, oltott és chipes, amennyiben életkora és egészségi állapota ezt lehetővé teszi. Az örökbefogadás után is elérhetőek vagyunk kérdéseiddel.",
  },
  {
    question: "Lehetek ideiglenes befogadó?",
    answer:
      "Igen, mindig keresünk megbízható ideiglenes befogadókat, akik otthont adnak egy-egy cicának a gyógyulás vagy a gazdikeresés idejére. Részletekért látogass el az Ideiglenes befogadó oldalra.",
  },
  {
    question: "Hogyan tudok szállításban segíteni?",
    answer:
      "Ha van autód és időnként egy-két szabad órád, sokat segíthetsz azzal, hogy elviszel egy cicát az állatorvoshoz, egy ideiglenes helyre vagy az új gazdijához. Jelentkezz a Szállító leszek oldalon.",
  },
  {
    question: "Hogyan tudok pénzzel segíteni?",
    answer:
      "A Segíts/Támogass oldalon találsz erre lehetőséget, egyszeri vagy rendszeres formában is. Már havi 1000 Ft is számít.",
  },
  {
    question: "Mire használják az adományokat?",
    answer:
      "Elsősorban állatorvosi költségekre, gyógyszerekre, ivartalanításra, oltásokra, tápra és alomra, valamint sürgősségi mentésekre fordítjuk. A Segíts oldalon havi bontásban is bemutatjuk a felhasználást, amint az adat rendelkezésre áll.",
  },
  {
    question: "Mi történik, ha nem tudom tovább vállalni az ideiglenesen befogadott cicát?",
    answer:
      "Ilyen esetben mindig keress meg minket előre egyeztetett időpontban — megoldást találunk együtt, legyen szó egy másik ideiglenes helyről vagy a gazdikeresés felgyorsításáról.",
  },
  {
    question: "Van lehetőség másik cica mellé örökbefogadni?",
    answer:
      "Igen, több cicánk kifejezetten macskatársat keres. A szűrők között a „másik cica mellé” opcióval könnyen megtalálod őket.",
  },
];
