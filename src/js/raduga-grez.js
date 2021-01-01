"use strict";

var swiper = new Swiper('.swiper-container', {
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
				opacity: 1,
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
		$('.menu-content__menu').removeClass('active').addClass('test');
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
});
