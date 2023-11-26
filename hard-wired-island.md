---
title: Hard Wired Island
style: |-
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 1em;
  }
  .left {
    grid-column: 1 / auto;
  }
  .right {
    grid-column: 2 / auto;
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
---
<form>

<fieldset id="multipass" class="left">
<legend>Grand Cross Multipass</legend>
<label for="character-name">Name:</label><input type="text" id="character-name">
<label for="handle">Handle:</label><input type="text" id="handle">
<label for="pronouns">Pronouns:</label><input type="text" id="pronouns">
<label for="player">Player:</label><input type="text" id="player">
</fieldset>

<table id="stats" class="left">
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

<label for="origin" class="left">Origin</label>
<textarea id="origin" rows="3" class="left"></textarea>
<label for="traits" class="left">Traits</label>
<textarea id="traits" rows="3" class="left"></textarea>
<label for="app" class="left">App</label>
<textarea id="app" rows="1" class="left"></textarea>

<table id="specialties" class="left">
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

<div class="right">
<label for="burden">Burden</label>
<input size="2" type="text" name="burden" id="burden">
<label for="cash">Cash</label>
<input size="2" type="text" name="cash" id="cash">
<label for="prep">Prep</label>
<input size="2" type="text" name="prep" id="prep">
</div>

<label class="right" for="occupations">Occupations</label>
<textarea class="right" id="occupations" rows="3"></textarea>
<label class="right" for="talents">Talents</label>
<textarea class="right" id="talents" rows="10"></textarea>
<label class="right" for="assets">Assets</label>
<textarea class="right" id="assets" rows="5"></textarea>
<label class="right" for="augmentations">Augmentations</label>
<textarea class="right" id="augmentations" rows="5"></textarea>

<fieldset id="harm" class="right">
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

<label class="right" for="notes">Notes</label>
<textarea class="right" id="notes" rows="5"></textarea>
</form>
