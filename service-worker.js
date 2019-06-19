'use strict';

var debug = false;
var version = 'v1::4';
var offlineFundamentals = [
  '',
  '/site.webmanifest',
  '/favicon.ico',
  '/index.html',
  '/pages/build-on-arkane.html',
  '/pages/terms.html',
  '/assets/css/main.css',
  '/assets/css/terms.css',
  '/assets/js/main.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open(version + 'fundamentals')
      .then(function(cache) {
        return cache.addAll(offlineFundamentals);
      })
      .then(function() {
        if (debug) {
          console.log('WORKER: install completed');
        }
      })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') {
    if (debug) {
      console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
    }
    return;
  }
  event.respondWith(
    caches
      .match(event.request)
      .then(function(cached) {
        var networked = fetch(event.request)
          .then(fetchedFromNetwork, () => unableToResolve(event.request))
          .catch(() => unableToResolve(event.request));

        return cached || networked;

        function fetchedFromNetwork(response) {
          var cacheCopy = response.clone();

          caches
            .open(version + 'pages')
            .then(function add(cache) {
              if(event.request.url.indexOf('chrome-extension') !== 0) {
                cache.put(event.request, cacheCopy);
              }
            })
            .then(function() {
              if (debug) {
                console.log('WORKER: fetch response stored in cache.', event.request.url);
              }
            });

          return response;
        }

        function unableToResolve(request) {
          if (debug) {
            console.log('unable to resolve', request);
          }
          if (request && request.url) {
            var result = /\/assets\/(js|css)\/(.*)\?/ig.exec(request.url);
            // 0: "/assets/js/main.js?"
            // 1: "js"
            // 2: "main.js?"
            caches.open(version + 'fundamentals')
          }

          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                                   'Content-Type': 'text/html'
                                 })
          });
        }
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(function(keys) {
        return Promise.all(
          keys
            .filter(function(key) {
              return !key.startsWith(version);
            })
            .map(function(key) {
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        if (debug) {
          console.log('WORKER: activate completed.');
        }
      })
  );
});
