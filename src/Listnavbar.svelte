<script>
	import { toDoObj } from './store.js'
	import Button from './Button.svelte'
	import Links from './Links.svelte'
	let newListVisible = false, searchVisible = false , listname = '', searchName = ''
	const focus = event => event.focus()
	const onNewList = ()=>{searchVisible = false; newListVisible = newListVisible ? false : true}
	const onSearch = ()=>{newListVisible = false; searchVisible = searchVisible ? false : true}
	function addList(event){
		if(event.code!='Enter') return
		toDoObj.update(list => [...list, {'id':list.length?list[list.length-1]['id']+1:0,
								listname:listname,
								selected:false,
								display:true}])
		listname = ''
	}
	function searchList(event){
		if (!searchVisible) return
		toDoObj.update(list =>{
			let todos = [...list]
			for (let todo of todos){
				if (!todo.listname.toLowerCase().includes(searchName.toLowerCase())) todo.display=false
				if (searchName == '') todo.display=true
			}
			return todos
		})
		if(event.code=='Enter') searchName = ''
	}
</script>
<div id='navbar'>
<Button buttonName="NewList" onclick={onNewList} />
	<Links />
<Button buttonName="Search" onclick={onSearch}/>
</div>
{#if newListVisible}
<div id='inputbar'>
	<input in:focus id='textbox' type="text"
  placeholder="List Name..." 
  on:keyup={addList} bind:value={listname}/>
</div>
{/if}
{#if searchVisible}
<div id='inputbar'>
	<input in:focus id='srchbox' type="search"
  placeholder="Search..." 
  on:keyup={searchList} bind:value={searchName}/>
</div>
{/if}
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
	#inputbar{
		z-index:1;
		display: grid;
        justify-items: center;
        grid-template-columns: 1fr;
		width: 98.75%;
		padding-top: 10px;
		position: fixed;
		margin-top: 30px;
	}
	input {
		height: 25px;
		border: 3px solid #494949 !important;
		width: 50%;
		outline: none;
	}
</style>