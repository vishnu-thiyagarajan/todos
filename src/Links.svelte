<script>
  import { activeSection } from "./store.js";
  function activeLists(event) {
    activeSection.update(n => event.target.innerText);
  }
</script>

<style>
  #buttongroup {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-self: center;
    grid-gap: 1px;
  }
  button {
    background: white;
    padding: 5px;
    border: 4px solid #494949 !important;
    display: inline-block;
    transition: all 0.4s ease 0s;
  }
  .active {
    color: white !important;
    background: grey;
    border-color: black !important;
  }
  button:hover {
    color: white !important;
    background: black;
    border-color: black !important;
    transition: all 0.4s ease 0s;
  }
</style>

<div id="buttongroup">
  <button on:click={activeLists} class:active={$activeSection === 'Lists'}>
    Lists
  </button>
  <button on:click={activeLists} class:active={$activeSection === 'Today'}>
    Today
  </button>
  <button on:click={activeLists} class:active={$activeSection === 'Scheduled'}>
    Scheduled
  </button>
</div>
