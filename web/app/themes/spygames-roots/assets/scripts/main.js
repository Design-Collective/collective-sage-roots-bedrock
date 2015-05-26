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
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages

        // Init Bootstrap Select
        // dc_initSelectPicker();

        // Init Slick Slider
        // dc_initSlick();

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
    /* 'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }, */
    resizeTimer: false
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
    readyEvents: function() {
      
      console.log("Ready");

      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    },
    loadEvents: function() {
      console.log("Load");
    },
    resize: function() {
      clearTimeout(Roots.resizeTimer);
      // Roots.resizeTimer = setTimeout(callOnResize, 250);
    }
  };

  // Load Events
  $(document).ready(UTIL.readyEvents);
  $(window).load(UTIL.loadEvents);
  $(window).resize(UTIL.resize);

  // Init nice select boxes
  function dc_initSelectPicker() {
    if($("select").length) {
      $('select').addClass("nice-select");
      $('.nice-select').selectpicker();
    }
  }

  // Slick carousel init

  function dc_initSlick() {
    myfade = true;
    if($(window).width() < 768) {
      myfade = false;
    }

    if($(".slider").length) {
      $(".slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.thumbnails',
        dots: false,
        fade: myfade,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true
        // infinite: false
      });
    }

    if($(".thumbnails").length) {
      $(".thumbnails").slick({
        slidesToShow: 5,
        slidesToScroll: 5,
        asNavFor: '.slider',
        dots: false,
        arrows: true,
        // centerMode: true,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: false
        // infinite: false
      });
    }
  }

})(jQuery); // Fully reference jQuery after this point.
