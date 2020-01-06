<script>
  import { toDoObj, taskObj, activeSection } from "./store.js";
  import { onMount } from "svelte";
  import Navbar from "./Listnavbar.svelte";
  import Taskbar from "./Tasknavbar.svelte";
  import Task from "./Task.svelte";
  let rename = false;
  let promise = setTasks();
  function toggleRename() {
    rename = !rename;
  }
  async function openList(event) {
    let id = event.target.id || event.target.parentNode.id;
    activeSection.update(n => id);
    const response = await fetch('http://localhost:8000/gettask');
    const json = await response.json();
    taskObj.update(list=>json)
  }
  function selectItem(event) {
    let id = event.target.id || event.target.parentNode.id;
    toDoObj.update(list => {
      let todos = [...list];
      for (let todo of todos) {
        if (todo.id == id) todo.selected = todo.selected == true ? false : true;
      }
      return todos;
    });
  }
  async function renameList(event) {
    if (event.code !== "Enter") return;
    let renameId
    toDoObj.update(todos => {
      for (let todo of todos) {
        if (todo.id == event.target.parentNode.firstChild.id) {
          renameId = todo.id
          todo.listname = event.target.value;
          todo.selected = false;
        }
      }
      return todos;
    });
    const res = await window.fetch(`http://localhost:8000/addlist/${renameId}/${event.target.value}`, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
    })
  }
  async function setTasks(){
    const response = await fetch('http://localhost:8000/gettask');
    const json = await response.json();
    taskObj.update(list=>json)
    if (response.ok) return json;
		throw new Error(json);
  }
  function getTasks(listid) {
    let taskInList = [];
    for (let task of $taskObj) {
      if (task.listid === listid) {
        taskInList.push(task.taskname);
      }
    }
    return taskInList;
  }
</script>

<style>
  .container {
    margin: 50px;
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
  }
  .innercontainer {
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
  p {
    flex-wrap: wrap;
    margin-top: 0px;
    align-items: center;
    justify-items: center;
  }
  .selected {
    background-color: grey;
  }
  input {
    width: 130px;
  }
</style>

<Navbar />
<div class="container" id="listcontainer">
  {#each $toDoObj as todo}
    {#if todo.display}
      <div class="innercontainer">
        <div
          id={todo.id}
          class="item"
          class:selected={todo.selected}
          on:click={selectItem}
          on:dblclick={openList}>
          {#await promise}
            <p>...waiting</p>
          {:then}
            {#if getTasks(todo.id).length}
            <Task>
              {#each getTasks(todo.id) as taskname}
                {taskname}
                <br />
              {/each}
            </Task>
            {:else}
              <Task />
            {/if}
          {:catch error}
            <p style="color: red">{error.message}</p>
          {/await}
        </div>
        {#if rename && todo.selected}
          <input type="text" value={todo.listname} on:keyup={renameList} />
        {:else}
          <p>{todo.listname}</p>
        {/if}
      </div>
    {/if}
  {/each}
</div>
<Taskbar
  firstButtonName="Rename"
  secondButtonName="Delete"
  onRename={toggleRename} />
