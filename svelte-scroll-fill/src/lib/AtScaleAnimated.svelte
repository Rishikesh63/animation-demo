<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const phrases = ['at scale', 'with precision'];

	let phraseIndex = 0;
	let displayText: string[] = [];
	let charIndex = 0;
	let isDeleting = false;
	let timer: ReturnType<typeof setTimeout> | null = null;

	const typingSpeed = 60;   // ms per char (smooth)
	const deleteSpeed = 40;   // erase speed
	const lineDelay = 1200;   // pause after full phrase

	function step() {
		const full = phrases[phraseIndex];

		if (!isDeleting) {
			// Typing
			if (charIndex < full.length) {
				displayText = [...displayText, full[charIndex]];
				charIndex++;
				timer = setTimeout(step, typingSpeed);
			} else {
				timer = setTimeout(() => {
					isDeleting = true;
					step();
				}, lineDelay);
			}
		} else {
			// Deleting
			if (charIndex > 0) {
				charIndex--;
				displayText = displayText.slice(0, -1);
				timer = setTimeout(step, deleteSpeed);
			} else {
				isDeleting = false;
				phraseIndex = (phraseIndex + 1) % phrases.length;
				timer = setTimeout(step, typingSpeed);
			}
		}
	}

	onMount(() => {
		step();
	});

	onDestroy(() => {
		if (timer) clearTimeout(timer);
	});

	/* IN transition */
	function flyBlurIn(
		node: Element,
		{ duration = 200, y = 8, blur = 6 } = {}
	) {
		return {
			duration,
			css: (t: number) => {
				const u = 1 - t;
				return `
					opacity: ${t};
					transform: translateY(${u * y}px);
					filter: blur(${u * blur}px);
				`;
			}
		};
	}

	/* OUT transition */
	function blurOut(
		node: Element,
		{ duration = 120, blur = 6 } = {}
	) {
		return {
			duration,
			css: (t: number) => {
				const u = 1 - t;
				return `
					opacity: ${t};
					filter: blur(${u * blur}px);
				`;
			}
		};
	}
</script>

<div class="wrapper">
	<span class="animated-text">
		{#each displayText as ch, i (i)}
			<span
				class="char"
				in:flyBlurIn
				out:blurOut
			>
				{ch === ' ' ? '\u00A0' : ch}
			</span>
		{/each}
	</span>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.animated-text {
		display: flex;
		white-space: nowrap;

		font-family: "Instrument Serif", serif;
		font-style: italic;
		font-size: 64px;
		font-weight: 400;
		line-height: 110%;
		letter-spacing: -0.03em;
		color: #E8F7F3;
	}

	.char {
		display: inline-block;
		will-change: transform, filter, opacity;
	}
</style>
