<script>
	import { toDoObj, rename, activeSection } from './store.js'
	export let firstButtonName=''
	export let secondButtonName=''
	import Button from './Button.svelte'
	import Links from './Links.svelte'
	export let position = 'bottom'
	let deleteList = ()=>{toDoObj.update(list =>[...list].filter(item=>!item.selected))}
	let renameList = ()=>{rename.update(value=>!value)}
	let goBack = ()=>activeSection.update(n=>0)
	let clearDone = ()=>console.log('not yet implemented')
</script>
<div id='navbar' style='{position}:0;grid-template-columns:{secondButtonName === '' ? '8fr' : '1fr 6fr 1fr' }'>
	{#if secondButtonName == ''}
	<Button buttonName={firstButtonName}/>
	{:else}
	<Button buttonName={firstButtonName} onclick={firstButtonName=='Back'?goBack:renameList}/>
	{#if position=='top'}
		<Links/>
		{:else}
		<div></div>
	{/if}
	<Button buttonName={secondButtonName} onclick={secondButtonName=='Delete'?deleteList:clearDone}/>
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