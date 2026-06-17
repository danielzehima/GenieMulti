import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase côté serveur (utilisé uniquement dans les routes API).
 *
 * On le crée de façon "paresseuse" et optionnelle : si les variables
 * d'environnement ne sont pas définies, on renvoie `null` au lieu de planter.
 * Cela permet au site de fonctionner même sans Supabase configuré (les leads
 * partent alors vers le webhook ou sont loggués).
 */
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // On privilégie la clé service_role (secrète, serveur uniquement) qui
  // contourne le RLS — pratique pour insérer sans dépendre d'une policy.
  // À défaut, on utilise la clé anon (nécessite alors une policy d'insertion).
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cached;
}
