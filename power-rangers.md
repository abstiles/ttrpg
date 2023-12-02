---
title: Power Rangers
script: js/hwi.js
style: |-
  @media print {
    .character-controls {
      display: none;
    }
  }
  .block {
    display: grid;
    break-inside: avoid;
  }
  input#character {
    display: block;
    width: 80%;
    margin: auto;
    text-align: center;
    font-size: xx-large;
    background: transparent;
    border: none;
  }
  .character-controls {
    text-align: center;
  }
  #character-sheet[disabled] {
    display: none;
  }
  #summary {
    display: grid;
  }
  table {
    border-spacing: 5px 0;
  }
  table td {
    text-align: center;
  }
  textarea {
    width: auto;
    height: 100%;
  }
  table input[type="text"] {
    display: table-cell;
    width: calc(100% - 10px);
  }
  input[inputmode="numeric"] {
    width: 2em;
    align-self: center;
    text-align: center;
  }
  .stat {
    display: flex;
    flex-direction: column;
  }
  legend {
    display: inline-block;
    background-color: var(--color);
    color: var(--background-color);
    font-weight: bold;
    font-family: var(--sans);
    text-align: center;
    padding: 2px 20px;
  }

  .underlabeled {
      position: relative;
      display: inline-flex;
      flex-direction: column-reverse;
  }
  .underlabeled label {
      font-family: var(--sans);
      font-size: x-small;
      text-align: center;
      line-height: 1;
      margin-top: 0.25em;
      margin-bottom: 0.25em;
      text-transform: uppercase;
  }
  .overlabeled {
      position: relative;
      display: inline-flex;
      flex-direction: column;
  }
  .overlabeled label {
      font-family: var(--sans);
      font-size: x-small;
      text-align: center;
      line-height: 1;
      margin-top: 0.25em;
      margin-bottom: 0.25em;
      text-transform: uppercase;
  }
  #summary {
      display: grid;
      column-gap: 10px;
      margin-top: 10px;
      padding: 0;
      border: 0;
  }
  @media screen and (min-width:768px) {
      #summary {
          grid-template-columns: 4fr 3fr;
      }
      #combat-info {
          grid-template-columns: 4fr 5fr;
      }
      #stats-cols {
          grid-template-columns: repeat(4, 1fr);
      }
  }
  #summary .basics {
      display: grid;
  }
  #summary .basics .row {
      display: grid;
      column-gap: 10px;
  }
  #summary .basics .row:first-child {
      grid-template-columns: 3fr 1fr;
  }
  #summary .basics .row:nth-child(2) {
      grid-template-columns: 6fr 4fr 1fr;
  }
  #summary .summary-details {
      display: grid;
  }
  #details {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 2fr 1fr;
      grid-column-gap: 10px;
      margin: 0;
      border: 0;
  }
  #details .col:nth-child(2) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-content: space-evenly;
      align-items: start;
      grid-column-gap: 5px;
  }
  #combat-info {
      display: grid;
      align-items: center;
  }
  #attack {
    padding: 5px;
  }
  #attack table {
    border-spacing: 0 2.5px;
  }
  #stats-cols {
    display: grid;
    margin-top: 10px;
  }
  #stats-cols {
    text-align: center;
  }
  #stats-cols .stat {
    padding: 5px;
    border-radius: 20px;
    margin: 5px 0;
    border: 1px solid var(--color);
  }
  #stats-cols input[inputmode="numeric"] {
    font-size: small;
    width: 1.5em;
    margin: 0;
    margin-left: 5px;
    padding: 0;
  }
  #stats-cols .sum .underlabeled {
    margin: 5px;
  }
  .skill {
    border: 1px solid var(--color);
    padding: 2.5px;
    margin: 2.5px 0;
  }
  .skill h3 {
    font-size: 12pt;
    font-family: var(--sans);
  }
  .dice {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
  }
  .dice input[type="radio"] {
      margin-top: 0;
  }
  .skill .specializations {
      display:grid;
      grid-template:
          "a b" 1fr
          "a c" 1fr
          "a d" 1fr / 12px 1fr;
      grid-row-gap: 5px;
      padding: 5px 0;
  }
  .skill .specializations span {
      font-size: small;
      font-family: var(--sans);
      display: table;
      grid-area: a;
      writing-mode: vertical-lr;
      transform: rotate(180deg);
  }
  .skill .specializations input[type="text"] {
      margin: 0 5px;
      width: calc(100% - 20px);
      font-size: small;
  }
---
<script src="js/pr.js"></script>
<main>
<input type="text" id="character" placeholder="New Character" autofocus>

<div class="character-controls">
<button id="new-btn" disabled>New Character</button>
<button id="delete-btn" disabled>Delete Character</button>
<select id="load-character" required>
<option selected disabled hidden value="">Load Character</option>
</select>
<button id="share-btn" disabled>Share Snapshot</button>
</div>

<form id="character-sheet">
<fieldset id="summary">
	<div class="basics">
		<div class="row">
			<div class="underlabeled">
				<label for="character-name">Name</label>
				<input name="character-name" id="character-name" type="text" size="5" />
			</div>
			<div class="underlabeled">
				<label for="pronouns">Pronouns</label>
				<input name="pronouns" id="pronouns" type="text" size="5" />
			</div>
		</div>
		<div class="row">
			<div class="underlabeled">
				<label for="origin">Origin</label>
				<input name="origin" id="origin" type="text" size="5" />
			</div>
			<div class="underlabeled">
				<label for="role">Role</label>
				<input name="role" id="role" type="text" size="5" />
			</div>
			<div class="underlabeled">
				<label for="level">Level</label>
				<input name="level" id="level" type="text" inputmode="numeric" pattern="[0-9]*" value="1" />
			</div>
		</div>
		<div class="row">
			<div class="underlabeled">
				<label for="languages">Languages</label>
				<input type="text" name="languages" id="languages">
			</div>
		</div>
	</div>
	<div class="summary-details">
		<div class="underlabeled">
			<label for="description">Description</label>
			<textarea name="description" id="description" rows="3"></textarea>
		</div>
	</div>
</fieldset>

<div id="combat-info">
	<fieldset id="details">
		<div class="col">
			<div class="underlabeled">
				<label for="influences">Influences</label>
				<textarea name="influences" id="influences"></textarea>
			</div>
			<div class="underlabeled">
				<label for="hangups">Hang-ups</label>
				<textarea name="hangups" id="hangups"></textarea>
			</div>
		</div>
		<div class="col">
			<div class="underlabeled">
				<label for="power">Personal Power</label>
				<input name="power" id="power" type="text" inputmode="numeric" pattern="[0-9]*" value="1" />
			</div>
			<div class="underlabeled">
				<label for="movement">Movement</label>
				<input name="movement" id="movement" type="text" inputmode="numeric" pattern="[0-9]*" value="1" />
			</div>
			<div class="underlabeled">
				<label for="health">Health</label>
				<input name="health" id="health" type="text" inputmode="numeric" pattern="[0-9]*" value="1" />
			</div>
			<div class="underlabeled">
				<label for="damage">Damage</label>
				<input name="damage" id="damage" type="text" inputmode="numeric" pattern="[0-9]*" value="0" />
			</div>
		</div>
	</fieldset>

	<fieldset id="attack">
		<legend>Attack</legend>
		<table>
			<tr>
				<th id="attack-name" scope="col">Name</th>
				<th id="attack-range" scope="col">Range</th>
				<th id="attack-attack" scope="col">Attack</th>
				<th id="attack-effects" scope="col">Effects</th>
				<th id="attack-notes" scope="col">Notes</th>
			</tr>
			<tr>
				<td><input type="text" name="attack0" aria-labelledby="attack-name" /></td>
				<td><input type="text" name="attack0" aria-labelledby="attack-range" /></td>
				<td><input type="text" name="attack0" aria-labelledby="attack-attack" /></td>
				<td><input type="text" name="attack0" aria-labelledby="attack-effects" /></td>
				<td><input type="text" name="attack0" aria-labelledby="attack-notes" /></td>
			</tr>
			<tr>
				<td><input type="text" name="attack1" aria-labelledby="attack-name" /></td>
				<td><input type="text" name="attack1" aria-labelledby="attack-range" /></td>
				<td><input type="text" name="attack1" aria-labelledby="attack-attack" /></td>
				<td><input type="text" name="attack1" aria-labelledby="attack-effects" /></td>
				<td><input type="text" name="attack1" aria-labelledby="attack-notes" /></td>
			</tr>
			<tr>
				<td><input type="text" name="attack2" aria-labelledby="attack-name" /></td>
				<td><input type="text" name="attack2" aria-labelledby="attack-range" /></td>
				<td><input type="text" name="attack2" aria-labelledby="attack-attack" /></td>
				<td><input type="text" name="attack2" aria-labelledby="attack-effects" /></td>
				<td><input type="text" name="attack2" aria-labelledby="attack-notes" /></td>
			</tr>
			<tr>
				<td><input type="text" name="attack3" aria-labelledby="attack-name" /></td>
				<td><input type="text" name="attack3" aria-labelledby="attack-range" /></td>
				<td><input type="text" name="attack3" aria-labelledby="attack-attack" /></td>
				<td><input type="text" name="attack3" aria-labelledby="attack-effects" /></td>
				<td><input type="text" name="attack3" aria-labelledby="attack-notes" /></td>
			</tr>
			<tr>
				<td><input type="text" name="attack4" aria-labelledby="attack-name" /></td>
				<td><input type="text" name="attack4" aria-labelledby="attack-range" /></td>
				<td><input type="text" name="attack4" aria-labelledby="attack-attack" /></td>
				<td><input type="text" name="attack4" aria-labelledby="attack-effects" /></td>
				<td><input type="text" name="attack4" aria-labelledby="attack-notes" /></td>
			</tr>
		</table>
	</fieldset>
</div>

<div id="stats-cols">
<fieldset id="strength-block" class="stat">
<legend><label for="strength">Strength</label> <input type="text" inputmode="numeric" pattern="[0-9]*" id="strength" name="strength" /></legend>
<div class="def"><label for="toughness">Toughness</label> <input readonly="" type="text" inputmode="numeric" pattern="[0-9]*" id="toughness" name="toughness" /></div>
<div class="sum">
	<div class="underlabeled">
		<label for="toughness-perks">Perks</label>
		<span>+<input type="text" inputmode="numeric" pattern="[0-9]*" name="toughness-perks" id="toughness-perks" /></span>
	</div>
	<div class="underlabeled">
		<label for="toughness-armor">Armor</label>
		<span>+<input type="text" inputmode="numeric" pattern="[0-9]*" name="toughness-armor" id="toughness-armor" /></span>
	</div>
	<div class="underlabeled">
		<label for="toughness-morphed">Morphed</label>
		<span>=<input readonly="" type="text" inputmode="numeric" pattern="[0-9]*" id="toughness-morphed" name="toughness-morphed" /></span>
	</div>
</div>

<div class="skill">
	<h3>Athletics</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="athletics-d2">D2</label>
			<input type="radio" name="athletics" id="athletics-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="athletics-d4">D4</label>
			<input type="radio" name="athletics" id="athletics-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="athletics-d6">D6</label>
			<input type="radio" name="athletics" id="athletics-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="athletics-d8">D8</label>
			<input type="radio" name="athletics" id="athletics-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="athletics-d10">D10</label>
			<input type="radio" name="athletics" id="athletics-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="athletics-d12">D12</label>
			<input type="radio" name="athletics" id="athletics-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="athletics-specialization0" />
		<input type="text" name="athletics-specialization1" />
		<input type="text" name="athletics-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Brawn</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="brawn-d2">D2</label>
			<input type="radio" name="brawn" id="brawn-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="brawn-d4">D4</label>
			<input type="radio" name="brawn" id="brawn-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="brawn-d6">D6</label>
			<input type="radio" name="brawn" id="brawn-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="brawn-d8">D8</label>
			<input type="radio" name="brawn" id="brawn-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="brawn-d10">D10</label>
			<input type="radio" name="brawn" id="brawn-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="brawn-d12">D12</label>
			<input type="radio" name="brawn" id="brawn-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="brawn-specialization0" />
		<input type="text" name="brawn-specialization1" />
		<input type="text" name="brawn-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Conditioning</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="conditioning-1">+1</label>
			<input type="radio" name="conditioning" id="conditioning-1" value="1" />
		</span>
		<span class="overlabeled">
			<label for="conditioning-2">+2</label>
			<input type="radio" name="conditioning" id="conditioning-2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="conditioning-3">+3</label>
			<input type="radio" name="conditioning" id="conditioning-3" value="3" />
		</span>
		<span class="overlabeled">
			<label for="conditioning-4">+4</label>
			<input type="radio" name="conditioning" id="conditioning-4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="conditioning-5">+5</label>
			<input type="radio" name="conditioning" id="conditioning-5" value="5" />
		</span>
		<span class="overlabeled">
			<label for="conditioning-6">+6</label>
			<input type="radio" name="conditioning" id="conditioning-6" value="6" />
		</span>
	</div>
</div>

<div class="skill">
	<h3>Intimidation</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="intimidation-d2">D2</label>
			<input type="radio" name="intimidation" id="intimidation-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="intimidation-d4">D4</label>
			<input type="radio" name="intimidation" id="intimidation-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="intimidation-d6">D6</label>
			<input type="radio" name="intimidation" id="intimidation-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="intimidation-d8">D8</label>
			<input type="radio" name="intimidation" id="intimidation-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="intimidation-d10">D10</label>
			<input type="radio" name="intimidation" id="intimidation-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="intimidation-d12">D12</label>
			<input type="radio" name="intimidation" id="intimidation-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="intimidation-specialization0" />
		<input type="text" name="intimidation-specialization1" />
		<input type="text" name="intimidation-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Might</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="might-d2">D2</label>
			<input type="radio" name="might" id="might-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="might-d4">D4</label>
			<input type="radio" name="might" id="might-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="might-d6">D6</label>
			<input type="radio" name="might" id="might-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="might-d8">D8</label>
			<input type="radio" name="might" id="might-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="might-d10">D10</label>
			<input type="radio" name="might" id="might-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="might-d12">D12</label>
			<input type="radio" name="might" id="might-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="might-specialization0" />
		<input type="text" name="might-specialization1" />
		<input type="text" name="might-specialization2" />
	</div>
</div>

</fieldset>

<fieldset id="speed-block" class="stat">
<legend><label for="speed">Speed</label> <input type="text" inputmode="numeric" pattern="[0-9]*" id="speed" name="speed" /></legend>
<div class="def"><label for="evasion">Evasion</label> <input readonly="" type="text" inputmode="numeric" pattern="[0-9]*" id="evasion" name="evasion" /></div>
<div class="sum">
	<div class="underlabeled">
		<label for="evasion-perks">Perks</label>
		<span>+<input type="text" inputmode="numeric" pattern="[0-9]*" name="evasion-perks" id="evasion-perks" /></span>
	</div>
	<div class="underlabeled">
		<label for="evasion-armor">Armor</label>
		<span>+<input type="text" inputmode="numeric" pattern="[0-9]*" name="evasion-armor" id="evasion-armor" /></span>
	</div>
	<div class="underlabeled">
		<label for="evasion-morphed">Morphed</label>
		<span>=<input readonly="" type="text" inputmode="numeric" pattern="[0-9]*" id="evasion-morphed" name="evasion-morphed" /></span>
	</div>
</div>

<div class="skill">
	<h3>Acrobatics</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="acrobatics-d2">D2</label>
			<input type="radio" name="acrobatics" id="acrobatics-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="acrobatics-d4">D4</label>
			<input type="radio" name="acrobatics" id="acrobatics-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="acrobatics-d6">D6</label>
			<input type="radio" name="acrobatics" id="acrobatics-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="acrobatics-d8">D8</label>
			<input type="radio" name="acrobatics" id="acrobatics-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="acrobatics-d10">D10</label>
			<input type="radio" name="acrobatics" id="acrobatics-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="acrobatics-d12">D12</label>
			<input type="radio" name="acrobatics" id="acrobatics-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="acrobatics-specialization0" />
		<input type="text" name="acrobatics-specialization1" />
		<input type="text" name="acrobatics-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Driving</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="driving-d2">D2</label>
			<input type="radio" name="driving" id="driving-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="driving-d4">D4</label>
			<input type="radio" name="driving" id="driving-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="driving-d6">D6</label>
			<input type="radio" name="driving" id="driving-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="driving-d8">D8</label>
			<input type="radio" name="driving" id="driving-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="driving-d10">D10</label>
			<input type="radio" name="driving" id="driving-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="driving-d12">D12</label>
			<input type="radio" name="driving" id="driving-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="driving-specialization0" />
		<input type="text" name="driving-specialization1" />
		<input type="text" name="driving-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Finesse</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="finesse-d2">D2</label>
			<input type="radio" name="finesse" id="finesse-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="finesse-d4">D4</label>
			<input type="radio" name="finesse" id="finesse-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="finesse-d6">D6</label>
			<input type="radio" name="finesse" id="finesse-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="finesse-d8">D8</label>
			<input type="radio" name="finesse" id="finesse-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="finesse-d10">D10</label>
			<input type="radio" name="finesse" id="finesse-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="finesse-d12">D12</label>
			<input type="radio" name="finesse" id="finesse-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="finesse-specialization0" />
		<input type="text" name="finesse-specialization1" />
		<input type="text" name="finesse-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Infiltration</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="infiltration-d2">D2</label>
			<input type="radio" name="infiltration" id="infiltration-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="infiltration-d4">D4</label>
			<input type="radio" name="infiltration" id="infiltration-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="infiltration-d6">D6</label>
			<input type="radio" name="infiltration" id="infiltration-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="infiltration-d8">D8</label>
			<input type="radio" name="infiltration" id="infiltration-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="infiltration-d10">D10</label>
			<input type="radio" name="infiltration" id="infiltration-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="infiltration-d12">D12</label>
			<input type="radio" name="infiltration" id="infiltration-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="infiltration-specialization0" />
		<input type="text" name="infiltration-specialization1" />
		<input type="text" name="infiltration-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Initiative</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="initiative-d2">D2</label>
			<input type="radio" name="initiative" id="initiative-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="initiative-d4">D4</label>
			<input type="radio" name="initiative" id="initiative-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="initiative-d6">D6</label>
			<input type="radio" name="initiative" id="initiative-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="initiative-d8">D8</label>
			<input type="radio" name="initiative" id="initiative-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="initiative-d10">D10</label>
			<input type="radio" name="initiative" id="initiative-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="initiative-d12">D12</label>
			<input type="radio" name="initiative" id="initiative-d12" value="12" />
		</span>
	</div>
</div>

<div class="skill">
	<h3>Targeting</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="targeting-d2">D2</label>
			<input type="radio" name="targeting" id="targeting-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="targeting-d4">D4</label>
			<input type="radio" name="targeting" id="targeting-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="targeting-d6">D6</label>
			<input type="radio" name="targeting" id="targeting-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="targeting-d8">D8</label>
			<input type="radio" name="targeting" id="targeting-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="targeting-d10">D10</label>
			<input type="radio" name="targeting" id="targeting-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="targeting-d12">D12</label>
			<input type="radio" name="targeting" id="targeting-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="targeting-specialization0" />
		<input type="text" name="targeting-specialization1" />
		<input type="text" name="targeting-specialization2" />
	</div>
</div>
</fieldset>

<fieldset id="smarts-block" class="stat">
<legend><label for="smarts">Smarts</label> <input type="text" inputmode="numeric" pattern="[0-9]*" id="smarts" name="smarts" /></legend>
<div class="def"><label for="willpower">Willpower</label> <input readonly="" type="text" inputmode="numeric" pattern="[0-9]*" id="willpower" name="willpower" /></div>
<div class="sum">
	<div class="underlabeled">
		<label for="willpower-perks">Perks</label>
		<span>+<input type="text" inputmode="numeric" pattern="[0-9]*" name="willpower-perks" id="willpower-perks" /></span>
	</div>
	<div class="underlabeled">
		<label for="willpower-armor">Armor</label>
		<span>+<input type="text" inputmode="numeric" pattern="[0-9]*" name="willpower-armor" id="willpower-armor" /></span>
	</div>
	<div class="underlabeled">
		<label for="willpower-morphed">Morphed</label>
		<span>=<input readonly="" type="text" inputmode="numeric" pattern="[0-9]*" id="willpower-morphed" name="willpower-morphed" /></span>
	</div>
</div>

<div class="skill">
	<h3>Alertness</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="alertness-d2">D2</label>
			<input type="radio" name="alertness" id="alertness-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="alertness-d4">D4</label>
			<input type="radio" name="alertness" id="alertness-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="alertness-d6">D6</label>
			<input type="radio" name="alertness" id="alertness-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="alertness-d8">D8</label>
			<input type="radio" name="alertness" id="alertness-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="alertness-d10">D10</label>
			<input type="radio" name="alertness" id="alertness-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="alertness-d12">D12</label>
			<input type="radio" name="alertness" id="alertness-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="alertness-specialization0" />
		<input type="text" name="alertness-specialization1" />
		<input type="text" name="alertness-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Culture</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="culture-d2">D2</label>
			<input type="radio" name="culture" id="culture-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="culture-d4">D4</label>
			<input type="radio" name="culture" id="culture-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="culture-d6">D6</label>
			<input type="radio" name="culture" id="culture-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="culture-d8">D8</label>
			<input type="radio" name="culture" id="culture-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="culture-d10">D10</label>
			<input type="radio" name="culture" id="culture-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="culture-d12">D12</label>
			<input type="radio" name="culture" id="culture-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="culture-specialization0" />
		<input type="text" name="culture-specialization1" />
		<input type="text" name="culture-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Science</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="science-d2">D2</label>
			<input type="radio" name="science" id="science-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="science-d4">D4</label>
			<input type="radio" name="science" id="science-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="science-d6">D6</label>
			<input type="radio" name="science" id="science-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="science-d8">D8</label>
			<input type="radio" name="science" id="science-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="science-d10">D10</label>
			<input type="radio" name="science" id="science-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="science-d12">D12</label>
			<input type="radio" name="science" id="science-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="science-specialization0" />
		<input type="text" name="science-specialization1" />
		<input type="text" name="science-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Survival</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="survival-d2">D2</label>
			<input type="radio" name="survival" id="survival-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="survival-d4">D4</label>
			<input type="radio" name="survival" id="survival-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="survival-d6">D6</label>
			<input type="radio" name="survival" id="survival-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="survival-d8">D8</label>
			<input type="radio" name="survival" id="survival-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="survival-d10">D10</label>
			<input type="radio" name="survival" id="survival-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="survival-d12">D12</label>
			<input type="radio" name="survival" id="survival-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="survival-specialization0" />
		<input type="text" name="survival-specialization1" />
		<input type="text" name="survival-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Technology</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="technology-d2">D2</label>
			<input type="radio" name="technology" id="technology-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="technology-d4">D4</label>
			<input type="radio" name="technology" id="technology-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="technology-d6">D6</label>
			<input type="radio" name="technology" id="technology-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="technology-d8">D8</label>
			<input type="radio" name="technology" id="technology-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="technology-d10">D10</label>
			<input type="radio" name="technology" id="technology-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="technology-d12">D12</label>
			<input type="radio" name="technology" id="technology-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="technology-specialization0" />
		<input type="text" name="technology-specialization1" />
		<input type="text" name="technology-specialization2" />
	</div>
</div>
</fieldset>

<fieldset id="social-block" class="stat">
<legend><label for="social">Social</label> <input type="text" inputmode="numeric" pattern="[0-9]*" id="social" name="social" /></legend>
<div class="def"><label for="cleverness">Cleverness</label> <input readonly="" type="text" inputmode="numeric" pattern="[0-9]*" id="cleverness" name="cleverness" /></div>
<div class="sum">
	<div class="underlabeled">
		<label for="cleverness-perks">Perks</label>
		<span>+<input type="text" inputmode="numeric" pattern="[0-9]*" name="cleverness-perks" id="cleverness-perks" /></span>
	</div>
	<div class="underlabeled">
		<label for="cleverness-armor">Armor</label>
		<span>+<input type="text" inputmode="numeric" pattern="[0-9]*" name="cleverness-armor" id="cleverness-armor" /></span>
	</div>
	<div class="underlabeled">
		<label for="cleverness-morphed">Morphed</label>
		<span>=<input readonly="" type="text" inputmode="numeric" pattern="[0-9]*" id="cleverness-morphed" name="cleverness-morphed" /></span>
	</div>
</div>

<div class="skill">
	<h3>Animal Handling</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="animal handling-d2">D2</label>
			<input type="radio" name="animal handling" id="animal handling-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="animal handling-d4">D4</label>
			<input type="radio" name="animal handling" id="animal handling-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="animal handling-d6">D6</label>
			<input type="radio" name="animal handling" id="animal handling-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="animal handling-d8">D8</label>
			<input type="radio" name="animal handling" id="animal handling-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="animal handling-d10">D10</label>
			<input type="radio" name="animal handling" id="animal handling-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="animal handling-d12">D12</label>
			<input type="radio" name="animal handling" id="animal handling-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="animal handling-specialization0" />
		<input type="text" name="animal handling-specialization1" />
		<input type="text" name="animal handling-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Deception</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="deception-d2">D2</label>
			<input type="radio" name="deception" id="deception-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="deception-d4">D4</label>
			<input type="radio" name="deception" id="deception-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="deception-d6">D6</label>
			<input type="radio" name="deception" id="deception-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="deception-d8">D8</label>
			<input type="radio" name="deception" id="deception-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="deception-d10">D10</label>
			<input type="radio" name="deception" id="deception-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="deception-d12">D12</label>
			<input type="radio" name="deception" id="deception-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="deception-specialization0" />
		<input type="text" name="deception-specialization1" />
		<input type="text" name="deception-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Performance</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="performance-d2">D2</label>
			<input type="radio" name="performance" id="performance-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="performance-d4">D4</label>
			<input type="radio" name="performance" id="performance-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="performance-d6">D6</label>
			<input type="radio" name="performance" id="performance-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="performance-d8">D8</label>
			<input type="radio" name="performance" id="performance-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="performance-d10">D10</label>
			<input type="radio" name="performance" id="performance-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="performance-d12">D12</label>
			<input type="radio" name="performance" id="performance-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="performance-specialization0" />
		<input type="text" name="performance-specialization1" />
		<input type="text" name="performance-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Persuasion</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="persuasion-d2">D2</label>
			<input type="radio" name="persuasion" id="persuasion-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="persuasion-d4">D4</label>
			<input type="radio" name="persuasion" id="persuasion-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="persuasion-d6">D6</label>
			<input type="radio" name="persuasion" id="persuasion-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="persuasion-d8">D8</label>
			<input type="radio" name="persuasion" id="persuasion-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="persuasion-d10">D10</label>
			<input type="radio" name="persuasion" id="persuasion-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="persuasion-d12">D12</label>
			<input type="radio" name="persuasion" id="persuasion-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="persuasion-specialization0" />
		<input type="text" name="persuasion-specialization1" />
		<input type="text" name="persuasion-specialization2" />
	</div>
</div>

<div class="skill">
	<h3>Streetwise</h3>
	<div class="dice">
		<span class="overlabeled">
			<label for="streetwise-d2">D2</label>
			<input type="radio" name="streetwise" id="streetwise-d2" value="2" />
		</span>
		<span class="overlabeled">
			<label for="streetwise-d4">D4</label>
			<input type="radio" name="streetwise" id="streetwise-d4" value="4" />
		</span>
		<span class="overlabeled">
			<label for="streetwise-d6">D6</label>
			<input type="radio" name="streetwise" id="streetwise-d6" value="6" />
		</span>
		<span class="overlabeled">
			<label for="streetwise-d8">D8</label>
			<input type="radio" name="streetwise" id="streetwise-d8" value="8" />
		</span>
		<span class="overlabeled">
			<label for="streetwise-d10">D10</label>
			<input type="radio" name="streetwise" id="streetwise-d10" value="10" />
		</span>
		<span class="overlabeled">
			<label for="streetwise-d12">D12</label>
			<input type="radio" name="streetwise" id="streetwise-d12" value="12" />
		</span>
	</div>
	<div class="specializations">
		<span>Specializations</span>
		<input type="text" name="streetwise-specialization0" />
		<input type="text" name="streetwise-specialization1" />
		<input type="text" name="streetwise-specialization2" />
	</div>
</div>

</fieldset>
</div>
</form>
</main>
