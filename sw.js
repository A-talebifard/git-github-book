const CACHE_NAME = 'git-github-book-v1.1';
const ASSETS = [
  './',
  './index.html',
  './git-github-book.html',
  './css/style.css',
  './css/atom-one-dark.min.css',
  './js/book.js',
  './js/highlight.min.js',
  './js/highlight-bash.min.js',
  './js/highlight-yaml.min.js',
  './js/highlight-markdown.min.js',
  './js/highlight-powershell.min.js',
  './js/highlight-json.min.js',
  './js/mermaid.min.js',
  './img/avatar.jpg',
  './manifest.webmanifest',
  // fonts
  './fonts/Vazirmatn-Light.ttf',
  './fonts/Vazirmatn-Regular.ttf',
  './fonts/Vazirmatn-Medium.ttf',
  './fonts/Vazirmatn-SemiBold.ttf',
  './fonts/Vazirmatn-Bold.ttf',
  './fonts/Vazirmatn-ExtraBold.ttf',
  './fonts/JetBrainsMono-Regular.ttf',
  './fonts/JetBrainsMono-Medium.ttf',
  './fonts/JetBrainsMono-SemiBold.ttf',
  './fonts/JetBrainsMono-Bold.ttf',
  './fonts/Inter-Regular.ttf',
  './fonts/Inter-Medium.ttf',
  './fonts/Inter-SemiBold.ttf',
  './fonts/Inter-Bold.ttf',
  './fonts/Inter-ExtraBold.ttf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        // Only cache successful same-origin responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        // Offline fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
