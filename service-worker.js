const CACHE_NAME = "pwa-version-1";

const assets = [
  "audio/collision.mp3",
  "audio/explosion.mp3",
  "audio/interactiveUI.mp3",
  "html/game.html",
  "image/favicon.png",
  "image/logo.png",
  "script/game.js",
  "script/matter.js",
  "script/script.js",
  "video/game.mp4",
  "video/main.mp4",
  "font.woff2",
  "manifest.json",
  "index.html",
  "style.css",
];
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(caches.open(CACHE_NAME).then(() => self.skipWaiting()));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.log("Offline mode - showing offline page");
          return caches.match(OFFLINE_URL);
        }
      })()
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
