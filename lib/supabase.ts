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
  // Clé publique (anon / publishable) — sûre à utiliser côté serveur.
  // Les insertions sont autorisées via une policy RLS dédiée.
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cached;
}
