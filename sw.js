const CACHE_NAME = 'may-learning-v6-certificate-actions';
const CERTIFICATE_DOWNLOAD_CACHE = 'may-learning-certificate-downloads';
const CERTIFICATE_DOWNLOAD_PATH = '/certificate-download/';
const SERVICE_WORKER_VERSION = '6-certificate-actions';

const CERTIFICATE_UPDATE_ASSETS = [
  '/may-certificate-actions.js',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/The%20Berlin%20Conference/spin1.html'
];

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
  '/may-certificate-actions.js',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/The%20Berlin%20Conference/spin1.html',
  '/sw.js'
]);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => Promise.all(
      CERTIFICATE_UPDATE_ASSETS.map(async assetPath => {
        try {
          const assetRequest = new Request(new URL(assetPath, self.location.origin).href, { cache: 'reload' });
          const response = await fetch(assetRequest);
          if (response && response.ok) await cache.put(assetRequest, response);
        } catch (error) {
          console.log('Service Worker: Update asset will be cached when next available.', assetPath, error);
        }
      })
    )).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  // Preserve earlier caches so learners do not lose previously saved offline pages.
  event.waitUntil(self.clients.claim());
});

async function matchCurrentOrPreservedCache(request, currentCache) {
  const currentResponse = await currentCache.match(request);
  if (currentResponse) return currentResponse;

  const preservedResponse = await caches.match(request);
  if (!preservedResponse) return null;
  try {
    await currentCache.put(request, preservedResponse.clone());
  } catch (error) {
    console.log('Service Worker: Could not promote preserved cached response.', error);
  }
  return preservedResponse;
}

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
          const cachedResponse = await matchCurrentOrPreservedCache(event.request, cache);
          if (cachedResponse) return cachedResponse;
          throw error;
        }
      }

      const cachedResponse = await matchCurrentOrPreservedCache(event.request, cache);
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
