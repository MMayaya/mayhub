const CACHE_NAME = 'may-learning-v1';

// 1. INSTALL EVENT
// Forces the Service Worker to install immediately without waiting.
self.addEventListener('install', event => {
  self.skipWaiting();
});

// 2. ACTIVATE EVENT
// This cleans up old caches. If you ever change the CACHE_NAME to 'v2', 
// this code deletes 'v1' so your users' phones don't fill up with old data.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Take control of the app immediately
  return self.clients.claim();
});

// 3. FETCH EVENT (The Stale-While-Revalidate Magic)
self.addEventListener('fetch', event => {
  // Only intercept normal GET requests (ignore POST data)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      // Step A: Look for the file in the cache first
      const cachedResponse = await cache.match(event.request);
      
      // Step B: Fetch the newest version from GitHub in the background
      const networkFetch = fetch(event.request).then(networkResponse => {
        // Only save valid, successful responses to the cache
        if (networkResponse && networkResponse.status === 200) {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(error => {
        // If the user has no internet, fail silently (the cached file will still load)
        console.log('Network fetch failed, relying on cache.', error);
      });

      // Step C: Serve the fast cached file immediately. 
      // If nothing is in the cache (first visit), wait for the network fetch.
      return cachedResponse || networkFetch;
    })
  );
});