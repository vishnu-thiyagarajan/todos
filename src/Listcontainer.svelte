<script>
	//import Button from './Button.svelte'
	import { toDoObj } from './store.js'
	function selectItem(event){
		let itemStyle = event.target.style
		itemStyle.backgroundColor = itemStyle.backgroundColor === "grey" ? 'white': 'grey'
	}
</script>
<div class='container' id='listcontainer'>
{#each $toDoObj as todo}
	<div class='item' on:click={selectItem}>
		{todo.listname}
	</div>
{/each}
</div>
<style>
	.container {
	margin:50px;
  display: flex;
  flex-wrap: wrap;
}
.item {
  border: 2px solid #494949;
	padding: 1rem;
  background-color: white;
  justify-content: space-around;
  color: black;
  margin: 10px;
  height: 150px;
  width: 100px;
  text-align: left;
  font-size: 18px;
  margin-bottom: 30px;
  position: relative;
}
</style>