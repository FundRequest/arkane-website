(function(w) {
  // Avoid `console` errors in browsers that lack a console.
  (function() {
    var method;
    var noop = function() {
    };
    var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (w.console = w.console || {});

    while (length--) {
      method = methods[length];

      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
  }());


  'use strict';

  var event = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
  var eventParams = event === 'touchstart' ? {passive: true} : {};

  function initMobileMenu() {
    document.querySelector('.nav-mobile__button').addEventListener(event, function() {
      var body = document.querySelector('body');
      var isOpen = body.classList.contains('nav-mobile-is-open');

      if (isOpen) {
        body.classList.remove('nav-mobile-is-open');
      } else {
        body.classList.add('nav-mobile-is-open');
      }
    }, eventParams);
  }

  function initDeferImg() {
    var imgDefer = document.getElementsByTagName('img');
    for (var i = 0; i < imgDefer.length; i++) {
      if (imgDefer[i].getAttribute('data-src')) {
        imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
      }
    }
  }

  function loadGtm() {
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(w, document, 'script', 'dataLayer', w.gtm_id);
  }

  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDeferImg();
    loadGtm();
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../../service-worker.js?v=' + w.creation);
  }
})(window);
