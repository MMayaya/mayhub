const CORE_CACHE_NAME = 'may-learning-core-v54-universal-search-read-aloud';
const RUNTIME_CACHE_NAME = 'may-learning-runtime-pages';
const CERTIFICATE_DOWNLOAD_CACHE = 'may-learning-certificate-downloads';
const CERTIFICATE_DOWNLOAD_PATH = '/certificate-download/';
const SERVICE_WORKER_VERSION = '71-universal-search-read-aloud';

const CORE_ASSETS = [
  '/universal-search.css',
  '/universal-search-index.js',
  '/universal-search.js',
  '/may-read-aloud.js',
  '/may-certificate-actions.js',
  '/may-certificate-history.js',
  '/certificate-preview.js',
  '/may-certificate-renderer.js',
  '/assessment-certificate.js',
  '/certificate-history.html',
  '/profile-dashboard.html',
  '/profile-dashboard.js',
  '/mayhub-auth-state.js',
  '/certificate-history-page.js',
  '/game-audio.js',
    '/May%20Learning%20Hub%20Logo.png',
    '/May%20Learning%20Hub%20Signature-transparent.png',
  '/Sounds/Correct.mp3',
  '/Sounds/Wrong.mp3',
  '/Sounds/Pass.mp3',
  '/Sounds/Fail.mp3',
  '/Sounds/Wheel.mp3',
  '/Sounds/MovingSnake.mp3',
  '/Sounds/SnakeBite.mp3',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/assessment-games.html',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/GeoQuest.html',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/geoquest.css',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/geoquest.js',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/stage1-data.js',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/stage2-data.js',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/stage3-data.js',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/sources/population-pyramid-country-k.jpg',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/stage4-data.js',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/sources/population-change-ledger.jpg',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/stage5-data.js',
  '/Geography/Term-3/Grade-10/Games/Assessment%20Games/GeoQuest/sources/rural-urban-journey.jpg',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/GeoQuest.html',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/geoquest.css',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/geoquest.js',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/source-packs.js',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/stage2-data.js',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/stage3-data.js',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/stage4-data.js',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/stage5-data.js',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/sources/development-crossroads.jpg',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/sources/trade-gatekeepers.jpg',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/sources/aid-operations-brief.jpg',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/sources/trade-brief-a.jpg',
  '/Geography/Term-3/Grade-11/Games/Assessment%20Games/GeoQuest/sources/trade-brief-b.jpg',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/history-assessment-games.html',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/HistoryQuest.html',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/historyquest.css',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/essay-stage.css',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/historyquest.js',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/stage1-data.js',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/stage2-data.js',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/stage3-data.js',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/stage4-data.js',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/stage5-data.js',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/stage6-data.js',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/sources/berlin-conference-cartoon.jpg',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/sources/causes-of-colonisation.jpg',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/sources/patterns-of-colonisation.jpg',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/sources/results-of-colonisation.jpg',
  '/Social-Sciences/Term-3/Grade-8/Games/History%20Assessment%20Games/HistoryQuest/sources/ashanti-resistance.jpg',
  '/Collab-Hub.html'
];

const CORE_NETWORK_FIRST_PATHS = new Set([
  '/',
  '/index.html',
  '/Collab-Hub.html',
  '/signin.html',
  '/certificate-history.html',
  '/profile-dashboard.html',
  '/profile-dashboard.js',
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
  '/certificate-preview.js',
  '/may-certificate-renderer.js',
  '/assessment-certificate.js',
  '/may-certificate-history.js',
  '/certificate-history-page.js',
  '/game-audio.js',
  '/universal-search.css',
  '/universal-search-index.js',
  '/universal-search.js',
  '/may-read-aloud.js',
  '/sw.js'
]);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CORE_CACHE_NAME).then(cache => Promise.all(
      CORE_ASSETS.map(async assetPath => {
        try {
          const assetRequest = new Request(new URL(assetPath, self.location.origin).href, { cache: 'reload' });
          const response = await fetch(assetRequest);
          if (response && response.ok) await cache.put(assetRequest, response);
        } catch (error) {
          console.log('Service Worker: Core asset will be cached when next available.', assetPath, error);
        }
      })
    )).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        const isEarlierCoreCache = cacheName.startsWith('may-learning-core-') && cacheName !== CORE_CACHE_NAME;
        return isEarlierCoreCache ? caches.delete(cacheName) : null;
      })
    )).then(() => self.clients.claim())
  );
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

async function cacheOfflinePack(assetPaths) {
  if (!Array.isArray(assetPaths)) return { cached: 0, failed: 0, code: 'invalid_assets' };
  const requestedPaths = [...new Set(assetPaths.filter(path => typeof path === 'string' && path.length <= 500))].slice(0, 150);
  const runtimeCache = await caches.open(RUNTIME_CACHE_NAME);
  let cached = 0;
  let failed = 0;

  for (const assetPath of requestedPaths) {
    try {
      const assetUrl = new URL(assetPath, self.location.origin);
      if (assetUrl.origin !== self.location.origin) {
        failed += 1;
        continue;
      }
      const request = new Request(assetUrl.href, { cache: 'reload' });
      const response = await fetch(request);
      if (!response || !response.ok) {
        failed += 1;
        continue;
      }
      await runtimeCache.put(request, response);
      cached += 1;
    } catch {
      failed += 1;
    }
  }
  return { cached, failed, code: failed ? 'partially_cached' : 'cached' };
}

self.addEventListener('message', event => {
  const data = event.data || {};
  const replyPort = event.ports && event.ports[0];
  if (data.type === 'MAYHUB_GET_SW_VERSION' && replyPort) {
    replyPort.postMessage({ version: SERVICE_WORKER_VERSION });
  }
  if (data.type === 'MAYHUB_SKIP_WAITING') {
    self.skipWaiting();
  }
  if (data.type === 'MAYHUB_CACHE_OFFLINE_PACK') {
    event.waitUntil(cacheOfflinePack(data.assets).then(result => {
      if (replyPort) replyPort.postMessage(result);
    }));
  }
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  if (!isSameOrigin) return;

  const isCertificateDownload = requestUrl.pathname.startsWith(CERTIFICATE_DOWNLOAD_PATH);
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

  const isCoreAsset = CORE_NETWORK_FIRST_PATHS.has(requestUrl.pathname);
  const isHtmlPage = event.request.mode === 'navigate'
    || event.request.destination === 'document'
    || requestUrl.pathname.endsWith('.html');
  const cacheName = isCoreAsset ? CORE_CACHE_NAME : RUNTIME_CACHE_NAME;
  const useNetworkFirst = isCoreAsset || isHtmlPage;

  event.respondWith(
    caches.open(cacheName).then(async cache => {
      if (useNetworkFirst) {
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
