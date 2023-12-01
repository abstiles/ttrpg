---
title: Hard Wired Island
script: js/hwi.js
style: |-
  @media screen and (min-width:768px) {
    form {
      grid-template-columns: 1fr 1fr;
      column-gap: 1em;
    }
  }
  @media print {
    form {
      grid-template-columns: 1fr 1fr;
      column-gap: 1em;
    }
    .character-controls {
      display: none;
    }
  }
  @page {
    size: A4;
  }
  form {
    display: grid;
  }
  .block {
    display: grid;
    break-inside: avoid;
  }
  #multipass {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  #multipass label {
    margin-right: 1em;
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
  #specialties input[type="text"] {
    display: table-cell;
    width: calc(100% - 10px);
  }
  #status {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: column;
  }
  #status input {
    font-family: var(--sans);
    font-size: 18pt;
  }
  #harm {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.5em;
  }
  textarea::placeholder {
    text-align: right;
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
---
<main>
<input type="text" id="character" placeholder="New Character" autofocus>

<div class="character-controls">
<button id="new-btn" disabled>New Character</button>
<button id="delete-btn" disabled>Delete Character</button>
<select id="load-character" required>
<option selected disabled hidden value="">Load Character</option>
</select>
<button id="share-btn" disabled>Share</button>
</div>

<form id="character-sheet">
<div class="column">

<fieldset id="multipass">
<legend>Grand Cross Multipass</legend>
<label for="character-name">Name:</label><input type="text" name="character-name">
<label for="handle">Handle:</label><input type="text" name="handle">
<label for="pronouns">Pronouns:</label><input type="text" name="pronouns">
<label for="player">Player:</label><input type="text" name="player">
</fieldset>

<table id="stats">
  <tr>
  <td></td>
  <th id="stat0" scope="col">0</th>
  <th id="stat1" scope="col">+1</th>
  <th id="stat2" scope="col">+2</th>
  <th id="stat3" scope="col">+3</th>
  <th id="stat-defense" scope="col">Defense</th>
  </tr>
  <tr>
  <th id="stat-cool" scope="row">Cool</th>
  <td><input type="radio" name="cool" value="0" aria-labelledby="stat-cool stat0"></td>
  <td><input type="radio" name="cool" value="1" aria-labelledby="stat-cool stat1"></td>
  <td><input type="radio" name="cool" value="2" aria-labelledby="stat-cool stat2"></td>
  <td><input type="radio" name="cool" value="3" aria-labelledby="stat-cool stat3"></td>
  <td><input size="10" type="text" id="cool-defense" aria-labelledby="stat-cool stat-defense"></td>
  </tr>
  <tr>
  <th id="stat-clever" scope="row">Clever</th>
  <td><input type="radio" name="clever" value="0" aria-labelledby="stat-clever stat0"></td>
  <td><input type="radio" name="clever" value="1" aria-labelledby="stat-clever stat1"></td>
  <td><input type="radio" name="clever" value="2" aria-labelledby="stat-clever stat2"></td>
  <td><input type="radio" name="clever" value="3" aria-labelledby="stat-clever stat3"></td>
  <td><input size="10" type="text" id="clever-defense" aria-labelledby="stat-clever stat-defense"></td>
  </tr>
  <tr>
  <th id="stat-tough" scope="row">Tough</th>
  <td><input type="radio" name="tough" value="0" aria-labelledby="stat-tough stat0"></td>
  <td><input type="radio" name="tough" value="1" aria-labelledby="stat-tough stat1"></td>
  <td><input type="radio" name="tough" value="2" aria-labelledby="stat-tough stat2"></td>
  <td><input type="radio" name="tough" value="3" aria-labelledby="stat-tough stat3"></td>
  <td><input size="10" type="text" id="tough-defense" aria-labelledby="stat-tough stat-defense"></td>
  </tr>
  <tr>
  <th id="stat-quick" scope="row">Quick</th>
  <td><input type="radio" name="quick" value="0" aria-labelledby="stat-quick stat0"></td>
  <td><input type="radio" name="quick" value="1" aria-labelledby="stat-quick stat1"></td>
  <td><input type="radio" name="quick" value="2" aria-labelledby="stat-quick stat2"></td>
  <td><input type="radio" name="quick" value="3" aria-labelledby="stat-quick stat3"></td>
  <td><input size="10" type="text" id="quick-defense" aria-labelledby="stat-quick stat-defense"></td>
  </tr>
</table>

<div class="block">
<label for="origin">Origin</label>
<textarea name="origin" rows="3"></textarea>
<label for="traits">Traits</label>
<textarea name="traits" rows="3"></textarea>
<label for="app">App</label>
<textarea name="app" rows="1"></textarea>
</div>

<table id="specialties">
<tr>
<th scope="col" id="specialty-name">Specialities</th>
<th scope="col" id="specialty-level1">+1</th>
<th scope="col" id="specialty-level2">+2</th>
<th scope="col" id="specialty-level3">+3</th>
</tr>
<tr>
  <td><input size="20" type="text" name="specialty0-name" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty0" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty0" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty0" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" name="specialty1-name" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty1" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty1" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty1" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" name="specialty2-name" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty2" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty2" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty2" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" name="specialty3-name" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty3" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty3" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty3" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" name="specialty4-name" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty4" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty4" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty4" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" name="specialty5-name" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty5" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty5" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty5" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" name="specialty6-name" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty6" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty6" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty6" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" name="specialty7-name" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty7" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty7" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty7" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" name="specialty8-name" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty8" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty8" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty8" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" name="specialty9-name" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty9" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty9" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty9" value="3" aria-labelledby="specialty-level3"></td>
</tr>
</table>

</div> <!-- end column -->
<div class="column">

<div id="status">
<label for="burden">Burden</label>
<input size="2" type="text" name="burden">
<label for="cash">Cash</label>
<input size="2" type="text" name="cash">
<label for="prep">Prep</label>
<input size="2" type="text" name="prep">
</div>

<div class="block">
<label for="occupations">Occupations</label>
<textarea name="occupations" rows="3"></textarea>
</div>
<div class="block">
<label for="talents">Talents</label>
<textarea name="talents" rows="10"></textarea>
</div>
<div class="block">
<label for="assets">Assets</label>
<textarea name="assets" rows="5"></textarea>
</div>
<div class="block">
<label for="augmentations">Augmentations</label>
<textarea name="augmentations" rows="5"></textarea>
</div>

<fieldset id="harm">
<legend>Harm</legend>
<input type="checkbox" name="harm-1" value="1">
<label for="harm-1">Minor Injury</label>
<input type="checkbox" name="harm-2" value="2">
<label for="harm-2">Minor Injury</label>
<input type="checkbox" name="harm-3" value="3">
<label for="harm-3">Harm</label>
<input type="checkbox" name="harm-4" value="4">
<label for="harm-4">Harm</label>
<input type="checkbox" name="harm-5" value="5">
<label for="harm-5">Serious Injury</label>
<input type="checkbox" name="harm-6" value="6">
<label for="harm-6">Incapacitated</label>
</fieldset>

<div class="block">
<label for="notes">Notes</label>
<textarea name="notes" rows="5"></textarea>
</div>

</div> <!-- end column -->
</form>
</main>
