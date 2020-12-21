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


$(function() {

	if ( $('[data-scroll-container]').length ) {
		const scroller = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true
		})
	}

	function menuMobile() {
		$('.js-menu').on('click', function(){
			$('html').css('overflow-y', 'hidden');
			$("nav").animate({
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
			$("nav").animate({
				opacity: 1,
				left: "100%"
			}, 250, function() {
				$('body').removeClass('menu-opened');
			});
			$('.menu-content__catalog').removeClass('active');
		});

	}

	menuMobile();


	const scrollToTop = $('#button-top');
	// $(window).scroll (function () {
	// 	if ($(this).scrollTop () > 300) {
	// 		scrollToTop.fadeIn();
	// 	} else {
	// 		scrollToTop.fadeOut();
	// 	}
	// });
	scrollToTop.on('click', function(){
		$('body, html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});


});

