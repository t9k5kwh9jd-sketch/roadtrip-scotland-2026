const CACHE = 'roadtrip-scotland-v4-final-20260715-1';
const ASSETS = [
  './', './index.html', './css/app.css', './css/variables.css', './css/base.css',
  './css/components.css', './css/pages.css', './data/trip-data.js', './js/app.js',
  './data/image-manifest.js',
  './data/daily-extras.js', './data/map-data.js', './js/components/cards.js', './manifest.webmanifest', './assets/icons/icon-180.png',
  './assets/icons/icon-192.png', './assets/icons/icon-512.png',
  './assets/images/heroes/highlands-master.svg',
  './assets/images/sights/the-vennel.svg',
  './assets/images/sights/victoria-terrace.svg',
  './assets/images/sights/dean-village.svg',
  './assets/images/sights/circus-lane.svg',
  './assets/images/sights/regent-road.svg',
  './assets/images/sights/calton-hill.svg',
  './assets/images/sights/the-kelpies.svg',
  './assets/images/sights/stirling-castle.svg',
  './assets/images/sights/rannoch-moor-viewpoint.svg',
  './assets/images/sights/the-meeting-of-three-waters.svg',
  './assets/images/sights/three-sisters-viewpoint.svg',
  './assets/images/sights/hidden-valley-coire-gabhail.svg',
  './assets/images/sights/glencoe.svg',
  './assets/images/sights/glen-etive.svg',
  './assets/images/sights/glenfinnan-viaduct-viewpoint.svg',
  './assets/images/sights/saint-mary-saint-finnan-church.svg',
  './assets/images/sights/eilean-donan-castle.svg',
  './assets/images/sights/dornie.svg',
  './assets/images/sights/old-man-of-storr.svg',
  './assets/images/sights/kilt-rock-waterfall-creag-an-fheilidh.svg',
  './assets/images/sights/the-fairy-glen.svg',
  './assets/images/sights/quiraing-viewpoint.svg',
  './assets/images/sights/duntulm-castle.svg',
  './assets/images/sights/neist-point-cliff-lighthouse-viewpoint.svg',
  './assets/images/sights/talisker-bay-beach.svg',
  './assets/images/sights/bealach-na-ba-viewpoint.svg',
  './assets/images/sights/applecross.svg',
  './assets/images/sights/bealach-na-gaoithe-viewpoint.svg',
  './assets/images/sights/dunnottar-castle.svg',
  './assets/images/sights/glasgow-city-centre.svg',
  './assets/images/restaurants/applecross-inn.svg',
  './assets/images/restaurants/ben-nevis-inn.svg',
  './assets/images/restaurants/cafe-andaluz-aberdeen.svg',
  './assets/images/restaurants/cafe-gandolfi.svg',
  './assets/images/restaurants/edinbane-inn.svg',
  './assets/images/restaurants/garrison-west.svg',
  './assets/images/restaurants/makars-mash-bar.svg',
  './assets/images/restaurants/ox-and-finch.svg',
  './assets/images/restaurants/sarti-bath-street.svg',
  './assets/images/restaurants/sea-breezes.svg',
  './assets/images/restaurants/the-butterfly-and-the-pig.svg',
  './assets/images/restaurants/the-finnieston-bar-restaurant.svg',
  './assets/images/restaurants/the-old-school-restaurant.svg',
  './assets/images/restaurants/the-oyster-shed.svg',
  './assets/images/restaurants/the-three-chimneys-at-talisker.svg',
  './assets/images/restaurants/the-waterfront-cafe-bar.svg',
  './assets/images/restaurants/ting-thai-caravan.svg'
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
