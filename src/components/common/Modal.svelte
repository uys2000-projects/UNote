<script lang="ts">
  export let id: string;
  export let c: string = "";
</script>

<dialog {id} class="modal">
  <div class="modal-box {c}">
    <slot />
  </div>
</dialog>
