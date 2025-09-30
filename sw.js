// Simple Service Worker for caching
const CACHE_NAME = 'jacquard-manager-v1';
const urlsToCache = [
  '/rapier-jacquard-manager/',
  '/rapier-jacquard-manager/index.html',
  '/rapier-jacquard-manager/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
