"use strict";

$(window).on('load', function () {
	$('.loading-screen').delay(4500).fadeOut('slow');
	$('.loading-content').delay(4500).removeClass('hidden');
});


$(function() {

	if ( $('.js-main-categories').length ) {
		var swiper = new Swiper('.js-main-categories', {
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
				renderFraction: function (currentClass, totalClass) {
					return '<span class="' + currentClass + '"></span>' +
						' <span class="devider"></span> ' + '<span class="' + totalClass + '"></span>';
				}
			},

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}

	if ( $('.swiper-slider').length ) {
		var swiperSlider = new Swiper('.swiper-slider', {
			slidesPerView: 1,
			spaceBetween: 15,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 15,
				}
			}
		});
	}

	if ( $('.js-slider-about').length ) {
		var about = new Swiper('.js-slider-about', {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			loopFillGroupWithBlank: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1024: {
					autoplay: {
						delay: 2500,
						disableOnInteraction: false,
					}
				}
			}
		});
	}

	function menuMobile() {
		$('.js-menu').on('click', function(){
			$('.header').removeClass('out');
			$('html').css('overflow-y', 'hidden');
			$('.menu-content').animate({
				opacity: 1,
				left: "0"
			}, 500, function() {
				$('body').addClass('menu-opened');
			});
			$('.menu-content__main').addClass('active');
		});

		$('.js-menu-back').on('click', function (){
			$('.menu-content__main').addClass('active');
			$('.menu-content__catalog').removeClass('active');
		});

		$('.mobile .js-submenu').on('click', function (evt){
			evt.preventDefault();
			$('.menu-content__main').removeClass('active');
			$('.menu-content__catalog').addClass('active');
		});

		$('.js-menu-close').on('click', function(){
			$('html').css('overflow-y', 'initial');
			$('.menu-content').animate({
				opacity: 0,
				left: "100%"
			}, 250, function() {
				$('body').removeClass('menu-opened');
			});
			$('.menu-content__main').removeClass('active');
			$('.menu-content__catalog').removeClass('active');
		});

	}

	menuMobile();

	$('.js-catalog-menu').on('click', function(){
		$('html').css('overflow-y', 'hidden');
		//$('.menu-content__menu').removeClass('active').addClass('test');
		$('.menu-content').animate({
			opacity: 1,
			left: "0"
		}, 500, function() {
			$('body').addClass('menu-opened');
		});
		$('.menu-content__main').removeClass('active');
		$('.menu-content__catalog').addClass('active');
	});

	const scrollToTop = $('#button-top');
	scrollToTop.on('click', function(){
		$('body, html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});


	$('.section-title').on('click', function(e) {
		e.preventDefault();
		var currentUnswer = $(this).next();
		if ($(e.target).parent().is('.active')) {
			close_section();
		} else {
			close_section();
			$(this).parent().addClass('active');
			currentUnswer.slideDown(350).addClass('open');
		}
	});

	$('.accordion .section').first().addClass('active');

	function close_section() {
		$('.accordion .section').removeClass('active');
		$('.accordion .section-content').removeClass('open').slideUp(350);
	}

	$('.js-share').on('click', function (){
		$(this).toggleClass('active');
		$(this).find('.share__buttons').toggleClass('opened');

	});

	$('.header__cart').on('click', '.js-cart-sm', function (){
		$('body').addClass('cart-sm-opened');
		$('.cart-sm').animate({
			opacity: 1,
			right: 0
		}, 500);
	});

	const cartWidth = $('.cart-sm').outerWidth();

	$('body').on('click', '.js-cart-sm-close, .overlay', function (){
		$('.cart-sm').animate({
			opacity: 1,
			right: '-' + cartWidth
		}, 500, function() {
			$('body').removeClass('cart-sm-opened');
		});
	});

	$('.js-tabs li').on('click', function (){
		$('li').removeClass('active');
		$(this).addClass('active');
		$(this).parents().find('.tabs__item').toggleClass('active');
	});

	$('.js-tabs-btn').on('click', function (){
		$('.tabs__menu li').toggleClass('active');
		$('.tabs__item').toggleClass('active');
	});

	$('.label-text').on('click', function () {
		$(this).parent().addClass('filled');
		$(this).next().focus();
	});

	$('.input-text').on('focus', function (){
		$(this).parent().addClass('filled');
	});

	$('.input-text').on('blur', function() {
		if( $(this).val().length === 0 ) {
			$(this).parent().removeClass('filled');
		}
	});



	// https://codepen.io/pablopo/pen/KrBmad
	let input = $(".input-field .inp-text");

	input.val("");
	input.focus(function() {
		$(this).closest('form').find(".input-field.focused").removeClass("focused");
		$(this).closest('.input-field').addClass('focused').removeClass('error');
	});
	input.blur(function() {
		var val = $(this).val(),
			ig = $(this).closest('.input-field'),
			label = ig.find('label');
		ig.removeClass('focused');
		if (val !== "") {
			label.addClass('focused');
		} else {
			label.removeClass('focused');
		}
	});

	if ($('.js-simple-scroll').length) {
		var el = document.querySelector('.js-simple-scroll');
		SimpleScrollbar.initEl(el);
	}



	if ($('.js-fancybox').length) {
		$(".js-fancybox").fancybox();
	}

	const checkout = $('.checkout');
	$('.js-mobile-summary').on('click', function () {

		if ( checkout.hasClass('summary-opened') ) {
			$('.checkout__summary').slideUp(1000);
			setTimeout(function(){
				checkout.removeClass('summary-opened');
				$('.summary-text').removeClass('opened');
			}, 1000);
		} else {
			$('.checkout__summary').slideDown(1000);
			checkout.addClass('summary-opened');
			$('.summary-text').addClass('opened');
		}
	});


	if ( $('[data-aos]').length ) {
		AOS.init({
			offset: 100,
			duration: 150,
			easing: 'ease-in-sine',
			delay: 100,
			disable: function () {
				var maxWidth = 768;
				return window.innerWidth < maxWidth;
			}
		});
	}

	$('.js-accept').on('click', function (){
		$('.cookies-info').addClass('d-none');
	});



	$('.js-shops-tabs li').first().addClass('active');
	$('.stockist__shop-item').first().addClass('active');

	let shops = $('.stockist__shops');
	let stockistContent = $('.stockist__countries, .stockist__info, .stockist__title');

	$('.stockist').on('click', '.js-shops-tabs li', function (){
		let id = $(this).data('id');

		$('.js-shops-tabs li').removeClass('active');
		$(this).addClass('active');

		$('.stockist__shop-item').removeClass('active');
		$('#' + id).addClass('active');

		shops.addClass('mobile-active');
		shops.animate({
			opacity: 1
		}, 500);


		if ($(window).width() < 767) {
			stockistContent.addClass('mobile-hidden');
			stockistContent.animate({
				opacity: 0,
			}, 500);

			$('body,html').animate({scrollTop: 0}, 500);
		}

	});

	$('.js-stockist-back').on('click', function (){
		shops.removeClass('mobile-active');

		if ($(window).width() < 767) {
			stockistContent.removeClass('mobile-hidden');
			stockistContent.animate({
				opacity: 1,
			}, 500);
		}

	})

	$('.js-search').on('click', function (){
		$('.search-block').addClass('opened');
		$('body').addClass('search-opened');
	});

	$('.js-close-search').on('click', function (){
		$('.search-block').removeClass('opened');
		$('body').removeClass('search-opened');
	});

});
