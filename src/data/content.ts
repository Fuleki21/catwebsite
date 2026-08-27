import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { FaqItem, HelpBudgetItem } from "./types";

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
