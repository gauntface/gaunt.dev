function run() {
	const container = document.querySelector('.js-theme-container');
	if (!container) {
		return;
	}

	const themes = {
		'dark': 'u-theme--dark',
		'light': 'u-theme--light',
	};

	try {
		if (!localStorage) {
			return;
		}

		const theme = localStorage.getItem('theme');
		if (theme) {
			for (const t of Object.keys(themes)) {
				const c = themes[t]
				if (t == theme) {
					document.body.classList.add(c);
				} else {
					document.body.classList.remove(c);
				}
			}
		}

		const elements = document.querySelectorAll('.js-theme');
		for (const e of elements) {
			e.addEventListener('click', function(evt){
				if (!evt || !evt.target) {
					return;
				}
				const ele = evt.target as HTMLElement;
				const theme = ele.getAttribute('data-theme');

				for (const t of Object.keys(themes)) {
					const c = themes[t]
					if (t == theme) {
						document.body.classList.add(c);
					} else {
						document.body.classList.remove(c);
					}
				}

				if (theme) {
					localStorage.setItem('theme', theme);
				} else {
					localStorage.removeItem('theme');
				}
			})
		}
		container.classList.remove('c-footer__themes--disabled');
	} catch(err) {
		console.error(`Failed to setup theme (most likely due to privacy settings): `, err);
	}
}

window.addEventListener('load', run);
if (document.readyState == 'complete') {
	run();
}
