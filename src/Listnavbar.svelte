<script>
	import Button from './Button.svelte'
	import Links from './Links.svelte'
	export let onNewList = ()=>console.log('not yet implemented')
	export let onSearch = ()=>console.log('not yet implemented')
</script>
<div id='navbar'>
<Button buttonName="NewList" onclick={onNewList} />
	<Links />
<Button buttonName="Search" onclick={onSearch}/>
<!-- <Button buttonName="Select"/> -->
</div>
<style>
	#navbar{
		z-index:1;
		display: grid;
		grid-template-columns: 1fr 6fr 1fr;
		grid-gap:5px;
		top:0;
		width: 98.75%;
		position: fixed; 
	}
</style>