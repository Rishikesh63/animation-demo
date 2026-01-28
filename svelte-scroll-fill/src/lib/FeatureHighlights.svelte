<script lang="ts">
  import { onMount } from 'svelte';

  let scrollY: number = 0;
  let container: HTMLElement;
  let items: { text: string; top: number }[] = [];

  const featureLines = [
    "No Lithium. No Cobalt. No Nickel.",
    "100% Renewable Materials.",
    "Leak-proof.",
    "Fire Resistant.",
    "Lower Carbon Footprint."
  ];

  function getOpacity(itemTop: number, y: number) {
    if (!container) return 0.2;
    // We target the center of the viewport
    const viewportCenter = y + window.innerHeight / 2;
    const distance = Math.abs(viewportCenter - itemTop);
    
    // Increased threshold slightly for a smoother transition
    return distance < 150 ? 1 : 0.2;
  }

  onMount(() => {
    const lines = container.querySelectorAll('h2');
    const updatePositions = () => {
      items = Array.from(lines).map((line, i) => ({
        text: featureLines[i],
        top: line.getBoundingClientRect().top + window.scrollY
      }));
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    // Recalculate positions after a short delay to ensure layout is settled
    setTimeout(updatePositions, 100); 

    return () => window.removeEventListener('resize', updatePositions);
  });
</script>

<svelte:window bind:scrollY />

<section class="section-why">
  <div class="padding-section pb-0 padding-30">
    <div class="container-1204">
      <div class="why_wrapper" bind:this={container} style="padding-bottom: 50vh;">
        {#each featureLines as line, i}
          <h2 
            class="heading_style-h2-gry" 
            style="color: rgba(0, 0, 0, {items[i] ? getOpacity(items[i].top, scrollY) : 0.2});"
          >
            {line}
          </h2>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .section-why {
    background-color: #ffffff;
    /* Extra top padding to ensure the first line highlights correctly */
    padding-top: 30vh; 
  }

  .padding-30 {
    padding: 30px;
  }

  .container-1204 {
    max-width: 1204px;
    margin: 0 auto;
    width: 100%;
  }

  .why_wrapper {
    display: flex;
    flex-direction: column;
    gap: 4rem; /* Increased gap to make the scroll effect more distinct */
  }

  .heading_style-h2-gry {
    font-size: clamp(2rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin: 0;
    transition: color 0.4s ease-out; /* Smoother color transition */
    font-family: 'Sf Pro Rounded', Arial, sans-serif;
  }
</style>