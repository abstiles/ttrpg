(function() {
	"use strict";
	const setupSettings = function() {
		const settingsControls = Array.from(
			document.querySelectorAll('#menu-theme input')
		);
		const load = function() {
			settingsControls.forEach((item, index) => {
				if (localStorage.getItem(item.name) === item.value) {
					document.documentElement.setAttribute(
						`data-${item.name}`, item.value
					);
					item.setAttribute('data-activated', 'true')
					item.checked = true;
				} else{
					item.removeAttribute('data-activated')
				}
			});
		};
		// Load existing settings right away.
		load();
		// Reload if another tab saved changes.
		window.addEventListener("storage", (e) => {
			if (e.key) {
				load();
			}
		});
		// Save updated setting whenever an input is changed.
		settingsControls.forEach((item, index) => {
			const activate = function() {
				if (!item.getAttribute('data-activated')) {
					item.setAttribute('data-activated', 'true')
					document.documentElement.setAttribute(
						`data-${item.name}`, item.value
					);
					localStorage.setItem(item.name, item.value);
					// Strip activated attribute off other radio buttons.
					settingsControls.forEach((item2, index2) => {
						if (index !== index2) {
							item2.removeAttribute('data-activated');
						}
					});
				} else {
					item.removeAttribute('data-activated');
					document.documentElement.removeAttribute(`data-${item.name}`);
					localStorage.removeItem(item.name);
					item.checked = false;
				}
			}
			item.addEventListener('keydown', event => {
				if (event.code === 'Space') {
					activate();
				}
			});
			item.addEventListener('click', () => {
				activate();
			});
		});
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", setupSettings);
	} else {
		setupSettings();
	}
})()
