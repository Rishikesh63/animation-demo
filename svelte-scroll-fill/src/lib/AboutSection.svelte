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

    <!-- MEDIA LAYER (IMAGES + VIDEO) -->
    <div class="media-layer">

      <!-- LEFT IMAGES -->
      <div
        class="float image-top"
        style="transform: translate3d(0,{progress * -0.08}px,0)"
      >
        <img src="https://framerusercontent.com/images/5emb8oOwafbQsfWVIaaZ12WcTM.png" />
      </div>

      <div
        class="float image-bottom"
        style="transform: translate3d(0,{progress * -0.12}px,0)"
      >
        <img src="https://framerusercontent.com/images/tFXdT1GAWfzky0TCheIFtJR4O3I.png" />
      </div>

      <!-- RIGHT VIDEO -->
      <div class="video-wrap">
        <video
          src="https://framerusercontent.com/assets/fEkvm0HYUUFHc0WiH6ssCVGITR0.mp4"
          autoplay
          muted
          loop
          playsinline
        />
      </div>

    </div>

    <!-- TEXT LAYER (ON TOP OF EVERYTHING) -->
    <div class="text-layer">
      <h1 class="headline">
        Blending design and code with functional clarity and creative precision.
        Delivering thoughtful digital systems with structure, flow, and expressive interaction.
      </h1>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-inner">
        <p>
          We bridge creative direction with real-world execution, combining design
          and development into one <strong>seamless workflow</strong> to deliver
          digital experiences that perform.
        </p>

        <a href="/works" class="cta">SEE WORKS</a>
      </div>
    </div>

  </div>
</section>
<style>
:root {
  --black: #000;
  --white: #fff;
  --muted: #9a9a9a;
}

.about {
  background: var(--black);
  padding: 160px 0 140px;
  position: relative;
  overflow: hidden;
  font-family: 'Inter Display', system-ui, sans-serif;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
}

/* ================= MEDIA ================= */

.media-layer {
  position: relative;
  min-height: 85vh;
  z-index: 1;
}

.float {
  position: absolute;
  width: 20%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.55);
}

.float img {
  width: 100%;
  display: block;
}

.image-top {
  top: -6%;
  left: 4%;
}

.image-bottom {
  bottom: -50%;
  left: 6%;
}

/* VIDEO */
.video-wrap {
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-50%);
}

.video-wrap video {
  width: 300px;
  height: 560px;
  object-fit: cover;
  border-radius: 18px;
}

/* ================= TEXT ================= */

.text-layer {
  position: absolute;
  inset: 0;
  z-index: 3; /* text above everything */
  pointer-events: none;
}

.headline {
  max-width: 900px;
  padding-left: 14%;
  padding-top: 120px;
  font-size: clamp(40px, 5.8vw, 80px);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--white);
  margin: 0;
}

/* ================= FOOTER ================= */

.footer {
  margin-top: 120px;
  display: flex;
  justify-content: flex-end;
  padding-right: 15%;
  position: relative;
  z-index: 4;
}

.footer-inner {
  max-width: 420px;
}

.footer p {
  color: var(--muted);
  font-size: 1.15rem;
  line-height: 1.55;
  margin-bottom: 34px;
  margin-top: 70px;
}

.cta {
  display: inline-block;
  padding: 14px 36px;
  border-radius: 100px;
  border: 1.5px solid var(--white);
  color: var(--white);
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.06em;
  transition: all 0.35s cubic-bezier(.2,.8,.2,1);
}

.cta:hover {
  background: var(--white);
  color: var(--black);
  transform: translateY(-2px);
}

/* ================= RESPONSIVE ================= */

@media (max-width: 1024px) {
  .float {
    display: none;
  }

  .text-layer {
    position: static;
    pointer-events: auto;
  }

  .headline {
    padding: 0;
    text-align: center;
  }

  .video-wrap {
    position: static;
    transform: none;
    margin: 60px auto 0;
    display: flex;
    justify-content: center;
  }

  .footer {
    padding-right: 0;
    justify-content: center;
    text-align: center;
  }
}
</style>
