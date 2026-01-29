<script lang="ts">
  import { onMount } from 'svelte';

  let scrollY = 0;
  let sectionEl: HTMLElement;
  let sectionTop = 0;

  $: progress = scrollY - sectionTop;

  function updateTop() {
    if (sectionEl) sectionTop = sectionEl.offsetTop;
  }

  onMount(() => {
    updateTop();
    const ro = new ResizeObserver(updateTop);
    ro.observe(sectionEl);
    return () => ro.disconnect();
  });
</script>

<svelte:window bind:scrollY />

<section class="about" bind:this={sectionEl}>
  <div class="container">
    
    <div class="text-layer base-text">
      <h1 class="headline">
        <span><span>B</span><span>l</span><span>e</span><span>n</span><span>d</span><span>i</span><span>n</span><span>g</span>&nbsp;</span>
        <span><span>d</span><span>e</span><span>s</span><span>i</span><span>g</span><span>n</span>&nbsp;</span>
        <span><span>a</span><span>n</span><span>d</span>&nbsp;</span>
        <span><span>c</span><span>o</span><span>d</span><span>e</span>&nbsp;</span>
        <span><span>w</span><span>i</span><span>t</span><span>h</span>&nbsp;</span>
        <span><span>f</span><span>u</span><span>n</span><span>c</span><span>t</span><span>i</span><span>o</span><span>n</span><span>a</span><span>l</span>&nbsp;</span>
        <span><span>c</span><span>l</span><span>a</span><span>r</span><span>i</span><span>t</span><span>y</span>&nbsp;</span>
        <span><span>a</span><span>n</span><span>d</span>&nbsp;</span>
        <span><span>c</span><span>r</span><span>e</span><span>a</span><span>t</span><span>i</span><span>v</span><span>e</span>&nbsp;</span>
        <span><span>p</span><span>r</span><span>e</span><span>c</span><span>i</span><span>s</span><span>i</span><span>o</span><span>n</span><span>.</span>&nbsp;</span>
      </h1>
    </div>

    <div class="text-layer media-mask">
      
      <div class="media-container">
        <div class="float image-top" style="transform: translate3d(0,{progress * -0.15}px,0)">
          <img src="https://framerusercontent.com/images/5emb8oOwafbQsfWVIaaZ12WcTM.png" alt="" />
        </div>
        <div class="float image-bottom" style="transform: translate3d(0,{progress * -0.25}px,0)">
          <img src="https://framerusercontent.com/images/tFXdT1GAWfzky0TCheIFtJR4O3I.png" alt="" />
        </div>
        <div class="video-wrap">
          <video 
            src="https://framerusercontent.com/assets/fEkvm0HYUUFHc0WiH6ssCVGITR0.mp4" 
            autoplay muted loop playsinline 
          />
        </div>
      </div>

      <h1 class="headline mask-text" aria-hidden="true">
        <span><span>B</span><span>l</span><span>e</span><span>n</span><span>d</span><span>i</span><span>n</span><span>g</span>&nbsp;</span>
        <span><span>d</span><span>e</span><span>s</span><span>i</span><span>g</span><span>n</span>&nbsp;</span>
        <span><span>a</span><span>n</span><span>d</span>&nbsp;</span>
        <span><span>c</span><span>o</span><span>d</span><span>e</span>&nbsp;</span>
        <span><span>w</span><span>i</span><span>t</span><span>h</span>&nbsp;</span>
        <span><span>f</span><span>u</span><span>n</span><span>c</span><span>t</span><span>i</span><span>o</span><span>n</span><span>a</span><span>l</span>&nbsp;</span>
        <span><span>c</span><span>l</span><span>a</span><span>r</span><span>i</span><span>t</span><span>y</span>&nbsp;</span>
        <span><span>a</span><span>n</span><span>d</span>&nbsp;</span>
        <span><span>c</span><span>r</span><span>e</span><span>a</span><span>t</span><span>i</span><span>v</span><span>e</span>&nbsp;</span>
        <span><span>p</span><span>r</span><span>e</span><span>c</span><span>i</span><span>s</span><span>i</span><span>o</span><span>n</span><span>.</span>&nbsp;</span>
      </h1>
    </div>

  </div>
</section>

<style>
  :root {
    --black: #050505;
    /* CHANGE THIS FOR THE MAIN TEXT COLOR */
    --text-base: #333344; 
    /* CHANGE THIS TO TINT THE MEDIA MASK (Optional) */
    --mask-tint: rgba(255, 255, 255, 1); 
  }

  .about {
    background: var(--black);
    padding: 160px 0;
    position: relative;
    overflow: hidden;
    font-family: "inter display", sans-serif;
  }

  .container {
    max-width: 1300px;
    margin: 0 auto;
    position: relative;
    height: 700px;
  }

  .text-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .headline {
    margin: 0;
    padding-left: 5%;
    font-size: 79px;
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -2.1px;
    display: flex;
    flex-wrap: wrap;
  }

  /* BASE LAYER: Updated to use the variable */
  .base-text {
    z-index: 1;
    color: var(--text-base);
  }

  .media-mask {
    z-index: 2;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: flex;
    flex-direction: column;
    /* Keeps the "lighting up" effect */
    mix-blend-mode: screen; 
  }

  .media-container {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }

  .float {
    position: absolute;
    width: 28%;
    border-radius: 24px;
    overflow: hidden;
  }

  .float img { width: 100%; display: block; }

  .image-top { top: 15%; left: 10%; }
  .image-bottom { bottom: 25%; left: 20%; }

  .video-wrap {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
  }

  .video-wrap video {
    width: 400px;
    height: 600px;
    object-fit: cover;
    border-radius: 32px;
  }

  .media-mask .headline span > span {
    background: inherit;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
</style>