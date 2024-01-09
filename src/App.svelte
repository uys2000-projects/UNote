<script lang="ts">
  import Layout from "./components/shared/Layout.svelte";
  import { page, params } from "./stores/router";
  import "./router/router";
</script>

<Layout>
  <svelte:component this={$page} />
</Layout>
