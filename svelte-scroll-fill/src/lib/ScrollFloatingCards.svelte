<script lang="ts">
	import { onMount } from 'svelte';
	import type { CardConfig } from './scrollEngine';
	import {
		lerp,
		rangeProgress,
		computeScrollProgress
	} from './scrollEngine';

	let section: HTMLElement;
	let nextSection: HTMLElement;

	let progress = 0;
	let nextProgress = 0;

	/* ===============================
	   CARD CONFIG
	================================ */
	const cards: CardConfig[] = [
		{
			id: 1,
			from: { x: 50, y: -100 },
			to: { x: -300, y: -140 },
			startAt: 0.0,
			endAt: 0.35,
			blurFrom: 12,
			blurTo: 0
		},
		{
			id: 2,
			from: { x: 140, y: -120 },
			to: { x: 500, y: -400 },
			startAt: 0.15,
			endAt: 0.55,
			blurFrom: 12,
			blurTo: 0
		},
		{
			id: 3,
			from: { x: -140, y: 120 },
			to: { x: -600, y: 400 },
			startAt: 0.35,
			endAt: 0.8,
			blurFrom: 12,
			blurTo: 0
		},
		{
			id: 4,
			from: { x: 140, y: 120 },
			to: { x: 600, y: 500 },
			startAt: 0.55,
			endAt: 1,
			blurFrom: 12,
			blurTo: 0
		}
	];

	function onScroll() {
		progress = computeScrollProgress(section);
		nextProgress = computeScrollProgress(nextSection, 100);
	}

	onMount(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<!-- ===============================
	PAGE WRAPPER (OWNS BACKGROUND)
================================ -->
<div class="scroll-page">

	<!-- ===============================
		FLOATING CARDS SCENE
	================================ -->
	<section bind:this={section} class="wrapper">
		<div class="scene">
			{#each cards as card}
				{@const t = rangeProgress(progress, card.startAt, card.endAt)}

				<div
					class="card"
					style="
						transform: translate3d(
							calc(-50% + {lerp(card.from.x, card.to.x, t)}px),
							{lerp(card.from.y, card.to.y, t)}px,
							0
						);
						filter: blur({lerp(card.blurFrom, card.blurTo, t)}px);
					"
				/>
			{/each}

			<h2
				class="title"
				style="
					opacity: {1 - progress};
					filter: blur({lerp(4, 0, progress)}px);
				"
			>
				Scroll to Explore
			</h2>
		</div>
	</section>

	<!-- ===============================
		NEXT SECTION
	================================ -->
	<section bind:this={nextSection} class="next-section">
		<div
			class="next-card"
			style="
				opacity: {lerp(0.4, 1, nextProgress)};
				filter: blur({lerp(1, 0, nextProgress)}px);
				transform: translateY({lerp(30, 0, nextProgress)}px);
			"
		>
			<p>
				In mobile layouts, components such as lists or cards are stretched
				to fit the full width of the screen without compromising visual or UX
				qualities. When designing for large screens, use multiple columns to
				display content.
			</p>
		</div>
	</section>

</div>

<style>


/* ===============================
	SCROLL AREA
================================ */


.wrapper {
	min-height: 180vh;
	position: relative;
	z-index: 1;
}

/* ===============================
	STICKY SCENE
================================ */
.scene {
	position: sticky;
	top: 25vh;
	height: 50vh;
	display: grid;
	place-items: center;
}

/* ===============================
	CARDS
================================ */
.card {
	position: absolute;
    top: 30px;
	left: 50%;
	width: 200px;
	height: 260px;
	border-radius: 20px;
	background: #07e307f1;
	backdrop-filter: blur(10px);
	will-change: transform, filter;
}

/* ===============================
	TITLE
================================ */
.title {
	position: absolute;
	font-size: 2rem;
	text-align: center;
	will-change: opacity, filter;
    color:black;
}

/* ===============================
	NEXT SECTION
================================ */
.next-section {
	min-height: 100vh;
	display: grid;
	place-items: center;
}

.next-card {
	width: 420px;
	padding: 0;
	border-radius: 20px;
	background: rgba(244, 9, 9, 0.22);
	text-align: center;
	will-change: transform, filter, opacity;
    color: black;
}
</style>
