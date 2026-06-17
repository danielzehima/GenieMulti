-- ============================================================
-- GENIE MULTI-SERVICES — Table de capture des leads
-- À exécuter dans : Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- 1. Table des leads
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null,
  email       text not null,
  telephone   text not null,
  service     text,
  source      text default 'Landing Tunnel de Vente',
  user_agent  text,
  created_at  timestamptz not null default now()
);

-- Index pour trier/chercher rapidement les leads récents
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- 2. Sécurité (RLS) : on active la protection au niveau des lignes
alter table public.leads enable row level security;

-- 3. Policy : autoriser UNIQUEMENT les insertions publiques (formulaire).
--    Aucune policy de lecture => les leads ne sont PAS lisibles publiquement
--    (consultation via le Dashboard / la clé service_role uniquement).
drop policy if exists "Insertions publiques via formulaire" on public.leads;
create policy "Insertions publiques via formulaire"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);
