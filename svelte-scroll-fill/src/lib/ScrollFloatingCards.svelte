<script lang="ts">
	import { onMount } from 'svelte';

	let section: HTMLElement;
	let nextSection: HTMLElement;

	let progress = 0;
	let nextProgress = 0;

	function lerp(a: number, b: number, t: number) {
		return a + (b - a) * t;
	}

	function clamp(v: number, min = 0, max = 1) {
		return Math.min(max, Math.max(min, v));
	}

	function cardProgress(global: number, start: number, end: number) {
		return clamp((global - start) / (end - start));
	}

	function onScroll() {
	const viewport = window.innerHeight;

	/* main scene */
	const rect = section.getBoundingClientRect();
	const raw = 1 - (rect.bottom - viewport) / rect.height;
	progress = clamp(raw);

	/* next section (FIXED) */
	const nextRect = nextSection.getBoundingClientRect();
	const rawNext =
		(viewport - nextRect.top) / (viewport + nextRect.height);
	nextProgress = clamp(rawNext);
}


	onMount(() => {
		window.addEventListener('scroll', onScroll);
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<!-- ================= SCROLL SCENE ================= -->
<section bind:this={section} class="wrapper">
	<div class="scene">
		<div class="cards" style="opacity:{1 - progress}">
			
			<!-- CARD 1 -->
			<div
				class="card"
				style="
					transform: translate(
						{lerp(-140, -700, progress)}px,
						{lerp(-120, -500, progress)}px
					);
					filter: blur({lerp(10, 0, cardProgress(progress, 0.0, 0.35))}px);
				"
			/>

			<!-- CARD 2 -->
			<div
				class="card"
				style="
					transform: translate(
						{lerp(140, 500, progress)}px,
						{lerp(-120, -400, progress)}px
					);
					filter: blur({lerp(10, 0, cardProgress(progress, 0.15, 0.55))}px);
				"
			/>

			<!-- CARD 3 -->
			<div
				class="card"
				style="
					transform: translate(
						{lerp(-140, -600, progress)}px,
						{lerp(120, 400, progress)}px
					);
					filter: blur({lerp(10, 0, cardProgress(progress, 0.35, 0.8))}px);
				"
			/>

			<!-- CARD 4 -->
			<div
				class="card"
				style="
					transform: translate(
						{lerp(140, 600, progress)}px,
						{lerp(120, 500, progress)}px
					);
					filter: blur({lerp(10, 0, cardProgress(progress, 0.55, 1))}px);
				"
			/>
		</div>

		<!-- TITLE -->
		<h2
			class="title"
			style="
				opacity: {1 - progress};
				filter: blur({lerp(1, 0, progress)}px);
			"
		>
			Scroll to Explore
		</h2>
	</div>
</section>

<!-- ================= NEXT SECTION ================= -->
<section bind:this={nextSection} class="next-section">
	<div
		class="next-card"
		style="
			filter: blur({lerp(1, 0, nextProgress)}px);
			opacity: {lerp(0.6, 1, nextProgress)};
			transform: translateY({lerp(20, 0, nextProgress)}px);
		"
	>
		<p>
			In mobile layouts, components such as lists or cards are stretched to fit the full width of the screen without compromising visual or ux qualities. When designing for large screens, use multiple columns to display content
		</p>
	</div>
</section>

<style>
/* ================= SCROLL AREA ================= */
.wrapper {
	min-height: 160vh;
	/* padding-top: 100vh; */
	position: relative;
    z-index: 1;
}

/* ================= STICKY SCENE ================= */
.scene {
	position: sticky;
	top: calc(100vh + 60vh);
	height: 50vh;
	display: grid;
	place-items: center;
}

/* ================= CARDS ================= */
.cards {
	position: absolute;
	inset: 0;
}

.card {
	position: absolute;
	left: 50%;
	width: 200px;
	height: 260px;
	background: rgba(6, 233, 29, 0.15);
	border-radius: 20px;
	backdrop-filter: blur(10px);
	will-change: transform, filter;
}

/* ================= TEXT ================= */
.title {
	position: absolute;
	text-align: center;
	font-size: 2rem;
	will-change: opacity, filter;
}

/* ================= NEXT SECTION ================= */
.next-section {
	min-height: 100vh;
	display: grid;
	place-items: center;
}

.next-card {
	width: 420px;
	padding: 0px;
	border-radius: 20px;
	background: rgba(255, 255, 255, 0.22);
	text-align: center;
	will-change: transform, filter, opacity;
}
</style>
