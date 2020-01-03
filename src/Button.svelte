<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function onclick(event) {
    dispatch("click", {
      event: event
    });
  }
  export let buttonName = "BUTTON";
</script>

<style>
  button {
    background: white;
    padding: 5px;
    border: 4px solid #494949;
    display: inline-block;
    transition: all 0.4s ease 0s;
  }
  button:focus {
    color: white;
    background: grey;
    border-color: black;
  }
  button:hover {
    color: white;
    background: black;
    border-color: black;
    transition: all 0.4s ease 0s;
  }
</style>

<button on:click={onclick}>{buttonName}</button>
