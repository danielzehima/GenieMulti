# 📌 État du projet — Tunnel de vente GENIE MULTI-SERVICES

> Dernière mise à jour : 18 juin 2026
> Ce fichier résume ce qui a été fait et où on s'est arrêté, pour reprendre facilement.

---

## 🎯 Le projet
Landing page "tunnel de vente" pour **GENIE MULTI-SERVICES** (Abidjan) : imprimerie,
personnalisation textile, studio photo, tampons, vidéosurveillance & BTP.
Objectif : capturer des leads (Nom, Email, WhatsApp, Service) en échange d'une promo **-20%**.

**Stack** : Next.js 15.5.19 (App Router) · React 19 · Tailwind CSS v3 · lucide-react · Zod
**Charte** : bleu ciel (`#0EA5E9`) + blanc, accent orange (`#F97316`) pour les CTA/promos.

---

## ✅ Ce qui est FAIT

### 1. Landing page complète
- Hero accrocheur + CTA qui ouvre un modal de capture
- Sections : Services (4 cartes), Réassurance, Témoignages, Autres expertises (tech/BTP), CTA final, Footer
- Bouton WhatsApp flottant
- Design responsive (testé mobile + desktop), micro-interactions au survol
- **Photos professionnelles** pour chaque service (dans `public/img/`)

### 2. Formulaire de capture
- `components/LeadForm.tsx` (validation, états loading/succès/erreur)
- `components/LeadModal.tsx` (modal d'offre)
- Champs : Nom, Email, **WhatsApp (prioritaire)**, Service

### 3. API + pipeline de leads (`app/api/leads/route.ts`)
Chaque soumission valide (Zod) déclenche **en parallèle, sans bloquer** :
| Destination | Statut | Fichier |
|---|---|---|
| 🗄️ Supabase (table `leads`) | ✅ **actif & testé** | `lib/supabase.ts` |
| ✉️ Email équipe + accusé prospect (Resend) | ✅ clés en place (à tester) | `lib/email.ts` |
| 📊 Google Sheets (Apps Script) | 🔄 **en cours de réglage** | `lib/gsheet.ts` |
| 📲 WhatsApp (CallMeBot) | ⏸️ optionnel, pas configuré | `lib/notify.ts` |
| 🔗 Webhook générique (n8n/Zapier) | ⏸️ optionnel | (dans la route) |

Si une destination n'est pas configurée → ignorée silencieusement.

### 4. Contacts intégrés
- Tél : **+225 71 71 71 36** / **+225 07 58 60 00 00**
- Email : **geniemulti@gmail.com**
- WhatsApp : **+225 01 01 72 04 72**

### 5. Sécurité / maintenance
- Next.js mis à jour 15.3.3 → **15.5.19** (faille corrigée, déblocage Vercel)
- `public/sw.js` ajouté pour neutraliser un vieux service worker (404 résiduel)
- `outputFileTracingRoot` fixé dans `next.config.mjs` (multi-lockfiles)

---

## 🔧 Configuration (variables d'environnement — `.env.local`)
| Variable | Rôle | État |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL Supabase | ✅ rempli |
| `SUPABASE_SERVICE_ROLE_KEY` | Insertion leads (contourne RLS) | ✅ rempli |
| `SUPABASE_ANON_KEY` | Fallback | ✅ rempli |
| `RESEND_API_KEY` | Envoi emails | ✅ rempli |
| `RESEND_FROM` | Expéditeur vérifié (`noreply@digit-agence.com`) | ✅ rempli |
| `LEAD_NOTIFY_TO` | Destinataire notif (`geniemulti@gmail.com`) | ✅ rempli |
| `GSHEET_WEBHOOK_URL` | URL Apps Script | ✅ rempli (script à corriger) |
| `GSHEET_TOKEN` | Mot de passe partagé (`genie2026`) | ✅ rempli |
| `CALLMEBOT_PHONE` / `CALLMEBOT_APIKEY` | Notif WhatsApp | ⏸️ vide (optionnel) |

> ⚠️ Ces mêmes variables devront être ajoutées sur **Vercel** pour la prod.

---

## 🛑 OÙ ON S'EST ARRÊTÉ
**Réglage de Google Sheets.** Les leads ne s'ajoutaient pas à la feuille.
- **Cause identifiée** : le script Apps Script avait été collé **avec** la balise Markdown
  ` ```javascript ` en 1ʳᵉ ligne → erreur `ReferenceError: javascript is not defined`.
- **Action en cours (côté user)** : recoller le script **sans** les backticks (1ʳᵉ ligne = `const TOKEN...`),
  enregistrer, puis **redéployer une NOUVELLE version** du Web App.
- **Prochain pas** : une fois redéployé → je relance un POST de test sur le webhook pour confirmer
  que la ligne s'ajoute (script de test : POST JSON avec `token: "genie2026"` vers l'URL `/exec`).

Détails de la procédure : `docs/google-sheets-setup.md`.

---

## ⏳ RESTE À FAIRE
1. **Finir Google Sheets** : redéployer le script corrigé + valider l'ajout d'une ligne.
2. **Tester les emails** (Resend) de bout en bout — enverra de vrais emails (notif + accusé). En attente du feu vert.
3. **(Optionnel) WhatsApp CallMeBot** : récupérer l'apikey (n° +34 684 770 005) si voulu.
4. **Déploiement Vercel** :
   - Projet déjà lié : `scolari-pay-s-projects/genie-multi`
   - Ajouter toutes les variables d'env sur Vercel
   - `vercel --prod`
   - Tester un lead réel depuis l'URL de prod.

---

## 📁 Fichiers clés
- `app/page.tsx` — la landing complète
- `app/api/leads/route.ts` — pipeline de capture
- `components/LeadForm.tsx`, `components/LeadModal.tsx`
- `lib/supabase.ts`, `lib/email.ts`, `lib/gsheet.ts`, `lib/notify.ts`
- `supabase/schema.sql` — table `leads` + RLS
- `docs/google-sheets-setup.md` — guide Apps Script
- `.env.local` — secrets (non commité)

## ⚠️ Notes techniques importantes
- **Supabase** : projet `glhianmardrihogowcjt` — appartient à un compte différent de mon MCP,
  donc je le teste via REST/clé (pas d'accès distant direct).
- **Tailwind + preview** : config en chemins ABSOLUS (`tailwind.config.js` + `postcss.config.mjs`)
  car le serveur de dev est lancé depuis un autre dossier (cwd différent).
- **Le user gère git lui-même** (pas de commit automatique).
