<script lang="ts">
	import { onMount } from 'svelte';

	let section: HTMLElement;

	let raw = 0;
	let cards = 0;
	let heading = 0;
	let content = 0;

	const clamp = (v: number) => Math.min(1, Math.max(0, v));
	const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

	function onScroll() {
		const rect = section.getBoundingClientRect();
		const vh = window.innerHeight;

		raw = clamp((vh - rect.top) / (vh + rect.height));

		// TIMING MATCHES REAL SITE
		cards = easeOut(clamp(raw / 0.5));
		heading = clamp((raw - 0.5) / 0.2);
		content = clamp((raw - 0.7) / 0.3);
	}

	onMount(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>


<section bind:this={section} class="scroll-section">

	<!-- STICKY FLOATING CARDS -->
	<div class="floating-grid">

		<div class="floating-box box-1"
			style="transform:
				translateX({-75 * cards}px)
				translateY({-40 * cards}px)">
			<img src="https://www.datocms-assets.com/98401/1755809319-home-scroller-img-1-0.png" />
		</div>

		<div class="floating-box box-2"
			style="transform:
				translateX({75 * cards}px)
				translateY({-96 * cards}px)">
			<img src="https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-1.png" />
		</div>

		<div class="floating-box box-3"
			style="transform:
				translateX({-75 * cards}px)
				translateY({40 * cards}px)">
			<img src="https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-2.gif" />
		</div>

		<div class="floating-box box-4"
			style="transform:
				translateX({75 * cards}px)
				translateY({-80 * cards}px)">
			<img src="https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-3.png" />
		</div>

	</div>

	<!-- TEXT + 5TH IMAGE -->
	<div class="content-layer">

		<h1 style="opacity:{heading}; filter:blur({10 - 10*heading}px)">
			Make space for<br />rest
		</h1>

		<p style="opacity:{content}; transform:translateY({24 - 24*content}px)">
			We make restful tech that puts humans first — it doesn't track you,
			sell your data, or hijack your time. Our only goal is to help you rest
			more, and sleep easier.
		</p>

		<div class="content-image"
			style="opacity:{content}; transform:translateY({32 - 32*content}px)">
			<img src="https://www.datocms-assets.com/98401/1739823152-large-lifestyle.png" />
		</div>

	</div>

</section>


<style>
/* ONE SCROLLBAR ONLY */
body {
	margin: 0;
	overflow-x: hidden;
}

/* MAIN SECTION */
.scroll-section {
	position: relative;
	height: 200vh; /* creates scroll space */
	background: #faf8f4;
	font-family: system-ui, sans-serif;
}

/* STICKY FLOATING GRID */
.floating-grid {
	position: sticky;
	top: 0;
	height: 100vh;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-rows: repeat(24, 1fr);
	overflow: hidden;
	z-index: 1;
}

/* FLOATING CARDS */
.floating-box {
	position: relative;
	will-change: transform;
}

.floating-box img {
	position: absolute;
	top: 20%;
	width: 100%;
	height: auto;
	border-radius: 16px;
}

/* GRID POSITIONS */
.box-1 { grid-area: 3 / 2 / 6 / 4; }
.box-2 { grid-area: 5 / 10 / 8 / 13; }
.box-3 { grid-area: 8 / 3 / 10 / 5; }
.box-4 { grid-area: 10 / 9 / 12 / 11; }

/* TEXT + 5TH IMAGE */
.content-layer {
	position: relative;
	max-width: 620px;
	margin: 0 auto;
	padding-top: 120vh; /* text comes AFTER cards */
	text-align: center;
	z-index: 2;
}

h1 {
	font-size: clamp(3rem, 6vw, 4rem);
	line-height: 1.05;
	margin-bottom: 1.5rem;
}

p {
	color: #42464e;
}

.content-image img {
	width: 100%;
	margin-top: 3rem;
	border-radius: 16px;
}

</style>
