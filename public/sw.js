const CACHE_NAME = 'wascrap-v3-performance';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';

const urlsToCache = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/critical.css',
  '/manifest.json',
  '/src/components/Navigation.tsx',
  '/src/components/Hero.tsx'
];

// Routes to cache dynamically
const cacheableRoutes = ['/services', '/booking', '/about', '/contact'];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - advanced caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests differently
  if (url.pathname.includes('/api/') || url.hostname.includes('supabase')) {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // Static assets strategy
  if (request.destination === 'image' || request.destination === 'font' || request.destination === 'style') {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // Navigation requests - network first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        return caches.match(request).then(cachedResponse => {
          return cachedResponse || caches.match('/');
        });
      })
    );
    return;
  }

  // Default strategy
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      return cachedResponse || fetch(request);
    })
  );
});