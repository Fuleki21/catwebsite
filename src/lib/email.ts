import { Resend } from "resend";
import { siteConfig } from "@/data/site";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Amíg nincs saját, Resendnél hitelesített domain, csak a "onboarding@resend.dev"
// teszt-feladó cím használható, ami kizárólag a Resend-fiókhoz tartozó e-mail
// címre tud kézbesíteni. Éles használathoz állíts be RESEND_FROM_EMAIL-t egy
// hitelesített domainről (lásd README).
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Cat TNR Fehérvár <onboarding@resend.dev>";
const TO_EMAIL = process.env.RESEND_TO_EMAIL || siteConfig.email;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * E-mail értesítést küld a szervezet felé egy beérkezett jelentkezésről.
 * Ha nincs beállítva RESEND_API_KEY, csendben kihagyja (fejlesztői módban ez
 * elvárt), a form beküldése ettől még sikeresnek számít a látogató felé.
 */
export async function sendFormNotification(subject: string, fields: Record<string, string | undefined>) {
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY nincs beállítva — kihagyott értesítés: "${subject}"`);
    return;
  }

  const rows = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#2B2420;vertical-align:top;white-space:nowrap;">${escapeHtml(
          label
        )}</td><td style="padding:6px 12px;color:#3B332E;">${escapeHtml(String(value)).replace(/\n/g, "<br/>")}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#C96A26;margin-bottom:16px;">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
      <p style="margin-top:20px;font-size:12px;color:#8B8078;">Cat TNR Fehérvár weboldal — automatikus értesítés.</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    subject,
    html,
  });

  if (error) {
    console.error("[email] Resend küldési hiba:", error);
  }
}
