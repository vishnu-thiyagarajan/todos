<script>
  import { toDoObj, activeSection, taskObj } from "./store.js";
  export let firstButtonName = "";
  export let secondButtonName = "";
  export let onClearDone = () => true;
  export let onDone = () => true;
  export let onRename = () => true;
  import Button from "./Button.svelte";
  import Links from "./Links.svelte";
  export let position = "bottom";
  let deleteList = () => {
    toDoObj.update(list => list.filter(item => !item.selected));
  };
  let goBack = () => activeSection.update(n => "Lists");
</script>

<style>
  #navbar {
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    grid-gap: 5px;
    width: 98.75%;
    position: fixed;
  }
</style>

<div
  id="navbar"
  style="{position}:0;grid-template-columns:{secondButtonName === '' ? '8fr' : '1fr 6fr 1fr'}">
  {#if secondButtonName == ''}
    <Button buttonName={firstButtonName} on:click={onDone} />
  {:else}
    <Button
      buttonName={firstButtonName}
      on:click={firstButtonName == 'Back' ? goBack : onRename} />
    {#if position == 'top' && isNaN(parseInt($activeSection))}
      <Links />
    {:else}
      <div />
    {/if}
    <Button
      buttonName={secondButtonName}
      on:click={secondButtonName == 'Delete' ? deleteList : onClearDone} />
  {/if}
</div>
