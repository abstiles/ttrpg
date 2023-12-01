(function() {
	"use strict";

	const startup = function() {
		const strength = document.getElementById('strength');
		const toughness = document.getElementById('toughness');
		const toughnessEssence = document.getElementById('toughness-essence');
		const toughnessPerks = document.getElementById('toughness-perks');
		const toughnessArmor = document.getElementById('toughness-armor');
		const toughnessMorphed = document.getElementById('toughness-morphed');

		[strength, toughnessPerks, toughnessArmor].forEach(item => {
			item.addEventListener('change', () => {
				const strengthVal = Number(strength.value || 0);
				const perksVal = Number(toughnessPerks.value || 0);
				const armorVal = Number(toughnessArmor.value || 0);
				toughness.value = strengthVal + 10;
				toughnessEssence.value = strengthVal;
				toughnessMorphed.value = 10 + strengthVal + perksVal + armorVal;
			});
		});

		const speed = document.getElementById('speed');
		const evasion = document.getElementById('evasion');
		const evasionEssence = document.getElementById('evasion-essence');
		const evasionPerks = document.getElementById('evasion-perks');
		const evasionArmor = document.getElementById('evasion-armor');
		const evasionMorphed = document.getElementById('evasion-morphed');

		// Save updated setting whenever an input is changed.
		[speed, evasionPerks, evasionArmor].forEach(item => {
			item.addEventListener('change', () => {
				const speedVal = Number(speed.value || 0);
				const perksVal = Number(evasionPerks.value || 0);
				const armorVal = Number(evasionArmor.value || 0);
				evasion.value = speedVal + 10;
				evasionEssence.value = speedVal;
				evasionMorphed.value = 10 + speedVal + perksVal + armorVal;
			});
		});

		const smarts = document.getElementById('smarts');
		const willpower = document.getElementById('willpower');
		const willpowerEssence = document.getElementById('willpower-essence');
		const willpowerPerks = document.getElementById('willpower-perks');
		const willpowerArmor = document.getElementById('willpower-armor');
		const willpowerMorphed = document.getElementById('willpower-morphed');

		// Save updated setting whenever an input is changed.
		[smarts, willpowerPerks, willpowerArmor].forEach(item => {
			item.addEventListener('change', () => {
				const smartsVal = Number(smarts.value || 0);
				const perksVal = Number(willpowerPerks.value || 0);
				const armorVal = Number(willpowerArmor.value || 0);
				willpower.value = smartsVal + 10;
				willpowerEssence.value = smartsVal;
				willpowerMorphed.value = 10 + smartsVal + perksVal + armorVal;
			});
		});

		const social = document.getElementById('social');
		const cleverness = document.getElementById('cleverness');
		const clevernessEssence = document.getElementById('cleverness-essence');
		const clevernessPerks = document.getElementById('cleverness-perks');
		const clevernessArmor = document.getElementById('cleverness-armor');
		const clevernessMorphed = document.getElementById('cleverness-morphed');

		// Save updated setting whenever an input is changed.
		[social, clevernessPerks, clevernessArmor].forEach(item => {
			item.addEventListener('change', () => {
				const socialVal = Number(social.value || 0);
				const perksVal = Number(clevernessPerks.value || 0);
				const armorVal = Number(clevernessArmor.value || 0);
				cleverness.value = socialVal + 10;
				clevernessEssence.value = socialVal;
				clevernessMorphed.value = 10 + socialVal + perksVal + armorVal;
			});
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", startup);
	} else {
		startup();
	}
})()
