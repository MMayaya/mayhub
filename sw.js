const CACHE_NAME = 'may-learning-v2-activity-auth-fix';

const NETWORK_FIRST_PATHS = new Set([
  '/',
  '/index.html',
  '/signin.html',
  '/signup.html',
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
        if (cache !== CACHE_NAME) {
          console.log('Service Worker: Clearing old cache', cache);
          return caches.delete(cache);
        }
        return null;
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
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