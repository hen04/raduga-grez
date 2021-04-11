const scroller = new LocomotiveScroll({
	el: document.querySelector('[data-scroll-container]'),
	smooth: true
})

gsap.registerPlugin(ScrollTrigger)

scroller.on('scroll', ScrollTrigger.update)

ScrollTrigger.scrollerProxy(
	'.container-animation', {
		scrollTop(value) {
			return arguments.length ?
				scroller.scrollTo(value, 0, 0) :
				scroller.scroll.instance.scroll.y
		},
		getBoundingClientRect() {
			return {
				left: 0, top: 0,
				width: window.innerWidth,
				height: window.innerHeight
			}
		}
	}
)

ScrollTrigger.addEventListener('refresh', () => scroller.update())

ScrollTrigger.refresh()

gsap.to('.main-index', {
	scrollTrigger: {
		trigger: '.main-index',
		start: 'top top+=50',
		end: '+=100',
		backgroundSize: '120%',
		scrub: true,
		//markers: true,
	}
});

gsap.to('.main-index', {
	scrollTrigger: {
		trigger: '.main-index',
		start: 'top top+=50',
		end: '+=100',
		backgroundSize: '120%',
		scrub: true,
		//markers: true,
	}
});

