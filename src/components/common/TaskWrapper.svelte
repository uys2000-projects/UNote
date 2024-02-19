<script lang="ts">
  import { Task } from "../../types/task";
  import TaskComponent from "./Task.svelte";
  export let task: Task | Promise<Task>;
</script>

<div
  id="task-unindexed"
  class="collapse bg-base-200 text-base-content opacity-0"
>
  {#if "title" in task}
    <TaskComponent {task} />
  {:else}
    {#await task}
      <div class="p-8 flex justify-center align-middle">
        <span class="loading loading-dots loading-md"></span>
      </div>
    {:then taskResult}
      <TaskComponent task={taskResult} />
    {:catch}
      <div class="p-10">Hata</div>
    {/await}
  {/if}
</div>
