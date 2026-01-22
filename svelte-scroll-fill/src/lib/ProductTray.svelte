<script lang="ts">
  import { fly, scale } from "svelte/transition";
</script>

<style>
  .tray {
    margin-top: 1rem;
    padding: 1rem;
    width: 360px;
    background: linear-gradient(
      180deg,
      rgba(60, 63, 66, 0.96),
      rgba(38, 40, 43, 0.96)
    );
    border-radius: 28px;
    backdrop-filter: blur(20px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .card {
    background: #f5f5f5;
    border-radius: 18px;
    padding: 1rem;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
  }

  .wide {
    grid-column: span 2;
  }
</style>

<div
  class="tray"
  transition:scale={{ duration: 200, start: 0.95 }}
>
  <div class="grid">
    <div class="card">iyO One</div>
    <div class="card">iyO yO</div>
    <div class="card wide">VAD Pro</div>
    <div class="card">iyO Wand</div>
    <div class="card">iyO Caps</div>
  </div>
</div>
