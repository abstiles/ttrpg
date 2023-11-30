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

		let charList = [];

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
			if (!key) {
				return;
			}
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
			charList = Object.keys(getCharacterMap());
			for (const [key, char] of Object.entries(getCharacterMap())) {
				let option = document.createElement("option");
				option.text = char._canonCase || key;
				if (getCurrentCharacterName().toLowerCase() === key) {
					option.selected = true;
				}
				charSelect.appendChild(option);
			}
			charSelect.disabled = charList.length === 0;
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

		const clearForm = function() {
			radioButtons.forEach(item => { item.checked = false; });
			checkboxes.forEach(item => { item.checked = false; });
			textFields.forEach(item => { item.value = ""; });
		};

		const load = function(characterId) {
			let char = getCharacterMap()[characterId?.toLowerCase()];
			if (char) {
				setCurrentCharacterName(char._canonCase);
				enableForm();
			}
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

		const isFormEnabled = function() {
			return !characterSheet.hasAttribute('disabled');
		};

		const updateFormState = function() {
			if (!getCurrentCharacterName()) {
				disableForm();
			} else {
				enableForm();
			}
		};

		const deselectChar = function() {
			Array.from(charSelect.childNodes)
				.filter(it => it.disabled)[0].selected = true;
		};

		const resetAll = function() {
			setCurrentCharacterName('');
			history.replaceState(null, '', window.location.pathname);
			clearForm();
			disableForm();
			deselectChar();
		};

		const queryParams = function() {
			return new URLSearchParams(window.location.search);
		};

		// Character sheet should start disabled.
		disableForm();
		load(queryParams().get('character'));

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
			let characterId = getCurrentCharacterName().toLowerCase();
			if (characterId.length > 0) {
				enableForm();
				if (charList.includes(characterId)) {
					load();
				} else {
					save();
					populateCharacterSelect();
				}
			} else {
				disableForm();
				deselectChar();
			}
		});
		character.addEventListener('input', () => {
			let characterId = getCurrentCharacterName().toLowerCase();
			history.replaceState(null, '', `?character=${characterId}`);
			if (charList.includes(characterId)) {
				enableForm();
				load();
			} else if (isFormEnabled()) {
				disableForm();
				deselectChar();
				clearForm();
			}
		});
		charSelect.addEventListener('change', () => {
			history.replaceState(null, '', `?character=${charSelect.value}`);
			setCurrentCharacterName(charSelect.value);
			updateFormState();
			loadForm();
		});

		deleteButton.onclick = function() {
			if (window.confirm('Really delete this character?')) {
				deleteChar(getCurrentCharacterName());
				resetAll();
				populateCharacterSelect();
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
