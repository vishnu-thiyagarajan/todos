<script>
	import { toDoObj, activeSection } from './store.js';
	import Navbar from './Listnavbar.svelte'
	import Taskbar from './Tasknavbar.svelte'
	import Taskcontainer from './Taskcontainer.svelte'
	import Listcontainer from './Listcontainer.svelte'
</script>
{#if $activeSection=='Lists' }
	<div id="mainGrid">
	<Navbar/>
	<Listcontainer />
	<Taskbar firstButtonName='Rename' secondButtonName='Delete'/>
	</div>
{/if}
{#if $activeSection!='Lists' }
	<div id="mainGrid">
	<Taskbar firstButtonName='Back' secondButtonName='Clear Done' position = 'top'/>
	<Taskcontainer/>
	</div>
{/if}
<style>
#mainGrid{
	display: grid;
}
</style>