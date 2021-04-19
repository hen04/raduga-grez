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

