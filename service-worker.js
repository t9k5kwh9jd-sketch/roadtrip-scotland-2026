const CACHE = 'roadtrip-scotland-v4.0.3-final-fixed';
const CORE = [
  './', './index.html', './css/app.css',
  './css/highlander.css', './css/variables.css', './css/base.css',
  './css/components.css', './css/pages.css', './data/trip-data.js', './data/image-manifest.js',
  './data/daily-extras.js', './data/map-data.js', './js/components/cards.js', './js/app.js',
  './manifest.webmanifest', './assets/icons/icon-180.png', './assets/icons/icon-192.png', './assets/icons/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const local = url.origin === self.location.origin;
  const appAsset = local && (event.request.mode === 'navigate' || /\.(?:html|css|js|webmanifest)$/.test(url.pathname));
  if (appAsset) {
    event.respondWith(fetch(event.request).then(response => {
      if (response && response.ok) caches.open(CACHE).then(c => c.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request).then(r => r || caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (local && response && response.ok) caches.open(CACHE).then(c => c.put(event.request, response.clone()));
    return response;
  })));
});
