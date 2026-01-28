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

  // Function to check if a specific line is in the active "highlight zone"
  function getOpacity(itemTop: number, y: number) {
    if (!container) return 0.2;
    const viewportCenter = y + window.innerHeight / 2;
    const distance = Math.abs(viewportCenter - itemTop);
    
    // If the line is within 100px of the center, make it fully black
    // otherwise, keep it at the 20% opacity (gray) from your snippet
    return distance < 100 ? 1 : 0.2;
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
    return () => window.removeEventListener('resize', updatePositions);
  });
</script>

<svelte:window bind:scrollY />

<section class="section-why">
  <div class="padding-section pb-0 padding-30">
    <div class="container-1204">
      <div class="why_wrapper" bind:this={container}>
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
    padding: 100px 0;
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
    gap: 1.5rem;
  }

  .heading_style-h2-gry {
    font-size: clamp(2rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin: 0;
    transition: color 0.3s ease-out;
    /* Ensuring proper font matching for Flint Labs style */
    font-family: 'Sf Pro Rounded', Arial, sans-serif;
  }

  .pb-0 {
    padding-bottom: 0;
  }
</style>