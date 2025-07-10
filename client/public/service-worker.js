self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing...");
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating...");
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            } else {
              return new Response("Offline and no cache found", {
                status: 503,
                statusText: "Service Unavailable"
              });
            }
          });
      })
  );
});

