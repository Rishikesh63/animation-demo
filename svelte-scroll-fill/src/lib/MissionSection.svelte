<script lang="ts">
  import { onMount } from 'svelte';

  let scrollY: number = 0;
  let sectionElement: HTMLElement | undefined = undefined;
  let sectionTop: number = 0;
  let sectionHeight: number = 0;

  // Track scroll progress within the section
  $: relativeScroll = scrollY - sectionTop;
  
  // Progress ranges from 0 (starts growing) to 1 (reaches full size)
  $: progress = sectionHeight > 0 ? Math.max(0, Math.min(1, relativeScroll / sectionHeight)) : 0;

  /**
   * CARD ANIMATION LOGIC:
   * translateY: Starts slightly lower and moves to its final position.
   * scale: Starts small (0.8) and grows to 1.0.
   * opacity: Fades in as it grows for a smoother effect.
   */
  $: translateY = (1 - progress) * 10; 
  $: scale = 0.8 + (progress * 0.2);
  $: opacity = 0.5 + (progress * 0.5);

  const updateDimensions = () => {
    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect();
      // Animation begins when the card is near the bottom of the viewport
      sectionTop = rect.top + window.scrollY - (window.innerHeight * 0.9);
      sectionHeight = window.innerHeight * 0.8;
    }
  };

  onMount(() => {
    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (sectionElement) resizeObserver.observe(sectionElement);
    return () => resizeObserver.disconnect();
  });
</script>

<svelte:window bind:scrollY />

<div class="card-scroll-wrapper">
  <section 
    class="value-card" 
    bind:this={sectionElement}
    style="transform: translate3d(0px, {translateY}vh, 0px) scale3d({scale}, {scale}, 1); opacity: {opacity};"
  >
    <div class="padding-30">
      <div class="container-1204">
        <div class="value-wrap">
          <div class="columns-wrap">
            <div class="heading-left-wrap">
              <div class="overflow-hidden">
                <div class="text-block-13">Our mission is simple.</div>
              </div>
              <h2 class="green_heading">
                We’re here to <br>build the world’s most sustainable battery.
              </h2>
            </div>

            <div class="content-right-wrap">
              <h3 class="text-color-green">
                To help accelerate the world’s transition to green energy.
              </h3>
              <p class="our-mission-p">
                And we believe the answer to that lies in nature. That’s why we’ve harnessed 
                the power of renewable materials and biomimicry to create batteries that are 
                not just functional but harmonious with the planet. At Flint, innovation and 
                sustainability go hand in hand—building a greener, brighter future together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  :root {
    --lush-green: #29aa31;
    --black: #000000;
    --white: #ffffff;
    --grey-text: #767373;
    --card-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  }

  /* Ensures there is enough space to see the scroll effect */
  .card-scroll-wrapper {
    padding: 10vh 5vw;
    background-color:black; /* Contrast background to see card shape */
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .value-card {
    position: relative;
    background-color: var(--white);
    /* CARD SHAPE STYLES */
    border-radius: 40px;
    box-shadow: var(--card-shadow);
    max-width: 1204px;
    width: 100%;
    
    will-change: transform, opacity;
    transform-style: preserve-3d;
    transition: transform 0.1s linear, opacity 0.1s linear;
    padding: 60px 0;
  }

  .padding-30 {
    padding: 0 30px;
  }

  .container-1204 {
    max-width: 1040px; /* Slightly tighter for inner container */
    margin: 0 auto;
    width: 100%;
  }

  .columns-wrap {
    display: flex;
    justify-content: space-between;
    gap: 60px;
    align-items: flex-start;
  }

  .heading-left-wrap {
    flex: 1.2;
  }

  .text-block-13 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 1px;
    margin-bottom: 20px;
    color: var(--black);
    opacity: 0.6;
  }

  .green_heading {
    font-size: clamp(1.8rem, 4vw, 3rem);
    color: var(--lush-green);
    line-height: 1.1;
    font-weight: 800;
    margin: 0;
  }

  .content-right-wrap {
    flex: 1;
  }

  .text-color-green {
    font-size: 1.5rem;
    color: var(--lush-green);
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 20px;
  }

  .our-mission-p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--grey-text);
  }

  @media (max-width: 991px) {
    .columns-wrap { 
      flex-direction: column; 
      gap: 30px; 
    }
    .value-card {
      padding: 40px 0;
      border-radius: 30px;
    }
  }
</style>