"use strict";
jQuery(function () {
	/*--------------------------------------
			MOBILE MENU						
	--------------------------------------*/
	function collapseMenu(){
		jQuery('.tg-navigation ul li.menu-item-has-children, .tg-navigation ul li.menu-item-has-mega-menu').prepend('<span class="tg-dropdowarrow"><i class="fa fa-angle-down"></i></span>');
		jQuery('.tg-navigation ul li.menu-item-has-children span, .tg-navigation ul li.menu-item-has-mega-menu span').on('click', function() {
			jQuery(this).parent('li').toggleClass('tg-open');
			jQuery(this).next().next().slideToggle(300);
		});
	}
	collapseMenu();
	/*--------------------------------------
			FIXED HEADER					
	--------------------------------------*/
	if(jQuery('.tg-fixedheader').length > 0){
		jQuery(window).scroll(function() {
			var scroll = jQuery(window).scrollTop();
			if (scroll >= 50) {
				jQuery('.tg-fixedheader').addClass('tg-darkheader');
			}else{
				jQuery('.tg-fixedheader').removeClass('tg-darkheader');
			}
		});
	}
	/*------------------------------------------
			SMOOTH SCROLL
	------------------------------------------*/
	jQuery(".tg-btnscrolldown").click(function() {
		event.preventDefault();
		var offset = 0;
		jQuery('html, body').animate({
			scrollTop:  jQuery("#tg-main").offset().top + offset
		}, 2000);
	});

	jQuery(".link-scroll").click(function() {
		event.preventDefault();
		var offset = 0;
		jQuery('html, body').animate({
			scrollTop:  jQuery("#tg-main").offset().top + offset
		}, 2000);
	});


	/*------------------------------------------
			SIDE NAVIGATION
	------------------------------------------*/
	var _tg_btnopenclose = jQuery('.tg-btnopenclose');
	_tg_btnopenclose.on('click', function () {
		jQuery('#tg-wrapper').toggleClass('tg-sidenavshow');
		if( jQuery('#tg-wrapper').hasClass('tg-sidenavshow') ){
			jQuery('body').addClass('spread-overlay');
			return true;
		}
		jQuery('body').removeClass('spread-overlay');
	});
	var _tg_btnclosenav = jQuery('.tg-btnclosenav');
	_tg_btnclosenav.on('click', function () {
		jQuery('#tg-wrapper').toggleClass('tg-sidenavshow');
		if( jQuery('#tg-wrapper').hasClass('tg-sidenavshow') ){
			jQuery('body').addClass('spread-overlay');
			return true;
		}
		jQuery('body').removeClass('spread-overlay');
	});
	/* -------------------------------------
			SINGLE PAGE NAV
	-------------------------------------- */
	var body = jQuery('body');
	if(body.hasClass('tg-home')){
		body.addClass("home");
		jQuery(window).on('scroll', function() {
			var scroll = jQuery(window).scrollTop();
			if (scroll >= 10) {
				jQuery("#tg-header").addClass("single-page-nav");
			}else {
				jQuery("#tg-header").removeClass("single-page-nav");
			}
		});
	}
	/*---------------------------------------
			FULL PAGE SEARCH				
	---------------------------------------*/
	jQuery('a[href="#tg-search"]').on('click', function(event) {
		event.preventDefault();
		jQuery('#tg-search').addClass('open');
		jQuery('#tg-search > form > fieldset > input[type="search"]').focus();
	});
	jQuery('#tg-search, #tg-search button.tg-btnclose').on('click keyup', function(event) {
		if (event.target === this || event.target.className === 'tg-btnclose' || event.keyCode === 27) {
			jQuery(this).removeClass('open');
		}
	});
	jQuery('form').submit(function(event) {
		event.preventDefault();
		return false;
	});
	jQuery('.tg-search button.tg-btnclose').on('click', function(){
		jQuery(this).parents('.tg-search').removeClass('open');
	});
	/* ---------------------------------------
			STICKY HEADER
	--------------------------------------- */
	if(jQuery('#tg-fixed').length > 0){
		jQuery('#tg-fixed').scrollToFixed({
			marginTop: 71,
		});
	}
	/* ---------------------------------------
			SINGLE PAGE NAV
	--------------------------------------- */
	if(jQuery('.tg-internallinkslist').length > 0){
		jQuery('.tg-internallinkslist').singlePageNav({
			duration: 500,
			effect: 'swing',
			currentClass: 'tg-current',
		});
	}
	/* -------------------------------------
			HOME sLIDER V ONE
	-------------------------------------- */
	var _tg_homeslidersame = jQuery('[id="tg-homeslidervtwo"], [id="tg-homeslidervthree"], [id="tg-homeslidervfour"], [id="tg-homeslidervfive"], [id="tg-homeslidervseven"], [id="tg-homesliderveight"]');
	if(_tg_homeslidersame.hasClass('tg-homeslider')){
		_tg_homeslidersame.owlCarousel({
			items: 1,
			nav:true,
			loop:true,
			dots: true,
			autoplay: false,
			dotsClass: 'tg-sliderdots',
			navClass: ['tg-prev', 'tg-next'],
			navContainerClass: 'tg-slidernav',
			navText: ['<span class="icon-chevron-left"></span>', '<span class="icon-chevron-right"></span>'],
		});
	}
	/* -------------------------------------
			TESTIMONIALS SLIDER
	-------------------------------------- */
	function testimonialsSlider(){
		var sync1 = jQuery("#tg-homesliderfull");
		var sync2 = jQuery("#tg-homesliderthumbnails");
		var slidesPerPage = 3;
		var syncedSecondary = true;
		sync1.owlCarousel({
		items : 1,
		slideSpeed : 2000,
		autoplay: true,
		loop: true,
		responsiveRefreshRate : 200,
	}).on('changed.owl.carousel', syncPosition);
	sync2
		.on('initialized.owl.carousel', function () {
		sync2.find(".owl-item").eq(0).addClass("current");
	})
	.owlCarousel({
		items : slidesPerPage,
		dots: false,
		nav: false,
		smartSpeed: 200,
		slideSpeed : 500,
		slideBy: slidesPerPage,
		responsiveRefreshRate : 100
	}).on('changed.owl.carousel', syncPosition2);
	function syncPosition(el) {
		var count = el.item.count-1;
		var current = Math.round(el.item.index - (el.item.count/2) - .5);
			if(current < 0) {
				current = count;
			}
	if(current > count) {
			current = 0;
		}
	sync2
		.find(".owl-item")
		.removeClass("current")
		.eq(current)
		.addClass("current");
	var onscreen = sync2.find('.owl-item.active').length - 1;
	var start = sync2.find('.owl-item.active').first().index();
	var end = sync2.find('.owl-item.active').last().index();
		if (current > end) {
			sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
		sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}
	function syncPosition2(el) {
	if(syncedSecondary) {
		var number = el.item.index;
		sync1.data('owl.carousel').to(number, 100, true);
		}
	}
	sync2.on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = jQuery(this).index();
		sync1.data('owl.carousel').to(number, 300, true);
	});
	}
	testimonialsSlider();
	/* -------------------------------------
			PROGRESS BAR
	-------------------------------------- */
	if(jQuery('.tg-memberskills').length || jQuery('.tg-skills').length > 0){
		jQuery('.tg-memberskills, .tg-skills').appear(function () {
			jQuery('.tg-skillholder').each(function () {
				jQuery(this).find('.tg-skillbar').animate({
					width: jQuery(this).attr('data-percent')
				}, 2500);
			});
		});
	}
	/* -------------------------------------
			TEAM MEMBERS SLIDER
	-------------------------------------- */
	function teamSlider() {
		var _tg_teammembersslider = jQuery("#tg-teammembersslider");
		var _tg_teamthumbnailslider = jQuery("#tg-teamthumbnailslider");
		var slidesPerPage = 4;
		var syncedSecondary = true;
		_tg_teammembersslider.owlCarousel({
			items : 1,
			loop: true,
			nav: false,
			dots: false,
			autoplay: true,
			animateOut: 'fadeOut',
			slideSpeed : 2000,
			responsiveRefreshRate : 200,
			navText: [
				'<i class="icon-chevron-left"></i>',
				'<i class="icon-chevron-right"></i>',
			],
		}).on('changed.owl.carousel', syncPosition);
		_tg_teamthumbnailslider.on('initialized.owl.carousel', function () {
			_tg_teamthumbnailslider.find(".owl-item").eq(0).addClass("current");
		})
		.owlCarousel({
			items : slidesPerPage,
			dots: false,
			nav: false,
			margin: 10,
			smartSpeed: 200,
			slideSpeed : 500,
			slideBy: slidesPerPage,
			responsiveRefreshRate : 100,
			responsiveClass:true,
			responsive:{
				0:{items:4,},
			}
		}).on('changed.owl.carousel', syncPosition2);
		function syncPosition(el) {
			var count = el.item.count-1;
			var current = Math.round(el.item.index - (el.item.count/2) - .5);
			if(current < 0) {
				current = count;
			}
			if(current > count) {
				current = 0;
			}
			_tg_teamthumbnailslider.find(".owl-item").removeClass("current").eq(current).addClass("current")
			var onscreen = _tg_teamthumbnailslider.find('.owl-item.active').length - 1;
			var start = _tg_teamthumbnailslider.find('.owl-item.active').first().index();
			var end = _tg_teamthumbnailslider.find('.owl-item.active').last().index();
			if (current > end) {
				_tg_teamthumbnailslider.data('owl.carousel').to(current, 100, true);
			}
			if (current < start) {
				_tg_teamthumbnailslider.data('owl.carousel').to(current - onscreen, 100, true);
			}
		}
		function syncPosition2(el) {
			if(syncedSecondary) {
				var number = el.item.index;
				_tg_teammembersslider.data('owl.carousel').to(number, 100, true);
			}
		}
		_tg_teamthumbnailslider.on("click", ".owl-item", function(e){
			e.preventDefault();
			var number = jQuery(this).index();
			_tg_teammembersslider.data('owl.carousel').to(number, 300, true);
		});
	}
	teamSlider();
	/* -------------------------------------
			COUNTER
	-------------------------------------- */
	if(jQuery('.tg-statistics').length > 0){
		jQuery('.tg-statistics').appear(function () {
			jQuery('.tg-statistics > li > h3').countTo();
		});
	}
	/* -------------------------------------
			CLIENTFEEDBACK SLIDER
	-------------------------------------- */
	if(jQuery('#tg-clientfeedbackslider').length > 0){
		var _tg_clientfeedbackslider = jQuery('#tg-clientfeedbackslider');
		_tg_clientfeedbackslider.owlCarousel({
			items : 3,
			loop: true,
			dots: true,
			nav: false,
			margin: 80,
			center: true,
			autoplay: false,
			responsive:{
				0:{items:1,},
				568:{items:2,},
				992:{items:3,},
				1201:{items:3,},
			},
		});
	}
	if(jQuery('#tg-clientfeedbackslidervfour').length > 0){
		var _tg_clientfeedbackslidervfour = jQuery('#tg-clientfeedbackslidervfour');
		_tg_clientfeedbackslidervfour.owlCarousel({
			items : 3,
			loop: true,
			dots: true,
			nav: false,
			margin: 80,
			autoplay: true,
			responsive:{
				0:{ items:1, },
				768:{ items:2, },
				1200:{ items:3, },
			},
		});
	}
	/* -------------------------------------
			POST SLIDER
	-------------------------------------- */
	if(jQuery('#tg-postsslider').length > 0){
		var _tg_postsslider = jQuery('#tg-postsslider');
		_tg_postsslider.owlCarousel({
			items : 2,
			loop: true,
			dots: true,
			nav: false,
			margin: 80,
			autoplay: true,
			responsive:{
				0:{
					items:1,
					margin: 0,
				},
				640:{
					items:2,
					margin: 30,
				},
			}
		});
	}
	/* -------------------------------------
			TEAM V TWO SLIDER
	-------------------------------------- */
	if(jQuery('#tg-teamslider').length > 0){
		var _tg_teamslider = jQuery('#tg-teamslider');
		_tg_teamslider.owlCarousel({
			items : 3,
			loop: true,
			dots: true,
			nav: false,
			margin: 30,
			autoplay: true,
			responsive:{
				0:{ items:1, },
				480:{ items:2, },
				740:{ items:3, },
			}
		});
	}
	/* -------------------------------------
			BRANDS SLIDER
	-------------------------------------- */
	if(jQuery('#tg-barandsslider').length > 0){
		var _tg_barandsslider = jQuery('#tg-barandsslider');
		_tg_barandsslider.owlCarousel({
			items : 5,
			loop: true,
			dots: false,
			nav: false,
			margin: 30,
			autoplay: false,
			responsive:{
				0:{ items:1, },
				568:{ items:3, },
				768:{ items:3, },
				992:{ items:4, },
				1300:{ items:5, },
			}
		});
	}
	/* -------------------------------------
			CLIENT FEEDBACK SLIDER
	-------------------------------------- */
	if(jQuery('#tg-clientfeedbackslidervtwo').length > 0){
		var _tg_clientfeedbackslidervtwo = jQuery('#tg-clientfeedbackslidervtwo');
		_tg_clientfeedbackslidervtwo.owlCarousel({
			items : 1,
			loop: true,
			dots: true,
			nav: false,
			autoplay: false,
		});
	}
	/* --------------------------------------
			THEME COLLAPSE
	-------------------------------------- */
	if(jQuery('#tg-themecollapse').length > 0){
		var _openFirst = jQuery('#tg-themecollapse');
		_openFirst.collapse({
			open: function() {this.slideDown('slow');},
			close: function() {this.slideUp('slow');},
			accordion: true,
		});
	}
	/* -------------------------------------
			Google Map
	-------------------------------------- */
	if(jQuery('#tg-locationmap').length > 0){
		var _tg_locationmap = jQuery('#tg-locationmap');
		var gmapStyles = [
			{"featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }]},
			{"featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "off" }]},
			{"featureType": "transit", "elementType": "labels.text", "stylers": [{ "visibility": "off" }]},
			{"featureType": "road", "elementType": "labels.text", "stylers": [{ "visibility": "on" }]},
			{"featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#7b7b7b" }]},
			{"featureType": "road", "elementType": "labels.text", "stylers": [{ "color": "#7b7b7b" }]},
			{"featureType": "road", "elementType": "labels.text", "stylers": [{ "color": "#7b7b7b" }]},
			{"featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }]},
			{"featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "color": "#7b7b7b" }]},
			{"featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "off" }]},
			{"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }]},
			{"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#2b2b2b" }]},
			{"featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#2b2b2b" }]},
			{"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#2b2b2b" }]},
			{"featureType": "water", "elementType": "geometry", "stylers": [{ "visibility": "on" }]},
			{"featureType": "water", "elementType": "labels.text", "stylers": [{ "color": "#2b2b2b" }]},
			{"featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2b2b2b" }]},
			{"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"},{"color": "#2b2b2b"}]},
			{"featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#333" }]},
			{"featureType": "administrative", "elementType": "labels", "stylers": [{ "color": "#333" }]},
			{"featureType": "administrative.locality", "elementType": "labels.text.stroke", "stylers": [{ "color": "#333" }]},
			{"featureType": "transit.line", "stylers": [ { "visibility": "off" }]},
			{"featureType": "landscape.natural", "stylers": [ { "visibility": "off" }]},
			{"featureType": "landscape.natural", "stylers": [ { "visibility": "on" },{ "color": "#2b2b2b" }]},
			{"featureType": "administrative.province", "elementType": "geometry", "stylers": [{ "color": "#2b2b2b" }]},
			{"elementType": "geometry.fill", "stylers": [ { "color": "#2b2b2b" }]},
			{"featureType": "poi", "elementType": "geometry", "stylers": [{ "visibility": "off" }]},
			{"featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "visibility": "off" }]},
			{"featureType": "landscape", "elementType": "labels.text", "stylers": [{ "visibility": "off" }]},
			{"featureType": "administrative", "elementType": "labels", "stylers": [{ "visibility": "off" }]},
		]
		_tg_locationmap.gmap3({
			marker: {
				address: "1600 Elizabeth St, Melbourne, Victoria, Australia",
				options: {
					title: "Vation",
					icon: "images/mapmarker.png",
				}
			},
			map: {
				options: {
					zoom: 16,
					styles: gmapStyles,
					scaleControl: true,
					scrollwheel: false,
					mapTypeControl: false,
					disableDefaultUI: true,
					navigationControl: false,
					streetViewControl: false,
					disableDoubleClickZoom: true,
				}
			}
		});
	}
	/* ---------------------------------------
			GALLERY FILTERABLE
	-------------------------------------- */
	if(jQuery('#tg-galleryfilterable').length > 0){
		var $container = jQuery('.tg-galleryfilterable');
		var $optionSets = jQuery('.tg-optionset');
		var $optionLinks = $optionSets.find('a');
		function doIsotopeFilter() {
			if (jQuery().isotope) {
				var isotopeFilter = '';
				$optionLinks.each(function () {
					var selector = jQuery(this).attr('data-filter');
					var link = window.location.href;
					var firstIndex = link.indexOf('filter=');
					if (firstIndex > 0) {
						var id = link.substring(firstIndex + 7, link.length);
						if ('.' + id === selector) {
							isotopeFilter = '.' + id;
						}
					}
				});
				jQuery(window).load(function () {
					$container.isotope({
						itemSelector: '.tg-portfolioitem',
						filter: isotopeFilter
					});
				});
				$optionLinks.each(function () {
					var $this = jQuery(this);
					var selector = $this.attr('data-filter');
					if (selector === isotopeFilter) {
						if (!$this.hasClass('tg-active')) {
							var $optionSet = $this.parents('.option-set');
							$optionSet.find('.tg-active').removeClass('tg-active');
							$this.addClass('tg-active');
						}
					}
				});
				$optionLinks.on('click', function () {
					var $this = jQuery(this);
					var selector = $this.attr('data-filter');
					$container.isotope({itemSelector: '.tg-portfolioitem', filter: selector});
					if (!$this.hasClass('tg-active')) {
						var $optionSet = $this.parents('.tg-optionset');
						$optionSet.find('.tg-active').removeClass('tg-active');
						$this.addClass('tg-active');
					}
					return false;
				});
			}
		}
		var isotopeTimer = window.setTimeout(function () {
			window.clearTimeout(isotopeTimer);
			doIsotopeFilter();
		});
	}
	/* -------------------------------------
			PORTFOLIO GALLERY V TWO
	-------------------------------------- */
	var _tg_portfolio = jQuery('[id="tg-portfoliovthree"], [id="tg-portfoliovfive"]');
	if(_tg_portfolio.hasClass('tg-portfolio')){
		_tg_portfolio.isotope({
			itemSelector: '.tg-portfolioitem',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-sizer'
			}
		});
	}
	/* -------------------------------------
			BLOG ARTICLE GALLERY
	-------------------------------------- */
	var _tg_portfolio = jQuery('[id="tg-filtermasonryvone"], [id="tg-filtermasonryvtwo"]');
	if(_tg_portfolio.hasClass('tg-filtermasonry')){
		_tg_portfolio.isotope({
			itemSelector: '.tg-masonrygrid',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-sizer'
			}
		});
	}
	/* -------------------------------------
			WORK DETAIL SLIDER
	-------------------------------------- */
	var _tg_portfoliodetailslider = jQuery('#tg-portfoliodetailslider');
	if(_tg_portfoliodetailslider.hasClass('tg-portfoliodetailslider')){
		_tg_portfoliodetailslider.owlCarousel({
			items: 1,
			nav:false,
			loop:true,
			dots: true,
			autoplay: true,
			dotsClass: 'tg-sliderdots',
		});
	}
	/* -------------------------------------
			WORK DETAIL SLIDER
	-------------------------------------- */
	var _tg_portfoliodetailslidervtwo = jQuery('#tg-portfoliodetailslidervtwo');
	if(_tg_portfoliodetailslidervtwo.hasClass('tg-portfoliodetailslider')){
		_tg_portfoliodetailslidervtwo.owlCarousel({
			items: 2,
			nav:false,
			loop:true,
			dots: true,
			center: true,
			margin:30,
			autoplay: false,
			dotsClass: 'tg-sliderdots',
			responsive:{
				0:{ items:1, },
				480:{ items:1, },
				768:{ items:2, },
			}
		});
	}
	/* -------------------------------------
			WORK DETAIL V 5 SLIDER
	-------------------------------------- */
	var _tg_portfolioimageslider = jQuery('#tg-portfolioimageslider');
	if(_tg_portfolioimageslider.hasClass('tg-portfolioimageslider')){
		_tg_portfolioimageslider.owlCarousel({
			items: 1,
			nav:false,
			loop:true,
			dots: true,
			autoplay: false,
			dotsClass: 'tg-sliderdots',
		});
	}
	/* -------------------------------------
			PROGRESS BAR
	-------------------------------------- */
	try {
		jQuery('#tg-userskill').appear(function () {
			jQuery('.tg-skillholder').each(function () {
				jQuery(this).find('.tg-skillbar').animate({
					width: jQuery(this).attr('data-percent')
				}, 2500);
			});
		});
	} catch (err) {}
	/* --------------------------------------
			FLIP BOX TOGGLE CLASS
	-------------------------------------- */
	jQuery('.tg-flipbox').on('hover', function() {
		jQuery(this).toggleClass('tg-hover');
	});
	/* --------------------------------------
			THEME SCROLLBAR
	-------------------------------------- */
	jQuery('.tg-navscrollbar').mCustomScrollbar({
		axis:"y",
	});
	/* -------------------------------------
			PRETTY PHOTO GALLERY
	-------------------------------------- */
	jQuery("a[data-rel]").each(function () {
		jQuery(this).attr("rel", jQuery(this).data("rel"));
	});
	jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
		animation_speed: 'normal',
		theme: 'dark_square',
		slideshow: 3000,
		autoplay_slideshow: false,
		social_tools: false
	});
	/* --------------------------------------
			WEBSITE PRELADER
	-------------------------------------- */
	jQuery("#status").fadeOut();
	jQuery(".preloader").delay(300).fadeOut("slow");
	jQuery("body").css('overflow-y', 'visible');
	jQuery("body").css('position', 'relative');
	setTimeout(function(){
		jQuery('body').addClass('loaded');
	}, 1000);
	/* --------------------------------------
			STICKY IN PARENT
	-------------------------------------- */
	jQuery("#tg-portfoliocontentfixed").stick_in_parent();
	/* --------------------------------------
			INPUT TYPE EFFECT
	-------------------------------------- */
	jQuery(window).load(function(){
		jQuery(".tg-formcontactus").val("");
		jQuery(".effect-18").focusout(function(){
			if(jQuery(this).val() != ""){
				jQuery(this).addClass("has-content");
			}else{
				jQuery(this).removeClass("has-content");
			}
		})
	});
});