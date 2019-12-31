<script>
    import { activeSection, taskObj } from './store.js';
    import Button from './Button.svelte'
    let addTaskFlag = false;
    let newTaskName='';
    const toggleAddTask = ()=>addTaskFlag = !addTaskFlag
    const focus = event => event.focus()
    let editableTask=NaN;
    function openEditTask(event){
        editableTask = event.target.id || event.target.parentNode.id;
    }
    const closeEditTask = (event)=>editableTask = NaN
    function addTask(event){
        if(event.code!='Enter') return
		taskObj.update(tasks => [...tasks, {id:tasks.length?tasks[tasks.length-1]['id']+1:0,
								taskname:newTaskName,
								notes:'',
                                priority:'',
                                duedate:'',
                                completed:false,
                                listid:parseInt($activeSection)
                                }])
        newTaskName = ''
        addTaskFlag = false
	}
</script>

{#if $activeSection=='Lists' || $activeSection=='Scheduled'}
    <p>need to implement</p>
{:else}
    <div class='taskcontainer'>
        {#each $taskObj as task}
            <div id={task.id} class='task' on:click={openEditTask}>
                <input type='checkbox' bind:checked={task.completed} checked={task.completed} on:click|stopPropagation={()=>''}/>
                {#if editableTask == task.id}
                    <input type='text' in:focus bind:value={task.taskname}/>
                {:else}
                    <p>{task.taskname}</p>
                {/if}
            </div>
            {#if editableTask == task.id}
                <div class="grid-container">
                <div class="notes">Notes:<br><textarea rows='10' columns='200'></textarea></div>
                <div class="priority">Priority:<br><select ></select></div>  
                <div class="duedate">Due Date:<br><input type="date"></div>
                <div class="delete"><Button buttonName='Delete'/></div>
                </div>
            {/if}
        {/each}
        <div class='task' style="grid-template-columns: 10fr;border:none;">
            {#if !addTaskFlag}
                <Button buttonName = 'Add Task' onclick={toggleAddTask}/>
            {:else}
                <input in:focus on:focusout={toggleAddTask} on:keyup={addTask} bind:value={newTaskName} type='text' placeholder="Task Name..."/>
            {/if}
        </div>
    </div>
{/if}
<style>
.taskcontainer{
    margin:50px;
    margin-top:70px;
    display: grid;
    grid-gap: 10px;
}
.task{
    color: black;
    height: 30px;
    padding: 10px;
    align-content: center;
    background-color: white;
    border: 2px solid black;
    display: grid;
    grid-template-columns: 1fr 9fr;
}
input[type='checkbox']{
    zoom:3;
    align-self: center;
    justify-self: center;
    margin:0;
}
input[type='text']{
    height:35px;
    margin-top: 6px;
	border: 2px solid black;
	outline: none;
}
.notes { grid-area: notes; }
.priority { grid-area: priority; }
.duedate { grid-area: duedate; }
.delete { grid-area: delete; justify-self: center; }

.grid-container {
  display: grid;
  grid-template-areas:
    'notes priority'
    'notes duedate'
    'notes delete';
  grid-gap: 10px;
  padding: 10px;
}

.grid-container > div {
  background-color: white;
  text-align: left;
}
select,input,textarea {
    width: 99%;
    border: 2px solid black;
}
</style>