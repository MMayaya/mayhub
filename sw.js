const CACHE_NAME = 'may-learning-v5-certificate-downloads';
const CERTIFICATE_DOWNLOAD_CACHE = 'may-learning-certificate-downloads';
const CERTIFICATE_DOWNLOAD_PATH = '/certificate-download/';
const SERVICE_WORKER_VERSION = '5-certificate-downloads';

const NETWORK_FIRST_PATHS = new Set([
  '/',
  '/index.html',
  '/signin.html',
  '/signup.html',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/site.webmanifest',
  '/activity-auth-guard.js',
  '/mayhub-auth-state.js',
  '/sw.js'
]);

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cache => {
        if (cache !== CACHE_NAME && cache !== CERTIFICATE_DOWNLOAD_CACHE) {
          console.log('Service Worker: Clearing old cache', cache);
          return caches.delete(cache);
        }
        return null;
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'MAYHUB_GET_SW_VERSION' && event.ports && event.ports[0]) {
    event.ports[0].postMessage({ version: SERVICE_WORKER_VERSION });
  }
  if (event.data && event.data.type === 'MAYHUB_SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isCertificateDownload = isSameOrigin && requestUrl.pathname.startsWith(CERTIFICATE_DOWNLOAD_PATH);
  if (isCertificateDownload) {
    event.respondWith(
      caches.open(CERTIFICATE_DOWNLOAD_CACHE).then(cache => cache.match(event.request)).then(response => {
        if (response) return response;
        return new Response('Certificate download expired. Please return to the game and download it again.', {
          status: 404,
          headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
        });
      })
    );
    return;
  }
  const isNetworkFirst = isSameOrigin && NETWORK_FIRST_PATHS.has(requestUrl.pathname);

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      if (isNetworkFirst) {
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          const cachedResponse = await cache.match(event.request);
          if (cachedResponse) return cachedResponse;
          throw error;
        }
      }

      const cachedResponse = await cache.match(event.request);
      const networkFetch = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(error => {
        console.log('Network fetch failed, relying on cache.', error);
      });

      return cachedResponse || networkFetch;
    })
  );
});
