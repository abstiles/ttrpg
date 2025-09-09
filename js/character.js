import { pageLoaded } from "./utils.js";

const character = {
	_imageGenerator: () => {
		const game = document.querySelector('h1')?.textContent ?? "Character Sheet";
		const characterName = document.getElementById("character")?.value ?? "";
		const lines = [
			game,
			"CHARACTER SHEET",
			characterName,
			`Generated: ${new Date().toISOString().replace("T", " ")}`,
		];
		const styles = [
			{ size: 60, mods: "700 ultra-condensed" },
			{},
			{ size: 30, mods: "bold" },
			{ fontFamily: "courier" },
		];
		const defaultStyle = {
			size: 12,
			mods: "",
			fontFamily: (
				'-apple-system, "system-ui", "Open Sans", "Segoe UI", Tahoma,'
				+ ' Arial, sans-serif'
			),
		}

		const target = document.createElement('canvas');
		const ctx = target.getContext('2d');
		const padding = 15, interLinePadding = 10;
		let minWidth = 0;
		let minHeight = 0;
		for (let i = 0; i < lines.length; i++) {
			const style = styles[i];
			style.size ??= defaultStyle.size;
			style.mods ??= defaultStyle.mods;
			style.fontFamily ??= defaultStyle.fontFamily;
			style.font ??= `${style.mods} ${style.size}px / ${style.size}px ${style.fontFamily}`;
			ctx.font = style.font;
			const textDims = ctx.measureText(lines[i]);
			const width = textDims.width;
			minHeight += textDims.actualBoundingBoxAscent + textDims.actualBoundingBoxDescent;
			if (width > minWidth) {
				minWidth = width;
			}
		}
		const width = minWidth + padding * 2;
		const height = minHeight + padding * 2 + interLinePadding * (lines.length - 1);
		// I like to render at double-scale for high DPI displays.
		const scale = 2;

		target.width = width * scale;
		target.height = height * scale;
		ctx.scale(2, 2);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = "white";
		let y = padding;
		for (let i = 0; i < lines.length; i++) {
			ctx.font = styles[i].font;
			const textDims = ctx.measureText(lines[i]);
			y += textDims.actualBoundingBoxAscent + textDims.actualBoundingBoxDescent;
			ctx.fillText(lines[i], (width - textDims.width) / 2, y);
			y += interLinePadding;
		}
		return ctx.getImageData(0, 0, target.width, target.height);
	},

	get imageGenerator() {
		return this._imageGenerator;
	},

	set imageGenerator(cb) {
		this._imageGenerator = cb;
	}
}

window.character = character;
export default character;

(async function() {
	"use strict";

	const getPageStyles = async () => {
		const styleSheetLinks = document.querySelectorAll('head link[rel="stylesheet"]');
		const styles = await Promise.all(
			Array.from(styleSheetLinks)
				.map(link =>
					fetch(link.href, {cache: "no-cache"}).then(r => r.text())
				)
		);
		return '<style>' + styles.join('</style><style>') + '</style>';
	}

	const loadIntoImage = url => new Promise(resolve => {
		const i = new Image();
		i.crossOrigin = "Anonymous";
		i.src = url;
		i.onload = () => resolve(i);
	});

	const arrayBufferToBase64 = function( buffer ) {
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
	};

	const base64ToArrayBuffer = function(base64) {
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
	};

	const compress = function(string) {
		const encoding = "gzip";
		const byteArray = new TextEncoder().encode(string);
		const cs = new CompressionStream(encoding);
		const writer = cs.writable.getWriter();
		writer.write(byteArray);
		writer.close();
		return new Response(cs.readable).arrayBuffer();
	};

	const decompress = function(byteArray) {
		const encoding = "gzip";
		const cs = new DecompressionStream(encoding);
		const writer = cs.writable.getWriter();
		writer.write(byteArray);
		writer.close();
		return new Response(cs.readable).arrayBuffer().then(function(arrayBuffer) {
			return new TextDecoder().decode(arrayBuffer);
		});
	};

	const getCompressedForm = function() {
		const form = new FormData(document.getElementById('character-sheet'));
		const params = new URLSearchParams();
		for (const [key, value] of form) {
			if (value) {
				params.set(key, value);
			}
		}
		return compress(params.toString())
			.then(buf => arrayBufferToBase64(buf));
	};

	const extractCompressedForm = function(data) {
		return decompress(base64ToArrayBuffer(data))
			.then(params => Object.fromEntries(new URLSearchParams(params)));
	};

	const getScrollHeight = function(elem) {
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
	};

	await pageLoaded;

	const characterId = document.getElementById('character');
	const newCharacterPrompt = document.getElementById('new-character-prompt');
	const uploadFile = document.getElementById('upload-file');
	const encodedCanvas = document.getElementById('encoded');
	const imageDisplay = document.getElementById('char-img-display');
	const newButton = document.getElementById('new-btn');
	const deleteButton = document.getElementById('delete-btn');
	const characterSheet = document.getElementById('character-sheet');
	const charSelect = document.getElementById('load-character');
	const shareButton = document.getElementById('share-btn');
	const downloadButton = document.getElementById('download-btn');
	const shareDialog = document.getElementById('share-dialog');
	const shareLinkText = document.getElementById('share-link-text');
	const shareUrl = document.getElementById('share-url');
	const shareMd = document.getElementById('share-md');
	const radioButtons = Array.from(
		document.querySelectorAll('form input[type="radio"]')
	);
	const checkboxes = Array.from(
		document.querySelectorAll('form input[type="checkbox"]')
	);
	const textFields = Array.from(
		document.querySelectorAll('form textarea, form input[type="text"]')
	);
	const numberFields = Array.from(
		document.querySelectorAll('form input[type="number"]')
	);
	const textareas = Array.from(
		document.querySelectorAll('form textarea')
	);

	const baseImage = () => {
		const width = 372, height = 200, scale = 2;
		const multipass = document.getElementById('multipass');
		const inputStyle = getComputedStyle(multipass.querySelector('input'));
		const labelStyle = getComputedStyle(multipass.querySelector('label'));
		const legendStyle = getComputedStyle(multipass.querySelector('legend'));
		const target = document.createElement('canvas');
		target.width = width * scale;
		target.height = height * scale;
		const ctx = target.getContext('2d');
		ctx.scale(2, 2);
		ctx.beginPath();
		ctx.fillStyle = 'rgb(33, 107, 130)';
		ctx.moveTo(0, 0);
		ctx.lineTo(width - 30, 0);
		ctx.lineTo(width, 30);
		ctx.lineTo(width, height - 30);
		ctx.lineTo(width - 30, height);
		ctx.lineTo(0, height);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = inputStyle.backgroundColor;
		const fieldCount = 4;
		const fieldHeight = 27, fieldWidth = width - 60;
		const paddings = (height - fieldHeight * fieldCount) / (fieldCount + 1);
		for (let i = 0; i < fieldCount; i++) {
			ctx.fillRect(30, paddings * (i + 1) + fieldHeight * i, fieldWidth, fieldHeight);
		}
		ctx.textBaseline = 'middle';
		const values = ['character-name', 'handle', 'pronouns', 'player']
			.map(x => document.getElementById(x).value)
		;
		const labels = ['Name', 'Handle', 'Pronouns', 'Player'];
		for (let i = 0; i < fieldCount; i++) {
			ctx.fillStyle = inputStyle.color;
			ctx.font = inputStyle.font;
			ctx.fillText(values[i], 34, paddings * (i + 1) + fieldHeight * i + (fieldHeight / 2) + 1)
			ctx.font = labelStyle.font;
			ctx.fillStyle = labelStyle.color;
			let labelWidth = ctx.measureText(labels[i]).width;
			ctx.fillText(labels[i], 30 + fieldWidth - labelWidth - 5, paddings * (i + 1) + fieldHeight * i + (fieldHeight / 2) + 1)
		}
		ctx.save();
		ctx.font = legendStyle.font;
		ctx.fillStyle = legendStyle.color;
		ctx.translate(0, height);
		ctx.rotate(-Math.PI / 2);
		const txt = "Grand Cross Multipass";
		ctx.fillText(txt, (height - ctx.measureText(txt).width) / 2, 15);
		ctx.restore();
		return ctx.getImageData(0, 0, width * scale, height * scale);
	}

	let charList = [];

	const getCurrentCharacterName = function() {
		return characterId.value.trim();
	};

	const setCurrentCharacterName = function(value) {
		characterId.value = value.trim();
	};

	const pageId = function() {
		return document.documentElement.querySelector('header h1')
			.textContent.toLowerCase();
	}
	const getCharacterMap = function() {
		return JSON.parse(localStorage.getItem(pageId()) || "{}");
	};

	const getChar = function() {
		let characters = getCharacterMap();
		let currentName = getCurrentCharacterName();
		return characters[currentName.toLowerCase()] || {}
	};

	const setChar = function(key, value) {
		const currentName = getCurrentCharacterName();
		if (!key || !currentName) {
			return;
		}
		const characters = getCharacterMap();
		const currentChar = getChar();
		currentChar[key] = value;
		currentChar._canonCase = currentName;
		characters[currentName.toLowerCase()] = currentChar;
		localStorage.setItem(pageId(), JSON.stringify(characters));
	};

	const deleteChar = function(name) {
		let characters = getCharacterMap();
		delete characters[name.toLowerCase()];
		localStorage.setItem(pageId(), JSON.stringify(characters));
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
		numberFields.forEach(item => {
			let value = current[item.name];
			if (value) {
				item.value = value;
				// Trigger any updates keyed to inputs.
				item.dispatchEvent(new Event('change'));
			} else {
				item.value = item.getAttribute("value") ?? "";
			}
		});
		textFields.forEach(item => {
			let value = current[item.name];
			if (value) {
				item.value = value;
				// Trigger any updates keyed to inputs.
				item.dispatchEvent(new Event('input'));
			} else {
				item.value = item.getAttribute("value") ?? "";
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
		textFields.forEach(item => { item.value = item.getAttribute("value") ?? ""; });
		numberFields.forEach(item => { item.value = item.getAttribute("value") ?? ""; });
	};

	const load = function(data, shouldShare) {
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

		if (shouldShare) {
			const here = new URL(window.location);
			here.hash = '';
			history.replaceState({}, '', here);
			compressAndShare();
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
		numberFields.forEach(item => {
			setChar(item.name, item.value);
		});
	};

	const disableForm = function() {
		newCharacterPrompt.removeAttribute('disabled');
		characterSheet.setAttribute('disabled', '');
		newButton.disabled = true;
		deleteButton.disabled = true;
		shareButton.disabled = true;
		downloadButton.disabled = true;
	};

	const enableForm = function() {
		newCharacterPrompt.setAttribute('disabled', '');
		characterSheet.removeAttribute('disabled');
		newButton.disabled = false;
		deleteButton.disabled = false;
		shareButton.disabled = false;
		downloadButton.disabled = false;
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
		const shareObject = {'url': link};
		if (navigator.canShare && navigator.canShare(shareObject)) {
			return navigator.share(shareObject);
		}
		return navigator.clipboard.writeText(link);
	}

	const showShareModal = function(link) {
		shareLinkText.value = link;
		window.location.hash = 'share';
		shareDialog.showModal();
	}

	const closeShareModal = function() {
		shareDialog.close();
		if (window.location.hash === '#share') {
			window.history.back();
		}
	}

	const compressAndShare = function() {
		getCompressedForm()
			.then(dataStr => {
				const params = new URLSearchParams();
				params.set('d', dataStr);
				const thisPage = window.location.origin + window.location.pathname;
				const link = `${thisPage}?${params.toString()}`;
				showShareModal(link);
			});
	}

	// Character sheet should start disabled.
	disableForm();
	load(queryParams(), window.location.hash === '#share');

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
		item.addEventListener('change', () => {
			setChar(item.name, item.value);
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
	characterId.addEventListener('change', () => {
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
	characterId.addEventListener('input', () => {
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
	window.addEventListener('hashchange', event => {
		const fromUrl = new URL(event.oldURL);
		const toUrl = new URL(event.newURL);
		if (fromUrl.hash === "#share" && !toUrl.hash) {
			shareDialog.close()
		}
	});

	deleteButton.onclick = function() {
		if (window.confirm('Really delete this character?')) {
			deleteChar(getCurrentCharacterName());
			resetAll();
			populateCharacterSelect();
		}
	};
	uploadFile.onchange = function(event) {
		const file = event.target.files[0];
		console.log(`File type: ${file.type}`)
		if (file.type === "image/png") {
			loadFromImage(file);
		} else {
			const reader = new FileReader();
			reader.readAsText(file,'UTF-8');
			reader.onload = readerEvent => {
				const content = readerEvent.target.result;
				loadForm(JSON.parse(content));
				enableForm();
			}
		}
	}
	newButton.onclick = function() {
		if (getCurrentCharacterName().length > 0) {
			save();
			resetAll();
		}
	};
	shareDialog.onclick = function(event) {
		if (event.target === this) {
			closeShareModal();
		}
	}
	shareButton.onclick = compressAndShare;
	shareUrl.onclick = function() {
		share(shareLinkText.value);
		closeShareModal();
	}
	shareMd.onclick = function() {
		const label = `${getCurrentCharacterName()} Character Sheet`
		const url = shareLinkText.value;
		const link = `[${label}](${url})`
		const shareObject = {"text": link};
		const canShare = navigator.canShare && navigator.canShare(shareObject);
		(canShare
			? navigator.share(shareObject)
			: navigator.clipboard.writeText(link)
		).then(() => closeShareModal());
	}

	const rotate = canvas => {
		const ctx = canvas.getContext('2d');
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const imageDataCopy = new ImageData(
			new Uint8ClampedArray(imageData.data),
			imageData.width,
			imageData.height
		);
		const height = canvas.width;
		const width = canvas.height;
		canvas.height = height;
		canvas.width = width;
		ctx.save();
		ctx.translate(height, 0);
		ctx.rotate(Math.PI / 2);
		ctx.putImageData(imageDataCopy, 0, 0);
		ctx.restore();
		return canvas;
	};

	const intToByteArray = num => {
		// 32 bits for the length, LE unsigned
		const bytes = [0, 0, 0, 0];
		const byteMask = 0xff;
		for (let i = 0; i < bytes.length; i++) {
			const shift = i * 8;
			bytes[i] = (num & (byteMask << shift)) >> shift;
		}
		return bytes;
	}

	const envelope = bytes => {
		// First byte determines formatting. Highest order bit is orientation,
		// 0 = horizontal, 1 = vertical; next 5 bits reserved for version; last
		// two bits always set to ensure PNG optimizers don't clear color bits
		// on a 0% opacity pixel.
		const verticalOrientation = 1 << 7;
		const opaque = 0x03;
		const orientationByte = [verticalOrientation | opaque];
		const marker = new TextEncoder().encode("rpg");
		const dataLen = intToByteArray(bytes.byteLength);
		const header = new Uint8ClampedArray(8);
		header.set(orientationByte, 0);
		header.set(marker, 1);
		header.set(dataLen, 4);
		const result = new Uint8ClampedArray(header.byteLength + bytes.byteLength);
		result.set(header, 0);
		result.set(bytes, header.byteLength);
		return result;
	}

	const payloadData = async () => {
		const content = JSON.stringify(getChar());
		const compressed = new Uint8ClampedArray(await compress(content));
		return compressed;
	}

	const getPayloadBytes = async () => {
		return envelope(await payloadData());
	}

	const loadAsync = onloadable => new Promise(
		resolve => onloadable.onload = resolve
	);

	const loadFromImage = async file => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		await loadAsync(reader);
		const img = new Image();
		img.src = reader.result;
		await loadAsync(img);
		const canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
		return canvas;
	};

	const injectPayload = (img, payload, opts) => {
		// Transpose is writing down the left side instead of across the top.
		const transpose = opts?.orientation === "vertical";

		// Create payload subimage with pixels holding payload data.
		const width = transpose ? img.height : img.width;
		const bytesPerRow = 4 * width; // 4 bytes per RGBA pixel.
		const height = Math.ceil(payload.byteLength / bytesPerRow);
		const data = new Uint8ClampedArray(bytesPerRow * height);
		data.set(new Uint8ClampedArray(payload), 0);
		const payloadImage = new ImageData(data, width, height);

		// Create target canvas large enough to hold original image + payload.
		const target = document.createElement('canvas');
		target.width = transpose ? img.width + height : img.width;
		target.height = transpose ? img.height : img.height + height;
		const ctx = target.getContext('2d');
		// Set offset direction and amount to leave space for the payload data.
		const offsetX = transpose ? height : 0;
		const offsetY = transpose ? 0 : height;
		ctx.putImageData(img, offsetX, offsetY);

		// Write the payload pixels into the empty space left over. We have to
		// write the payload image data to a temp canvas and then from the temp
		// canvas to the target canvas because putImageData ignores the context
		// transform, but drawImage respects it, and drawImage does not accept
		// an ImageData instance.
		const temp = document.createElement('canvas');
		temp.width = width;
		temp.height = height;
		temp.getContext('2d').putImageData(payloadImage, 0, 0);
		ctx.save();
		if (transpose) {
			// This is the transpose matrix to flip rows/cols:
			// ⎡ 0 1 0 ⎤
			// ⎢ 1 0 0 ⎥
			// ⎣ 0 0 1 ⎦
			ctx.transform(0, 1, 1, 0, 0, 0);
		}
		ctx.drawImage(temp, 0, 0);
		ctx.restore();
		return target;
	};

	downloadButton.onclick = async function() {
		// const img = baseImage();
		const img = character.imageGenerator();
		const payload = await getPayloadBytes();
		const target = injectPayload(img, payload, {orientation: "vertical"});
		const name = getCurrentCharacterName().toLowerCase().replaceAll(' ', '-');
		const filename = `${name}.character.png`;

		target.toBlob(blob => {
			const a = document.createElement('a');
			const url = URL.createObjectURL(blob);
			a.setAttribute('href', url);
			a.setAttribute('download', filename);
			a.click();
		});
	}
})();
