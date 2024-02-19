<script lang="ts">
  import { fly } from "svelte/transition";
  let next = (value: number) =>
    new Promise((resolve) => setTimeout(() => resolve(++value), 500));
</script>

<div
  class="navbar bg-neutral flex-shrink-0 animate__animated animate__fadeInDown"
>
  <div class="flex-1">
    <span class="btn btn-ghost text-xl text-neutral-content">UNotes</span>
  </div>
  <div class="flex-none">
    <label
      for="app-drawer"
      class="drawer-button btn btn-sm btn-accent text-accent-content"
    >
      <span in:fly class="material-symbols-rounded"> menu </span>
    </label>
  </div>
</div>
