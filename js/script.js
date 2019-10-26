$(document).ready(function () {
  // Menu init 
  menuInit();

  // Scrolled menu
  scrolledMenu();

  // Init owl carousel blocks
  owlCarouselBlocks();

  // Scroll to top
  $('.scroll-top-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  // Fancybox gallery
  $('[data-fancybox="gallery"]').fancybox();

  // Fancybox
  $('.fancybox-zoom').fancybox();

  // Circle progress
  $('.circle-progress').circleProgress({
    startAngle: -1.5,
    size: 150,
    thickness: 2,
    fill: '#1976d7'
  });

  // Tab
  $('[data-tab-button]').click(function () {
    var $parent = $(this).closest('.js-tab-block');
    var $buttons = $parent.find('[data-tab-button]');

    var tabname = $(this).data('tab-button');
    var $tab = $parent.find('[data-tab="' + tabname + '"]');

    $buttons.removeClass('active');
    $(this).addClass('active');

    if ($tab != undefined && $tab.length > 0) {
      $parent.find('[data-tab]').removeClass('active').hide();
      $tab.fadeIn(350);
    }
  });
});

$(window).on('load', function () {
  // Hide preloader 
  $('.preloader').fadeOut();
});

$(window).scroll(function () {
  scrolledMenu();
});

function owlCarouselBlocks() {
  $('[data-bg]').each(function() {
    var bg = $(this).data('bg');

    if (bg != undefined && bg != '') {
      $(this).css('background-image', 'url("'+ bg +'")');
    }
  });

  var $homeSlider = $('#home-slider').owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    items: 1,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: false
  });

  $('.home-slider-owl-prev').click(function () {
    $homeSlider.trigger('prev.owl.carousel');
  });

  $('.home-slider-owl-next').click(function () {
    $homeSlider.trigger('next.owl.carousel');
  });

  var $testimonialsSlider = $('.testimonials-carousel').owlCarousel({
    autoWidth: false,
    center: false,
    loop: true,
    nav: false,
    dots: false,
    items: 1,
    startPosition: 0,
    responsive: {
      767: {
        autoWidth: true,
        center: true,
        startPosition: 1
      }
    }
  });

  $('.testimonials-owl-prev').click(function () {
    $testimonialsSlider.trigger('prev.owl.carousel');
  });

  $('.testimonials-owl-next').click(function () {
    $testimonialsSlider.trigger('next.owl.carousel');
  });
}

function scrolledMenu() {
  var scrollTop = $(window).scrollTop();
  var $header = $('header');

  // Menu scroll top
  if (scrollTop > 10) {
    $header.addClass('fixed-menu').fadeIn(500);
  } else {
    $header.removeClass('fixed-menu').removeAttr('style');
  }
}

function menuInit() {
  $('.header-menu [data-scroll-to]').each(function () {
    var section = $(this).data('scroll-to');
    var $parent = $(this).parent();

    if ($(section) != undefined && $(section).length > 0) {
      new Waypoint({
        element: $(section),
        handler: function (direction) {
          if (direction == 'down') {
            $('.header-menu li').removeClass('active');
            $parent.addClass('active');
          }
        },
        offset: '30%'
      });

      new Waypoint({
        element: $(section),
        handler: function (direction) {
          if (direction == 'up') {
            $('.header-menu li').removeClass('active');
            $parent.addClass('active');
          }
        },
        offset: '-70%'
      });
    }
  });

  $('[data-scroll-to]').click(function (e) {
    e.preventDefault();

    var section = $(this).data('scroll-to');
    var plus = parseInt($(this).data('scroll-plus'));
    var minus = parseInt($(this).data('scroll-minus'));

    if ($(section) != undefined && $(section).length > 0) {
      var scrollTo = $(section).offset().top;

      if (!isNaN(plus) && plus > 0) {
        scrollTo = scrollTo + plus;
      }

      if (!isNaN(minus) && minus > 0) {
        scrollTo = scrollTo - minus;
      }

      $('html, body').animate({
        scrollTop: scrollTo
      }, 1000);
    }
  });

  $('.mobile-menu button').click(function () {
    var $menu = $('#main-menu');
    var $icon = $(this).children('i');

    if ($menu.css('display') == 'none') {
      $menu.slideDown();
      $icon.removeClass('fa-bars').addClass('fa-times');
    } else {
      $menu.slideUp();
      $icon.removeClass('fa-times').addClass('fa-bars');
    }
  });
}