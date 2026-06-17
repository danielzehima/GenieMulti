// Service worker neutralisant.
// La requête GET /sw.js (404 dans les logs) provient d'un ancien service
// worker enregistré sur localhost par un AUTRE projet partageant le même port.
// Ce fichier se contente de se désinscrire pour nettoyer ce résidu et faire
// disparaître le 404. L'app n'utilise pas de service worker.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.registration.unregister().then(() =>
      self.clients.matchAll().then((clients) =>
        clients.forEach((client) => client.navigate(client.url))
      )
    )
  );
});
