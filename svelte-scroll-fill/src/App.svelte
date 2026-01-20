<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  import CardStack from "./lib/CardStack.svelte";

  gsap.registerPlugin(ScrollTrigger);

  let sectionEl: HTMLElement;
  let fillEl: HTMLElement;

  const text = `
Crafting interfaces where design intent meets engineering precision.
Building systems that feel effortless and deliberate.
`.trim();

  const chars = Array.from(text);

  onMount(() => {
    const fillChars = fillEl.querySelectorAll(".char");

    gsap.to(fillChars, {
      clipPath: "inset(0% 0% 0% 0%)",
      stagger: 0.03,
      ease: "none",
      scrollTrigger: {
        trigger: sectionEl,
        start: "top 0%",
        end: "bottom 100%",
        scrub: true
      }
    });
  });
</script>

<style>
  :global(body) {
    margin: 0;
    background: black;
    font-family: Inter, system-ui, sans-serif;
  }

  .section {
    min-height: 200vh;
    display: flex;
    align-items: center;
    padding: 0 4vw;
  }

  .text-wrapper {
    position: relative;
    max-width: 1200px;
    font-size: clamp(3rem, 7vw, 7rem);
    line-height: 1.05;
    font-weight: 500;
  }

  .layer {
    display: block;
    white-space: pre-wrap;
  }

  /* BASE TEXT */
  .text-base {
    color: #555;
  }

  /* FILL TEXT */
  .text-fill {
    position: absolute;
    inset: 0;
    color: white;
    pointer-events: none;
  }

  .char {
    display: inline-block;
  }

  /* only fill chars start hidden */
  .text-fill .char {
    clip-path: inset(0% 100% 0% 0%);
    will-change: clip-path;
  }
</style>

<section class="section" bind:this={sectionEl}>
  <h1 class="text-wrapper">
    <!-- BASE TEXT -->
    <span class="layer text-base">
      {#each chars as char}
        <span class="char">{char === " " ? "\u00A0" : char}</span>
      {/each}
    </span>

    <!-- FILL TEXT -->
    <span class="layer text-fill" bind:this={fillEl} aria-hidden="true">
      {#each chars as char}
        <span class="char">{char === " " ? "\u00A0" : char}</span>
      {/each}
    </span>
  </h1>
</section>
<main>
  <CardStack />
</main>