// service-worker.js

const CACHE_NAME = "furgetnot-cache-v1";
const urlsToCache = [
  "/", // index.html
  "/index.html",
  "/assets/apple-touch-icon-C0rN1u2w.png",
  "/assets/cart-BnCVHF4S.png",
  "/assets/google-Ddd1T9IW.png",
  "/assets/favicon-BCEW3157.ico",
  "/assets/correct-kHaBjfqs.png",
  "/assets/s-h3KKiPjD.png",
  "/assets/landing_image2-Ba2rxC2r.png",
  "/assets/vet-BmWrzZaf.png",
  "/assets/index-DEc_BRBK.css",
  "/assets/index-BAtFZeC0.js"
];

// Install event
self.addEventListener("install", function(event) {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("[Service Worker] Caching app shell...");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", function(event) {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", function(event) {
  // Skip API requests
  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // Optional: cache new fetched resources
        return response;
      })
      .catch(function() {
        // Try cache
        return caches.match(event.request).then(function(response) {
          return response || caches.match("/index.html");
        });
      })
  );
});
