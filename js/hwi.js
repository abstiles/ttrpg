(function() {
	"use strict";

	const getUser = function() {
		let current = localStorage.getItem('current') || "{}";
		return JSON.parse(current);
	};

	const setUser = function(key, value) {
		let current = getUser();
		current[key] = value;
		localStorage.setItem('current', JSON.stringify(current));
	};

	const startup = function() {
		const radioButtons = Array.from(
			document.querySelectorAll('form input[type="radio"]')
		);
		const checkboxes = Array.from(
			document.querySelectorAll('form input[type="checkbox"]')
		);
		const textFields = Array.from(
			document.querySelectorAll('form textarea, form input[type="text"]')
		);

		const load = function() {
			let current = getUser();
			radioButtons.forEach(item => {
				if (current[item.name] === item.value) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			});
			checkboxes.forEach(item => {
				if (current[item.id]) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			});
			textFields.forEach(item => {
				let value = current[item.id];
				if (value) {
					item.value = value;
				} else {
					item.value = "";
				}
			});
		};

		load();

		// Save updated setting whenever an input is changed.
		radioButtons.forEach(item => {
			item.addEventListener('click', () => {
				setUser(item.name, item.value);
			});
		});
		checkboxes.forEach(item => {
			item.addEventListener('change', () => {
				setUser(item.id, true);
			});
		});
		textFields.forEach(item => {
			item.addEventListener('input', (event) => {
				setUser(item.id, event.target.value);
			});
		});

		document.getElementById('delete-btn').onclick = function() {
			if (window.confirm('Really delete this character?')) {
				localStorage.setItem('current', '{}');
				load();
			}
		}
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", startup);
	} else {
		startup();
	}
})()
