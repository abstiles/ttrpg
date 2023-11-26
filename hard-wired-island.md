---
title: Hard Wired Island
style: |-
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 1em;
  }
  .block {
    display: grid;
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
    font-family: var(--serif);
    font-size: 12pt;
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
---
<form>

<fieldset id="multipass">
<legend>Grand Cross Multipass</legend>
<label for="character-name">Name:</label><input type="text" id="character-name">
<label for="handle">Handle:</label><input type="text" id="handle">
<label for="pronouns">Pronouns:</label><input type="text" id="pronouns">
<label for="player">Player:</label><input type="text" id="player">
</fieldset>

<div id="status">
<label for="burden">Burden</label>
<input size="2" type="text" name="burden" id="burden">
<label for="cash">Cash</label>
<input size="2" type="text" name="cash" id="cash">
<label for="prep">Prep</label>
<input size="2" type="text" name="prep" id="prep">
</div>

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
  <td><input size="10" type="text" name="cool" aria-labelledby="stat-cool stat-defense"></td>
  </tr>
  <tr>
  <th id="stat-clever" scope="row">Clever</th>
  <td><input type="radio" name="clever" value="0" aria-labelledby="stat-clever stat0"></td>
  <td><input type="radio" name="clever" value="1" aria-labelledby="stat-clever stat1"></td>
  <td><input type="radio" name="clever" value="2" aria-labelledby="stat-clever stat2"></td>
  <td><input type="radio" name="clever" value="3" aria-labelledby="stat-clever stat3"></td>
  <td><input size="10" type="text" name="clever" aria-labelledby="stat-clever stat-defense"></td>
  </tr>
  <tr>
  <th id="stat-tough" scope="row">Tough</th>
  <td><input type="radio" name="tough" value="0" aria-labelledby="stat-tough stat0"></td>
  <td><input type="radio" name="tough" value="1" aria-labelledby="stat-tough stat1"></td>
  <td><input type="radio" name="tough" value="2" aria-labelledby="stat-tough stat2"></td>
  <td><input type="radio" name="tough" value="3" aria-labelledby="stat-tough stat3"></td>
  <td><input size="10" type="text" name="tough" aria-labelledby="stat-tough stat-defense"></td>
  </tr>
  <tr>
  <th id="stat-quick" scope="row">Quick</th>
  <td><input type="radio" name="quick" value="0" aria-labelledby="stat-quick stat0"></td>
  <td><input type="radio" name="quick" value="1" aria-labelledby="stat-quick stat1"></td>
  <td><input type="radio" name="quick" value="2" aria-labelledby="stat-quick stat2"></td>
  <td><input type="radio" name="quick" value="3" aria-labelledby="stat-quick stat3"></td>
  <td><input size="10" type="text" name="quick" aria-labelledby="stat-quick stat-defense"></td>
  </tr>
</table>

<div class="block">
<label for="origin">Origin</label>
<textarea id="origin" rows="3"></textarea>
<label for="traits">Traits</label>
<textarea id="traits" rows="3"></textarea>
<label for="app">App</label>
<textarea id="app" rows="1"></textarea>
</div>

<table id="specialties">
<tr>
<th scope="col" id="specialty-name">Specialities</th>
<th scope="col" id="specialty-level1">+1</th>
<th scope="col" id="specialty-level2">+2</th>
<th scope="col" id="specialty-level3">+3</th>
</tr>
<tr>
  <td><input size="20" type="text" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty0" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty0" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty0" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty1" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty1" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty1" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty2" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty2" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty2" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty3" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty3" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty3" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty4" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty4" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty4" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty5" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty5" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty5" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty6" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty6" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty6" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty7" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty7" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty7" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty8" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty8" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty8" value="3" aria-labelledby="specialty-level3"></td>
</tr>
<tr>
  <td><input size="20" type="text" aria-labelledby="specialty-name"></td>
  <td><input type="radio" name="specialty9" value="1" aria-labelledby="specialty-level1"></td>
  <td><input type="radio" name="specialty9" value="2" aria-labelledby="specialty-level2"></td>
  <td><input type="radio" name="specialty9" value="3" aria-labelledby="specialty-level3"></td>
</tr>
</table>

<div class="block">
<label for="occupations">Occupations</label>
<textarea id="occupations" rows="3"></textarea>
</div>
<div class="block">
<label for="talents">Talents</label>
<textarea id="talents" rows="10"></textarea>
</div>
<div class="block">
<label for="assets">Assets</label>
<textarea id="assets" rows="5"></textarea>
</div>
<div class="block">
<label for="augmentations">Augmentations</label>
<textarea id="augmentations" rows="5"></textarea>
</div>

<fieldset id="harm">
<legend>Harm</legend>
<input type="checkbox" id="harm-1" value="1">
<label for="harm-1">Minor Injury</label>
<input type="checkbox" id="harm-2" value="2">
<label for="harm-2">Minor Injury</label>
<input type="checkbox" id="harm-3" value="3">
<label for="harm-3">Harm</label>
<input type="checkbox" id="harm-4" value="4">
<label for="harm-4">Harm</label>
<input type="checkbox" id="harm-5" value="5">
<label for="harm-5">Serious Injurty</label>
<input type="checkbox" id="harm-6" value="6">
<label for="harm-6">Incapacitated</label>
</fieldset>

<div class="block">
<label for="notes">Notes</label>
<textarea id="notes" rows="5"></textarea>
</div>
</form>
