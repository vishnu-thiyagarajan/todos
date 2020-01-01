<script>
import { taskObj } from './store.js'
export let listid = NaN;
let taskInList = []
for (let task of $taskObj){
    if (task.listid === listid){
        taskInList.push(task.taskname)
    }
}
taskInList = taskInList.length ? taskInList : ['no tasks']
</script>
<div class='overflow'>
    {#each taskInList as task}
        {task}<br>
    {/each}
</div>
<style>
.overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 110px;
  height: 147px;
  position: absolute;
}
</style>