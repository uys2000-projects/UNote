<script lang="ts">
  import { fly } from "svelte/transition";

  import { Task } from "../types/task";
  import TaskWrapper from "../components/common/TaskWrapper.svelte";
  import { readTask, readTasks } from "../functions/pages/tasks";
  import { key } from "../stores/keys";
  import { deleteFile } from "../services/filesystem";
  let range = 0;
  let tasks = [] as Array<Task | Promise<Task>>;

  readTasks
    .pLogger(
      (length) => (range = length),
      async (taskIndex) => {
        console.log(`Task :${taskIndex}`);
        //deleteFile(taskIndex);
        if ($key) {
          tasks.push(readTask.pLogger(taskIndex, $key));
          tasks = tasks;
        }
      }
    )
    .catch(() => 0);

  const addTask = async function () {
    console.log("addTask");
    console.log(JSON.stringify(tasks));
    if (tasks.length == 0) {
      tasks.push(new Task(0, "", "", false));
    } else {
      console.log("addTask else");
      let index = 0;
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if ("index" in task) {
          if (task.index >= index) index = task.index + 1;
        } else {
          if ((await task).index >= index) index = (await task).index + 1;
        }
      }
      tasks.push(new Task(index, "", "", false));
    }
    console.log("addTask");
    tasks = tasks;
  };
</script>

<div
  class="home-page p-5 overflow-auto max-h-full flex flex-wrap gap-2 relative overflow-x-hidden"
>
  {#each tasks as task}
    <TaskWrapper {task} />
  {/each}
  <div
    class="fixed bottom-20 right-5 p-1 bg-accent text-accent-content flex justify-center align-middle items-center rounded-btn z-20"
  >
    <button
      in:fly
      class="material-symbols-rounded text-4xl text-accent-content"
      on:click={addTask}
    >
      add
    </button>
  </div>
</div>
