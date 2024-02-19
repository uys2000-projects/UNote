<script lang="ts">
  import { route } from "../../../stores/router";
  import { fly } from "svelte/transition";
</script>

<div class="btm-nav bg-base-100 animate__animated animate__fadeInUp">
  <a href="/notes" class={$route == "Notes" ? "active" : ""}>
    <span in:fly class="material-symbols-rounded"> note_stack </span>
  </a>
  <a href="/tasks" class={$route == "Tasks" ? "active" : ""}>
    <span in:fly class="material-symbols-rounded"> laps </span>
  </a>
  <a href="/settings" class={$route == "Settings" ? "active" : ""}>
    <span in:fly class="material-symbols-rounded"> settings </span>
  </a>
</div>
