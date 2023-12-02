(function() {
	"use strict";

	const change = function(field, value) {
		field.value = value;
		// Most of these text fields react to "input" not "change".
		field.dispatchEvent(new Event('input'));
	}

	const startup = function() {
		const strength = document.getElementById('strength');
		const toughness = document.getElementById('toughness');
		const toughnessPerks = document.getElementById('toughness-perks');
		const toughnessArmor = document.getElementById('toughness-armor');
		const toughnessMorphed = document.getElementById('toughness-morphed');

		[strength, toughnessPerks, toughnessArmor].forEach(item => {
			item.addEventListener('change', () => {
				const strengthVal = Number(strength.value || 0);
				const perksVal = Number(toughnessPerks.value || 0);
				const armorVal = Number(toughnessArmor.value || 0);
				change(toughness, strengthVal + 10);
				change(toughnessMorphed, 10 + strengthVal + perksVal + armorVal);
			});
		});

		const speed = document.getElementById('speed');
		const evasion = document.getElementById('evasion');
		const evasionPerks = document.getElementById('evasion-perks');
		const evasionArmor = document.getElementById('evasion-armor');
		const evasionMorphed = document.getElementById('evasion-morphed');

		// Save updated setting whenever an input is changed.
		[speed, evasionPerks, evasionArmor].forEach(item => {
			item.addEventListener('change', () => {
				const speedVal = Number(speed.value || 0);
				const perksVal = Number(evasionPerks.value || 0);
				const armorVal = Number(evasionArmor.value || 0);
				change(evasion, speedVal + 10);
				change(evasionMorphed, 10 + speedVal + perksVal + armorVal);
			});
		});

		const smarts = document.getElementById('smarts');
		const willpower = document.getElementById('willpower');
		const willpowerPerks = document.getElementById('willpower-perks');
		const willpowerArmor = document.getElementById('willpower-armor');
		const willpowerMorphed = document.getElementById('willpower-morphed');

		// Save updated setting whenever an input is changed.
		[smarts, willpowerPerks, willpowerArmor].forEach(item => {
			item.addEventListener('change', () => {
				const smartsVal = Number(smarts.value || 0);
				const perksVal = Number(willpowerPerks.value || 0);
				const armorVal = Number(willpowerArmor.value || 0);
				change(willpower, smartsVal + 10);
				change(willpowerMorphed, 10 + smartsVal + perksVal + armorVal);
			});
		});

		const social = document.getElementById('social');
		const cleverness = document.getElementById('cleverness');
		const clevernessPerks = document.getElementById('cleverness-perks');
		const clevernessArmor = document.getElementById('cleverness-armor');
		const clevernessMorphed = document.getElementById('cleverness-morphed');

		// Save updated setting whenever an input is changed.
		[social, clevernessPerks, clevernessArmor].forEach(item => {
			item.addEventListener('change', () => {
				const socialVal = Number(social.value || 0);
				const perksVal = Number(clevernessPerks.value || 0);
				const armorVal = Number(clevernessArmor.value || 0);
				change(cleverness, socialVal + 10);
				change(clevernessMorphed, 10 + socialVal + perksVal + armorVal);
			});
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", startup);
	} else {
		startup();
	}
})()
