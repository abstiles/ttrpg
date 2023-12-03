function arrayBufferToBase64( buffer ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return window.btoa(binary)
		.replaceAll('+', '-')
		.replaceAll('/', '_')
		.replaceAll('=', '.');
}

function base64ToArrayBuffer(base64) {
	var binaryString = atob(
		base64
		.replaceAll('-', '+')
		.replaceAll('_', '/')
		.replaceAll('.', '=')
	);
	var bytes = new Uint8Array(binaryString.length);
	for (var i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
}

function compress(string) {
	const encoding = "gzip";
	const byteArray = new TextEncoder().encode(string);
	const cs = new CompressionStream(encoding);
	const writer = cs.writable.getWriter();
	writer.write(byteArray);
	writer.close();
	return new Response(cs.readable).arrayBuffer();
}

function decompress(byteArray) {
	const encoding = "gzip";
	const cs = new DecompressionStream(encoding);
	const writer = cs.writable.getWriter();
	writer.write(byteArray);
	writer.close();
	return new Response(cs.readable).arrayBuffer().then(function (arrayBuffer) {
		return new TextDecoder().decode(arrayBuffer);
	});
}

function getCompressedForm() {
	const form = new FormData(document.getElementById('character-sheet'));
	const params = new URLSearchParams();
	for (const [key, value] of form) {
		if (value) {
			params.set(key, value);
		}
	}
	return compress(params.toString())
		.then(buf => arrayBufferToBase64(buf));
}

function extractCompressedForm(data) {
	return decompress(base64ToArrayBuffer(data))
		.then(params => Object.fromEntries(new URLSearchParams(params)));
}

function getScrollHeight(elem) {
	const scrollHeight = elem.scrollHeight;
	const style = window.getComputedStyle(elem)
	if (style.boxSizing === "content-box") {
		// For content-box sizing we need to account for padding.
		return scrollHeight - (
			parseInt(style.paddingTop) + parseInt(style.paddingBottom)
		);
	} else if (style.boxSizing === "border-box") {
		// For border-box, we need to account for borders.
		return scrollHeight + (
			parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth)
		);
	}
	return scrollHeight;
}

(function() {
	"use strict";

	const startup = function() {
		const character = document.getElementById('character');
		const newButton = document.getElementById('new-btn');
		const deleteButton = document.getElementById('delete-btn');
		const characterSheet = document.getElementById('character-sheet');
		const charSelect = document.getElementById('load-character');
		const shareButton = document.getElementById('share-btn');
		const radioButtons = Array.from(
			document.querySelectorAll('form input[type="radio"]')
		);
		const checkboxes = Array.from(
			document.querySelectorAll('form input[type="checkbox"]')
		);
		const textFields = Array.from(
			document.querySelectorAll('form textarea, form input[type="text"]')
		);
		const textareas = Array.from(
			document.querySelectorAll('form textarea')
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

		const loadForm = function(data) {
			const isDefault = item => item.hasAttribute('selected');
			let current = data ? data : getChar();
			radioButtons.forEach(item => {
				if (current[item.name] === item.value) {
					item.checked = true;
				} else if (!current[item.name] && isDefault(item)) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			});
			checkboxes.forEach(item => {
				if (current[item.name]) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			});
			textFields.forEach(item => {
				let value = current[item.name];
				if (value) {
					item.value = value;
					// Trigger any updates keyed to inputs.
					item.dispatchEvent(new Event('input'));
				} else {
					item.value = "";
				}
			});
			// Trigger any updates keyed to changes.
			textareas.forEach(item => {
				if (item.value) {
					item.dispatchEvent(new Event('change'));
				}
			});
		};

		const clearForm = function() {
			const isDefault = item => item.hasAttribute('selected');
			radioButtons.forEach(item => { item.checked = isDefault(item); });
			checkboxes.forEach(item => { item.checked = isDefault(item); });
			textFields.forEach(item => { item.value = ""; });
		};

		const load = function(data) {
			let characterId = data?.get('character')?.toLowerCase();
			let char = getCharacterMap()[characterId];
			if (char) {
				setCurrentCharacterName(char._canonCase);
				enableForm();
			}

			populateCharacterSelect();

			let rawData = data?.get('d');
			if (rawData) {
				extractCompressedForm(rawData)
					.then(x => loadForm(x));
				enableForm();
			} else {
				loadForm();
			}
		};

		const save = function() {
			radioButtons.forEach(item => {
				if (item.checked) {
					setChar(item.name, item.value);
				}
			});
			checkboxes.forEach(item => {
				setChar(item.name, item.checked);
			});
			textFields.forEach(item => {
				setChar(item.name, item.value);
			});
		};

		const disableForm = function() {
			characterSheet.setAttribute('disabled', '');
			newButton.disabled = true;
			deleteButton.disabled = true;
			shareButton.disabled = true;
		};

		const enableForm = function() {
			characterSheet.removeAttribute('disabled');
			newButton.disabled = false;
			deleteButton.disabled = false;
			shareButton.disabled = false;
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

		const isFormEmpty = function() {
			const form = new FormData(characterSheet);
			for (const [key, value] of form) {
				if (value) {
					return false;
				}
			}
			return true;
		}

		const share = function(link) {
			const shareObject = {"url": link};
			if (navigator.canShare && navigator.canShare(shareObject)) {
				return navigator.share(shareObject);
			}
			return navigator.clipboard.writeText(link);
		}

		// Character sheet should start disabled.
		disableForm();
		load(queryParams());

		// Save updated setting whenever an input is changed.
		radioButtons.forEach(item => {
			item.addEventListener('click', () => {
				setChar(item.name, item.value);
			});
		});
		checkboxes.forEach(item => {
			item.addEventListener('change', () => {
				setChar(item.name, item.checked);
			});
		});
		textFields.forEach(item => {
			item.addEventListener('input', () => {
				setChar(item.name, item.value);
			});
		});
		textareas.forEach(item => {
			item.setAttribute(
				"style",
				`height:${getScrollHeight(item)}px;overflow-y:hidden;`
			);
			item.addEventListener('input', function() {
				this.style.height = "";
				this.style.height = getScrollHeight(this) + "px";
			});
			item.addEventListener('change', () => {
				// Trigger all resizes.
				textareas.forEach(other => {
					other.style.height = "";
					other.style.height = getScrollHeight(other) + "px";
				});
			});
		});
		// Trigger any updates keyed to changes.
		textareas.forEach(item => {
			if (item.value) {
				item.dispatchEvent(new Event('change'));
			}
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
			} else if (isFormEnabled() && isFormEmpty()) {
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
		shareButton.onclick = function() {
			getCompressedForm()
				.then(dataStr => {
					const params = new URLSearchParams();
					params.set('d', dataStr);
					const thisPage = window.location.origin + window.location.pathname;
					return share(`${thisPage}?${params.toString()}`)
				});
		}
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", startup);
	} else {
		startup();
	}
})()
