(function(w, $) {
  'use strict';

  function replacePageBg() {
    $('[data-page-bg]').each(function() {
      var $bg = $(this);
      var src = $bg.attr('data-page-bg');
      var $bgBig = $('[data-page-bg-big]');

      $('<img>').attr('src', src).on('load', function() {
        $bgBig.css('background-image', 'url("' + src + '")');
        $bg.addClass('fadeOut');
        $bgBig.addClass('fadeIn');
      });

    });
  }

  function initMobileMenu() {
    var event = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';

    document.querySelector('.nav-mobile__button').addEventListener(event, function() {
      var $body = $('body');
      var isOpen = $body.hasClass('nav-mobile-is-open');
      if (isOpen) {
        $body.removeClass('nav-mobile-is-open');
      } else {
        $body.addClass('nav-mobile-is-open');
      }
    }, event === 'touchstart' ? {passive: true} : {});
  }

  $(function() {
    replacePageBg();
    initMobileMenu();
  });

  if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('../../service-worker.js');
  }
})(window, jQuery);
