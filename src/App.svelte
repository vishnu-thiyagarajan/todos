<script>
	import { toDoObj, activeSection } from './store.js';
	import Navbar from './Listnavbar.svelte'
	import Taskbar from './Tasknavbar.svelte'
	import Listcontainer from './Listcontainer.svelte'
</script>
{#if !$activeSection }
	<div id="mainGrid">
	<Navbar/>
	<Listcontainer />
	<Taskbar firstButtonName='Rename' secondButtonName='Delete'/>
	</div>
{/if}
{#if $activeSection }
	<div id="mainGrid">
	<Taskbar firstButtonName='Back' secondButtonName='Clear Done' position = 'top'/>
	<Taskbar firstButtonName='Done' position = 'bottom'/>
	</div>
{/if}
<style>
#mainGrid{
	display: grid;
}
</style>