/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';




importScripts("scripts/sw/sw-toolbox.js","scripts/sw/runtime-caching.js");


/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["https://cdn.halfstaff.co/images/icon-0e6c79c139.svg","0e6c79c139be1d673a78b68bf2d5cf5b"],["https://cdn.halfstaff.co/images/icons/android-chrome-144x144-81eaea82dc.png","81eaea82dc931c049af073f15f256e7f"],["https://cdn.halfstaff.co/images/icons/android-chrome-192x192-9e74388b83.png","9e74388b8377cd4c6eb99d1da0478e50"],["https://cdn.halfstaff.co/images/icons/android-chrome-36x36-295ca46bc4.png","295ca46bc4099051dcb5433b405c415d"],["https://cdn.halfstaff.co/images/icons/android-chrome-48x48-30a384dd79.png","30a384dd793a55c2f08ecd8e711f0cac"],["https://cdn.halfstaff.co/images/icons/android-chrome-72x72-00de101791.png","00de101791f9e16f9f2d146b52e32f20"],["https://cdn.halfstaff.co/images/icons/android-chrome-96x96-24945821d4.png","24945821d4a2a1076aa70971caa3e69e"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-114x114-c22b9909f3.png","c22b9909f3ddd20b67c32f0d86bf0e08"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-120x120-dd8fa95820.png","dd8fa958204ac347bf1153b1a0301c12"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-144x144-0eadeb5440.png","0eadeb544045fb83169e0b9512c875ac"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-152x152-d45bb6f1da.png","d45bb6f1dadab886ccb94ef0f7fcd443"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-180x180-9aa5795a0d.png","9aa5795a0d76712c9b12bb4dc46e98b5"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-57x57-644f6089a5.png","644f6089a5cedb4c137db02783b6699a"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-60x60-2fcf075d42.png","2fcf075d427a6429d484ffe3c342b7d3"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-72x72-5bfe875202.png","5bfe87520204ff1b8f0b9a09cc828296"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-76x76-b705ea5d19.png","b705ea5d1962897de9e2407e31bf9a65"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-9aa5795a0d.png","9aa5795a0d76712c9b12bb4dc46e98b5"],["https://cdn.halfstaff.co/images/icons/apple-touch-icon-precomposed-d173e97895.png","d173e97895fec2e4ccaae5f6d3eeaa4e"],["https://cdn.halfstaff.co/images/icons/browserconfig-e9bd8b6320.xml","e9bd8b63202d2b65bed335325c142fa0"],["https://cdn.halfstaff.co/images/icons/favicon-16x16-0fda0e036b.png","0fda0e036bc2c832b1c80184fbfeb028"],["https://cdn.halfstaff.co/images/icons/favicon-194x194-056c3074d4.png","056c3074d423f20ace0701700d59aeeb"],["https://cdn.halfstaff.co/images/icons/favicon-32x32-9a8595cffe.png","9a8595cffe8547b6ad8a7078371291a6"],["https://cdn.halfstaff.co/images/icons/favicon-5606511f00.ico","5606511f001b07fd0a6fb34d417efabf"],["https://cdn.halfstaff.co/images/icons/favicon-96x96-49230b076d.png","49230b076d8c2d2a93bf812b5c37fd9b"],["https://cdn.halfstaff.co/images/icons/manifest-dce0166379.json","dce01663793fcff31d21aa7f1f75986a"],["https://cdn.halfstaff.co/images/icons/mstile-144x144-4c6b7266bc.png","4c6b7266bcbc80f8433490cf3d4cc70f"],["https://cdn.halfstaff.co/images/icons/mstile-150x150-9442cb48c1.png","9442cb48c16275c13bf30f19b59ef71b"],["https://cdn.halfstaff.co/images/icons/mstile-310x150-5e58f1287a.png","5e58f1287aa34b1a516b0a4deb376beb"],["https://cdn.halfstaff.co/images/icons/mstile-310x310-2d3833a04a.png","2d3833a04ad197aad4570ca837364055"],["https://cdn.halfstaff.co/images/icons/mstile-70x70-0448bf229d.png","0448bf229d75b2d7261776819bb3c2fc"],["https://cdn.halfstaff.co/images/icons/safari-pinned-tab-d9f4f3bd72.svg","d9f4f3bd72ba01f76a45569494eee516"],["https://cdn.halfstaff.co/index.html","53263bd632b5814d2aeb0192fe5f0d41"],["https://cdn.halfstaff.co/manifest.json","db0fe146be87e294cfdc4f2e59b6d710"],["https://cdn.halfstaff.co/scripts/main-a240f576cb.min.js","788b7e25c77ece895b0cec77b8ec8638"],["https://cdn.halfstaff.co/scripts/sw/runtime-caching.js","60ae89b024ea23ff7e29b54c570d600a"],["https://cdn.halfstaff.co/scripts/sw/sw-toolbox.js","66531e5962e4dccb0526a2b4cd6364a4"],["https://cdn.halfstaff.co/styles/style-18dd9fd7b2.css","08991433d0aa06e0433f70b3e73ea6ac"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-half-staff-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
      'sw-precache=' + param;

    return urlWithCacheBusting.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    // Take a look at each of the cache names we expect for this version.
    Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
      return caches.open(cacheName).then(function(cache) {
        // Get a list of all the entries in the specific named cache.
        // For caches that are already populated for a given version of a
        // resource, there should be 1 entry.
        return cache.keys().then(function(keys) {
          // If there are 0 entries, either because this is a brand new version
          // of a resource or because the install step was interrupted the
          // last time it ran, then we need to populate the cache.
          if (keys.length === 0) {
            // Use the last bit of the cache name, which contains the hash,
            // as the cache-busting parameter.
            // See https://github.com/GoogleChrome/sw-precache/issues/100
            var cacheBustParam = cacheName.split('-').pop();
            var urlWithCacheBusting = getCacheBustedUrl(
              CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

            var request = new Request(urlWithCacheBusting,
              {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                  response);
              }

              console.error('Request for %s returned a response status %d, ' +
                'so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          }
        });
      });
    })).then(function() {
      return caches.keys().then(function(allCacheNames) {
        return Promise.all(allCacheNames.filter(function(cacheName) {
          return cacheName.indexOf(CacheNamePrefix) === 0 &&
            !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html') &&
        /* eslint-disable quotes, comma-spacing */
        isPathWhitelisted([], event.request.url)) {
        /* eslint-enable quotes, comma-spacing */
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});




