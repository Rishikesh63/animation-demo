<script lang="ts">
  const cards = [
  "Crafting thoughtful digital experiences",
  "Engineering with design intent",
  "Details that make products feel premium"
];

</script>

<style>
  .stack {
    position: relative;
    width: 520px;
    height: 260px; /* height of ONE card */
  }

  .card {
    position: absolute;
    left: 0;
    right: 0;
    height: 240px;

    background: #c4b9c3;
    color: white;
    border-radius: 18px;
    padding: 20px;

    display: flex;
    align-items: flex-end;

    box-shadow: 0 20px 40px rgba(0,0,0,0.35);

    /* PEEK STACK (before hover) */
    transform: translateY(calc(var(--i) * -26px));

    transition:
      transform 0.45s cubic-bezier(.4,0,.2,1);
  }

  /* FULL CARD REVEAL (on hover) */
  .stack:hover .card {
    transform: translateY(calc(var(--i) * -300px));
  }

  /* subtle depth */
  .card:nth-child(1) { z-index: 3; }
  .card:nth-child(2) { z-index: 2; }
  .card:nth-child(3) { z-index: 1; }
</style>

<div class="stack">
  {#each cards as text, i}
    <div class="card" style="--i:{i}">
      <h3>{text}</h3>
    </div>
  {/each}
</div>
