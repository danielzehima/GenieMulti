import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";

/**
 * Schéma de validation du lead.
 * On reste souple sur le téléphone (formats internationaux variés)
 * mais strict sur l'email et le nom.
 */
const leadSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().trim().email("Adresse email invalide."),
  telephone: z
    .string()
    .trim()
    .min(8, "Numéro de téléphone invalide.")
    // Accepte chiffres, espaces, +, -, parenthèses
    .regex(/^[0-9+\-()\s]+$/, "Numéro de téléphone invalide."),
  service: z.string().trim().optional().default(""),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validation des données entrantes
    const result = leadSchema.safeParse(body);
    if (!result.success) {
      // On renvoie le premier message d'erreur lisible côté client
      const firstError = result.error.issues[0]?.message ?? "Données invalides.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const lead = result.data;
    const userAgent = request.headers.get("user-agent") ?? "";

    // 2. Enrichissement du lead (métadonnées utiles pour le CRM / les relances)
    const payload = {
      ...lead,
      source: "Landing Tunnel de Vente",
      structure: "GENIE MULTI-SERVICES",
      receivedAt: new Date().toISOString(),
      userAgent,
    };

    // 3. Enregistrement dans Supabase (si configuré).
    const supabase = getSupabase();
    if (supabase) {
      const { error: dbError } = await supabase.from("leads").insert({
        nom: lead.nom,
        email: lead.email,
        telephone: lead.telephone,
        service: lead.service || null,
        source: "Landing Tunnel de Vente",
        user_agent: userAgent,
      });

      if (dbError) {
        // On loggue mais on n'échoue pas tout de suite : on tente quand même le webhook.
        console.error("[leads] Échec insertion Supabase :", dbError.message);
      }
    }

    // 4. Envoi vers un webhook externe (n8n, Zapier, Make...) si configuré.
    //    Définir LEADS_WEBHOOK_URL dans .env.local pour activer les relances
    //    automatiques (email + WhatsApp).
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!webhookRes.ok) {
          // On loggue mais on ne bloque pas l'utilisateur : le lead est capturé
          console.error(
            `[leads] Webhook a répondu ${webhookRes.status} : ${await webhookRes.text()}`
          );
        }
      } catch (webhookErr) {
        console.error("[leads] Échec de l'appel webhook :", webhookErr);
      }
    } else if (!supabase) {
      // Ni Supabase ni webhook configurés : on loggue le lead côté serveur
      console.log("[leads] Nouveau lead (aucune destination configurée) :", payload);
    }

    // 5. Réponse de succès
    return NextResponse.json(
      { success: true, message: "Lead enregistré avec succès." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[leads] Erreur serveur :", err);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
