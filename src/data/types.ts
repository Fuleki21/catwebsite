// Domain types. These mirror the shape the future CMS / Supabase tables
// should expose, so the mock data layer can be swapped for real fetches
// (e.g. getCats() -> supabase.from("cats").select()) without touching
// the components that consume it.

export type CatGender = "nőstény" | "kandúr";

export type CatStatus = "gazdit_keres" | "foglalt" | "orokbefogadva";

export type CatTemperament =
  | "bátor"
  | "félénk"
  | "játékos"
  | "nyugodt"
  | "dorombolós"
  | "önálló"
  | "ölbemászó";

export interface Cat {
  id: string;
  slug: string;
  name: string;
  ageLabel: string; // e.g. "2 éves", "8 hónapos" - human readable, source data is often imprecise
  ageMonthsApprox: number; // for sorting/filtering
  gender: CatGender;
  neutered: boolean;
  vaccinated: boolean;
  chipped: boolean;
  indoorOnly: boolean; // true = kizárólag lakásba, false = kijárós is lehet
  goodWithChildren: boolean | "ismeretlen";
  goodWithCats: boolean | "ismeretlen";
  goodWithDogs: boolean | "ismeretlen";
  temperament: CatTemperament[];
  status: CatStatus;
  featured: boolean;
  shortDescription: string;
  story: string;
  health: string;
  seekingHome: string;
  images: string[]; // placeholder identifiers, rendered via <PlaceholderImage />
  arrivalDate: string; // ISO date
}

export interface RescueStory {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  catSlug?: string;
  date: string; // ISO date
  featured: boolean;
  stage: "utcarol" | "mentes" | "gyogyulas" | "uj_otthon";
  images: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
