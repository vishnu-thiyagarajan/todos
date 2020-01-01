<script>
	import { toDoObj, activeSection } from './store.js';
	import Navbar from './Listnavbar.svelte'
	import Taskbar from './Tasknavbar.svelte'
	import Taskcontainer from './Taskcontainer.svelte'
	import Listcontainer from './Listcontainer.svelte'
</script>
{#if $activeSection==='Lists' }
	<div id="mainGrid">
	<Listcontainer />
	</div>
{/if}
{#if $activeSection==='Today' }
	<div id="mainGrid">
	<Taskcontainer/>
	</div>
{/if}
{#if $activeSection==='Scheduled' }
	<div id="mainGrid">
	<Taskcontainer/>
	</div>
{/if}
{#if !isNaN(parseInt($activeSection)) }
	<div id="mainGrid">
	<Taskcontainer/>
	</div>
{/if}
<style>
#mainGrid{
	display: grid;
}
</style>