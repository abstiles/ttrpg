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
---
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
</form>
</main>
