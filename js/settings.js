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
					item.checked = true;
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
			item.addEventListener('click', () => {
				document.documentElement.setAttribute(
					`data-${item.name}`, item.value
				);
				localStorage.setItem(item.name, item.value);
			});
		});
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", setupSettings);
	} else {
		setupSettings();
	}
})()
