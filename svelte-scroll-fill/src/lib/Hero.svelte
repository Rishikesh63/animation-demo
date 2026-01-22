<style>
/* HERO — FIXED FULLSCREEN */
.hero {
  position: fixed;        /* locks screen */
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
  color: white;
}

/* VIDEO — FULL SCREEN COVER */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;      /* no distortion */
  z-index: 0;
}

/* FADE OVERLAY */
.fade-bottom {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0) 45%,
    rgba(0,0,0,0.45) 70%,
    rgba(0,0,0,0.9) 100%
  );
}

/* CONTENT */
.hero-content {
  position: relative;
  z-index: 2;
  padding: 0 4vw;
  padding-top: 55vh;
  max-width: 1100px;
}

/* EYEBROW */
.eyebrow {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  opacity: 0.85;
}

/* TITLE */
.hero-content h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 600;
  line-height: 1.05;
  margin: 0.75rem 0 1.5rem;
}

/* CTA — RIGHT ALIGNED */
.cta {
  display: flex;
  gap: 0.75rem;
  margin-left: auto;     /* push to right */
  width: fit-content;
}

/* PRICE */
.price {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  border: none;
  color: white;
  font-size: 0.95rem;
}

/* BUY */
.buy {
  background: #0071e3;
  border-radius: 999px;
  padding: 0.5rem 1.2rem;
  border: none;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
}

.buy:hover {
  background: #0a84ff;
}
</style>

<section class="hero">
  <!-- Background Video -->
  <video
    class="hero-video"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    aria-hidden="true"
  >
    <source
      src="https://www.apple.com/105/media/ww/apple-watch-series-11/2025/ff7157de-c561-48f6-8427-90c1ce5498d1/anim/hero/large.mp4"
      type="video/mp4"
    />
  </video>

  <!-- Fade -->
  <div class="fade-bottom"></div>

  <!-- Content -->
  <div class="hero-content">
    <span class="eyebrow"> WATCH SERIES 11</span>
    <h1>The ultimate way to watch your health.</h1>

    <div class="cta">
      <button class="price">From $549</button>
      <button class="buy">Buy</button>
    </div>
  </div>
</section>
