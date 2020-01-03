<script>
  import { toDoObj, taskObj, activeSection } from './store.js'
	import Navbar from './Listnavbar.svelte'
  import Taskbar from './Tasknavbar.svelte'
  import Task from './Task.svelte'
  let rename = false
  function toggleRename(){rename=!rename}
  function openList(event){
    let id = event.target.id || event.target.parentNode.id
    activeSection.update(n=>id)
  }
	function selectItem(event){
    let id = event.target.id || event.target.parentNode.id
    toDoObj.update(list => {
      let todos = [...list]
      for (let todo of todos){
        if (todo.id == id) todo.selected = todo.selected == true ? false : true
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
  }
  function getTasks(listid){
    let taskInList = []
    for (let task of $taskObj){
      if (task.listid === listid){
          taskInList.push(task.taskname)
      }
    }
    return taskInList
  }
</script>
<Navbar/>
<div class='container' id='listcontainer'>
{#each $toDoObj as todo}
  {#if todo.display}
    <div class='innercontainer'>
      <div id={todo.id} class='item' class:selected={todo.selected} on:click={selectItem} on:dblclick={openList}>
      {#if getTasks(todo.id).length}
        <Task>
          {#each getTasks(todo.id) as taskname}
            {taskname}<br>
          {/each}
        </Task>
      {:else}
        <Task/>
      {/if}
      </div>
      {#if rename && todo.selected}
        <input type="text" value={todo.listname} on:keyup={renameList}/>
      {:else}
        <p>{todo.listname}</p>
      {/if}
    </div>
  {/if}
{/each}
</div>
<Taskbar firstButtonName='Rename' secondButtonName='Delete' onRename={toggleRename}/>
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