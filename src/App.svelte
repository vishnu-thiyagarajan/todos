<script>
  import { onMount } from "svelte";
  import { toDoObj, activeSection } from "./store.js";
  import Taskcontainer from "./Taskcontainer.svelte";
  import Listcontainer from "./Listcontainer.svelte";
  $: component = $activeSection === "Lists" ? Listcontainer : Taskcontainer;
  onMount(async function() {
    const response = await fetch('http://localhost:8000/getlist');
    const json = await response.json();
    toDoObj.update(list=>json)
  });
</script>

<style>
  #mainGrid {
    display: grid;
  }
</style>

<div id="mainGrid">
  <svelte:component this={component} />
</div>
