import { supabase } from "@/lib/supabase";
import { Cat } from "./types";

// A Supabase "cats" tábláját (snake_case oszlopok) a Cat típusra (camelCase)
// képezzük le. Az admin felület ugyanebbe a táblába ír — így minden oldal,
// ami innen olvas, automatikusan látja a legfrissebb adatokat.

type CatRow = {
  id: string;
  slug: string;
  name: string;
  age_label: string;
  age_months_approx: number;
  gender: Cat["gender"];
  neutered: boolean;
  vaccinated: boolean;
  chipped: boolean;
  indoor_only: boolean;
  good_with_children: boolean | null;
  good_with_cats: boolean | null;
  good_with_dogs: boolean | null;
  temperament: Cat["temperament"] | null;
  status: Cat["status"];
  featured: boolean;
  short_description: string;
  story: string;
  health: string;
  seeking_home: string;
  images: string[] | null;
  arrival_date: string;
};

function mapRow(row: CatRow): Cat {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    ageLabel: row.age_label,
    ageMonthsApprox: row.age_months_approx,
    gender: row.gender,
    neutered: row.neutered,
    vaccinated: row.vaccinated,
    chipped: row.chipped,
    indoorOnly: row.indoor_only,
    goodWithChildren: row.good_with_children ?? "ismeretlen",
    goodWithCats: row.good_with_cats ?? "ismeretlen",
    goodWithDogs: row.good_with_dogs ?? "ismeretlen",
    temperament: row.temperament ?? [],
    status: row.status,
    featured: row.featured,
    shortDescription: row.short_description,
    story: row.story,
    health: row.health,
    seekingHome: row.seeking_home,
    images: row.images ?? [],
    arrivalDate: row.arrival_date,
  };
}

/** Az összes cica, legfrissebb érkezés szerint rendezve. */
export async function getCats(): Promise<Cat[]> {
  const { data, error } = await supabase
    .from("cats")
    .select("*")
    .order("arrival_date", { ascending: false });

  if (error) {
    console.error("[getCats] Supabase hiba:", error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}

/** Kiemelt, gazdit kereső cicák (főoldalra). */
export async function getFeaturedCats(): Promise<Cat[]> {
  const cats = await getCats();
  return cats.filter((cat) => cat.featured && cat.status === "gazdit_keres");
}

/** Minden gazdit kereső (még nem foglalt/örökbefogadott) cica. */
export async function getAvailableCats(): Promise<Cat[]> {
  const cats = await getCats();
  return cats.filter((cat) => cat.status === "gazdit_keres");
}

export async function getCatBySlug(slug: string): Promise<Cat | undefined> {
  const { data, error } = await supabase.from("cats").select("*").eq("slug", slug).maybeSingle();
  if (error) {
    console.error("[getCatBySlug] Supabase hiba:", error.message);
    return undefined;
  }
  return data ? mapRow(data) : undefined;
}

/** Admin felülethez: egyetlen cica lekérése id alapján (szerkesztéshez). */
export async function getCatById(id: string): Promise<Cat | undefined> {
  const { data, error } = await supabase.from("cats").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[getCatById] Supabase hiba:", error.message);
    return undefined;
  }
  return data ? mapRow(data) : undefined;
}
