<script lang="ts">
  import { onMount } from "svelte";

  export let text =
    "Blending design and code with functional clarity and creative precision. Delivering thoughtful digital systems with structure, flow, and expressive interaction.";

  export let fontSize = 72;
  export let lineHeight = 1.05;
  export let letterSpacing = -2;
  export let transitionStartIndex = 22;

  let el: HTMLElement;
  let progress = 0;

  function clamp(v: number) {
    return Math.min(1, Math.max(0, v));
  }

  function onScroll() {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // same feel as Framer offset ["start 0.75", "start 0.15"]
    const start = vh * 0.75;
    const end = vh * 0.15;

    progress = clamp((start - rect.top) / (start - end));
  }

  onMount(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  const chars = Array.from(text);
</script>

<section class="service">
  <!-- MEDIA (FREE, NOT MASKED) -->
  <div class="media">
    <img
      class="img top"
      src="https://framerusercontent.com/images/5emb8oOwafbQsfWVIaaZ12WcTM.png"
    />
    <img
      class="img bottom"
      src="https://framerusercontent.com/images/tFXdT1GAWfzky0TCheIFtJR4O3I.png"
    />
    <video
      src="https://framerusercontent.com/assets/fEkvm0HYUUFHc0WiH6ssCVGITR0.mp4"
      autoplay
      muted
      loop
      playsinline
    />
  </div>

  <!-- TEXT -->
  <p
    class="text"
    bind:this={el}
    style="
      font-size: {fontSize}px;
      line-height: {lineHeight};
      letter-spacing: {letterSpacing}px;
    "
  >
    {#each chars as char, i}
      {@const start = i / chars.length}
      {@const end = (i + 1) / chars.length}

      {@const t =
        i < transitionStartIndex
          ? 1
          : clamp((progress - start) / (end - start))}

      <span
        style="
          color: rgb(
            {102 + (255 - 102) * t},
            {102 + (255 - 102) * t},
            {102 + (255 - 102) * t}
          );
        "
      >
        {char === " " ? "\u00A0" : char}
      </span>
    {/each}
  </p>
</section>

<style>
  .service {
    position: relative;
    background: black;
    padding: 160px 0;
    overflow: hidden;
    font-family: "Inter Display", sans-serif;
  }

  /* ================= MEDIA ================= */

  .media {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .media video {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    width: 420px;
    height: 640px;
    object-fit: cover;
    border-radius: 32px;
  }

  .media .img {
    position: absolute;
    width: 28%;
    border-radius: 24px;
  }

  .media .img.top {
    top: 6%;
    left: 8%;
  }

  .media .img.bottom {
    bottom: 4%;
    left: 18%;
  }

  /* ================= TEXT ================= */

  .text {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    padding-left: 5%;
    margin: 0;
    font-weight: 500;
    color: rgb(102, 102, 102);
    display: flex;
    flex-wrap: wrap;
  }

  .text span {
    white-space: pre;
  }
</style>
