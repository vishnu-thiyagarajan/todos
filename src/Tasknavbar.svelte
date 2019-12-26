<script>
	export let firstButtonName=''
	export let secondButtonName=''
	import Button from './Button.svelte'
</script>
<div id='navbar'>
<Button buttonName={firstButtonName}/>
<div></div>
<Button buttonName={secondButtonName}/>
</div>
<style>
	#navbar{
		display: grid;
		grid-template-columns: 1fr 6fr 1fr;
		grid-gap:5px;
		bottom: 0;
		width: 97%;
		position: fixed; 
	}
</style>