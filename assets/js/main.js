(function(w, $) {
  'use strict';

  var $bus = $({});
  var event = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
  var eventParams = event === 'touchstart' ? {passive: true} : {};

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
    document.querySelector('.nav-mobile__button').addEventListener(event, function() {
      var $body = $('body');
      var isOpen = $body.hasClass('nav-mobile-is-open');
      if (isOpen) {
        $body.removeClass('nav-mobile-is-open');
      } else {
        $body.addClass('nav-mobile-is-open');
      }
    }, eventParams);
  }

  function initPageVideo() {
    var stream = document.querySelector('.page-video stream');
    var $body = $('body');
    if(stream !== null && typeof stream !== 'undefined' && typeof stream.play === 'function') {
      $bus.on('page-video-show', function() {
        $body.addClass('page-video-visible');
      });
      $bus.on('page-video-hide', function() {
        $body.removeClass('page-video-visible');
      });
      $bus.on('page-video-play', function() {
        stream.play();
      });
      $bus.on('page-video-pause', function() {
        stream.pause();
      });

      $('[data-page-video-action="show-and-play"]').on('touch click', function(e) {
        e.preventDefault();
        $bus.trigger('page-video-show');
        $bus.trigger('page-video-play');
        return false;
      });

      $('[data-page-video-action="hide-and-pause"]').on('touch click', function(e) {
        e.preventDefault();
        $bus.trigger('page-video-pause');
        $bus.trigger('page-video-hide');
        return false;
      });

      document.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
          if($body.hasClass('page-video-visible')) {
            $bus.trigger('page-video-pause');
            $bus.trigger('page-video-hide');
          }
        }
        if (e.key === ' ') {
          if($body.hasClass('page-video-visible')) {
            if(stream.paused) {
              $bus.trigger('page-video-play');
            } else {
              $bus.trigger('page-video-pause');
            }
          }
        }
      });
    }

  }

  $(function() {
    replacePageBg();
    initMobileMenu();
    initPageVideo();
  });

  if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('../../service-worker.js');
  }
})(window, jQuery);
