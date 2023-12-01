---
title: Power Rangers
script: js/hwi.js
style: |-
  @media screen and (min-width:768px) {
  }
  @media print {
    .character-controls {
      display: none;
    }
  }
  .block {
    display: grid;
    break-inside: avoid;
  }
  textarea {
    width: auto;
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
  }
  table input[type="text"] {
    display: table-cell;
    width: calc(100% - 10px);
  }
  input[inputmode="numeric"] {
    width: 2em;
  }
  .stat {
    display: grid;
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
<label for="character-name">Name</label>
<input name="character-name" id="character-name" type="text">
<label for="pronouns">Pronouns</label>
<input name="pronouns" id="pronouns" type="text">
<label for="origin">Origin</label>
<input name="origin" id="origin" type="text">
<label for="role">Role</label>
<input name="role" id="role" type="text">
<label for="level">Level</label>
<input name="level" id="level" type="text" inputmode="numeric" pattern="[0-9]*" value="1">
<label for="description">Description</label>
<textarea name="description" id="description"></textarea>
<label for="languages">Languages</label>
<textarea name="languages" id="languages"></textarea>
</fieldset>

<fieldset id="details">
<label for="influences">Influences</label>
<textarea name="influences" id="influences"></textarea>
<label for="hangups">Hang-ups</label>
<textarea name="hangups" id="hangups"></textarea>
<label for="power">Personal Power</label>
<input name="power" id="power" type="text" inputmode="numeric" pattern="[0-9]*" value="1">
<label for="movement">Movement</label>
<input name="movement" id="movement" type="text" inputmode="numeric" pattern="[0-9]*" value="1">
<label for="health">Health</label>
<input name="health" id="health" type="text" inputmode="numeric" pattern="[0-9]*" value="1">
<label for="damage">Damage</label>
<input name="damage" id="damage" type="text" inputmode="numeric" pattern="[0-9]*" value="0">
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
  <td><input type="text" name="attack0" aria-labelledby="attack-name"></td>
  <td><input type="text" name="attack0" aria-labelledby="attack-range"></td>
  <td><input type="text" name="attack0" aria-labelledby="attack-attack"></td>
  <td><input type="text" name="attack0" aria-labelledby="attack-effects"></td>
  <td><input type="text" name="attack0" aria-labelledby="attack-notes"></td>
</tr>
<tr>
  <td><input type="text" name="attack1" aria-labelledby="attack-name"></td>
  <td><input type="text" name="attack1" aria-labelledby="attack-range"></td>
  <td><input type="text" name="attack1" aria-labelledby="attack-attack"></td>
  <td><input type="text" name="attack1" aria-labelledby="attack-effects"></td>
  <td><input type="text" name="attack1" aria-labelledby="attack-notes"></td>
</tr>
<tr>
  <td><input type="text" name="attack2" aria-labelledby="attack-name"></td>
  <td><input type="text" name="attack2" aria-labelledby="attack-range"></td>
  <td><input type="text" name="attack2" aria-labelledby="attack-attack"></td>
  <td><input type="text" name="attack2" aria-labelledby="attack-effects"></td>
  <td><input type="text" name="attack2" aria-labelledby="attack-notes"></td>
</tr>
<tr>
  <td><input type="text" name="attack3" aria-labelledby="attack-name"></td>
  <td><input type="text" name="attack3" aria-labelledby="attack-range"></td>
  <td><input type="text" name="attack3" aria-labelledby="attack-attack"></td>
  <td><input type="text" name="attack3" aria-labelledby="attack-effects"></td>
  <td><input type="text" name="attack3" aria-labelledby="attack-notes"></td>
</tr>
<tr>
  <td><input type="text" name="attack4" aria-labelledby="attack-name"></td>
  <td><input type="text" name="attack4" aria-labelledby="attack-range"></td>
  <td><input type="text" name="attack4" aria-labelledby="attack-attack"></td>
  <td><input type="text" name="attack4" aria-labelledby="attack-effects"></td>
  <td><input type="text" name="attack4" aria-labelledby="attack-notes"></td>
</tr>
</table>
</fieldset>

<fieldset id="strength-block" class="stat">
<legend><label for="strength">Strength</label> <input type="text" inputmode="numeric" pattern="[0-9]*" id="strength" name="strength"></legend>
<div class="row"><label for="toughness">Toughness</label> <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="toughness"></div>
<div class="row">
  <span>10 + </span>
  <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="toughness-essence">
  <label for="toughness-essence">Essence</label>
  <span>+</span>
  <input type="text" inputmode="numeric" pattern="[0-9]*" name="toughness-perks" id="toughness-perks">
  <label for="toughness-perks">Perks</label>
  <span>+</span>
  <input type="text" inputmode="numeric" pattern="[0-9]*" name="toughness-armor" id="toughness-armor">
  <label for="toughness-armor">Armor</label>
  <span>=</span>
  <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="toughness-morphed">
  <label for="toughness-morphed">Morphed</label>
</div>
</fieldset>

<fieldset id="speed-block" class="stat">
<legend><label for="speed">Speed</label> <input type="text" inputmode="numeric" pattern="[0-9]*" id="speed" name="speed"></legend>
<div class="row"><label for="evasion">Evasion</label> <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="evasion"></div>
<div class="row">
  <span>10 + </span>
  <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="evasion-essence">
  <label for="evasion-essence">Essence</label>
  <span>+</span>
  <input type="text" inputmode="numeric" pattern="[0-9]*" name="evasion-perks" id="evasion-perks">
  <label for="evasion-perks">Perks</label>
  <span>+</span>
  <input type="text" inputmode="numeric" pattern="[0-9]*" name="evasion-armor" id="evasion-armor">
  <label for="evasion-armor">Armor</label>
  <span>=</span>
  <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="evasion-morphed">
  <label for="evasion-morphed">Morphed</label>
</div>
</fieldset>

<fieldset id="smarts-block" class="stat">
<legend><label for="smarts">Smarts</label> <input type="text" inputmode="numeric" pattern="[0-9]*" id="smarts" name="smarts"></legend>
<div class="row"><label for="willpower">Willpower</label> <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="willpower"></div>
<div class="row">
  <span>10 + </span>
  <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="willpower-essence">
  <label for="willpower-essence">Essence</label>
  <span>+</span>
  <input type="text" inputmode="numeric" pattern="[0-9]*" name="willpower-perks" id="willpower-perks">
  <label for="willpower-perks">Perks</label>
  <span>+</span>
  <input type="text" inputmode="numeric" pattern="[0-9]*" name="willpower-armor" id="willpower-armor">
  <label for="willpower-armor">Armor</label>
  <span>=</span>
  <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="willpower-morphed">
  <label for="willpower-morphed">Morphed</label>
</div>
</fieldset>

<fieldset id="social-block" class="stat">
<legend><label for="social">Social</label> <input type="text" inputmode="numeric" pattern="[0-9]*" id="social" name="social"></legend>
<div class="row"><label for="cleverness">Cleverness</label> <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="cleverness"></div>
<div class="row">
  <span>10 + </span>
  <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="cleverness-essence">
  <label for="cleverness-essence">Essence</label>
  <span>+</span>
  <input type="text" inputmode="numeric" pattern="[0-9]*" name="cleverness-perks" id="cleverness-perks">
  <label for="cleverness-perks">Perks</label>
  <span>+</span>
  <input type="text" inputmode="numeric" pattern="[0-9]*" name="cleverness-armor" id="cleverness-armor">
  <label for="cleverness-armor">Armor</label>
  <span>=</span>
  <input readonly type="text" inputmode="numeric" pattern="[0-9]*" id="cleverness-morphed">
  <label for="cleverness-morphed">Morphed</label>
</div>
</fieldset>
</form>
</main>
