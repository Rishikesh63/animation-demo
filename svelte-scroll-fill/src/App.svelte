<script lang="ts">
  import Router from 'svelte-spa-router';

  import RouteNav from './lib/RouteNav.svelte';

  import Home from './pages/Home.svelte';
  import ScrollPage from './pages/ScrollPage.svelte';

  const routes = {
    '/': Home,
    '/scroll': ScrollPage
  };
</script>

<style>
  /* ===============================
     GLOBAL RESET + BACKGROUND
  ================================ */
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    background: white;
  }

  /* ===============================
     APP LAYOUT ROOT
  ================================ */
  .app {
    min-height: 100vh;
    width: 100vw;
    background: white;
    overflow-x: hidden; /* allow vertical scroll */
    position: relative;
  }
</style>

<div class="app">
  <!-- ROUTE CONTROLS -->
  <RouteNav />

  <!-- ROUTES -->
  <Router {routes} useHash={false} />
</div>
