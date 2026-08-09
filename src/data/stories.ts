import { RescueStory } from "./types";

// MINTA ADAT — demonstrációs mentési történetek. Cserélendő a szervezet
// valós eseteire, amint rendelkezésre állnak.
export const stories: RescueStory[] = [
  {
    id: "1",
    slug: "az-utcarol-az-uj-otthonig",
    title: "Az utcáról az új otthonig",
    excerpt: "Egy hideg téli reggelen találtunk rá — ma már egy meleg nappaliban dorombol.",
    content: [
      "Egy januári reggelen kaptunk bejelentést egy sérült, kóbor cicáról a belváros egyik hátsó udvarában. Amikor odaértünk, egy sovány, megfázott állatot találtunk, aki alig mert megmozdulni.",
      "Azonnal állatorvoshoz vittük. Kiderült, hogy fertőzése és alultápláltsága mellett szerencsére nem volt komolyabb sérülése. Néhány hetes gyógykezelés és egy türelmes ideiglenes befogadó után teljesen megváltozott.",
      "Ma már egy szerető családnál él, ahol a kedvenc helye a fűtött ablakpárkány. Ez a történet emlékeztet minket arra, miért fontos minden egyes bejelentés, amit komolyan veszünk.",
    ],
    catSlug: undefined,
    date: "2026-02-14",
    featured: true,
    stage: "uj_otthon",
    images: ["story-utcarol-1", "story-utcarol-2", "story-utcarol-3"],
  },
  {
    id: "2",
    slug: "egy-felos-cica-elso-biztonsagos-ejszakaja",
    title: "Egy félős cica első biztonságos éjszakája",
    excerpt: "Hetekig bujkált egy ipari terület mögött, mire sikerült biztonságba helyeznünk.",
    content: [
      "Hetekig figyeltük és etettük egy elvadult, rendkívül félénk cicát egy ipari terület mögött, mire sikerült csapdával biztonságosan befogni.",
      "Az első éjszakát nálunk, egy csendes, elkülönített szobában töltötte. Napokig csak a szoba sarkából figyelt minket, de a türelem meghozta gyümölcsét.",
      "Ma már ideiglenes befogadónál van, ahol lassan, a saját tempójában bizalmat épít. A célunk, hogy amikor készen áll, egy hozzá illő, nyugodt otthonba kerülhessen.",
    ],
    catSlug: "luna",
    date: "2025-12-20",
    featured: true,
    stage: "gyogyulas",
    images: ["story-felos-1", "story-felos-2"],
  },
  {
    id: "3",
    slug: "surgos-mentesbol-boldog-gazdis-cica",
    title: "Sürgős mentésből boldog gazdis cica",
    excerpt: "Egy éjszakai segélyhívásból indult, ma pedig egy kertes ház lakója.",
    content: [
      "Éjjel kaptunk hívást egy balesetet szenvedett cicáról az egyik fehérvári kertvárosi utcában. Önkéntesünk azonnal a helyszínre sietett, majd sürgősségi ellátásra vitte.",
      "A gyógyulás lassú, de biztos volt. Az állatorvosi költségeket a támogatóink adományaiból tudtuk fedezni — enélkül nem lett volna esélye.",
      "Néhány hónappal később egy kertes házba került örökbe, ahol azóta is biztonságban és szeretetben él.",
    ],
    catSlug: "cirmi",
    date: "2025-10-05",
    featured: false,
    stage: "uj_otthon",
    images: ["story-surgos-1"],
  },
];

export function getFeaturedStory() {
  return stories.find((story) => story.featured);
}

export function getStoryBySlug(slug: string) {
  return stories.find((story) => story.slug === slug);
}
