<div class="drawer drawer-end">
  <input id="app-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <slot name="content">content</slot>
  </div>
  <div class="drawer-side overflow-hidden z-50">
    <label
      for="app-drawer"
      aria-label="close sidebar"
      class="drawer-overlay z-100"
    ></label>
    <slot name="sidebar">content</slot>
  </div>
</div>
