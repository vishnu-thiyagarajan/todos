<script>
  import { toDoObj, activeSection, taskObj } from "./store.js";
  import Button from "./Button.svelte";
  import Taskbar from "./Tasknavbar.svelte";
  $: taskObjDup = $taskObj
  let addTaskFlag = false,
    showDone = false;
  let newTaskName = "";
  const toggleAddTask = () => (addTaskFlag = !addTaskFlag);
  const focus = event => event.focus();
  let editableTask = NaN;
  let doneCount = 0
  $:$activeSection,doneCount = countCompleted()
  const toggleDone = () => {
    showDone = !showDone;
  };
  function countCompleted(){
    let doneCount = 0
    for (let task of $taskObj) {
        if (checkCond(task) && task.completed) doneCount++;
    }
    return doneCount
  }
  async function clearDone() {
    let taskids = []
    taskObj.update(tasks =>
      tasks.filter(item =>{ 
        if (checkCond(item) && item.completed) { taskids.push(item.id); return false}
        return true})
    );
    const res = await window.fetch(`http://localhost:8000/deletetask/${taskids.join(',')}`, {
    method: 'DELETE',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
      }
    })
    doneCount = 0
  }
  function showDoneButton(event) {
    editableTask = event.target.parentNode.id
    for (let task of $taskObj){
      if (task.id === editableTask) task.completed = event.target.checked
    }
    closeEditTask()
    if (event.target.checked) doneCount++;
    if (!event.target.checked) doneCount--;
  }
  function openEditTask(event) {
    editableTask = event.target.id || event.target.parentNode.id;
  }
  async function closeEditTask(){
    let obj = $taskObj.filter(task=>task.id===editableTask)[0]
    const res = await window.fetch('http://localhost:8000/updatetask', {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        }
      })
    editableTask = NaN
  };
  function addTask(event) {
    if (event.code != "Enter" || newTaskName == "") return;
    let newTask = {
        id: $taskObj.length ? parseInt($taskObj[$taskObj.length - 1]["id"]) + 1 : 0,
        taskname: newTaskName,
        notes: "",
        priority: "None",
        duedate: "",
        completed: false,
        listid: parseInt($activeSection)
      }
    taskObj.update(tasks =>[...tasks, newTask])
    createTask(newTask) 
    newTaskName = "";
    addTaskFlag = false;
  }
  async function createTask (newtask){
    const res = await window.fetch(`http://localhost:8000/addtask`, {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json',
        }
      })
  }
  async function deleteTask(event) {
    let taskid
    taskObj.update(tasks =>
      tasks.filter(item => {if (item.id === editableTask) taskid = item.id; return item.id !== editableTask})
    );
    const res = await window.fetch(`http://localhost:8000/deletetask/${taskid}`, {
    method: 'DELETE',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
      }
    })
    editableTask = NaN;
  }
  function checkCond(task) {
    if ($activeSection === "Today") {
      return task.duedate === new Date().toISOString().slice(0, 10)
        ? true
        : false;
    }
    if ($activeSection === "Scheduled")
      return task.duedate.length ? true : false;
    return task.listid === $activeSection;
  }
  let detailDisplay =
    $activeSection === "Today" || $activeSection === "Scheduled" ? true : false;
  function getListName(id) {
    for (let list of $toDoObj) {
      if (id === list.id) return list.listname;
    }
  }
</script>

<style>
  .taskcontainer {
    margin: 50px;
    margin-top: 70px;
    display: grid;
    grid-gap: 10px;
  }
  .task {
    color: black;
    height: 30px;
    padding: 10px;
    align-content: center;
    background-color: white;
    border: 2px solid black;
    display: grid;
    grid-template-columns: 1fr 9fr;
  }
  .gridBreak {
    grid-template-columns: 1fr 5fr 2fr 2fr;
  }
  input[type="checkbox"] {
    zoom: 3;
    align-self: center;
    justify-self: center;
    margin: 0;
  }
  input[type="text"] {
    height: 35px;
    margin-top: 6px;
    border: 2px solid black;
    outline: none;
  }
  .notes {
    grid-area: notes;
  }
  .priority {
    grid-area: priority;
  }
  .duedate {
    grid-area: duedate;
  }
  .delete {
    grid-area: delete;
    display: flex;
    justify-content: space-between;
  }

  .grid-container {
    display: grid;
    grid-template-areas:
      "notes priority"
      "notes duedate"
      "notes delete";
    grid-gap: 10px;
    padding: 10px;
  }

  .grid-container > div {
    background-color: white;
    text-align: left;
  }
  select,
  input,
  textarea {
    width: 99%;
    border: 2px solid black;
  }
</style>

<Taskbar
  firstButtonName="Back"
  secondButtonName="Clear Done"
  position="top"
  onClearDone={clearDone} />
<div class="taskcontainer">
  {#each taskObjDup as task}
    {#if checkCond(task) && $activeSection}
      {#if !task.completed || showDone}
        <div
          on:click={openEditTask}
          id={task.id}
          class="task"
          class:gridBreak={detailDisplay}>
          <input
            type="checkbox"
            checked={task.completed}
            on:click|stopPropagation={showDoneButton} />
          {#if editableTask == task.id}
            <input type="text" in:focus bind:value={task.taskname} />
          {:else}
            <p>{task.taskname}</p>
          {/if}
          {#if detailDisplay}
            <p>{task.duedate}</p>
            <p>{getListName(task.listid)}</p>
          {/if}
        </div>
        {#if editableTask == task.id}
          <div class="grid-container">
            <div class="notes">
              Notes:
              <br />
              <textarea rows="10" columns="200" bind:value={task.notes} />
            </div>
            <div class="priority">
              Priority:
              <br />
              <select bind:value={task.priority}>
                <option value="None">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div class="duedate">
              Due Date:
              <br />
              <input type="date" bind:value={task.duedate} />
            </div>
            <div class="delete">
              <Button buttonName="Delete" on:click={deleteTask} />
              <Button buttonName="Close" on:click={closeEditTask} />
            </div>
          </div>
        {/if}
      {/if}
    {/if}
  {/each}
  {#if !isNaN(parseInt($activeSection))}
    <div class="task" style="grid-template-columns: 10fr;border:none;">
      {#if !addTaskFlag}
        <Button buttonName="Add Task" on:click={toggleAddTask} />
      {:else}
        <input
          in:focus
          on:focusout={toggleAddTask}
          on:keyup={addTask}
          bind:value={newTaskName}
          type="text"
          placeholder="Task Name..." />
      {/if}
    </div>
  {/if}
</div>
{#if doneCount}
  <Taskbar
    firstButtonName="Done({doneCount})"
    position="bottom"
    onDone={toggleDone} />
{/if}
