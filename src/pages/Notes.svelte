<script lang="ts">
  import { onMount } from "svelte";
  import Masonry from "masonry-layout";
  import { fly } from "svelte/transition";
  import Modal from "../components/common/Modal.svelte";
  import Editor from "../components/common/Editor.svelte";
  onMount(() => {
    const el = document.querySelector(".cards");
    if (el)
      new Masonry(el, {
        itemSelector: ".card-wrapper",
      });
  });
</script>

<div class="notes-page p-5 w-full overflow-y-auto overflow-x-hidden relative">
  <div class="cards">
    {#each Array(40).keys() as item, i}
      <div class="card-wrapper p-1 w-1/2">
        <div class="card w-full h-full bg-primary text-primary-content">
          <div class="card-body p-4">text</div>
        </div>
      </div>
    {/each}
  </div>
  <div
    class="fixed bottom-20 right-5 p-1 bg-accent text-accent-content flex justify-center align-middle items-center rounded-btn z-20"
  >
    <button
      in:fly
      class="material-symbols-rounded text-4xl text-accent-content"
      on:click={() => window.location.replace("/notes#edit")}
    >
      add
    </button>
  </div>
</div>

<Modal id="edit" c="h-[75vh] p-0">
  <Editor />
</Modal>

<style>
</style>
