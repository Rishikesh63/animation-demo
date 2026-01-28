<script lang="ts">
  import { onMount } from 'svelte';

  let scrollY: number = 0;
  let sectionElement: HTMLElement | undefined = undefined;
  let sectionTop: number = 0;
  let sectionHeight: number = 0;

  // Track scroll progress within the section
  $: relativeScroll = scrollY - sectionTop;
  
  // Progress calculation: 
  // We now divide by sectionHeight (which we will set to 320vh)
  $: progress = sectionHeight > 0 ? Math.max(0, Math.min(1, relativeScroll / sectionHeight)) : 0;

  // ANIMATION LOGIC
  $: translateY = progress * 100; // Increased to 100vh for longer travel
  $: scale = 1 + (progress * 0.4); // Zoom in
  $: headingColor = progress > 0.5 ? 'var(--black)' : 'var(--white)';

  const updateDimensions = () => {
    if (sectionElement) {
      const rect = sectionElement.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      // Capture the actual height of the section to use in the progress math
      sectionHeight = sectionElement.offsetHeight - window.innerHeight; 
    }
  };

  onMount(() => {
    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (sectionElement) resizeObserver.observe(sectionElement);
    return () => resizeObserver.disconnect();
  });

  const reasons = [
    { title: "Depleting Critical <br>Resources", desc: "Today's batteries rely on scarce materials like lithium and cobalt, mined unsustainably and with limited availability.", icon: "https://cdn.prod.website-files.com/677bffa8950e9a8fe5cadd52/677bffa8950e9a8fe5cade6b_why-icon-1.svg" },
    { title: "High Costs,<br> Limited Access", desc: "The expensive production of traditional batteries keeps renewable energy solutions out of reach for many.", icon: "https://cdn.prod.website-files.com/677bffa8950e9a8fe5cade6c_why-icon-2.svg" },
    { title: "Safety Risks You<br> Can't Ignore", desc: "Leaking chemicals, overheating, and explosions make current batteries a hazardous choice for everyday use.", icon: "https://cdn.prod.website-files.com/677bffa8950e9a8fe5cade6e_why-icon-3.svg" },
    { title: "Recycling That Just&nbsp; <br>Isn’t Working", desc: "Inefficient and energy-intensive recycling processes mean most batteries end up polluting the planet.", icon: "https://cdn.prod.website-files.com/677bffa8950e9a8fe5cade6d_why-icon-4.svg" }
  ];
</script>

<svelte:window bind:scrollY />

<section class="section_why-home" bind:this={sectionElement}>
  
  <div class="sticky_container">
    <div class="heading_sticky_container">
      <div 
        class="moving_heading_box" 
        style="transform: translate3d(0, {translateY}vh, 0) scale3d({scale}, {scale}, 1); color: {headingColor};"
      >
        <h2 class="scroll-heading">But Why?</h2>
      </div>
    </div>

    <div class="image_sticky_track">
      <div class="img_background"></div>
    </div>
  </div>

  <div class="white_content_section">
    <div class="container-1043">
      <div class="intro_text_block">
        <p class="description-large">4 deep reasons that led to 1 simple question.</p>
      </div>

      <div class="reasons_grid">
        {#each reasons as reason}
          <div class="reason_card">
            <img src={reason.icon} alt="" class="reason_icon" loading="lazy">
            <div class="reason_body">
              <h3 class="reason_h3">{@html reason.title}</h3>
              <p class="reason_p">{reason.desc}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="final_question_box">
        <p class="red_underline_text">Is this really how we want to power the future of green energy?</p>
      </div>
    </div>
  </div>
</section>

<style>
  :root {
    --white: #ffffff;
    --black: #000000;
    --red: #ca0000;
    --grey-text: #767373;
  }

  /* KEY CHANGE: Height increased to 320vh.
     This gives you 2 full screen-lengths of scrolling BEFORE the cards section hits.
  */
  .section_why-home {
    position: relative;
    background-color: var(--white);
    height: 320vh; 
  }

  .sticky_container {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .image_sticky_track {
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: 1;
  }

  .img_background {
    background-image: url('https://cdn.prod.website-files.com/677bffa8950e9a8fe5cadd52/677bffa8950e9a8fe5cade07_14ab5ed20f3b4a3147b730be006b7de1%201.webp');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    inset: 0;
  }

  .heading_sticky_container {
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }

  .moving_heading_box {
    will-change: transform;
    transition: color 0.3s ease;
  }

  .scroll-heading {
    font-size: clamp(3.5rem, 12vw, 5.5rem);
    font-weight: 900;
    margin: 0;
    font-family: 'Sf Pro Rounded', Arial, sans-serif;
    line-height: 1;
  }

  .white_content_section {
    position: relative;
    z-index: 150; 
    background: var(--white);
    padding: 160px 24px;
    border-radius: 40px 40px 0 0;
    /* This section starts appearing after the 300vh scroll */
  }

  .container-1043 {
    max-width: 1043px;
    margin: 0 auto;
    text-align: center;
  }

  .intro_text_block { margin-bottom: 80px; padding-top: 100px; }
  .description-large { font-size: clamp(1.4rem, 4vw, 2.3rem); color: var(--black); font-weight: 500; margin: 0; }
  .reasons_grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 80px 60px; text-align: left; margin-top: 60px; }
  .reason_card { display: flex; flex-direction: column; gap: 20px; }
  .reason_icon { width: 52px; height: 52px; }
  .reason_h3 { font-size: 1.9rem; font-weight: 700; color: var(--black); line-height: 1.2; margin: 0; }
  .reason_p { color: var(--grey-text); font-size: 1.15rem; line-height: 1.5; margin: 0; }
  .final_question_box { margin-top: 120px; padding-bottom: 40px; }
  .red_underline_text { display: inline-block; font-size: clamp(1.4rem, 5vw, 2.5rem); color: var(--red); font-weight: 700; text-decoration: underline; text-underline-offset: 12px; line-height: 1.3; }

  @media (max-width: 768px) {
    .reasons_grid { grid-template-columns: 1fr; gap: 40px; }
    .white_content_section { padding: 80px 20px; }
    .intro_text_block { padding-top: 60px; }
  }
</style>