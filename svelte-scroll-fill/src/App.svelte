<script lang="ts">
  import NavBar from "./lib/NavBar.svelte";
  import Hero from "./lib/Hero.svelte";
  import Testimonial from "./lib/Testimonial.svelte";
  import CardStack from "./lib/CardStack.svelte";
</script>

<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden; /* 🔒 hard lock */
  }

  .app {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
  }
</style>

<div class="app">
  <NavBar />
  <Hero />
  <CardStack />

  <!-- <Testimonial/> -->
</div>
