/* jshint ignore:start */
var $ = jQuery.noConflict();

$.fn.inlineStyle = function (prop) {
	return this.prop("style")[$.camelCase(prop)];
};

$.fn.doOnce = function( func ) {
	this.length && func.apply( this );
	return this;
}

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
									|| window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());



var DCANVAS = DCANVAS || {};

(function($){

	// USE STRICT
	"use strict";

	DCANVAS.initialize = {

		init: function(){

			DCANVAS.initialize.responsiveClasses();
			DCANVAS.initialize.imagePreload( '.portfolio-item:not(:has(.fslider)) img' );
			DCANVAS.initialize.stickyElements();
			DCANVAS.initialize.goToTop();
			DCANVAS.initialize.fullScreen();
			DCANVAS.initialize.verticalMiddle();
			DCANVAS.initialize.lightbox();
			DCANVAS.initialize.resizeVideos();
			DCANVAS.initialize.imageFade();
			DCANVAS.initialize.pageTransition();
			DCANVAS.initialize.dataStyles();
			DCANVAS.initialize.dataResponsiveHeights();

			$('.fslider').addClass('preloader2');

		},

		responsiveClasses: function(){
			var jRes = jRespond([
				{
					label: 'smallest',
					enter: 0,
					exit: 479
				},{
					label: 'handheld',
					enter: 480,
					exit: 767
				},{
					label: 'tablet',
					enter: 768,
					exit: 991
				},{
					label: 'laptop',
					enter: 992,
					exit: 1199
				},{
					label: 'desktop',
					enter: 1200,
					exit: 10000
				}
			]);
			jRes.addFunc([
				{
					breakpoint: 'desktop',
					enter: function() { $body.addClass('device-lg'); },
					exit: function() { $body.removeClass('device-lg'); }
				},{
					breakpoint: 'laptop',
					enter: function() { $body.addClass('device-md'); },
					exit: function() { $body.removeClass('device-md'); }
				},{
					breakpoint: 'tablet',
					enter: function() { $body.addClass('device-sm'); },
					exit: function() { $body.removeClass('device-sm'); }
				},{
					breakpoint: 'handheld',
					enter: function() { $body.addClass('device-xs'); },
					exit: function() { $body.removeClass('device-xs'); }
				},{
					breakpoint: 'smallest',
					enter: function() { $body.addClass('device-xxs'); },
					exit: function() { $body.removeClass('device-xxs'); }
				}
			]);
		},

		imagePreload: function(selector, parameters){
			var params = {
				delay: 250,
				transition: 400,
				easing: 'linear'
			};
			$.extend(params, parameters);

			$(selector).each(function() {
				var image = $(this);
				image.css({visibility:'hidden', opacity: 0, display:'block'});
				image.wrap('<span class="preloader" />');
				image.one("load", function(evt) {
					$(this).delay(params.delay).css({visibility:'visible'}).animate({opacity: 1}, params.transition, params.easing, function() {
						$(this).unwrap('<span class="preloader" />');
					});
				}).each(function() {
					if(this.complete) $(this).trigger("load");
				});
			});
		},

		verticalMiddle: function(){
			if( $verticalMiddleEl.length > 0 ) {
				$verticalMiddleEl.each( function(){
					var element = $(this),
						verticalMiddleH = element.outerHeight(),
						headerHeight = $header.outerHeight();

					if( element.parents('#slider').length > 0 && !element.hasClass('ignore-header') ) {
						if( $header.hasClass('transparent-header') && ( $body.hasClass('device-lg') || $body.hasClass('device-md') ) ) {
							verticalMiddleH = verticalMiddleH - 70;
							if( $slider.next('#header').length > 0 ) { verticalMiddleH = verticalMiddleH + headerHeight; }
						}
					}

					if( $body.hasClass('device-xs') || $body.hasClass('device-xxs') ) {
						if( element.parents('.full-screen').length && !element.parents('.force-full-screen').length ){
							element.css({ position: 'relative', top: '0', width: 'auto', marginTop: '0', padding: '60px 0' }).addClass('clearfix');
						} else {
							element.css({ position: 'absolute', top: '50%', width: '100%', marginTop: -(verticalMiddleH/2)+'px' });
						}
					} else {
						element.css({ position: 'absolute', top: '50%', width: '100%', marginTop: -(verticalMiddleH/2)+'px' });
					}
				});
			}
		},

		stickyElements: function(){
			if( $siStickyEl.length > 0 ) {
				var siStickyH = $siStickyEl.outerHeight();
				$siStickyEl.css({ marginTop: -(siStickyH/2)+'px' });
			}

			if( $dotsMenuEl.length > 0 ) {
				var opmdStickyH = $dotsMenuEl.outerHeight();
				$dotsMenuEl.css({ marginTop: -(opmdStickyH/2)+'px' });
			}
		},

		goToTop: function(){
			$goToTopEl.click(function() {
				$('body,html').stop(true).animate({scrollTop:0},400);
				return false;
			});
		},

		goToTopScroll: function(){
			if( $body.hasClass('device-lg') || $body.hasClass('device-md') || $body.hasClass('device-sm') ) {
				if($window.scrollTop() > 450) {
					$goToTopEl.fadeIn();
				} else {
					$goToTopEl.fadeOut();
				}
			}
		},

		fullScreen: function(){
			if( $fullScreenEl.length > 0 ) {
				$fullScreenEl.each( function(){
					var element = $(this),
						scrHeight = $window.height();
					if( element.attr('id') == 'slider' ) {
						var sliderHeightOff = $slider.offset().top;
						scrHeight = scrHeight - sliderHeightOff;
						if( element.hasClass('slider-parallax') ) {
							var transformVal = element.css('transform'),
								transformX = transformVal.match(/-?[\d\.]+/g);
							scrHeight = ( $window.height() + Number(transformX[5]) ) - sliderHeightOff;
						}
						if( $('#slider.with-header').next('#header:not(.transparent-header)').length > 0 && ( $body.hasClass('device-lg') || $body.hasClass('device-md') ) ) {
							var headerHeightOff = $header.outerHeight();
							scrHeight = scrHeight - headerHeightOff;
						}
					}
					if( element.parents('.full-screen').length > 0 ) { scrHeight = element.parents('.full-screen').height(); }

					if( $body.hasClass('device-xs') || $body.hasClass('device-xxs') ) {
						if( !element.hasClass('force-full-screen') ){ scrHeight = 'auto'; }
					}

					element.css('height', scrHeight);
					if( element.attr('id') == 'slider' && !element.hasClass('canvas-slider-grid') ) { if( element.has('.swiper-slide') ) { element.find('.swiper-slide').css('height', scrHeight); } }
				});
			}
		},

		maxHeight: function(){
			if( $commonHeightEl.length > 0 ) {
				$commonHeightEl.each( function(){
					var element = $(this);
					if( element.has('.common-height') ) {
						DCANVAS.initialize.commonHeight( element.find('.common-height') );
					}

					DCANVAS.initialize.commonHeight( element );
				});
			}
		},

		commonHeight: function( element ){
			var maxHeight = 0;
			element.children('[class^=col-]').each(function() {
				var element = $(this).children('div');
				if( element.hasClass('max-height') ){
					maxHeight = element.outerHeight();
				} else {
					if (element.outerHeight() > maxHeight)
					maxHeight = element.outerHeight();
				}
			});

			element.children('[class^=col-]').each(function() {
				$(this).height(maxHeight);
			});
		},

		testimonialsGrid: function(){
			if( $testimonialsGridEl.length > 0 ) {
				if( $body.hasClass('device-sm') || $body.hasClass('device-md') || $body.hasClass('device-lg') ) {
					var maxHeight = 0;
					$testimonialsGridEl.each( function(){
						$(this).find("li > .testimonial").each(function(){
						   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
						});
						$(this).find("li").height(maxHeight);
						maxHeight = 0;
					});
				} else {
					$testimonialsGridEl.find("li").css({ 'height': 'auto' });
				}
			}
		},

		lightbox: function(){
			var $lightboxImageEl = $('[data-lightbox="image"]'),
				$lightboxGalleryEl = $('[data-lightbox="gallery"]'),
				$lightboxIframeEl = $('[data-lightbox="iframe"]'),
				$lightboxAjaxEl = $('[data-lightbox="ajax"]'),
				$lightboxAjaxGalleryEl = $('[data-lightbox="ajax-gallery"]');

			if( $lightboxImageEl.length > 0 ) {
				$lightboxImageEl.magnificPopup({
					type: 'image',
					closeOnContentClick: true,
					closeBtnInside: false,
					fixedContentPos: true,
					mainClass: 'mfp-no-margins mfp-fade', // class to remove default margin from left and right side
					image: {
						verticalFit: true
					}
				});
			}

			if( $lightboxGalleryEl.length > 0 ) {
				$lightboxGalleryEl.each(function() {
					var element = $(this);

					if( element.find('a[data-lightbox="gallery-item"]').parent('.clone').hasClass('clone') ) {
						element.find('a[data-lightbox="gallery-item"]').parent('.clone').find('a[data-lightbox="gallery-item"]').attr('data-lightbox','');
					}

					element.magnificPopup({
						delegate: 'a[data-lightbox="gallery-item"]',
						type: 'image',
						closeOnContentClick: true,
						closeBtnInside: false,
						fixedContentPos: true,
						mainClass: 'mfp-no-margins mfp-fade', // class to remove default margin from left and right side
						image: {
							verticalFit: true
						},
						gallery: {
							enabled: true,
							navigateByImgClick: true,
							preload: [0,1] // Will preload 0 - before current, and 1 after the current image
						}
					});
				});
			}

			if( $lightboxIframeEl.length > 0 ) {
				$lightboxIframeEl.magnificPopup({
					disableOn: 600,
					type: 'iframe',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});
			}

			if( $lightboxAjaxEl.length > 0 ) {
				$lightboxAjaxEl.magnificPopup({
					type: 'ajax',
					closeBtnInside: false,
					callbacks: {
						ajaxContentAdded: function(mfpResponse) {
							DCANVAS.widget.loadFlexSlider();
							DCANVAS.initialize.resizeVideos();
							DCANVAS.widget.masonryThumbs();
						},
						open: function() {
							$body.addClass('ohidden');
						},
						close: function() {
							$body.removeClass('ohidden');
						}
					}
				});
			}

			if( $lightboxAjaxGalleryEl.length > 0 ) {
				$lightboxAjaxGalleryEl.magnificPopup({
					delegate: 'a[data-lightbox="ajax-gallery-item"]',
					type: 'ajax',
					closeBtnInside: false,
					gallery: {
						enabled: true,
						preload: 0,
						navigateByImgClick: false
					},
					callbacks: {
						ajaxContentAdded: function(mfpResponse) {
							DCANVAS.widget.loadFlexSlider();
							DCANVAS.initialize.resizeVideos();
							DCANVAS.widget.masonryThumbs();
						},
						open: function() {
							$body.addClass('ohidden');
						},
						close: function() {
							$body.removeClass('ohidden');
						}
					}
				});
			}
		},

		resizeVideos: function(){
			if ( $().fitVids ) {
				$("#content,#footer,#slider:not(.revslider-wrap),.landing-offer-media,.portfolio-ajax-modal").fitVids({
					customSelector: "iframe[src^='http://www.dailymotion.com/embed']",
					ignore: '.no-fv'
				});
			}
		},

		imageFade: function(){
			$('.image_fade').hover( function(){
				$(this).filter(':not(:animated)').animate({opacity: 0.8}, 400);
			}, function() {
				$(this).animate({opacity: 1}, 400);
			});
		},

		blogTimelineEntries: function(){
			$('.post-timeline.grid-2').find('.entry').each( function(){
				var position = $(this).inlineStyle('left');
				if( position == '0px' ) {
					$(this).removeClass('alt');
				} else {
					$(this).addClass('alt');
				}
				$(this).find('.entry-timeline').fadeIn();
			});
		},

		pageTransition: function(){
			if( !$body.hasClass('no-transition') ){
				var animationIn = $body.attr('data-animation-in'),
					animationOut = $body.attr('data-animation-out'),
					durationIn = $body.attr('data-speed-in'),
					durationOut = $body.attr('data-speed-out'),
					loaderStyle = $body.attr('data-loader'),
					loaderStyleHtml = '<div class="css3-spinner-bounce1"></div><div class="css3-spinner-bounce2"></div><div class="css3-spinner-bounce3"></div>';

				if( !animationIn ) { animationIn = 'fadeIn'; }
				if( !animationOut ) { animationOut = 'fadeOut'; }
				if( !durationIn ) { durationIn = 1500; }
				if( !durationOut ) { durationOut = 800; }

				if( loaderStyle == '2' ) {
					loaderStyleHtml = '<div class="css3-spinner-flipper"></div>';
				} else if( loaderStyle == '3' ) {
					loaderStyleHtml = '<div class="css3-spinner-double-bounce1"></div><div class="css3-spinner-double-bounce2"></div>';
				} else if( loaderStyle == '4' ) {
					loaderStyleHtml = '<div class="css3-spinner-rect1"></div><div class="css3-spinner-rect2"></div><div class="css3-spinner-rect3"></div><div class="css3-spinner-rect4"></div><div class="css3-spinner-rect5"></div>';
				} else if( loaderStyle == '5' ) {
					loaderStyleHtml = '<div class="css3-spinner-cube1"></div><div class="css3-spinner-cube2"></div>';
				} else if( loaderStyle == '6' ) {
					loaderStyleHtml = '<div class="css3-spinner-scaler"></div>';
				}

				$wrapper.animsition({
					inClass : animationIn,
					outClass : animationOut,
					inDuration : Number(durationIn),
					outDuration : Number(durationOut),
					linkElement : '#primary-menu ul li a:not([target="_blank"]):not([href^=#])',
					loading : true,
					loadingParentElement : 'body',
					loadingClass : 'css3-spinner',
					loadingHtml : loaderStyleHtml,
					unSupportCss : [
									 'animation-duration',
									 '-webkit-animation-duration',
									 '-o-animation-duration'
								   ],
					overlay : false,
					overlayClass : 'animsition-overlay-slide',
					overlayParentElement : 'body'
				});
			}
		},

		topScrollOffset: function() {
			var topOffsetScroll = 0;

			if( ( $body.hasClass('device-lg') || $body.hasClass('device-md') ) && !DCANVAS.isMobile.any() ) {
				if( $header.hasClass('sticky-header') ) {
					if( $pagemenu.hasClass('dots-menu') ) { topOffsetScroll = 100; } else { topOffsetScroll = 144; }
				} else {
					if( $pagemenu.hasClass('dots-menu') ) { topOffsetScroll = 140; } else { topOffsetScroll = 184; }
				}

				if( !$pagemenu.length ) {
					if( $header.hasClass('sticky-header') ) { topOffsetScroll = 100; } else { topOffsetScroll = 140; }
				}
			} else {
				topOffsetScroll = 40;
			}

			return topOffsetScroll;
		},

		defineColumns: function( element ){
			var column = 4;

			if( element.hasClass('portfolio-full') ) {
				if( element.hasClass('portfolio-3') ) column = 3;
				else if( element.hasClass('portfolio-5') ) column = 5;
				else if( element.hasClass('portfolio-6') ) column = 6;
				else column = 4;

				if( $body.hasClass('device-sm') && ( column == 4 || column == 5 || column == 6 ) ) {
					column = 3;
				} else if( $body.hasClass('device-xs') && ( column == 3 || column == 4 || column == 5 || column == 6 ) ) {
					column = 2;
				} else if( $body.hasClass('device-xxs') ) {
					column = 1;
				}
			} else if( element.hasClass('masonry-thumbs') ) {

				var lgCol = element.attr('data-lg-col'),
					mdCol = element.attr('data-md-col'),
					smCol = element.attr('data-sm-col'),
					xsCol = element.attr('data-xs-col'),
					xxsCol = element.attr('data-xxs-col');

				if( element.hasClass('col-2') ) column = 2;
				else if( element.hasClass('col-3') ) column = 3;
				else if( element.hasClass('col-5') ) column = 5;
				else if( element.hasClass('col-6') ) column = 6;
				else column = 4;

				if( $body.hasClass('device-lg') ) {
					if( lgCol ) { column = Number(lgCol); }
				} else if( $body.hasClass('device-md') ) {
					if( mdCol ) { column = Number(mdCol); }
				} else if( $body.hasClass('device-sm') ) {
					if( smCol ) { column = Number(smCol); }
				} else if( $body.hasClass('device-xs') ) {
					if( xsCol ) { column = Number(xsCol); }
				} else if( $body.hasClass('device-xxs') ) {
					if( xxsCol ) { column = Number(xxsCol); }
				}

			}

			return column;
		},

		setFullColumnWidth: function( element ){

			if( element.hasClass('portfolio-full') ) {
				var columns = DCANVAS.initialize.defineColumns( element );
				var containerWidth = element.width();
				if( containerWidth == ( Math.floor(containerWidth/columns) * columns ) ) { containerWidth = containerWidth - 1; }
				var postWidth = Math.floor(containerWidth/columns);
				if( $body.hasClass('device-xxs') ) { var deviceSmallest = 1; } else { var deviceSmallest = 0; }
				element.find(".portfolio-item").each(function(index){
					if( deviceSmallest == 0 && $(this).hasClass('wide') ) { var elementSize = ( postWidth*2 ); } else { var elementSize = postWidth; }
					$(this).css({"width":elementSize+"px"});
				});
			} else if( element.hasClass('masonry-thumbs') ) {
				var columns = DCANVAS.initialize.defineColumns( element ),
					containerWidth = element.innerWidth(),
					windowWidth = $window.width();
				if( containerWidth == windowWidth ){
					containerWidth = windowWidth*1.004;
					element.css({ 'width': containerWidth+'px' });
				}
				var postWidth = (containerWidth/columns);

				postWidth = Math.floor(postWidth);

				if( ( postWidth * columns ) >= containerWidth ) { element.css({ 'margin-right': '-1px' }); }

				element.children('a').css({"width":postWidth+"px"});

				var firstElementWidth = element.find('a:eq(0)').outerWidth();

				element.isotope({
					masonry: {
						columnWidth: firstElementWidth
					}
				});

				var bigImageNumbers = element.attr('data-big');
				if( bigImageNumbers ) {
					bigImageNumbers = bigImageNumbers.split(",");
					var bigImageNumber = '',
						bigi = '';
					for( bigi = 0; bigi < bigImageNumbers.length; bigi++ ){
						bigImageNumber = Number(bigImageNumbers[bigi]) - 1;
						element.find('a:eq('+bigImageNumber+')').css({ width: firstElementWidth*2 + 'px' });
					}
					var t = setTimeout( function(){
						element.isotope('layout');
					}, 1000 );
				}
			}

		},

		aspectResizer: function(){
			var $aspectResizerEl = $('.aspect-resizer');
			if( $aspectResizerEl.length > 0 ) {
				$aspectResizerEl.each( function(){
					var element = $(this),
						elementW = element.inlineStyle('width'),
						elementH = element.inlineStyle('height'),
						elementPW = element.parent().innerWidth();
				});
			}
		},

		dataStyles: function(){
			var $dataStyleXxs = $('[data-style-xxs]'),
				$dataStyleXs = $('[data-style-xs]'),
				$dataStyleSm = $('[data-style-sm]'),
				$dataStyleMd = $('[data-style-md]'),
				$dataStyleLg = $('[data-style-lg]');

			if( $dataStyleXxs.length > 0 ) {
				$dataStyleXxs.each( function(){
					var element = $(this),
						elementStyle = element.attr('data-style-xxs');

					if( $body.hasClass('device-xxs') ) {
						if( elementStyle != '' ) { element.attr( 'style', elementStyle ); }
					}
				});
			}

			if( $dataStyleXs.length > 0 ) {
				$dataStyleXs.each( function(){
					var element = $(this),
						elementStyle = element.attr('data-style-xs');

					if( $body.hasClass('device-xs') ) {
						if( elementStyle != '' ) { element.attr( 'style', elementStyle ); }
					}
				});
			}

			if( $dataStyleSm.length > 0 ) {
				$dataStyleSm.each( function(){
					var element = $(this),
						elementStyle = element.attr('data-style-sm');

					if( $body.hasClass('device-sm') ) {
						if( elementStyle != '' ) { element.attr( 'style', elementStyle ); }
					}
				});
			}

			if( $dataStyleMd.length > 0 ) {
				$dataStyleMd.each( function(){
					var element = $(this),
						elementStyle = element.attr('data-style-md');

					if( $body.hasClass('device-md') ) {
						if( elementStyle != '' ) { element.attr( 'style', elementStyle ); }
					}
				});
			}

			if( $dataStyleLg.length > 0 ) {
				$dataStyleLg.each( function(){
					var element = $(this),
						elementStyle = element.attr('data-style-lg');

					if( $body.hasClass('device-lg') ) {
						if( elementStyle != '' ) { element.attr( 'style', elementStyle ); }
					}
				});
			}
		},

		dataResponsiveHeights: function(){
			var $dataHeightXxs = $('[data-height-xxs]'),
				$dataHeightXs = $('[data-height-xs]'),
				$dataHeightSm = $('[data-height-sm]'),
				$dataHeightMd = $('[data-height-md]'),
				$dataHeightLg = $('[data-height-lg]');

			if( $dataHeightXxs.length > 0 ) {
				$dataHeightXxs.each( function(){
					var element = $(this),
						elementHeight = element.attr('data-height-xxs');

					if( $body.hasClass('device-xxs') ) {
						if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
					}
				});
			}

			if( $dataHeightXs.length > 0 ) {
				$dataHeightXs.each( function(){
					var element = $(this),
						elementHeight = element.attr('data-height-xs');

					if( $body.hasClass('device-xs') ) {
						if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
					}
				});
			}

			if( $dataHeightSm.length > 0 ) {
				$dataHeightSm.each( function(){
					var element = $(this),
						elementHeight = element.attr('data-height-sm');

					if( $body.hasClass('device-sm') ) {
						if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
					}
				});
			}

			if( $dataHeightMd.length > 0 ) {
				$dataHeightMd.each( function(){
					var element = $(this),
						elementHeight = element.attr('data-height-md');

					if( $body.hasClass('device-md') ) {
						if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
					}
				});
			}

			if( $dataHeightLg.length > 0 ) {
				$dataHeightLg.each( function(){
					var element = $(this),
						elementHeight = element.attr('data-height-lg');

					if( $body.hasClass('device-lg') ) {
						if( elementHeight != '' ) { element.css( 'height', elementHeight ); }
					}
				});
			}
		},

		stickFooterOnSmall: function(){
			var windowH = $window.height(),
				wrapperH = $wrapper.height();

			if( $footer.length > 0 && $wrapper.has('#footer') ) {
				if( windowH > wrapperH ) {
					$footer.css({ 'margin-top': ( windowH - wrapperH ) });
				}
			}
		}

	};

	DCANVAS.header = {

		init: function(){

			DCANVAS.header.superfish();
			DCANVAS.header.menufunctions();
			DCANVAS.header.fullWidthMenu();
			DCANVAS.header.overlayMenu();
			DCANVAS.header.stickyMenu();
			DCANVAS.header.sideHeader();
			DCANVAS.header.sidePanel();
			DCANVAS.header.onePageScroll();
			DCANVAS.header.onepageScroller();
			DCANVAS.header.darkLogo();
			DCANVAS.header.topsearch();
			DCANVAS.header.topcart();

		},

		superfish: function(){

			if ( $().superfish ) {
				if( $body.hasClass('device-lg') || $body.hasClass('device-md') ) {
					$('#primary-menu ul ul, #primary-menu ul .mega-menu-content').css('display', 'block');
					DCANVAS.header.menuInvert();
				}

				$('body:not(.side-header) #primary-menu > ul, body:not(.side-header) #primary-menu > div > ul,.top-links > ul').superfish({
					popUpSelector: 'ul,.mega-menu-content,.top-link-section',
					delay: 250,
					speed: 350,
					animation: {opacity:'show'},
					animationOut:  {opacity:'hide'},
					cssArrows: false
				});

				$('body.side-header #primary-menu > ul').superfish({
					popUpSelector: 'ul',
					delay: 250,
					speed: 350,
					animation: {opacity:'show',height:'show'},
					animationOut:  {opacity:'hide',height:'hide'},
					cssArrows: false
				});
			}

		},

		menuInvert: function() {

			$('#primary-menu .mega-menu-content, #primary-menu ul ul').each( function( index, element ){
				var $menuChildElement = $(element);
				var windowWidth = $window.width();
				var menuChildOffset = $menuChildElement.offset();
				var menuChildWidth = $menuChildElement.width();
				var menuChildLeft = menuChildOffset.left;

				if(windowWidth - (menuChildWidth + menuChildLeft) < 0) {
					$menuChildElement.addClass('menu-pos-invert');
				}
			});

		},

		menufunctions: function(){

			$( '#primary-menu ul li:has(ul)' ).addClass('sub-menu');
			$( '.top-links ul li:has(ul) > a' ).append( ' <i class="icon-angle-down"></i>' );
			$( '.top-links > ul' ).addClass( 'clearfix' );

			if( $body.hasClass('device-lg') || $body.hasClass('device-md') ) {
				$('#primary-menu.sub-title > ul > li,#primary-menu.sub-title > div > ul > li').hover(function() {
					$(this).prev().css({ backgroundImage : 'none' });
				}, function() {
					$(this).prev().css({ backgroundImage : 'url("images/icons/menu-divider.png")' });
				});

				$('#primary-menu.sub-title').children('ul').children('.current').prev().css({ backgroundImage : 'none' });
				$('#primary-menu.sub-title').children('div').children('ul').children('.current').prev().css({ backgroundImage : 'none' });
			}

			if( DCANVAS.isMobile.Android() ) {
				$( '#primary-menu ul li.sub-menu' ).children('a').on('touchstart', function(e){
					if( !$(this).parent('li.sub-menu').hasClass('sfHover') ) {
						e.preventDefault();
					}
				});
			}

			if( DCANVAS.isMobile.Windows() ) {
				$('#primary-menu > ul, #primary-menu > div > ul,.top-links > ul').superfish('destroy').addClass('windows-mobile-menu');

				$( '#primary-menu ul li:has(ul)' ).append('<a href="#" class="wn-submenu-trigger"><i class="icon-angle-down"></i></a>');

				$( '#primary-menu ul li.sub-menu' ).children('a.wn-submenu-trigger').click( function(e){
					$(this).parent().toggleClass('open');
					$(this).parent().find('> ul, > .mega-menu-content').stop(true,true).toggle();
					return false;
				});
			}

		},

		fullWidthMenu: function(){
			if( $body.hasClass('stretched') ) {
				if( $header.find('.container-fullwidth').length > 0 ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 120 }); }
				if( $header.hasClass('full-header') ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 60 }); }
			} else {
				if( $header.find('.container-fullwidth').length > 0 ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 120 }); }
				if( $header.hasClass('full-header') ) { $('.mega-menu .mega-menu-content').css({ 'width': $wrapper.width() - 80 }); }
			}
		},

		overlayMenu: function(){
			if( $body.hasClass('overlay-menu') ) {
				var overlayMenuItem = $('#primary-menu').children('ul').children('li'),
					overlayMenuItemHeight = overlayMenuItem.outerHeight(),
					overlayMenuItemTHeight = overlayMenuItem.length * overlayMenuItemHeight,
					firstItemOffset = ( $window.height() - overlayMenuItemTHeight ) / 2;

				$('#primary-menu').children('ul').children('li:first-child').css({ 'margin-top': firstItemOffset+'px' });
			}
		},

		stickyMenu: function( headerOffset ){
			if ($window.scrollTop() > headerOffset) {
				if( $body.hasClass('device-lg') || $body.hasClass('device-md') ) {
					$('body:not(.side-header) #header:not(.no-sticky)').addClass('sticky-header');
					$('#page-menu:not(.dots-menu,.no-sticky)').addClass('sticky-page-menu');
					if( !$headerWrap.hasClass('force-not-dark') ) { $headerWrap.removeClass('not-dark'); }
					DCANVAS.header.stickyMenuClass();
				} else if( $body.hasClass('device-xs') || $body.hasClass('device-xxs') || $body.hasClass('device-sm') ) {
					if( $body.hasClass('sticky-responsive-menu') ) {
						$('#header:not(.no-sticky)').addClass('responsive-sticky-header');
						DCANVAS.header.stickyMenuClass();
					}
				} else {
					DCANVAS.header.removeStickyness();
				}
			} else {
				DCANVAS.header.removeStickyness();
			}
		},

		removeStickyness: function(){
			if( $header.hasClass('sticky-header') ){
				$('body:not(.side-header) #header:not(.no-sticky)').removeClass('sticky-header');
				$('#page-menu:not(.dots-menu,.no-sticky)').removeClass('sticky-page-menu');
				$header.removeClass().addClass(oldHeaderClasses);
				$headerWrap.removeClass().addClass(oldHeaderWrapClasses);
				if( !$headerWrap.hasClass('force-not-dark') ) { $headerWrap.removeClass('not-dark'); }
				DCANVAS.slider.swiperSliderMenu();
				DCANVAS.slider.revolutionSliderMenu();
			}
			if( $header.hasClass('responsive-sticky-header') ){
				$('body.sticky-responsive-menu #header').removeClass('responsive-sticky-header');
			}
			if( $body.hasClass('device-xs') || $body.hasClass('device-xxs') || $body.hasClass('device-sm') ) {
				$header.removeClass().addClass(oldHeaderClasses);
				$headerWrap.removeClass().addClass(oldHeaderWrapClasses);
				if( !$headerWrap.hasClass('force-not-dark') ) { $headerWrap.removeClass('not-dark'); }
			}
		},

		sideHeader: function(){
			$("#header-trigger").click(function(){
				$('body.open-header').toggleClass("side-header-open");
				return false;
			});
		},

		sidePanel: function(){
			if( $body.hasClass('side-push-panel') ) {
				$("#side-panel-trigger,#side-panel-trigger-close").click(function(){
					$('body.side-push-panel').toggleClass("side-panel-open");
					return false;
				});
			}
		},

		onePageScroll: function(){
			if( $onePageMenuEl.length > 0 ){
				var onePageSpeed = $onePageMenuEl.attr('data-speed'),
					onePageOffset = $onePageMenuEl.attr('data-offset'),
					onePageEasing = $onePageMenuEl.attr('data-easing');

				if( !onePageSpeed ) { onePageSpeed = 1000; }
				if( !onePageEasing ) { onePageEasing = 'easeOutQuad'; }

				$onePageMenuEl.find('a[data-href]').click(function(){
					var element = $(this),
						divScrollToAnchor = element.attr('data-href'),
						divScrollSpeed = element.attr('data-speed'),
						divScrollOffset = element.attr('data-offset'),
						divScrollEasing = element.attr('data-easing');

					if( $( divScrollToAnchor ).length > 0 ) {

						if( !onePageOffset ) {
							var onePageOffsetG = DCANVAS.initialize.topScrollOffset();
						} else {
							var onePageOffsetG = onePageOffset;
						}

						if( !divScrollSpeed ) { divScrollSpeed = onePageSpeed; }
						if( !divScrollOffset ) { divScrollOffset = onePageOffsetG; }
						if( !divScrollEasing ) { divScrollEasing = onePageEasing; }

						if( $onePageMenuEl.hasClass('no-offset') ) { divScrollOffset = 0; }

						onePageGlobalOffset = Number(divScrollOffset);

						$onePageMenuEl.find('li').removeClass('current');
						$onePageMenuEl.find('a[data-href="' + divScrollToAnchor + '"]').parent('li').addClass('current');

						$('#primary-menu > ul, #primary-menu > .container > ul').toggleClass('show', function() {
							$('html,body').stop(true).animate({
								'scrollTop': $( divScrollToAnchor ).offset().top - Number(divScrollOffset)
							}, Number(divScrollSpeed), divScrollEasing);
						}, false);

						onePageGlobalOffset = Number(divScrollOffset);
					}

					return false;
				});
			}
		},

		onepageScroller: function(){
			$onePageMenuEl.find('li').removeClass('current');
			$onePageMenuEl.find('a[data-href="#' + DCANVAS.header.onePageCurrentSection() + '"]').parent('li').addClass('current');
		},

		onePageCurrentSection: function(){
			var currentOnePageSection = 'home';

			$pageSectionEl.each(function(index) {
				var h = $(this).offset().top;
				var y = $window.scrollTop();

				var offsetScroll = 100 + onePageGlobalOffset;

				if( y + offsetScroll >= h && y < h + $(this).height() && $(this).attr('id') != currentOnePageSection ) {
					currentOnePageSection = $(this).attr('id');
				}
			});

			return currentOnePageSection;
		},

		darkLogo: function(){
			if( ( $header.hasClass('dark') || $body.hasClass('dark') ) && !$headerWrap.hasClass('not-dark') ) {
				if( defaultDarkLogo ){ defaultLogo.find('img').attr('src', defaultDarkLogo); }
				if( retinaDarkLogo ){ retinaLogo.find('img').attr('src', retinaDarkLogo); }
			} else {
				if( defaultLogoImg ){ defaultLogo.find('img').attr('src', defaultLogoImg); }
				if( retinaLogoImg ){ retinaLogo.find('img').attr('src', retinaLogoImg); }
			}
		},

		stickyMenuClass: function(){
			if( stickyMenuClasses ) { var newClassesArray = stickyMenuClasses.split(/ +/); } else { var newClassesArray = ''; }
			var noOfNewClasses = newClassesArray.length;

			if( noOfNewClasses > 0 ) {
				var i = 0;
				for( i=0; i<noOfNewClasses; i++ ) {
					if( newClassesArray[i] == 'not-dark' ) {
						$header.removeClass('dark');
						$headerWrap.addClass('not-dark');
					} else if( newClassesArray[i] == 'dark' ) {
						$headerWrap.removeClass('not-dark force-not-dark');
						if( !$header.hasClass( newClassesArray[i] ) ) {
							$header.addClass( newClassesArray[i] );
						}
					} else if( !$header.hasClass( newClassesArray[i] ) ) {
						$header.addClass( newClassesArray[i] );
					}
				}
			}

		},

		topsocial: function(){
			if( $topSocialEl.length > 0 ){
				if( $body.hasClass('device-md') || $body.hasClass('device-lg') ) {
					$topSocialEl.show();
					$topSocialEl.find('a').css({width: 40});

					$topSocialEl.find('.ts-text').each( function(){
						var $clone = $(this).clone().css({'visibility': 'hidden', 'display': 'inline-block', 'font-size': '13px', 'font-weight':'bold'}).appendTo($body),
							cloneWidth = $clone.innerWidth() + 52;
						$(this).parent('a').attr('data-hover-width',cloneWidth);
						$clone.remove();
					});

					$topSocialEl.find('a').hover(function() {
						if( $(this).find('.ts-text').length > 0 ) {
							$(this).css({width: $(this).attr('data-hover-width')});
						}
					}, function() {
						$(this).css({width: 40});
					});
				} else {
					$topSocialEl.show();
					$topSocialEl.find('a').css({width: 40});

					$topSocialEl.find('a').each(function() {
						var topIconTitle = $(this).find('.ts-text').text();
						$(this).attr('title', topIconTitle);
					});

					$topSocialEl.find('a').hover(function() {
						$(this).css({width: 40});
					}, function() {
						$(this).css({width: 40});
					});

					if( $body.hasClass('device-xxs') ) {
						$topSocialEl.hide();
						$topSocialEl.slice(0, 8).show();
					}
				}
			}
		},

		topsearch: function(){

			$(document).on('click', function(event) {
				if (!$(event.target).closest('#top-search').length) { $body.toggleClass('top-search-open', false); }
				if (!$(event.target).closest('#top-cart').length) { $topCart.toggleClass('top-cart-open', false); }
				if (!$(event.target).closest('#page-menu').length) { $pagemenu.toggleClass('pagemenu-active', false); }
				if (!$(event.target).closest('#side-panel').length) { $body.toggleClass('side-panel-open', false); }
			});

			$("#top-search-trigger").click(function(e){
				$body.toggleClass('top-search-open');
				$topCart.toggleClass('top-cart-open', false);
				$( '#primary-menu > ul, #primary-menu > div > ul' ).toggleClass("show", false);
				$pagemenu.toggleClass('pagemenu-active', false);
				if ($body.hasClass('top-search-open')){
					$topSearch.find('input').focus();
				}
				e.stopPropagation();
				e.preventDefault();
			});

		},

		topcart: function(){

			$("#top-cart-trigger").click(function(e){
				$pagemenu.toggleClass('pagemenu-active', false);
				$topCart.toggleClass('top-cart-open');
				e.stopPropagation();
				e.preventDefault();
			});

		}

	};

	DCANVAS.slider = {

		init: function() {

			DCANVAS.slider.sliderParallax();
			DCANVAS.slider.sliderElementsFade();
			DCANVAS.slider.captionPosition();

		},

		sliderParallaxOffset: function(){
			var sliderParallaxOffsetTop = 0;
			var headerHeight = $header.outerHeight();
			if( $body.hasClass('side-header') || $header.hasClass('transparent-header') ) { headerHeight = 0; }
			if( $pageTitle.length > 0 ) {
				var pageTitleHeight = $pageTitle.outerHeight();
				sliderParallaxOffsetTop = pageTitleHeight + headerHeight;
			} else {
				sliderParallaxOffsetTop = headerHeight;
			}

			if( $slider.next('#header').length > 0 ) { sliderParallaxOffsetTop = 0; }

			return sliderParallaxOffsetTop;
		},

		sliderParallax: function(){
			if( $sliderParallaxEl.length > 0 ) {
				if( ( $body.hasClass('device-lg') || $body.hasClass('device-md') ) && !DCANVAS.isMobile.any() ) {
					var parallaxOffsetTop = DCANVAS.slider.sliderParallaxOffset(),
						parallaxElHeight = $sliderParallaxEl.outerHeight();

					if( ( parallaxElHeight + parallaxOffsetTop + 50 ) > $window.scrollTop() ){
						if ($window.scrollTop() > parallaxOffsetTop) {
							var tranformAmount = (($window.scrollTop()-parallaxOffsetTop) / 1.5 ).toFixed(2);
							var tranformAmount2 = (($window.scrollTop()-parallaxOffsetTop) / 7 ).toFixed(2);
							$sliderParallaxEl.stop(true,true).transition({ y: tranformAmount },0);
							$('.slider-parallax .slider-caption,.ei-title').stop(true,true).transition({ y: -tranformAmount2 },0);
						} else {
							$('.slider-parallax,.slider-parallax .slider-caption,.ei-title').transition({ y: 0 },0);
						}
					}
				} else {
					$('.slider-parallax,.slider-parallax .slider-caption,.ei-title').transition({ y: 0 },0);
				}
			}
		},

		sliderElementsFade: function(){
			if( $sliderParallaxEl.length > 0 ) {
				if( ( $body.hasClass('device-lg') || $body.hasClass('device-md') ) && !DCANVAS.isMobile.any() ) {
					var parallaxOffsetTop = DCANVAS.slider.sliderParallaxOffset();
					if( $slider.length > 0 ) {
						if( $header.hasClass('transparent-header') || $('body').hasClass('side-header') ) { var tHeaderOffset = 100; } else { var tHeaderOffset = 0; }
						$sliderParallaxEl.find('#slider-arrow-left,#slider-arrow-right,.vertical-middle:not(.no-fade),.slider-caption,.ei-title,.camera_prev,.camera_next').css({'opacity':( ( 100 + ( $slider.offset().top + parallaxOffsetTop + tHeaderOffset ) - $window.scrollTop() ) ) /90});
					}
				} else {
					$sliderParallaxEl.find('#slider-arrow-left,#slider-arrow-right,.vertical-middle:not(.no-fade),.slider-caption,.ei-title,.camera_prev,.camera_next').css({'opacity': 1});
				}
			}
		},

		captionPosition: function(){
			$slider.find('.slider-caption').each(function(){
				var scapHeight = $(this).outerHeight();
				var scapSliderHeight = $slider.outerHeight();
				if( $(this).parents('#slider').prev('#header').hasClass('transparent-header') && ( $body.hasClass('device-lg') || $body.hasClass('device-md') ) ) {
					if( $(this).parents('#slider').prev('#header').hasClass('floating-header') ) {
						$(this).css({ top: ( scapSliderHeight + 160 - scapHeight ) / 2 + 'px' });
					} else {
						$(this).css({ top: ( scapSliderHeight + 100 - scapHeight ) / 2 + 'px' });
					}
				} else {
					$(this).css({ top: ( scapSliderHeight - scapHeight ) / 2 + 'px' });
				}
			});
		},

		swiperSliderMenu: function(){
			if( $body.hasClass('device-lg') || $body.hasClass('device-md') ) {
				var activeSlide = $slider.find('.swiper-slide.swiper-slide-visible');
				DCANVAS.slider.headerSchemeChanger(activeSlide);
			}
		},

		revolutionSliderMenu: function(){
			if( $body.hasClass('device-lg') || $body.hasClass('device-md') ) {
				var activeSlide = $slider.find('.current-sr-slide-visible');
				DCANVAS.slider.headerSchemeChanger(activeSlide);
			}
		},

		headerSchemeChanger: function( activeSlide ){
			if( activeSlide.length > 0 ) {
				if( activeSlide.hasClass('dark') ){
					$('#header.transparent-header:not(.sticky-header,.semi-transparent,.floating-header)').addClass('dark');
					$('#header.transparent-header.sticky-header,#header.transparent-header.semi-transparent.sticky-header,#header.transparent-header.floating-header.sticky-header').removeClass('dark');
					$headerWrap.removeClass('not-dark');
				} else {
					if( $body.hasClass('dark') ) {
						activeSlide.addClass('not-dark');
						$('#header.transparent-header:not(.semi-transparent,.floating-header)').removeClass('dark');
						$('#header.transparent-header:not(.sticky-header,.semi-transparent,.floating-header)').find('#header-wrap').addClass('not-dark');
					} else {
						$('#header.transparent-header:not(.semi-transparent,.floating-header)').removeClass('dark');
						$headerWrap.removeClass('not-dark');
					}
				}
				DCANVAS.header.darkLogo();
			}
		},

		owlCaptionInit: function(){
			if( $owlCarouselEl.length > 0 ){
				$owlCarouselEl.each( function(){
					var element = $(this);
					if( element.find('.owl-dot').length > 0 ) {
						element.find('.owl-controls').addClass('with-carousel-dots');
					}
				});
			}
		}

	};

	DCANVAS.portfolio = {

		init: function(){

			DCANVAS.portfolio.ajaxload();

		},

		portfolioDescMargin: function(){
			var $portfolioOverlayEl = $('.portfolio-overlay');
			if( $portfolioOverlayEl.length > 0 ){
				$portfolioOverlayEl.each(function() {
					var element = $(this);
					if( element.find('.portfolio-desc').length > 0 ) {
						var portfolioOverlayHeight = element.outerHeight();
						var portfolioOverlayDescHeight = element.find('.portfolio-desc').outerHeight();
						if( element.find('a.left-icon').length > 0 || element.find('a.right-icon').length > 0 || element.find('a.center-icon').length > 0 ) {
							var portfolioOverlayIconHeight = 40 + 20;
						} else {
							var portfolioOverlayIconHeight = 0;
						}
						var portfolioOverlayMiddleAlign = ( portfolioOverlayHeight - portfolioOverlayDescHeight - portfolioOverlayIconHeight ) / 2
						element.find('.portfolio-desc').css({ 'margin-top': portfolioOverlayMiddleAlign });
					}
				});
			}
		},

		arrange: function(){
			DCANVAS.initialize.setFullColumnWidth( $portfolio );
			$('#portfolio.portfolio-full').isotope('layout');
		},

		ajaxload: function(){
			$('.portfolio-ajax .portfolio-item a.center-icon').click( function(e) {
				var portPostId = $(this).parents('.portfolio-item').attr('id');
				if( !$(this).parents('.portfolio-item').hasClass('portfolio-active') ) {
					DCANVAS.portfolio.loadItem(portPostId, prevPostPortId);
				}
				e.preventDefault();
			});
		},

		newNextPrev: function( portPostId ){
			var portNext = DCANVAS.portfolio.getNextItem(portPostId);
			var portPrev = DCANVAS.portfolio.getPrevItem(portPostId);
			$('#next-portfolio').attr('data-id', portNext);
			$('#prev-portfolio').attr('data-id', portPrev);
		},

		loadItem: function( portPostId, prevPostPortId, getIt ){
			if(!getIt) { getIt = false; }
			var portNext = DCANVAS.portfolio.getNextItem(portPostId);
			var portPrev = DCANVAS.portfolio.getPrevItem(portPostId);
			if(getIt == false) {
				DCANVAS.portfolio.closeItem();
				$portfolioAjaxLoader.fadeIn();
				var portfolioDataLoader = $('#' + portPostId).attr('data-loader');
				$portfolioDetailsContainer.load(portfolioDataLoader, { portid: portPostId, portnext: portNext, portprev: portPrev },
				function(){
					DCANVAS.portfolio.initializeAjax(portPostId);
					DCANVAS.portfolio.openItem();
					$portfolioItems.removeClass('portfolio-active');
					$('#' + portPostId).addClass('portfolio-active');
				});
			}
		},

		closeItem: function(){
			if( $portfolioDetails && $portfolioDetails.height() > 32 ) {
				$portfolioAjaxLoader.fadeIn();
				$portfolioDetails.find('#portfolio-ajax-single').fadeOut('600', function(){
					$(this).remove();
				});
				$portfolioDetails.removeClass('portfolio-ajax-opened');
			}
		},

		openItem: function(){
			var noOfImages = $portfolioDetails.find('img').length;
			var noLoaded = 0;

			if( noOfImages > 0 ) {
				$portfolioDetails.find('img').on('load', function(){
					noLoaded++;
					var topOffsetScroll = DCANVAS.initialize.topScrollOffset();
					if(noOfImages === noLoaded) {
						$portfolioDetailsContainer.css({ 'display': 'block' });
						$portfolioDetails.addClass('portfolio-ajax-opened');
						$portfolioAjaxLoader.fadeOut();
						var t=setTimeout(function(){
							DCANVAS.widget.loadFlexSlider();
							DCANVAS.initialize.lightbox();
							DCANVAS.initialize.resizeVideos();
							DCANVAS.widget.masonryThumbs();
							$('html,body').stop(true).animate({
								'scrollTop': $portfolioDetails.offset().top - topOffsetScroll
							}, 900, 'easeOutQuad');
						},500);
					}
				});
			} else {
				var topOffsetScroll = DCANVAS.initialize.topScrollOffset();
				$portfolioDetailsContainer.css({ 'display': 'block' });
				$portfolioDetails.addClass('portfolio-ajax-opened');
				$portfolioAjaxLoader.fadeOut();
				var t=setTimeout(function(){
					DCANVAS.widget.loadFlexSlider();
					DCANVAS.initialize.lightbox();
					DCANVAS.initialize.resizeVideos();
					DCANVAS.widget.masonryThumbs();
					$('html,body').stop(true).animate({
						'scrollTop': $portfolioDetails.offset().top - topOffsetScroll
					}, 900, 'easeOutQuad');
				},500);
			}
		},

		getNextItem: function( portPostId ){
			var portNext = '';
			var hasNext = $('#' + portPostId).next();
			if(hasNext.length != 0) {
				portNext = hasNext.attr('id');
			}
			return portNext;
		},

		getPrevItem: function( portPostId ){
			var portPrev = '';
			var hasPrev = $('#' + portPostId).prev();
			if(hasPrev.length != 0) {
				portPrev = hasPrev.attr('id');
			}
			return portPrev;
		},

		initializeAjax: function( portPostId ){
			prevPostPortId = $('#' + portPostId);

			$('#next-portfolio, #prev-portfolio').click( function() {
				var portPostId = $(this).attr('data-id');
				$portfolioItems.removeClass('portfolio-active');
				$('#' + portPostId).addClass('portfolio-active');
				DCANVAS.portfolio.loadItem(portPostId,prevPostPortId);
				return false;
			});

			$('#close-portfolio').click( function() {
				$portfolioDetailsContainer.fadeOut('600', function(){
					$portfolioDetails.find('#portfolio-ajax-single').remove();
				});
				$portfolioDetails.removeClass('portfolio-ajax-opened');
				$portfolioItems.removeClass('portfolio-active');
				return false;
			});
		}

	};

	DCANVAS.widget = {

		init: function(){

			DCANVAS.widget.animations();
			DCANVAS.widget.youtubeBgVideo();
			DCANVAS.widget.tabs();
			DCANVAS.widget.tabsJustify();
			DCANVAS.widget.toggles();
			DCANVAS.widget.accordions();
			DCANVAS.widget.counter();
			DCANVAS.widget.roundedSkill();
			DCANVAS.widget.progress();
			DCANVAS.widget.flickrFeed();
			DCANVAS.widget.instagramPhotos( '36286274.b9e559e.4824cbc1d0c94c23827dc4a2267a9f6b', 'b9e559ec7c284375bf41e9a9fb72ae01' );
			DCANVAS.widget.dribbbleShots();
			DCANVAS.widget.navTree();
			DCANVAS.widget.textRotater();
			DCANVAS.widget.linkScroll();
			DCANVAS.widget.extras();

		},

		parallax: function(){
			if( !DCANVAS.isMobile.any() ){
				$.stellar({
					horizontalScrolling: false,
					verticalOffset: 150,
					responsive: true
				});
			} else {
				$parallaxEl.addClass('mobile-parallax');
				$parallaxPageTitleEl.addClass('mobile-parallax');
			}
		},

		animations: function(){
			var $dataAnimateEl = $('[data-animate]');
			if( $dataAnimateEl.length > 0 ){
				if( $body.hasClass('device-lg') || $body.hasClass('device-md') || $body.hasClass('device-sm') ){
					$dataAnimateEl.each(function(){
						var element = $(this),
							animationDelay = element.attr('data-delay'),
							animationDelayTime = 0;

						if( animationDelay ) { animationDelayTime = Number( animationDelay ) + 500; } else { animationDelayTime = 500; }

						if( !element.hasClass('animated') ) {
							element.addClass('not-animated');
							var elementAnimation = element.attr('data-animate');
							element.appear(function () {
								setTimeout(function() {
									element.removeClass('not-animated').addClass( elementAnimation + ' animated');
								}, animationDelayTime);
							},{accX: 0, accY: -120},'easeInCubic');
						}
					});
				}
			}
		},

		loadFlexSlider: function(){
			var $flexSliderEl = $('.fslider').find('.flexslider');
			if( $flexSliderEl.length > 0 ){
				$flexSliderEl.each(function() {
					var $flexsSlider = $(this),
						flexsAnimation = $flexsSlider.parent('.fslider').attr('data-animation'),
						flexsEasing = $flexsSlider.parent('.fslider').attr('data-easing'),
						flexsDirection = $flexsSlider.parent('.fslider').attr('data-direction'),
						flexsSlideshow = $flexsSlider.parent('.fslider').attr('data-slideshow'),
						flexsPause = $flexsSlider.parent('.fslider').attr('data-pause'),
						flexsSpeed = $flexsSlider.parent('.fslider').attr('data-speed'),
						flexsVideo = $flexsSlider.parent('.fslider').attr('data-video'),
						flexsPagi = $flexsSlider.parent('.fslider').attr('data-pagi'),
						flexsArrows = $flexsSlider.parent('.fslider').attr('data-arrows'),
						flexsThumbs = $flexsSlider.parent('.fslider').attr('data-thumbs'),
						flexsHover = $flexsSlider.parent('.fslider').attr('data-hover'),
						flexsSheight = true,
						flexsUseCSS = false;

					if( !flexsAnimation ) { flexsAnimation = 'slide'; }
					if( !flexsEasing || flexsEasing == 'swing' ) {
						flexsEasing = 'swing';
						flexsUseCSS = true;
					}
					if( !flexsDirection ) { flexsDirection = 'horizontal'; }
					if( !flexsSlideshow ) { flexsSlideshow = true; } else { flexsSlideshow = false; }
					if( !flexsPause ) { flexsPause = 5000; }
					if( !flexsSpeed ) { flexsSpeed = 600; }
					if( !flexsVideo ) { flexsVideo = false; }
					if( flexsDirection == 'vertical' ) { flexsSheight = false; }
					if( flexsPagi == 'false' ) { flexsPagi = false; } else { flexsPagi = true; }
					if( flexsThumbs == 'true' ) { flexsPagi = 'thumbnails'; } else { flexsPagi = flexsPagi; }
					if( flexsArrows == 'false' ) { flexsArrows = false; } else { flexsArrows = true; }
					if( flexsHover == 'false' ) { flexsHover = false; } else { flexsHover = true; }

					$flexsSlider.flexslider({
						selector: ".slider-wrap > .slide",
						animation: flexsAnimation,
						easing: flexsEasing,
						direction: flexsDirection,
						slideshow: flexsSlideshow,
						slideshowSpeed: Number(flexsPause),
						animationSpeed: Number(flexsSpeed),
						pauseOnHover: flexsHover,
						video: flexsVideo,
						controlNav: flexsPagi,
						directionNav: flexsArrows,
						smoothHeight: flexsSheight,
						useCSS: flexsUseCSS,
						start: function(slider){
							DCANVAS.widget.animations();
							DCANVAS.initialize.verticalMiddle();
							slider.parent().removeClass('preloader2');
							var t = setTimeout( function(){ $('#portfolio.portfolio-masonry,#portfolio.portfolio-full,#posts.post-masonry').isotope('layout'); }, 1200 );
							DCANVAS.initialize.lightbox();
							$('.flex-prev').html('<i class="icon-angle-left"></i>');
							$('.flex-next').html('<i class="icon-angle-right"></i>');
							DCANVAS.portfolio.portfolioDescMargin();
						},
						after: function(){
							if( $portfolio.has('portfolio-full') ) {
								$('#portfolio.portfolio-full').isotope('layout');
								DCANVAS.portfolio.portfolioDescMargin();
							}
						}
					});
				});
			}
		},

		html5Video: function(){
			var videoEl = $('.video-wrap:has(video)');
			if( videoEl.length > 0 ) {
				videoEl.each(function(){
					var element = $(this),
						elementVideo = element.find('video'),
						outerContainerWidth = element.outerWidth(),
						outerContainerHeight = element.outerHeight(),
						innerVideoWidth = elementVideo.outerWidth(),
						innerVideoHeight = elementVideo.outerHeight();

					if( innerVideoHeight < outerContainerHeight ) {
						var videoAspectRatio = innerVideoWidth/innerVideoHeight,
							newVideoWidth = outerContainerHeight * videoAspectRatio,
							innerVideoPosition = (newVideoWidth - outerContainerWidth) / 2;
						elementVideo.css({ 'width': newVideoWidth+'px', 'height': outerContainerHeight+'px', 'left': -innerVideoPosition+'px' });
					} else {
						var innerVideoPosition = (innerVideoHeight - outerContainerHeight) / 2;
						elementVideo.css({ 'width': innerVideoWidth+'px', 'height': innerVideoHeight+'px', 'top': -innerVideoPosition+'px' });
					}

					if( DCANVAS.isMobile.any() ) {
						var placeholderImg = elementVideo.attr('poster');

						if( placeholderImg != '' ) {
							element.append('<div class="video-placeholder" style="background-image: url('+ placeholderImg +');"></div>')
						}
					}
				});
			}
		},

		youtubeBgVideo: function(){
			if( $youtubeBgPlayerEl.length > 0 ){
				$youtubeBgPlayerEl.each( function(){
					var element = $(this),
						ytbgVideo = element.attr('data-video'),
						ytbgMute = element.attr('data-mute'),
						ytbgRatio = element.attr('data-ratio'),
						ytbgQuality = element.attr('data-quality'),
						ytbgOpacity = element.attr('data-opacity'),
						ytbgContainer = element.attr('data-container'),
						ytbgOptimize = element.attr('data-optimize'),
						ytbgLoop = element.attr('data-loop'),
						ytbgVolume = element.attr('data-volume'),
						ytbgStart = element.attr('data-start'),
						ytbgStop = element.attr('data-stop'),
						ytbgAutoPlay = element.attr('data-autoplay'),
						ytbgFullScreen = element.attr('data-fullscreen');

					if( ytbgMute == 'false' ) { ytbgMute = false; } else { ytbgMute = true; }
					if( !ytbgRatio ) { ytbgRatio = '16/9'; }
					if( !ytbgQuality ) { ytbgQuality = 'hd720'; }
					if( !ytbgOpacity ) { ytbgOpacity = 1; }
					if( !ytbgContainer ) { ytbgContainer = 'self'; }
					if( ytbgOptimize == 'false' ) { ytbgOptimize = false; } else { ytbgOptimize = true; }
					if( ytbgLoop == 'false' ) { ytbgLoop = false; } else { ytbgLoop = true; }
					if( !ytbgVolume ) { ytbgVolume = 1; }
					if( !ytbgStart ) { ytbgStart = 0; }
					if( !ytbgStop ) { ytbgStop = 0; }
					if( ytbgAutoPlay == 'false' ) { ytbgAutoPlay = false; } else { ytbgAutoPlay = true; }
					if( ytbgFullScreen == 'true' ) { ytbgFullScreen = true; } else { ytbgFullScreen = false; }

					element.mb_YTPlayer({
						videoURL: ytbgVideo,
						mute: ytbgMute,
						ratio: ytbgRatio,
						quality: ytbgQuality,
						opacity: ytbgOpacity,
						containment: ytbgContainer,
						optimizeDisplay: ytbgOptimize,
						loop: ytbgLoop,
						vol: ytbgVolume,
						startAt: ytbgStart,
						stopAt: ytbgStop,
						autoplay: ytbgAutoPlay,
						realfullscreen: ytbgFullScreen,
						showYTLogo: false,
						showControls: false
					});
				});
			}
		},

		tabs: function(){
			var $tabs = $('.tabs:not(.customjs)');
			if( $tabs.length > 0 ) {
				$tabs.each( function(){
					var element = $(this),
						elementSpeed = element.attr('data-speed'),
						tabActive = element.attr('data-active');

					if( !elementSpeed ) { elementSpeed = 400; }
					if( !tabActive ) { tabActive = 0; } else { tabActive = tabActive - 1; }

					element.tabs({
						active: Number(tabActive),
						show: {
							effect: "fade",
							duration: Number(elementSpeed)
						}
					});
				});
			}
		},

		tabsJustify: function(){
			if( !$('body').hasClass('device-xxs') && !$('body').hasClass('device-xs') ){
				var $tabsJustify = $('.tabs.tabs-justify');
				if( $tabsJustify.length > 0 ) {
					$tabsJustify.each( function(){
						var element = $(this),
							elementTabs = element.find('.tab-nav > li'),
							elementTabsNo = elementTabs.length,
							elementContainer = 0,
							elementWidth = 0;

						if( element.hasClass('tabs-bordered') || element.hasClass('tabs-bb') ) {
							elementContainer = element.find('.tab-nav').outerWidth();
						} else {
							if( element.find('tab-nav').hasClass('tab-nav2') ) {
								elementContainer = element.find('.tab-nav').outerWidth() - (elementTabsNo * 10);
							} else {
								elementContainer = element.find('.tab-nav').outerWidth() - 30;
							}
						}

						elementWidth = Math.floor(elementContainer/elementTabsNo);
						elementTabs.css({ 'width': elementWidth + 'px' });

					});
				}
			} else { $('.tabs.tabs-justify').find('.tab-nav > li').css({ 'width': 'auto' }); }
		},

		toggles: function(){
			var $toggle = $('.toggle');
			if( $toggle.length > 0 ) {
				$toggle.each( function(){
					var element = $(this),
						elementState = element.attr('data-state');

					if( elementState != 'open' ){
						element.find('.togglec').hide();
					} else {
						element.find('.togglet').addClass("toggleta");
					}

					element.find('.togglet').click(function(){
						$(this).toggleClass('toggleta').next('.togglec').slideToggle(300);
						return true;
					});
				});
			}
		},

		accordions: function(){
			var $accordionEl = $('.accordion');
			if( $accordionEl.length > 0 ){
				$accordionEl.each( function(){
					var element = $(this),
						elementState = element.attr('data-state'),
						accordionActive = element.attr('data-active');

					if( !accordionActive ) { accordionActive = 0; } else { accordionActive = accordionActive - 1; }

					element.find('.acc_content').hide();

					if( elementState != 'closed' ) {
						element.find('.acctitle:eq('+ Number(accordionActive) +')').addClass('acctitlec').next().show();
					}

					element.find('.acctitle').click(function(){
						if( $(this).next().is(':hidden') ) {
							element.find('.acctitle').removeClass('acctitlec').next().slideUp("normal");
							$(this).toggleClass('acctitlec').next().slideDown("normal");
						}
						return false;
					});
				});
			}
		},

		counter: function(){
			var $counterEl = $('.counter:not(.counter-instant)');
			if( $counterEl.length > 0 ){
				$counterEl.each(function(){
					var element = $(this);
					var counterElementComma = $(this).find('span').attr('data-comma');
					if( !counterElementComma ) { counterElementComma = false; } else { counterElementComma = true; }
					if( $body.hasClass('device-lg') || $body.hasClass('device-md') ){
						element.appear( function(){
							DCANVAS.widget.runCounter( element, counterElementComma );
						},{accX: 0, accY: -120},'easeInCubic');
					} else {
						DCANVAS.widget.runCounter( element, counterElementComma );
					}
				});
			}
		},

		runCounter: function( counterElement,counterElementComma ){
			if( counterElementComma == true ) {
				counterElement.find('span').countTo({
					formatter: function (value, options) {
						value = value.toFixed(options.decimals);
						value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						return value;
					}
				});
			} else {
				counterElement.find('span').countTo();
			}
		},

		roundedSkill: function(){
			var $roundedSkillEl = $('.rounded-skill');
			if( $roundedSkillEl.length > 0 ){
				$roundedSkillEl.each(function(){
					var element = $(this);

					var roundSkillSize = element.attr('data-size');
					var roundSkillAnimate = element.attr('data-animate');
					var roundSkillWidth = element.attr('data-width');
					var roundSkillColor = element.attr('data-color');
					var roundSkillTrackColor = element.attr('data-trackcolor');

					if( !roundSkillSize ) { roundSkillSize = 140; }
					if( !roundSkillAnimate ) { roundSkillAnimate = 2000; }
					if( !roundSkillWidth ) { roundSkillWidth = 8; }
					if( !roundSkillColor ) { roundSkillColor = '#0093BF'; }
					if( !roundSkillTrackColor ) { roundSkillTrackColor = 'rgba(0,0,0,0.04)'; }

					var properties = {roundSkillSize:roundSkillSize, roundSkillAnimate:roundSkillAnimate, roundSkillWidth:roundSkillWidth, roundSkillColor:roundSkillColor, roundSkillTrackColor:roundSkillTrackColor};

					if( $body.hasClass('device-lg') || $body.hasClass('device-md') ){
						element.css({'width':roundSkillSize+'px','height':roundSkillSize+'px'}).animate({opacity: '0'}, 10);
						element.appear( function(){
							if (!element.hasClass('skills-animated')) {
								element.css({opacity: '1'});
								DCANVAS.widget.runRoundedSkills( element, properties );
								element.addClass('skills-animated');
							}
						},{accX: 0, accY: -120},'easeInCubic');
					} else {
						DCANVAS.widget.runRoundedSkills( element, properties );
					}
				});
			}
		},

		runRoundedSkills: function( element, properties ){
			element.easyPieChart({
				size: Number(properties.roundSkillSize),
				animate: Number(properties.roundSkillAnimate),
				scaleColor: false,
				trackColor: properties.roundSkillTrackColor,
				lineWidth: Number(properties.roundSkillWidth),
				lineCap: 'square',
				barColor: properties.roundSkillColor
			});
		},

		progress: function(){
			var $progressEl = $('.progress');
			if( $progressEl.length > 0 ){
				$progressEl.each(function(){
					var element = $(this),
						skillsBar = element.parent('li'),
						skillValue = skillsBar.attr('data-percent');

					if( $body.hasClass('device-lg') || $body.hasClass('device-md') ){
						element.appear( function(){
							if (!skillsBar.hasClass('skills-animated')) {
								element.find('.counter-instant span').countTo();
								skillsBar.find('.progress').css({width: skillValue + "%"}).addClass('skills-animated');
							}
						},{accX: 0, accY: -120},'easeInCubic');
					} else {
						element.find('.counter-instant span').countTo();
						skillsBar.find('.progress').css({width: skillValue + "%"});
					}
				});
			}
		},

		flickrFeed: function(){
			var $flickrFeedEl = $('.flickr-feed');
			if( $flickrFeedEl.length > 0 ){
				$flickrFeedEl.each(function() {
					var element = $(this),
						flickrFeedID = element.attr('data-id'),
						flickrFeedCount = element.attr('data-count'),
						flickrFeedType = element.attr('data-type'),
						flickrFeedTypeGet = 'photos_public.gne';

					if( flickrFeedType == 'group' ) { flickrFeedTypeGet = 'groups_pool.gne'; }
					if( !flickrFeedCount ) { flickrFeedCount = 9; }

					element.jflickrfeed({
						feedapi: flickrFeedTypeGet,
						limit: Number(flickrFeedCount),
						qstrings: {
							id: flickrFeedID
						},
						itemTemplate: '<a href="{{image_b}}" title="{{title}}" data-lightbox="gallery-item">' +
											'<img src="{{image_s}}" alt="{{title}}" />' +
									  '</a>'
					}, function(data) {
						DCANVAS.initialize.lightbox();
					});
				});
			}
		},

		instagramPhotos: function( c_accessToken, c_clientID ){
			var $instagramPhotosEl = $('.instagram-photos');
			if( $instagramPhotosEl.length > 0 ){
				$.fn.spectragram.accessData = {
					accessToken: c_accessToken,
					clientID: c_clientID
				};

				$instagramPhotosEl.each(function() {
					var element = $(this),
						instaGramUsername = element.attr('data-user'),
						instaGramTag = element.attr('data-tag'),
						instaGramCount = element.attr('data-count'),
						instaGramType = element.attr('data-type');

					if( !instaGramCount ) { instaGramCount = 9; }

					if( instaGramType == 'tag' ) {
						element.spectragram('getRecentTagged',{
							query: instaGramTag,
							max: Number( instaGramCount ),
							size: 'medium',
							wrapEachWith: ' '
						});
					} else if( instaGramType == 'user' ) {
						element.spectragram('getUserFeed',{
							query: instaGramUsername,
							max: Number( instaGramCount ),
							size: 'medium',
							wrapEachWith: ' '
						});
					} else {
						element.spectragram('getPopular',{
							max: Number( instaGramCount ),
							size: 'medium',
							wrapEachWith: ' '
						});
					}
				});
			}
		},

		dribbbleShots: function(){
			var $dribbbleShotsEl = $('.dribbble-shots');
			if( $dribbbleShotsEl.length > 0 ){
				$dribbbleShotsEl.each(function() {
					var element = $(this),
						dribbbleUsername = element.attr('data-user'),
						dribbbleCount = element.attr('data-count'),
						dribbbleList = element.attr('data-list'),
						dribbbleType = element.attr('data-type');

					if( !dribbbleCount ) { dribbbleCount = 9; }

					if( dribbbleType == 'follows' ) {
						$.jribbble.getShotsThatPlayerFollows( dribbbleUsername , function (followedShots) {
							var html = [];
							$.each(followedShots.shots, function (i, shot) {
								html.push('<a href="' + shot.url + '" target="_blank">');
								html.push('<img src="' + shot.image_teaser_url + '" ');
								html.push('alt="' + shot.title + '"></a>');
							});
							element.html(html.join(''));
						}, {page: 1, per_page: Number(dribbbleCount)});
					} else if( dribbbleType == 'user' ) {
						$.jribbble.getShotsByPlayerId( dribbbleUsername , function (playerShots) {
							var html = [];
							$.each(playerShots.shots, function (i, shot) {
								html.push('<a href="' + shot.url + '" target="_blank">');
								html.push('<img src="' + shot.image_teaser_url + '" ');
								html.push('alt="' + shot.title + '"></a>');
							});
							element.html(html.join(''));
						}, {page: 1, per_page: Number(dribbbleCount)});
					} else if( dribbbleType == 'list' ) {
						$.jribbble.getShotsByList( dribbbleList , function (listDetails) {
							var html = [];
							$.each(listDetails.shots, function (i, shot) {
								html.push('<a href="' + shot.url + '" target="_blank">');
								html.push('<img src="' + shot.image_teaser_url + '" ');
								html.push('alt="' + shot.title + '"></a>');
							});
							element.html(html.join(''));
						}, {page: 1, per_page: Number(dribbbleCount)});
					}
				});
			}
		},

		navTree: function(){
			var $navTreeEl = $('.nav-tree');
			if( $navTreeEl.length > 0 ){
				$navTreeEl.each( function(){
					var element = $(this),
						elementSpeed = element.attr('data-speed'),
						elementEasing = element.attr('data-easing');

					if( !elementSpeed ) { elementSpeed = 250; }
					if( !elementEasing ) { elementEasing = 'swing'; }

					element.find( 'ul li:has(ul)' ).addClass('sub-menu');
					element.find( 'ul li:has(ul) > a' ).append( ' <i class="icon-angle-down"></i>' );

					element.find( 'ul li:has(ul) > a' ).click( function(e){
						var childElement = $(this);
						element.find( 'ul li' ).not(childElement.parents()).removeClass('active');
						childElement.parent().children('ul').slideToggle( Number(elementSpeed), elementEasing, function(){
							$(this).find('ul').hide();
							$(this).find('li.active').removeClass('active');
						});
						element.find( 'ul li > ul' ).not(childElement.parent().children('ul')).not(childElement.parents('ul')).slideUp( Number(elementSpeed), elementEasing );
						childElement.parent('li:has(ul)').toggleClass('active');
						e.preventDefault();
					});
				});
			}
		},

		masonryThumbs: function(){
			var $masonryThumbsEl = $('.masonry-thumbs');
			if( $masonryThumbsEl.length > 0 ){
				$masonryThumbsEl.each( function(){
					var masonryItemContainer = $(this);
					DCANVAS.widget.masonryThumbsArrange( masonryItemContainer );
				});
			}
		},

		masonryThumbsArrange: function( element ){
			DCANVAS.initialize.setFullColumnWidth( element );
			element.isotope('layout');
		},

		notifications: function( element ){
			toastr.clear();
			var notifyElement = $(element),
				notifyPosition = notifyElement.attr('data-notify-position'),
				notifyType = notifyElement.attr('data-notify-type'),
				notifyMsg = notifyElement.attr('data-notify-msg'),
				notifyCloseButton = notifyElement.attr('data-notify-close');

			if( !notifyPosition ) { notifyPosition = 'toast-top-right'; } else { notifyPosition = 'toast-' + notifyElement.attr('data-notify-position'); }
			if( !notifyMsg ) { notifyMsg = 'Please set a message!'; }
			if( notifyCloseButton == 'true' ) { notifyCloseButton = true; } else { notifyCloseButton = false; }

			toastr.options.positionClass = notifyPosition;
			toastr.options.closeButton = notifyCloseButton;
			toastr.options.closeHtml = '<button><i class="icon-remove"></i></button>';

			if( notifyType == 'warning' ) {
				toastr.warning(notifyMsg);
			} else if( notifyType == 'error' ) {
				toastr.error(notifyMsg);
			} else if( notifyType == 'success' ) {
				toastr.success(notifyMsg);
			} else {
				toastr.info(notifyMsg);
			}

			return false;
		},

		textRotater: function(){
			if( $textRotaterEl.length > 0 ){
				$textRotaterEl.each(function(){
					var element = $(this),
						trRotate = $(this).attr('data-rotate'),
						trSpeed = $(this).attr('data-speed'),
						trSeparator = $(this).attr('data-separator');

					if( !trRotate ) { trRotate = "fade"; }
					if( !trSpeed ) { trSpeed = 1200; }
					if( !trSeparator ) { trSeparator = ","; }

					var tRotater = $(this).find('.t-rotate');

					tRotater.Morphext({
						animation: trRotate,
						separator: trSeparator,
						speed: Number(trSpeed)
					});
				});
			}
		},

		linkScroll: function(){
			$("a[data-scrollto]").click(function(){
				var element = $(this),
					divScrollToAnchor = element.attr('data-scrollto'),
					divScrollSpeed = element.attr('data-speed'),
					divScrollOffset = element.attr('data-offset'),
					divScrollEasing = element.attr('data-easing');

					if( !divScrollSpeed ) { divScrollSpeed = 750; }
					if( !divScrollOffset ) { divScrollOffset = DCANVAS.initialize.topScrollOffset(); }
					if( !divScrollEasing ) { divScrollEasing = 'easeOutQuad'; }

				$('html,body').stop(true).animate({
					'scrollTop': $( divScrollToAnchor ).offset().top - Number(divScrollOffset)
				}, Number(divScrollSpeed), divScrollEasing);

				return false;
			});
		},

		extras: function(){
			$('[data-toggle="tooltip"]').tooltip({container: 'body'});
			$('#primary-menu-trigger,#overlay-menu-close').click(function() {
				$( '#primary-menu > ul, #primary-menu > div > ul' ).toggleClass("show");
				return false;
			});
			$('#page-submenu-trigger').click(function() {
				$body.toggleClass('top-search-open', false);
				$pagemenu.toggleClass("pagemenu-active");
				return false;
			});
			$pagemenu.find('nav').click(function(e){
				$body.toggleClass('top-search-open', false);
				$topCart.toggleClass('top-cart-open', false);
			});
			if( DCANVAS.isMobile.any() ){
				$body.addClass('device-touch');
			}
			// var el = {
			//     darkLogo : $("<img>", {src: defaultDarkLogo}),
			//     darkRetinaLogo : $("<img>", {src: retinaDarkLogo})
			// };
			// el.darkLogo.prependTo("body");
			// el.darkRetinaLogo.prependTo("body");
			// el.darkLogo.css({'position':'absolute','z-index':'-100'});
			// el.darkRetinaLogo.css({'position':'absolute','z-index':'-100'});
		}

	};

	DCANVAS.isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (DCANVAS.isMobile.Android() || DCANVAS.isMobile.BlackBerry() || DCANVAS.isMobile.iOS() || DCANVAS.isMobile.Opera() || DCANVAS.isMobile.Windows());
		}
	};

	DCANVAS.documentOnResize = {

		init: function(){

			var t = setTimeout( function(){
				DCANVAS.header.topsocial();
				DCANVAS.header.fullWidthMenu();
				DCANVAS.header.overlayMenu();
				DCANVAS.initialize.fullScreen();
				DCANVAS.initialize.verticalMiddle();
				DCANVAS.initialize.maxHeight();
				DCANVAS.initialize.testimonialsGrid();
				DCANVAS.slider.captionPosition();
				DCANVAS.portfolio.arrange();
				DCANVAS.portfolio.portfolioDescMargin();
				DCANVAS.widget.tabsJustify();
				DCANVAS.widget.html5Video();
				DCANVAS.widget.masonryThumbs();
				DCANVAS.initialize.dataStyles();
				DCANVAS.initialize.dataResponsiveHeights();
			}, 500 );

		}

	};

	DCANVAS.documentOnReady = {

		init: function(){
			DCANVAS.initialize.init();
			DCANVAS.header.init();
			if( $slider.length > 0 ) { DCANVAS.slider.init(); }
			if( $portfolio.length > 0 ) { DCANVAS.portfolio.init(); }
			DCANVAS.widget.init();
			DCANVAS.documentOnReady.windowscroll();
		},

		windowscroll: function(){

			var headerOffset = $header.offset().top;
			var headerWrapOffset = $headerWrap.offset().top;

			var headerDefinedOffset = $header.attr('data-sticky-offset');
			if( typeof headerDefinedOffset !== 'undefined' ) {
				if( headerDefinedOffset == 'full' ) {
					headerWrapOffset = $window.height();
					var headerOffsetNegative = $header.attr('data-sticky-offset-negative');
					if( typeof headerOffsetNegative !== 'undefined' ) { headerWrapOffset = headerWrapOffset - headerOffsetNegative - 1; }
				} else {
					headerWrapOffset = Number(headerDefinedOffset);
				}
			}

			$window.on( 'scroll', function(){

				DCANVAS.initialize.goToTopScroll();
				$('body.open-header.close-header-on-scroll').removeClass("side-header-open");
				DCANVAS.header.stickyMenu( headerWrapOffset );
				DCANVAS.header.darkLogo();

			});

			window.addEventListener('scroll', function(){
				requestAnimationFrame(function(){
					DCANVAS.slider.sliderParallax();
					DCANVAS.slider.sliderElementsFade();
				});
			}, false);

			if( $onePageMenuEl.length > 0 ){
				$window.scrolled(function() {
					DCANVAS.header.onepageScroller();
				});
			}
		}

	};

	DCANVAS.documentOnLoad = {

		init: function(){
			DCANVAS.slider.captionPosition();
			DCANVAS.slider.swiperSliderMenu();
			DCANVAS.slider.revolutionSliderMenu();
			DCANVAS.initialize.maxHeight();
			DCANVAS.initialize.testimonialsGrid();
			DCANVAS.initialize.verticalMiddle();
			DCANVAS.initialize.stickFooterOnSmall();
			DCANVAS.portfolio.portfolioDescMargin();
			DCANVAS.portfolio.arrange();
			DCANVAS.widget.parallax();
			DCANVAS.widget.loadFlexSlider();
			DCANVAS.widget.html5Video();
			DCANVAS.widget.masonryThumbs();
			DCANVAS.slider.owlCaptionInit();
			DCANVAS.header.topsocial();
		}

	};

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$headerWrap = $('#header-wrap'),
		$footer = $('#footer'),
		oldHeaderClasses = $header.attr('class'),
		oldHeaderWrapClasses = $headerWrap.attr('class'),
		stickyMenuClasses = $header.attr('data-sticky-class'),
		defaultLogo = $('#logo').find('.standard-logo'),
		defaultLogoWidth = defaultLogo.find('img').outerWidth(),
		retinaLogo = $('#logo').find('.retina-logo'),
		defaultLogoImg = defaultLogo.find('img').attr('src'),
		retinaLogoImg = retinaLogo.find('img').attr('src'),
		defaultDarkLogo = defaultLogo.attr('data-dark-logo'),
		retinaDarkLogo = retinaLogo.attr('data-dark-logo'),
		$pagemenu = $('#page-menu'),
		$onePageMenuEl = $('.one-page-menu'),
		onePageGlobalOffset = 0,
		$portfolio = $('#portfolio'),
		$slider = $('#slider'),
		$sliderParallaxEl = $('.slider-parallax'),
		$pageTitle = $('#page-title'),
		$portfolioItems = $('.portfolio-ajax').find('.portfolio-item'),
		$portfolioDetails = $('#portfolio-ajax-wrap'),
		$portfolioDetailsContainer = $('#portfolio-ajax-container'),
		$portfolioAjaxLoader = $('#portfolio-ajax-loader'),
		prevPostPortId = '',
		$topSearch = $('#top-search'),
		$topCart = $('#top-cart'),
		$verticalMiddleEl = $('.vertical-middle'),
		$topSocialEl = $('#top-social').find('li'),
		$siStickyEl = $('.si-sticky'),
		$dotsMenuEl = $('.dots-menu'),
		$goToTopEl = $('#gotoTop'),
		$fullScreenEl = $('.full-screen'),
		$commonHeightEl = $('.common-height'),
		$testimonialsGridEl = $('.testimonials-grid'),
		$pageSectionEl = $('.page-section'),
		$owlCarouselEl = $('.owl-carousel'),
		$parallaxEl = $('.parallax'),
		$parallaxPageTitleEl = $('.page-title-parallax'),
		$youtubeBgPlayerEl = $('.yt-bg-player'),
		$textRotaterEl = $('.text-rotater');

	$(document).ready( DCANVAS.documentOnReady.init );
	$window.load( DCANVAS.documentOnLoad.init );
	$window.on( 'resize', DCANVAS.documentOnResize.init );

})(jQuery);
/* jshint ignore:end */