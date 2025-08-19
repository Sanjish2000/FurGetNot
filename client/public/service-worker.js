// public/service-worker.js
const CACHE_NAME = "furgetnot-cache-v1";

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Agar API request ho toh skip karo
  if (event.request.url.includes("/api/")) return;

  // Try fetch first, agar fail ho jaye toh fallback to index.html
  event.respondWith(
    fetch(event.request).catch(() => caches.match("/index.html"))
  );
});
