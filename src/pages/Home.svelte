<script lang="ts">
  import { fly } from "svelte/transition";
  import { animateCssOnIn, animateCssOnOut } from "../services/animateCSS.js";
  import { onMount, onDestroy } from "svelte";

  var unObservers: (() => void)[] = [];
  onMount(() => {
    const parent = document.querySelector(".home-page");
    document.querySelectorAll(".collapse").forEach((item) => {
      animateCssOnIn(item, "fadeIn", parent as Element).then((unObserver) =>
        unObservers.push(unObserver)
      );
      animateCssOnOut(item, "fadeOut", parent as Element).then((unObserver) =>
        unObservers.push(unObserver)
      );
    });
  });
  onDestroy(() => {
    unObservers.forEach((item) => item());
  });
</script>

<div
  class="home-page p-5 overflow-auto max-h-full flex flex-wrap gap-2 relative overflow-x-hidden"
>
  {#each Array(20).keys() as i}
    <div class="collapse bg-base-200 text-base-content opacity-0">
      <input type="radio" name="my-accordion-1" />
      <div class="collapse-title text-xl font-medium">
        <label class="label cursor-pointer">
          <input
            type="text"
            placeholder="Title"
            class="input input-ghost w-ful z-10"
          />
          <input type="checkbox" class="checkbox z-10" />
        </label>
      </div>
      <div class="collapse-content">
        <div>test</div>
      </div>
    </div>
  {/each}
  <div
    class="fixed bottom-20 right-5 p-1 bg-accent text-accent-content flex justify-center align-middle items-center rounded-btn z-20"
  >
    <span in:fly class="material-symbols-rounded text-4xl"> add </span>
  </div>
</div>

<style>
  .label:has(.checkbox:checked) {
    text-decoration: line-through;
  }
  .label:has(input:focus) {
    text-decoration: unset !important;
  }
</style>
