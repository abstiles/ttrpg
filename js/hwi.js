import { pageLoaded } from "./utils.js";

(async function() {
	"use strict";

	await pageLoaded;

	const multipass = document.getElementById('multipass');

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

	// Startup logic goes here.
})();
