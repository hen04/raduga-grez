const scroller = {
	el: document.querySelector('[data-scroll-container]'),
	smooth: true,
	getDirection: true,
	reloadOnContextChange:true
}

const scroll = new LocomotiveScroll(scroller);

gsap.registerPlugin(ScrollTrigger)
scroll.on('scroll', ScrollTrigger.update)
ScrollTrigger.addEventListener('refresh', () => scroll.update())
ScrollTrigger.refresh()

const header = document.getElementById('header');
let hidden = false, visible = true;

scroll.on('scroll',(instance)=> {
	let headerHeight = header.getBoundingClientRect().height;
	if (instance.direction === 'down' && visible) {
		if (instance.scroll.y > headerHeight) {
			header.classList.add('visible');
			visible = false;
		}
	}
	if(instance.direction === 'up' && !visible){
		if(instance.scroll.y <= headerHeight){
			header.classList.remove('visible');
			visible = true;
		}
	}
	if(instance.direction === 'down' && !hidden){
		if(instance.scroll.y>(headerHeight+200)){
			header.classList.remove('visible');
			header.classList.add('hidden');
			hidden = true;
		}
	}
	if(instance.direction === 'up' && hidden){
		header.classList.remove('hidden');
		header.classList.add('visible');
		hidden = false;
	}
});
