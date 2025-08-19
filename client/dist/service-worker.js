self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing...");
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating...");
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
