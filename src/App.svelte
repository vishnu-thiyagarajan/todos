<script>
	import { toDoObj, activeSection } from './store.js';
	import Navbar from './Listnavbar.svelte'
	import Taskbar from './Tasknavbar.svelte'
	import Taskcontainer from './Taskcontainer.svelte'
	import Listcontainer from './Listcontainer.svelte'
</script>
<div id="mainGrid">
{#if $activeSection==='Lists' }
	<Listcontainer />
{/if}
{#if $activeSection==='Today' }
	<Taskcontainer/>
{/if}
{#if $activeSection==='Scheduled' }
	<Taskcontainer/>
{/if}
{#if !isNaN(parseInt($activeSection)) }
	<Taskcontainer/>
{/if}
</div>
<style>
#mainGrid{
	display: grid;
}
</style>