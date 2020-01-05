<script>
  import { toDoObj } from "./store.js";
  import Button from "./Button.svelte";
  import Links from "./Links.svelte";
  let newListVisible = false,
    searchVisible = false,
    listname = "",
    searchName = "";
  const focus = event => event.focus();
  const onNewList = event => {
    searchVisible = false;
    newListVisible = !newListVisible;
  };
  const onSearch = () => {
    newListVisible = false;
    searchVisible = !searchVisible;
  };
  async function addList(event) {
    if (event.code != "Enter" || listname == "") return;
    let listid
    toDoObj.update(list =>{
      listid = list.length ? parseInt(list[list.length - 1]["id"]) + 1 : 0
      return [
      ...list,
      {
        id: listid,
        listname: listname,
        selected: false,
        display: true
      }
    ]});
    const response = await window.fetch(`http://localhost:8000/addlist/${listid}/${listname}`, {
    method: 'POST',
    body: {},
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    listname = "";
  }
  function searchList(event) {
    if (!searchVisible) return;
    toDoObj.update(list => {
      let todos = [...list];
      for (let todo of todos) {
        if (!todo.listname.toLowerCase().includes(searchName.toLowerCase()))
          todo.display = false;
        if (searchName == "") todo.display = true;
      }
      return todos;
    });
    if (event.code == "Enter") searchName = "";
  }
</script>

<style>
  #navbar {
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    grid-gap: 5px;
    top: 0;
    width: 98.75%;
    position: fixed;
  }
  #inputbar {
    z-index: 1;
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

<div id="navbar">
  <Button buttonName="NewList" on:click={onNewList} />
  <Links />
  <Button buttonName="Search" on:click={onSearch} />
</div>
{#if newListVisible}
  <div id="inputbar">
    <input
      in:focus
      id="textbox"
      type="text"
      placeholder="List Name..."
      on:keyup={addList}
      bind:value={listname} />
  </div>
{/if}
{#if searchVisible}
  <div id="inputbar">
    <input
      in:focus
      id="srchbox"
      type="search"
      placeholder="Search..."
      on:keyup={searchList}
      bind:value={searchName} />
  </div>
{/if}
