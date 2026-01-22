<script lang="ts">
  const testimonials = [
    {
      name: "Sarah Williams",
      role: "Product Designer",
      quote:
        "This product feels thoughtfully crafted. Everything works exactly how you expect — effortlessly.",
      avatar: "https://i.pravatar.cc/120?img=32"
    },
    {
      name: "Arjun Mehta",
      role: "Frontend Engineer",
      quote:
        "The attention to detail is unreal. Performance, polish, and clarity in every interaction.",
      avatar: "https://i.pravatar.cc/120?img=12"
    },
    {
      name: "Emily Chen",
      role: "Startup Founder",
      quote:
        "It’s rare to find software that feels both powerful and calming to use. This nails it.",
      avatar: "https://i.pravatar.cc/120?img=48"
    }
  ];
</script>

<style>
.testimonials {
  padding: 8vh 6vw;
  background: black;
  color: white;
}

.heading {
  max-width: 900px;
  margin-bottom: 4rem;
}

.heading h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  margin: 0 0 1rem;
}

.heading p {
  color: #aaa;
  font-size: 1.05rem;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

/* Card */
.card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease, background 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  background: rgba(255, 255, 255, 0.12);
}

/* Quote */
.quote {
  font-size: 1.05rem;
  line-height: 1.5;
  margin-bottom: 2rem;
}

/* User */
.user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info span {
  font-size: 0.85rem;
  color: #aaa;
}
</style>

<section class="testimonials">
  <div class="heading">
    <h2>Loved by creators worldwide</h2>
    <p>People building thoughtful digital products trust this experience.</p>
  </div>

  <div class="grid">
    {#each testimonials as t}
      <div class="card">
        <p class="quote">“{t.quote}”</p>

        <div class="user">
          <img src={t.avatar} alt={t.name} />
          <div class="user-info">
            <strong>{t.name}</strong>
            <span>{t.role}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
