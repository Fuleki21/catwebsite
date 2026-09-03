import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { FaqItem, HelpBudgetItem, HelpCategory } from "./types";

// ============ CONTENT BLOCKS (kulcs -> szöveg, oldalankénti fix szövegek) ============

/**
 * Az összes content_blocks sor egyetlen kulcs -> érték térképként.
 * `cache()`-elve, hogy egy oldal-renderen belül (header + footer + az oldal
 * saját szövegei) csak egyszer fusson le a lekérdezés.
 */
export const getContentBlocks = cache(async (): Promise<Record<string, string>> => {
  const { data, error } = await supabase.from("content_blocks").select("key, value");
  if (error) {
    console.error("[getContentBlocks] Supabase hiba:", error.message);
    return {};
  }
  const map: Record<string, string> = {};
  for (const row of data ?? []) {
    map[row.key] = row.value;
  }
  return map;
});

/** Segédfüggvény: kulcs lekérése egy már betöltött blokk-térképből, alapértelmezett szöveggel. */
export function block(blocks: Record<string, string>, key: string, fallback: string): string {
  const value = blocks[key];
  return value && value.trim().length > 0 ? value : fallback;
}

/**
 * Segédfüggvény: egy content_blocks érték soronkénti listaként való
 * kiolvasásához (pl. márkanevek, tételek) — admin oldalon egy sima
 * TextArea-ban szerkeszthető, soronként egy elem, kód módosítása nélkül.
 */
export function blockList(blocks: Record<string, string>, key: string, fallback: string[]): string[] {
  const raw = blocks[key];
  if (!raw || raw.trim().length === 0) return fallback;
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

// ============ FAQ ITEMS ============

type FaqRow = {
  id: string;
  question: string;
  answer: string;
  position: number;
  show_in_adoption_page: boolean;
};

function mapFaqRow(row: FaqRow): FaqItem {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    position: row.position,
    showInAdoptionPage: row.show_in_adoption_page,
  };
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const { data, error } = await supabase.from("faq_items").select("*").order("position", { ascending: true });
  if (error) {
    console.error("[getFaqItems] Supabase hiba:", error.message);
    return [];
  }
  return (data ?? []).map(mapFaqRow);
}

export async function getAdoptionFaqItems(): Promise<FaqItem[]> {
  const items = await getFaqItems();
  const filtered = items.filter((item) => item.showInAdoptionPage);
  return filtered.length > 0 ? filtered : items.slice(0, 4);
}

export async function getFaqItemById(id: string): Promise<FaqItem | undefined> {
  const { data, error } = await supabase.from("faq_items").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[getFaqItemById] Supabase hiba:", error.message);
    return undefined;
  }
  return data ? mapFaqRow(data) : undefined;
}

// ============ HELP BUDGET ITEMS ============

type HelpBudgetRow = {
  id: string;
  label: string;
  note: string;
  position: number;
};

function mapHelpBudgetRow(row: HelpBudgetRow): HelpBudgetItem {
  return { id: row.id, label: row.label, note: row.note, position: row.position };
}

export async function getHelpBudgetItems(): Promise<HelpBudgetItem[]> {
  const { data, error } = await supabase.from("help_budget_items").select("*").order("position", { ascending: true });
  if (error) {
    console.error("[getHelpBudgetItems] Supabase hiba:", error.message);
    return [];
  }
  return (data ?? []).map(mapHelpBudgetRow);
}

export async function getHelpBudgetItemById(id: string): Promise<HelpBudgetItem | undefined> {
  const { data, error } = await supabase.from("help_budget_items").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[getHelpBudgetItemById] Supabase hiba:", error.message);
    return undefined;
  }
  return data ? mapHelpBudgetRow(data) : undefined;
}

// ============ HELP CATEGORIES (a Segíts oldal bővíthető kártyasora) ============

type HelpCategoryRow = {
  id: string;
  title: string;
  icon: string;
  short_description: string;
  button_text: string;
  button_url: string;
  visible: boolean;
  position: number;
};

function mapHelpCategoryRow(row: HelpCategoryRow): HelpCategory {
  return {
    id: row.id,
    title: row.title,
    icon: row.icon,
    shortDescription: row.short_description,
    buttonText: row.button_text,
    buttonUrl: row.button_url,
    visible: row.visible,
    position: row.position,
  };
}

/** Admin nézet: minden kategória (rejtett is), sorrend szerint. */
export async function getHelpCategories(): Promise<HelpCategory[]> {
  const { data, error } = await supabase.from("help_categories").select("*").order("position", { ascending: true });
  if (error) {
    console.error("[getHelpCategories] Supabase hiba:", error.message);
    return [];
  }
  return (data ?? []).map(mapHelpCategoryRow);
}

/** Publikus nézet: csak a látható kategóriák, sorrend szerint. */
export async function getVisibleHelpCategories(): Promise<HelpCategory[]> {
  const items = await getHelpCategories();
  return items.filter((item) => item.visible);
}

export async function getHelpCategoryById(id: string): Promise<HelpCategory | undefined> {
  const { data, error } = await supabase.from("help_categories").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[getHelpCategoryById] Supabase hiba:", error.message);
    return undefined;
  }
  return data ? mapHelpCategoryRow(data) : undefined;
}
