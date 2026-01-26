<script lang="ts">
  let scrollY = 0;
  let innerHeight = 0;
  let container: HTMLElement;
  let progress = 0;

  // Calculate scroll progress (0 to 1) specifically for this section
  $: if (container) {
    const rect = container.getBoundingClientRect();
    const sectionTop = rect.top + scrollY;
    const sectionHeight = rect.height;
    
    // progress is 0 when the top of the section hits the top of the screen
    // progress is 1 when we've scrolled through the 300vh
    const current = scrollY - sectionTop;
    const max = sectionHeight - innerHeight;
    progress = Math.max(0, Math.min(1, current / max));
  }
</script>

<svelte:window bind:scrollY bind:innerHeight />

<section class="scroll-container" bind:this={container}>
  <div class="sticky-wrapper">
    
    <div class="content-layer" style:opacity={1 - progress * 4} style:filter="blur({progress * 20}px)">
      <h2 class="main-title">Make space for rest</h2>
    </div>

    <div class="floating-card tl" 
      style:transform="translate({-progress * 400}px, {-progress * 400}px) rotate({-progress * 15}deg)"
      style:opacity={1 - progress * 2}>
      <img src="https://www.hatch.co/cdn/shop/files/Restore_2_Hero_1.png" alt="Card 1" />
    </div>

    <div class="floating-card br" 
      style:transform="translate({progress * 400}px, {progress * 400}px) rotate({progress * 15}deg)"
      style:opacity={1 - progress * 2}>
      <img src="https://www.hatch.co/cdn/shop/files/Restore_2_Hero_1.png" alt="Card 2" />
    </div>

    <div class="content-layer new-text" 
      style:opacity={(progress - 0.4) * 3} 
      style:transform="scale({0.9 + progress * 0.1})">
      <p class="description">
        We make restful tech that puts humans first – it doesn't track you, 
        sell your data, or hijack your time.
      </p>
    </div>

  </div>
</section>

<style>
  .scroll-container {
    height: 300vh; /* This determines how "long" the scroll animation lasts */
    background-color: #fdfaf6;
    position: relative;
  }

  .sticky-wrapper {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .content-layer {
    position: absolute;
    text-align: center;
    z-index: 5;
    pointer-events: none;
  }

  .main-title {
    font-size: 4rem;
    color: #1a2b4a;
    font-weight: 300;
  }

  .description {
    max-width: 600px;
    font-size: 1.5rem;
    line-height: 1.6;
    color: #1a2b4a;
  }

  .floating-card {
    position: absolute;
    width: 280px;
    z-index: 2;
    transition: transform 0.1s linear; /* Keeps movement tied strictly to scroll */
  }

  .floating-card img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  /* Initial positions */
  .tl { top: 20%; left: 20%; }
  .br { bottom: 20%; right: 20%; }
</style>