import { ContentPageHeader } from "@/components/admin/ContentPageHeader";
import { ContentBlockForm, ContentField } from "@/components/admin/ContentBlockForm";
import { RepontQrUpload } from "@/components/admin/RepontQrUpload";
import { getContentBlocks } from "@/data/content";
import { saveContentBlocks } from "../actions";

const fields: ContentField[] = [
  { key: "segits.header.eyebrow", label: "Felirat", sectionHeading: "Fejléc" },
  { key: "segits.header.title", label: "Cím" },
  { key: "segits.header.description", label: "Leírás", multiline: true },

  { key: "segits.material.title", label: "Szekció címe", sectionHeading: "Tárgyi adományok" },
  { key: "segits.material.food_title", label: "„Eledel” alcím" },
  { key: "segits.material.food_intro", label: "Eledel bevezető szöveg", multiline: true },
  { key: "segits.material.brands_title", label: "„Ajánlott márkák” alcím" },
  {
    key: "segits.material.brands_list",
    label: "Ajánlott márkák listája",
    multiline: true,
    hint: "Egy márka soronként — így soronként adhatsz hozzá vagy vehetsz el egyet, kód módosítása nélkül.",
  },
  { key: "segits.material.kitten_title", label: "„Kölyöktápok” alcím" },
  { key: "segits.material.kitten_list", label: "Kölyöktápok listája", multiline: true, hint: "Egy tétel soronként." },
  { key: "segits.material.special_title", label: "„Speciális tápok” alcím" },
  { key: "segits.material.special_list", label: "Speciális tápok listája", multiline: true, hint: "Egy tétel soronként." },
  { key: "segits.material.meds_title", label: "„Élősködők elleni készítmények” alcím" },
  {
    key: "segits.material.meds_list",
    label: "Készítmények / immunerősítők listája",
    multiline: true,
    hint: "Egy tétel soronként.",
  },
  { key: "segits.material.meds_note", label: "Rövid megjegyzés a készítmények alatt" },
  { key: "segits.material.equipment_title", label: "„Egyéb felszerelések” alcím" },
  {
    key: "segits.material.equipment_list",
    label: "Felszerelések listája",
    multiline: true,
    hint: "Egy tétel soronként.",
  },
  { key: "segits.material.warning_title", label: "Figyelmeztető doboz címe" },
  { key: "segits.material.warning_text", label: "Figyelmeztető doboz szövege", multiline: true },

  { key: "segits.dropoff.title", label: "Szekció címe", sectionHeading: "Adományok leadása" },
  { key: "segits.dropoff.personal_title", label: "„Személyes átadás” alcím" },
  { key: "segits.dropoff.personal_text", label: "Személyes átadás szövege", multiline: true },
  {
    key: "segits.dropoff.personal_button",
    label: "Gomb szövege",
    hint: "A gomb a Facebook oldalra visz (Alapadatoknál beállítható link).",
  },
  { key: "segits.dropoff.jopont_title", label: "„JóPont adománybolt” alcím" },
  { key: "segits.dropoff.jopont_intro", label: "JóPont bevezető szöveg" },
  { key: "segits.dropoff.jopont1_address", label: "1. telephely címe" },
  { key: "segits.dropoff.jopont1_hours", label: "1. telephely nyitvatartása" },
  { key: "segits.dropoff.jopont1_phone", label: "1. telephely telefonszáma" },
  { key: "segits.dropoff.jopont2_address", label: "2. telephely címe" },
  { key: "segits.dropoff.jopont2_hours", label: "2. telephely nyitvatartása" },
  { key: "segits.dropoff.jopont2_phone", label: "2. telephely telefonszáma" },
  { key: "segits.dropoff.jopont_button", label: "JóPont gomb szövege" },
  { key: "segits.dropoff.jopont_url", label: "JóPont weboldal URL-je" },

  { key: "segits.repont.title", label: "Szekció címe (emojival)", sectionHeading: "REPONT szekció" },
  { key: "segits.repont.intro", label: "Bevezető szöveg", multiline: true },
  { key: "segits.repont.step1_title", label: "1. lépés címe" },
  { key: "segits.repont.step1_text", label: "1. lépés szövege" },
  { key: "segits.repont.step2_title", label: "2. lépés címe" },
  { key: "segits.repont.step2_text", label: "2. lépés szövege" },
  { key: "segits.repont.step3_title", label: "3. lépés címe" },
  { key: "segits.repont.step3_text", label: "3. lépés szövege" },
  { key: "segits.repont.save_note", label: "Megjegyzés a QR-kód elmentéséről", multiline: true },
  { key: "segits.repont.closing", label: "Záró szöveg" },

  { key: "segits.other.title", label: "Cím", sectionHeading: "„További segítési lehetőségek” kártyasor" },
];

export default async function AdminSegitsPage() {
  const values = await getContentBlocks();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <ContentPageHeader title="Segíts oldal" />
      <p className="mt-1 text-sm text-ink-400">
        A kártyasor egyes elemei (pl. Önkéntesség, Ideiglenes befogadás) külön menüpontban kezelhetők: admin
        főoldal → „További segítési lehetőségek”.
      </p>

      <div className="mt-8 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <ContentBlockForm action={saveContentBlocks} fields={fields} values={values} />
      </div>

      <div className="mt-6">
        <RepontQrUpload currentUrl={values["segits.repont.qr_image_url"] ?? ""} />
      </div>
    </div>
  );
}
