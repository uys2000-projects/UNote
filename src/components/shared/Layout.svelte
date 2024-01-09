<script>
  import Bottombar from "./layout/Bottombar.svelte";
  import Drawer from "./layout/Drawer.svelte";
  import Header from "./layout/Header.svelte";
  import Sidebar from "./layout/Sidebar.svelte";
</script>

<Drawer>
  <div
    slot="content"
    class="h-screen flex flex-col flex-nowrap overflow-hidden pb-[64px]"
  >
    <Header />
    <slot />
    <Bottombar />
  </div>
  <Sidebar slot="sidebar" />
</Drawer>
