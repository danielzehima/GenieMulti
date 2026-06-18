# 📊 Brancher les leads sur Google Sheets

Méthode : un **Google Apps Script** déployé en "Web App". Aucun compte de service Google,
 aucune clé compliquée.Chaque lead arrive en temps réel dans une nouvelle ligne.

## Étape 1 — Créer la feuille
1. Va sur https://sheets.new (crée une nouvelle feuille)
2. Nomme-la par ex. **Leads GENIE MULTI-SERVICES**

## Étape 2 — Ouvrir Apps Script
1. Dans la feuille : menu **Extensions → Apps Script**
2. Supprime le code par défaut, et colle le script ci-dessous :

```javascript
// Doit correspondre à GSHEET_TOKEN dans .env.local
const TOKEN = "genie2026";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Sécurité : on vérifie le mot de passe partagé
    if (TOKEN && data.token !== TOKEN) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: "unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Crée la ligne d'en-tête si la feuille est vide
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Date", "Nom", "Téléphone", "Email", "Service", "Source"]);
    }

    // Date lisible (fuseau Abidjan)
    let dateStr = data.date || new Date().toISOString();
    try {
      dateStr = Utilities.formatDate(new Date(data.date), "Africa/Abidjan", "dd/MM/yyyy HH:mm");
    } catch (_) {}

    sheet.appendRow([
      dateStr,
      data.nom || "",
      data.telephone || "",
      data.email || "",
      data.service || "",
      data.source || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

> ⚠️ Si tu changes `GSHEET_TOKEN` dans `.env.local`, change aussi `TOKEN` ici (même valeur).

## Étape 3 — Déployer en Web App
1. En haut à droite : **Déployer → Nouveau déploiement**
2. Clique sur l'engrenage ⚙️ → choisis **Application Web**
3. Réglages :
   - **Description** : `Leads GENIE`
   - **Exécuter en tant que** : **Moi**
   - **Qui a accès** : **Tout le monde**
4. Clique **Déployer** → **Autoriser l'accès** → choisis ton compte Google → "Autoriser"
   (Si Google affiche "Application non vérifiée" : *Paramètres avancés → Accéder à … (non sécurisé)* — c'est ton propre script, sans danger.)
5. Copie l'**URL de l'application Web** (elle finit par `/exec`)

## Étape 4 — Renseigner l'URL
Dans `.env.local` :
```
GSHEET_WEBHOOK_URL=https://script.google.com/macros/s/XXXXX/exec
GSHEET_TOKEN=genie2026
```
Et sur **Vercel** (pour la prod) : ajoute les deux mêmes variables.

## C'est tout ✅
À chaque lead, une ligne s'ajoute automatiquement : **Date · Nom · Téléphone · Email · Service · Source**.

> 💡 Si tu modifies le script plus tard, refais **Déployer → Gérer les déploiements → Modifier → Nouvelle version** (sinon l'ancienne version reste active).
