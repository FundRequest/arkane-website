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

  function initToggle() {
    var event = 'ontouchstart' in document.documentElement ? 'touchstart' : click;

    $('[data-toggle]').on(event, function() {
      var $toggleButton = $(this);
      var $body = $('body');
      var isOpen = $toggleButton.hasClass('open');
      var $toggleItem = $($toggleButton.data('toggle'));
      console.log($toggleItem);
      if(isOpen) {
        $body.css('overflow', 'auto');
        $toggleButton.removeClass('open');
        if($toggleItem.length > 0) {
          $toggleItem.removeClass('open');
        }
      } else {
        $body.css('overflow', 'hidden');
        $toggleButton.addClass('open');
        if($toggleItem.length > 0) {
          $toggleItem.addClass('open');
        }
      }
    });
  }

  function openMenu(){
    $('div.circle').addClass('expand');
    $('.menu li').addClass('animate');
  }

  function closeMenu(){
    $('div.circle').removeClass('expand');
    $('.menu li').removeClass('animate');
  }

  $(function() {
    replacePageBg();
    initToggle();
  });
})(window, jQuery);
