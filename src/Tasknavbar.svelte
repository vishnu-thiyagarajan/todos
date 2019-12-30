<script>
	import { toDoObj, rename } from './store.js'
	export let firstButtonName=''
	export let secondButtonName=''
	import Button from './Button.svelte'
	export let position = 'bottom'
	let deleteList = ()=>{toDoObj.update(list =>[...list].filter(item=>!item.selected))}
	let renameList = ()=>{rename.update(value=>!value)}
</script>
<div id='navbar' style='{position}:0;grid-template-columns:{secondButtonName === '' ? '8fr' : '1fr 6fr 1fr' }'>
	{#if secondButtonName == ''}
	<Button buttonName={firstButtonName}/>
	{:else}
	<Button buttonName={firstButtonName} onclick={renameList}/>
	<div></div>
	<Button buttonName={secondButtonName} onclick={deleteList}/>
	{/if}
</div>
<style>
	#navbar{
		display: grid;
		grid-template-columns: 1fr 6fr 1fr;
		grid-gap:5px;
		width: 98.75%;
		position: fixed; 
	}
</style>