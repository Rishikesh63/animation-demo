<script lang="ts">
  const cards = [
    "Saved 40% water for our farm",
    "Saved 40% water for our farm",
    "Saved 40% water for our farm"
  ];
</script>

<style>
  .video-module {
    height: 7.2vw;
  }
  
.video-card-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  position: fixed;
  left: 2vw;
  bottom: 2vw;

  width: 20vw;
}


  /* STACK */
  .stack {
    position: relative;
    height: 8vw;
    overflow: visible;
  }

  .card {
    position: absolute;

    /* WIDTH STACK */
    left: calc(var(--i) * 0.9vw);
    right: calc(var(--i) * 0.9vw);

    /* FIXED HEIGHT */
    height: 7.2vw;
   
    background-color: #212121b0;
    backdrop-filter: blur(19px);
    -webkit-backdrop-filter: blur(19px);

    border: 0.1vw solid #8a8a8a1a;
    border-radius: 1.2vw;
    padding: 0.5vw;

    display: flex;
    align-items: center;

    color: #f9f9fb;
    cursor: pointer;

    /* STACKED STATE (grows upward) */
    transform:
      translateY(calc(var(--i) * -0.8vw))
      scaleY(calc(1 - var(--i) * 0.05));

    filter: blur(calc(var(--i) * 0.6px));

    transform-origin: bottom;

    transition:
      transform 0.55s cubic-bezier(.65, 0, .35, 1),
      filter 0.45s cubic-bezier(.65, 0, .35, 1),
      left 0.45s cubic-bezier(.65, 0, .35, 1),
      right 0.45s cubic-bezier(.65, 0, .35, 1),
      background 0.3s cubic-bezier(.65, 0, .35, 1);
  }

  /* FULL OPEN (still anchored bottom) */
  .video-card-wrap:hover .card {
    transform:
      translateY(calc(var(--i) * -8.7vw))
      scaleY(1);

    left: 0;
    right: 0;

    filter: blur(0);
  }

  .card:hover {
    background-color: #2a2a2ab0;
  }

  /* LAYER ORDER */
  .card:nth-child(1) { z-index: 3; }
  .card:nth-child(2) { z-index: 2; }
  .card:nth-child(3) { z-index: 1; }

  h3 {
    font-size: 0.95vw;
    font-weight: 500;
    line-height: 1.2;
    margin: 0;
  }
</style>

<div class="video-module" data-module="video-cards">
  <div class="video-card-wrap is--none">
    <div class="stack">
      {#each cards as text, i}
        <div class="card" style="--i:{i}">
          <h3>{text}</h3>
        </div>
      {/each}
    </div>
  </div>
</div>
