import { Resend } from "resend";

/**
 * Notifications email via Resend.
 *
 * Configuration (.env.local) :
 *   RESEND_API_KEY  = clé API Resend (re_...)
 *   RESEND_FROM     = expéditeur vérifié dans Resend
 *                     (ex: "GENIE MULTI-SERVICES <noreply@ton-domaine.com>")
 *   LEAD_NOTIFY_TO  = email qui reçoit les notifs (défaut: geniemulti@gmail.com)
 *
 * Si RESEND_API_KEY ou RESEND_FROM ne sont pas définis, les fonctions ne font rien.
 */

type LeadInfo = {
  nom: string;
  email: string;
  telephone: string;
  service?: string;
};

let cached: Resend | null = null;
function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

const BLUE = "#0EA5E9";
const ORANGE = "#F97316";

// Coque HTML commune (en-tête bleu + contenu)
function layout(titre: string, contenu: string): string {
  return `
  <div style="font-family:system-ui,Arial,sans-serif;max-width:560px;margin:0 auto;border:1px solid #e0f2fe;border-radius:16px;overflow:hidden">
    <div style="background:linear-gradient(135deg,${BLUE},#0369A1);padding:20px 24px;color:#fff">
      <h1 style="margin:0;font-size:18px">GENIE MULTI-SERVICES</h1>
    </div>
    <div style="padding:24px;color:#0c4a6e">
      <h2 style="margin:0 0 16px;font-size:20px">${titre}</h2>
      ${contenu}
    </div>
    <div style="padding:14px 24px;background:#f0f9ff;color:#64748b;font-size:12px;text-align:center">
      Email automatique — tunnel de vente GENIE MULTI-SERVICES
    </div>
  </div>`;
}

/**
 * 1) Notification interne : prévient l'équipe qu'un nouveau lead est arrivé.
 */
export async function notifyTeamByEmail(lead: LeadInfo): Promise<void> {
  const resend = getResend();
  const from = process.env.RESEND_FROM;
  if (!resend || !from) return;

  const to = process.env.LEAD_NOTIFY_TO || "geniemulti@gmail.com";

  const contenu = `
    <p style="margin:0 0 16px">Un nouveau prospect vient de remplir le formulaire 🎉</p>
    <table style="width:100%;border-collapse:collapse;font-size:15px">
      <tr><td style="padding:8px 0;color:#64748b">Nom</td><td style="padding:8px 0;font-weight:600">${lead.nom}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b">Téléphone</td><td style="padding:8px 0;font-weight:600">${lead.telephone}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0;font-weight:600">${lead.email}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b">Service</td><td style="padding:8px 0;font-weight:600">${lead.service || "Non précisé"}</td></tr>
    </table>
    <a href="https://wa.me/${lead.telephone.replace(/[^0-9]/g, "")}"
       style="display:inline-block;margin-top:20px;background:#22c55e;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:600">
       💬 Contacter ${lead.nom.split(" ")[0]} sur WhatsApp
    </a>`;

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: `🔔 Nouveau lead — ${lead.nom} (${lead.service || "service non précisé"})`,
      html: layout("Nouveau lead reçu", contenu),
    });
  } catch (err) {
    console.error("[email] Échec notification équipe :", err);
  }
}

/**
 * 2) Accusé de réception : rassure le prospect et confirme son code promo -20%.
 */
export async function sendProspectAck(lead: LeadInfo): Promise<void> {
  const resend = getResend();
  const from = process.env.RESEND_FROM;
  if (!resend || !from) return;

  const contenu = `
    <p style="margin:0 0 12px">Bonjour <strong>${lead.nom.split(" ")[0]}</strong>,</p>
    <p style="margin:0 0 16px">Merci pour votre demande ! Notre équipe vous recontacte sous 24h sur WhatsApp.</p>
    <div style="background:#fff7ed;border:1px dashed ${ORANGE};border-radius:12px;padding:16px;text-align:center;margin:16px 0">
      <div style="font-size:28px;font-weight:800;color:${ORANGE}">-20%</div>
      <div style="color:#9a3412;font-size:14px">sur votre première commande</div>
    </div>
    <p style="margin:0;color:#64748b;font-size:14px">À très bientôt,<br/>L'équipe GENIE MULTI-SERVICES</p>`;

  try {
    await resend.emails.send({
      from,
      to: lead.email,
      subject: "🎁 Votre réduction de 20% — GENIE MULTI-SERVICES",
      html: layout("Votre offre est confirmée", contenu),
    });
  } catch (err) {
    console.error("[email] Échec accusé de réception prospect :", err);
  }
}
