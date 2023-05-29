document.addEventListener(
	'DOMContentLoaded',
	() => {
		const $scroller = document.querySelector('.scroller');
		const $sections = document.querySelectorAll('.page');

		const SCROLLER_ANIMATE_MS = 650;
		const MOBILE_TOUCH_THRESHOLD = 5;

		if (!$scroller || !$sections) {
			return;
		}

		let current = 0;
		let scrolling = false;

		function bringSectionIntoViewport(delta) {
			if (scrolling) {
				return;
			}

			console.log(delta);

			if (delta > 0) {
				if (current + 1 >= $sections.length) {
					return;
				}

				current += 1;
			} else if (delta < 0) {
				if (current - 1 < 0) {
					return;
				}

				current -= 1;
			}

			scrolling = true;

			let $section = $sections.item(current);

			$scroller.style.transform = `translateY(${-$section.clientHeight * current}px)`;

			setTimeout(() => {
				scrolling = false;
			}, SCROLLER_ANIMATE_MS);
		}

		let mobileTouchStart = 0;

		document.addEventListener(
			'touchstart',
			(event) => {
				mobileTouchStart = event.changedTouches[0].clientY;
			}
		);

		document.addEventListener(
			'touchend',
			(event) => {
				bringSectionIntoViewport(
					mobileTouchStart > event.changedTouches[0].clientY + MOBILE_TOUCH_THRESHOLD ? 1 : -1
				);
			}
		);

		document.addEventListener(
			'wheel',
			(event) => {
				bringSectionIntoViewport(event.deltaY);
			}
		);
	}
);
