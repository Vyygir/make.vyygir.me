document.addEventListener(
	'DOMContentLoaded',
	() => {
		const $scroller = document.querySelector('.scroller');
		const $sections = document.querySelectorAll('.page');

		const SCROLLER_ANIMATE_MS = 650;

		if (!$scroller || !$sections) {
			return;
		}

		let current = 0;
		let scrolling = false;

		document.addEventListener(
			'wheel',
			(event) => {
				if (scrolling) {
					return;
				}

				let delta = event.deltaY;

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
		)
	}
);
