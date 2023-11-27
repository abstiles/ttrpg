(function() {
	"use strict";

	const getCurrentCharacterName = function() {
		return document.getElementById('character').value;
	};

	const setCurrentCharacterName = function(value) {
		return document.getElementById('character').value = value;
	};

	const getCharacterMap = function() {
		return JSON.parse(localStorage.getItem('characters') || "{}");
	};

	const getChar = function() {
		let characters = getCharacterMap();
		let currentName = getCurrentCharacterName();
		return characters[currentName] || {}
	};

	const setChar = function(key, value) {
		let characters = getCharacterMap();
		let currentName = getCurrentCharacterName();
		let currentChar = getChar();
		currentChar[key] = value;
		characters[currentName] = currentChar;
		localStorage.setItem('characters', JSON.stringify(characters));
	};

	const startup = function() {
		const character = document.getElementById('character');
		const charSelect = document.getElementById('load-character');
		const radioButtons = Array.from(
			document.querySelectorAll('form input[type="radio"]')
		);
		const checkboxes = Array.from(
			document.querySelectorAll('form input[type="checkbox"]')
		);
		const textFields = Array.from(
			document.querySelectorAll('form textarea, form input[type="text"]')
		);

		const populateCharacterSelect = function() {
			Array.from(charSelect.childNodes)
				.filter(it => !it.disabled)
				.forEach(it => it.remove());
			let characters = Object.keys(getCharacterMap());
			characters.forEach(char => {
				let option = document.createElement("option");
				option.text = char;
				if (getCurrentCharacterName() === option.text) {
					option.selected = true;
				}
				charSelect.appendChild(option);
			});
		};

		const loadForm = function() {
			let current = getChar();
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

		const load = function() {
			populateCharacterSelect();
			loadForm();
		};

		const save = function() {
			radioButtons.forEach(item => {
				if (item.checked) {
					setChar(item.name, item.value);
				}
			});
			checkboxes.forEach(item => {
				setChar(item.id, item.checked);
			});
			textFields.forEach(item => {
				setChar(item.id, item.value);
			});
		};

		load();

		// Save updated setting whenever an input is changed.
		radioButtons.forEach(item => {
			item.addEventListener('click', () => {
				setChar(item.name, item.value);
			});
		});
		checkboxes.forEach(item => {
			item.addEventListener('change', () => {
				setChar(item.id, item.checked);
			});
		});
		textFields.forEach(item => {
			item.addEventListener('input', () => {
				setChar(item.id, item.value);
			});
		});
		character.addEventListener('change', () => {
			save();
			populateCharacterSelect();
		});
		charSelect.addEventListener('change', () => {
			setCurrentCharacterName(charSelect.value);
			loadForm();
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
