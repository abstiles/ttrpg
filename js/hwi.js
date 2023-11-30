(function() {
	"use strict";

	const startup = function() {
		const character = document.getElementById('character');
		const newButton = document.getElementById('new-btn');
		const deleteButton = document.getElementById('delete-btn');
		const characterSheet = document.getElementById('character-sheet');
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

		const getCurrentCharacterName = function() {
			return character.value.trim();
		};

		const setCurrentCharacterName = function(value) {
			character.value = value.trim();
		};

		const getCharacterMap = function() {
			return JSON.parse(localStorage.getItem('characters') || "{}");
		};

		const getChar = function() {
			let characters = getCharacterMap();
			let currentName = getCurrentCharacterName();
			return characters[currentName.toLowerCase()] || {}
		};

		const setChar = function(key, value) {
			let characters = getCharacterMap();
			let currentName = getCurrentCharacterName();
			let currentChar = getChar();
			currentChar[key] = value;
			currentChar._canonCase = currentName;
			characters[currentName.toLowerCase()] = currentChar;
			localStorage.setItem('characters', JSON.stringify(characters));
		};

		const deleteChar = function(name) {
			let characters = getCharacterMap();
			delete characters[name.toLowerCase()];
			localStorage.setItem('characters', JSON.stringify(characters));
		};

		const populateCharacterSelect = function() {
			Array.from(charSelect.childNodes)
				.filter(it => !it.disabled)
				.forEach(it => it.remove());
			let characters = Object.entries(getCharacterMap());
			for (const [key, char] of characters) {
				let option = document.createElement("option");
				option.text = char._canonCase || key;
				if (getCurrentCharacterName().toLowerCase() === key) {
					option.selected = true;
				}
				charSelect.appendChild(option);
			}
			charSelect.disabled = characters.length === 0;
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

		const disableForm = function() {
			characterSheet.setAttribute('disabled', '');
			newButton.disabled = true;
			deleteButton.disabled = true;
		};

		const enableForm = function() {
			characterSheet.removeAttribute('disabled');
			newButton.disabled = false;
			deleteButton.disabled = false;
		};

		const updateFormState = function() {
			if (!getCurrentCharacterName()) {
				disableForm();
			} else {
				enableForm();
			}
		};

		const resetAll = function() {
			setCurrentCharacterName('');
			load();
			disableForm();
			// Back to default character selection.
			Array.from(charSelect.childNodes).filter(it => {
				return it.disabled;
			})[0].selected = true;
		}

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
		// Character sheet should start disabled.
		disableForm();
		character.addEventListener('change', () => {
			let characterId = getCurrentCharacterName().toLowerCase();
			if (characterId.length > 0) {
				enableForm();
				if (Object.keys(getCharacterMap()).includes(characterId)) {
					load();
				} else {
					save();
					populateCharacterSelect();
				}
			} else {
				disableForm();
				Array.from(charSelect.childNodes)
					.filter(it => it.disabled)[0].selected = true;
			}
		});
		charSelect.addEventListener('change', () => {
			setCurrentCharacterName(charSelect.value);
			updateFormState()
			loadForm();
		});

		deleteButton.onclick = function() {
			if (window.confirm('Really delete this character?')) {
				deleteChar(getCurrentCharacterName());
				resetAll();
			}
		};
		newButton.onclick = function() {
			if (getCurrentCharacterName().length > 0) {
				save();
				resetAll();
			}
		};
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", startup);
	} else {
		startup();
	}
})()
