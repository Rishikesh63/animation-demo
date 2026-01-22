<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import ProductTray from "./ProductTray.svelte";

  let open = false;
</script>

<style>
  .nav-wrap {
    position: fixed;
    top: 2rem;
    left: 35%;
    /* transform: translateX(-50%); */
    z-index: 50;
  }

  /* NAVBAR */
  .nav {
    width: 260px;
    display: flex;
    align-items: center;
    padding: 0.6rem 0.75rem;
    background: linear-gradient(
      180deg,
      rgba(60, 63, 66, 0.95),
      rgba(40, 42, 45, 0.95)
    );
    border-radius: 999px;
    backdrop-filter: blur(20px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  }

  /* LEFT */
  .left {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  /* RIGHT (DOTS + DIVIDER + BAG) */
  .right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .logo {
    font-weight: 700;
    font-size: 1.1rem;
    color: white;
    padding: 0 0.25rem;
    white-space: nowrap;
  }

  .icon-btn {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.08);
    cursor: pointer;
    flex-shrink: 0;
  }

  .icon-btn:hover {
    background: rgba(255, 255, 255, 0.14);
  }

  /* SINGLE, PROPER DIVIDER */
  .divider {
    width: 1px;
    height: 18px;
    background: rgba(255, 255, 255, 0.25);
    margin: 0 0.25rem;
    flex-shrink: 0;
  }

  .badge {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 7px;
    height: 7px;
    background: #bdbdbd;
    border-radius: 50%;
  }

  .tray-wrap {
    margin-top: 0.6rem;
    display: flex;
    justify-content: center;
  }

  svg {
    color: white;
  }
</style>

<div class="nav-wrap">
  <!-- NAV BAR -->
  <div class="nav">
    <!-- LEFT -->
    <div class="left">
      <div class="logo">Nav</div>
    </div>

    <!-- RIGHT -->
    <div class="right">
      <!-- DOT MENU -->
      <div
        class="icon-btn"
        aria-label="Open menu"
        on:click={() => (open = !open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle cx="1.75" cy="1.75" r="1.75" fill="currentColor" />
          <circle cx="8" cy="1.75" r="1.75" fill="currentColor" />
          <circle cx="14.25" cy="1.75" r="1.75" fill="currentColor" />

          <circle cx="1.75" cy="8" r="1.75" fill="currentColor" />
          <circle cx="8" cy="8" r="1.75" fill="currentColor" />
          <circle cx="14.25" cy="8" r="1.75" fill="currentColor" />

          <circle cx="1.75" cy="14.25" r="1.75" fill="currentColor" />
          <circle cx="8" cy="14.25" r="1.75" fill="currentColor" />
          <circle cx="14.25" cy="14.25" r="1.75" fill="currentColor" />
        </svg>
      </div>

      <div class="divider"></div>

      <!-- BAG -->
      <div class="icon-btn" style="position: relative;">
        👜
        <span class="badge"></span>
      </div>
    </div>
  </div>

  <!-- PRODUCT TRAY -->
  {#if open}
    <div
      class="tray-wrap"
      in:scale={{ duration: 180, start: 0.96 }}
      out:fade={{ duration: 120 }}
    >
      <ProductTray />
    </div>
  {/if}
</div>
