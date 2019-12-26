<script>
	import Button from './Button.svelte'
	import Links from './Links.svelte'
</script>
<div id='navbar'>
<Button buttonName="NewList"/>
	<Links />
<Button buttonName="Search"/>
<Button buttonName="Select"/>
</div>
<style>
	#navbar{
		display: grid;
		grid-template-columns: 1fr 5fr 1fr 1fr;
		grid-gap:5px;
		top: 0;
		width: 97%;
		position: fixed; 
	}
</style>