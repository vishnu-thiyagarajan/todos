<script>
	import { toDoObj } from './store.js';
	import Navbar from './Listnavbar.svelte'
	import Taskbar from './Tasknavbar.svelte'
	import Listcontainer from './Listcontainer.svelte'
	// let displayObj;
	// const unsubscribe = toDoObj.subscribe(value => displayObj = value);
</script>
<div id="mainGrid">
<!--<Taskbar firstButtonName='Back' secondButtonName='Clear Done' position = 'top'/>-->
<Navbar/>
<Listcontainer />
<Taskbar firstButtonName='Rename' secondButtonName='Delete'/>
<!--<Taskbar firstButtonName='Done' position = 'bottom'/>-->
</div>
{$toDoObj}
<style>
#mainGrid{
	display: grid;
}
</style>