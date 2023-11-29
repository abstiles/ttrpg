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
			}
			item.addEventListener('keydown', event => {
				if (event.code === 'Space') {
					// I don't quite understand the asymmetry between this and the
					// "click" listener. If they both have the same logic, it's like
					// they're both triggered when attempting to deactivate, but the same
					// behavior doesn't happen during activation.
					item.checked = !item.checked;
					if (item.checked) {
						// Going from nothing checked to something checked.
						activate();
					}
				}
			});
			item.addEventListener('click', () => {
				if (!item.getAttribute('data-activated')) {
					activate();
				} else {
					item.removeAttribute('data-activated');
					document.documentElement.removeAttribute(`data-${item.name}`);
					localStorage.removeItem(item.name);
					item.checked = false;
				}
			});
		});
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", setupSettings);
	} else {
		setupSettings();
	}
})()
