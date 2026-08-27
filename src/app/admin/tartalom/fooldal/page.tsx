import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const fields: ContentField[] = [
  { key: "home.hero.badge", label: "Fejléc feletti kis felirat", sectionHeading: "Nyitókép (hero)" },
  { key: "home.hero.headline", label: "Nagy cím" },
  { key: "home.hero.subtext", label: "Alcím / bevezető szöveg", multiline: true },
  { key: "home.hero.stat_number", label: "Kiemelt szám (pl. „80+ cica”)" },
  { key: "home.hero.stat_caption", label: "Szám alatti felirat" },

  { key: "home.help_ways.eyebrow", label: "Felirat", sectionHeading: "„Így segíthetsz” szekció" },
  { key: "home.help_ways.title", label: "Cím" },
  { key: "home.help_ways.0.title", label: "1. doboz címe (Támogass anyagilag)" },
  { key: "home.help_ways.0.description", label: "1. doboz szövege", multiline: true },
  { key: "home.help_ways.1.title", label: "2. doboz címe (Ideiglenes befogadó)" },
  { key: "home.help_ways.1.description", label: "2. doboz szövege", multiline: true },
  { key: "home.help_ways.2.title", label: "3. doboz címe (Szállítás)" },
  { key: "home.help_ways.2.description", label: "3. doboz szövege", multiline: true },
  { key: "home.help_ways.3.title", label: "4. doboz címe (Önkéntes)" },
  { key: "home.help_ways.3.description", label: "4. doboz szövege", multiline: true },

  { key: "home.why_need.eyebrow", label: "Felirat", sectionHeading: "„Miért van szükségünk rád” szekció" },
  { key: "home.why_need.title", label: "Cím" },
  { key: "home.why_need.text", label: "Szöveg", multiline: true },

  { key: "home.adoption_steps.eyebrow", label: "Felirat", sectionHeading: "Örökbefogadási lépések (főoldal)" },
  { key: "home.adoption_steps.title", label: "Cím" },
  { key: "home.adoption_steps.0.title", label: "1. lépés címe" },
  { key: "home.adoption_steps.0.description", label: "1. lépés szövege", multiline: true },
  { key: "home.adoption_steps.1.title", label: "2. lépés címe" },
  { key: "home.adoption_steps.1.description", label: "2. lépés szövege", multiline: true },
  { key: "home.adoption_steps.2.title", label: "3. lépés címe" },
  { key: "home.adoption_steps.2.description", label: "3. lépés szövege", multiline: true },
  { key: "home.adoption_steps.3.title", label: "4. lépés címe" },
  { key: "home.adoption_steps.3.description", label: "4. lépés szövege", multiline: true },

  { key: "home.featured_cats.eyebrow", label: "Felirat", sectionHeading: "Gazdit kereső cicák szekció" },
  { key: "home.featured_cats.title", label: "Cím" },

  { key: "home.story_highlight.eyebrow", label: "Felirat", sectionHeading: "Kiemelt mentési történet szekció" },
];

export default async function AdminFooldalPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Főoldal" />
      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>
    </div>
  );
}
