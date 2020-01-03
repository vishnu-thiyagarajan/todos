<script>
  import { toDoObj, activeSection } from "./store.js";
  import Taskcontainer from "./Taskcontainer.svelte";
  import Listcontainer from "./Listcontainer.svelte";
  $: component = $activeSection === "Lists" ? Listcontainer : Taskcontainer;
</script>

<style>
  #mainGrid {
    display: grid;
  }
</style>

<div id="mainGrid">
  <svelte:component this={component} />
</div>
