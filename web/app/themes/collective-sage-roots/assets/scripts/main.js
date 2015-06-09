/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        initSlick();
        // JavaScript to be fired on all pages
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);


  // Slick carousel init
  function initSlick() {

    if($(".slider").length) {
      $(".slider .carousel-inner").slick({
        dots: true,
        //dotsClass: 'carousel-indicators',
        appendDots: $('.carousel-inner'),
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        lazyLoad: 'progressive',
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: false
      });
      // On swipe event
      $('.slider').on('swipe', function(event, slick, direction){
        console.log(direction);
        // left
      });

      // On edge hit
      $('.slider').on('edge', function(event, slick, direction){
        console.log('edge was hit');
      });

      // On before slide change
      $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        console.log(nextSlide);
      });
    }

  }


})(jQuery); // Fully reference jQuery after this point.
