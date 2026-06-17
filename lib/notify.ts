/**
 * Notification WhatsApp à l'équipe via CallMeBot.
 *
 * CallMeBot envoie un message WhatsApp à un numéro que TU possèdes (notif interne).
 * Configuration (à mettre dans .env.local) :
 *   CALLMEBOT_PHONE  = numéro destinataire au format international (ex: 2250101720472)
 *   CALLMEBOT_APIKEY = clé reçue par WhatsApp en envoyant
 *                      "I allow callmebot to send me messages" au +34 684 770 005
 *
 * Si les variables ne sont pas définies, la fonction ne fait rien (no-op).
 */

type LeadInfo = {
  nom: string;
  email: string;
  telephone: string;
  service?: string;
};

export async function notifyWhatsApp(lead: LeadInfo): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;

  // Non configuré → on ne fait rien (le lead est déjà enregistré ailleurs).
  if (!phone || !apikey) return;

  // Message lisible reçu sur WhatsApp par l'équipe.
  const message =
    `🔔 *Nouveau lead GENIE MULTI-SERVICES*\n\n` +
    `👤 ${lead.nom}\n` +
    `📞 ${lead.telephone}\n` +
    `✉️ ${lead.email}\n` +
    `🛠️ ${lead.service || "Non précisé"}\n` +
    `🕒 ${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Abidjan" })}`;

  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(message)}` +
    `&apikey=${encodeURIComponent(apikey)}`;

  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      console.error(
        `[notify] CallMeBot a répondu ${res.status} : ${await res.text()}`
      );
    }
  } catch (err) {
    // Non-bloquant : on ne fait jamais échouer la capture du lead pour une notif.
    console.error("[notify] Échec de la notification WhatsApp :", err);
  }
}
