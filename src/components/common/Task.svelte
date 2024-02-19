<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import { listenForAnimation, saveTask } from "../../functions/pages/tasks";

  import autosize from "autosize";

  import { Task } from "../../types/task";

  import { key } from "../../stores/keys";
  export let task: Task;

  let unObservers: (() => void)[] = [];

  onMount(() => {
    const taskUnIndexed = document.querySelector("#task-unindexed");
    if (taskUnIndexed) taskUnIndexed.id = "task-" + task.index;
    const taskElement = document.querySelector("#task-" + task.index);
    if (taskElement) listenForAnimation(taskElement);
    const textarea = document.querySelector("#textarea-" + task.index);
    if (textarea) autosize(textarea);
  });

  onDestroy(() => {
    unObservers.forEach((item) => item());
  });

  let saver: NodeJS.Timeout;
  const saveOnChange = function () {
    saver = setTimeout(() => {
      if ($key) saveTask.pLogger(task, $key);
      else {
        let s = key.subscribe(() => {
          if ($key) {
            saveTask.pLogger(task, $key);
            s();
          }
        });
      }
    }, 1000);
  };
</script>

<input type="radio" name="my-accordion-1" />
<div class="collapse-title text-xl font-medium">
  <label class="label cursor-pointer">
    <input
      type="text"
      placeholder="Title"
      class="input input-ghost w-ful z-10"
      bind:value={task.title}
      on:change={saveOnChange}
    />
    <input
      type="checkbox"
      class="checkbox z-10"
      bind:checked={task.isDone}
      on:change={saveOnChange}
    />
  </label>
</div>
<div class="collapse-content">
  <textarea
    id="textarea-{task.index}"
    placeholder="Content"
    class="textarea textarea-ghost w-full"
    bind:value={task.content}
    on:change={saveOnChange}
  />
</div>

<style>
  .label:has(.checkbox:checked) {
    text-decoration: line-through;
  }
  .label:has(input:focus) {
    text-decoration: unset !important;
  }
</style>
