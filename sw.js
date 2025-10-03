// sw.js - Basic Service Worker
const CACHE_NAME = 'jacquard-manager-v1';
const urlsToCache = [
  '/',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', function(event) {
  console.log('Service Worker installing');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
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
