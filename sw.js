const CACHE = "coaching-cards-v1";
const SHELL = [
  "./",
  "./index.html",
  "./coaching-cards-for-teams.html",
  "./strong-suits.html",
  "./the-values-cards.html",
  "./intelligent-change-closer.html",
  "./at-my-best.html",
  "./coaching-cards-for-every-day.html",
  "./picture-coaching-cards-recreated-pilot.html",
  "./coaching-cards-icon.png",
  "./manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  // Pexels images — network only (Picture deck and At My Best photos need live connection)
  if (e.request.url.includes("pexels.com")) {
    e.respondWith(fetch(e.request));
    return;
  }
  // Everything else — cache first, fall back to network
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
