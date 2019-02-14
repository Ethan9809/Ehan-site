this.addEventListener('install', function (event) {
  event.waitUntil(
      caches.open('my-test-cache-v1').then(function (cache) {
          return cache.addAll([
              '/'
          ]);
      })
  );
});