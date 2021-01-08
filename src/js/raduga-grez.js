"use strict";

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





$(function() {

	if ( $('[data-scroll-container]').length ) {
		const scroller = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true
		})
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

	$(window).scroll(
		{
			previousTop: 0
		},
		function () {
			var currentTop = $(window).scrollTop();

			if (currentTop < this.previousTop) {
				$('.header-wrapper').removeClass('out');
			} else {
				$('.header-wrapper').addClass('out');
			}
			this.previousTop = currentTop;
		});

	$('.section-title').on('click', function(e) {
		e.preventDefault();
		var currentLink = $(this).attr('href');
		if ($(e.target).parent().is('.active')) {
			close_section();
		} else {
			close_section();
			$(this).parent().addClass('active');
			$('.accordion ' + currentLink).slideDown(350).addClass('open');
		}
	});

	function close_section() {
		$('.accordion .section').removeClass('active');
		$('.accordion .section-content').removeClass('open').slideUp(350);
	}

	$('.js-share').on('click', function (){
		$(this).toggleClass('active');
		$(this).find('.share__buttons').toggleClass('opened');

	});

	$('.js-cart-sm').on('click', function (){
		$('body').addClass('cart-sm-opened');
		$('.cart-sm').animate({
			opacity: 1,
			right: 0
		}, 500);
	});

	const cartWidth = $('.cart-sm').outerWidth();

	$('.js-cart-sm-close, .overlay').on('click', function (){
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

	$(".js-fancybox").fancybox();


});

