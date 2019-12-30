<script>
	import { toDoObj,rename } from './store.js'
	function selectItem(event){
    toDoObj.update(list => {
      let todos = [...list]
      for (let todo of todos){
        if (todo.id == event.target.id) todo.selected = todo.selected == true ? false : true
      }
      return todos
    })
  }
  function renameList(event){
    if (event.code!='Enter') return
    toDoObj.update(list => {
      let todos = [...list]
      for (let todo of todos){
        if (todo.id == event.target.parentNode.firstChild.id){
          todo.listname = event.target.value
          todo.selected = false
        }
      }
      return todos
    })
    rename.update(value=>!value)
  }
</script>
<div class='container' id='listcontainer'>
{#each $toDoObj as todo}
  {#if todo.display}
    <div class='innercontainer'>
      <div id={todo.id} class='item' class:selected={todo.selected} on:click={selectItem}>
      no tasks
      </div>
      {#if $rename && todo.selected}
        <input type="text" value={todo.listname} on:keyup={renameList}/>
      {:else}
        <p>{todo.listname}</p>
      {/if}
    </div>
  {/if}
{/each}
</div>
<style>
.container {
	margin:50px;
  margin-top:70px;
  display: flex;
  flex-wrap: wrap;
}
.innercontainer{
  display: flex;
  justify-content: space-around;
  color: black;
  margin: 0px;
  width: 150px;
  text-align: center;
  font-size: 18px;
  position: relative;
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
  position: relative;
}
p{
  flex-wrap: wrap;
  margin-top: 0px;
  align-items: center;
  justify-items: center;
}
.selected{
  background-color: grey;
}
input{
  width:130px;
}
</style>