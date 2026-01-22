<style>
/* HERO — FIXED FULLSCREEN */
.hero {
  position: fixed;
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
  object-fit: cover;
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

/* CENTER CONTENT */
.center-text {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 6vw;
}

.center-text h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 600;
  line-height: 1.1;
  margin: 0;
}

.center-text em {
  display: block;
  margin-top: 0.75rem;
  font-size: clamp(1.4rem, 2.6vw, 2rem);
  font-style: italic;
  font-weight: 400;
  opacity: 0.9;
}

/* CTA — RIGHT ALIGNED (OPTIONAL, KEPT) */
/* .cta {
  position: absolute;
  right: 4vw;
  bottom: 4vw;
  display: flex;
  gap: 0.75rem;
  z-index: 3;
} */

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

  <!-- CENTER TEXT -->
  <div class="center-text">
    <h1>
      The ultimate way<br />
      to grow your plants
      <em>at scale</em>
    </h1>
  </div>

  <!-- CTA (optional) -->
  <!-- <div class="cta">
    <button class="price">Start growing</button>
    <button class="buy">Learn more</button>
  </div> -->
</section>
