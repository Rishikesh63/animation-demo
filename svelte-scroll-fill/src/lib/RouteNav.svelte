<script>
  import { push } from 'svelte-spa-router';
</script>

<style>
  .route-nav {
    position: fixed;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
    display: flex;
    gap: 0.75rem;
    z-index: 100;
  }

  button {
    padding: 0.5rem 1.2rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    color: white;
  }

  button:hover {
    background: rgba(255, 255, 255, 0.25);
  }
</style>

<div class="route-nav">
  <button on:click={() => push('/')}>Home</button>
  <button on:click={() => push('/scroll')}>Scroll</button>
</div>
