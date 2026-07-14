const CACHE = 'roadtrip-scotland-2026-v4.0-build1-foundation';
const ASSETS = [
  './', './index.html', './css/app.css', './css/variables.css', './css/base.css',
  './css/components.css', './css/pages.css', './data/trip-data.js', './js/app.js',
  './manifest.webmanifest', './assets/icons/icon-180.png',
  './assets/icons/icon-192.png', './assets/icons/icon-512.png'
];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))); self.clients.claim(); });
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response && response.status === 200) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => event.request.mode === 'navigate' ? caches.match('./index.html') : undefined)));
});
