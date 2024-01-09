<script lang="ts">
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
    <label for="app-drawer" class="drawer-button btn btn-ghost btn-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 stroke-current"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path></svg
      >
    </label>
  </div>
</div>
