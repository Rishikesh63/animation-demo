<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	// Using the same structure as the placeholder logic
	const placeholderLines: string[] = ['at scale', 'with precision']; // Your phrases as placeholderLines
	const placeholderTypingSpeed = 25; // Your typingSpeed
	const placeholderDeleteSpeed = 15; // Your deleteSpeed
	const placeholderLineDelay = 800; // Your lineDelay

	let placeholderIndex = 0;
	let placeholderText: string[] = [];
	let placeholderCharIndex = 0;
	let placeholderDeleting = false;
	let placeholderTimer: ReturnType<typeof setTimeout> | null = null;

	const stepPlaceholder = () => {
		const full = placeholderLines[placeholderIndex];

		if (!placeholderDeleting) {
			if (placeholderCharIndex < full.length) {
				placeholderText = [...placeholderText, full[placeholderCharIndex]];
				placeholderCharIndex += 1;
				placeholderTimer = setTimeout(stepPlaceholder, placeholderTypingSpeed);
			} else {
				placeholderTimer = setTimeout(() => {
					placeholderDeleting = true;
					stepPlaceholder();
				}, placeholderLineDelay);
			}
		} else if (placeholderCharIndex > 0) {
			placeholderCharIndex -= 1;
			placeholderText = placeholderText.slice(0, -1);
			placeholderTimer = setTimeout(stepPlaceholder, placeholderDeleteSpeed);
		} else {
			placeholderDeleting = false;
			placeholderIndex = (placeholderIndex + 1) % placeholderLines.length;
			placeholderTimer = setTimeout(stepPlaceholder, placeholderTypingSpeed);
		}
	};

	onMount(stepPlaceholder);

	onDestroy(() => {
		if (placeholderTimer !== null) {
			clearTimeout(placeholderTimer);
		}
	});

	// Exact same transitions as placeholder
	const flyBlurIn = (
		node: Element,
		{
			delay = 0,
			duration = 200,
			y = 10,
			blur = 6
		}: { delay?: number; duration?: number; y?: number; blur?: number } = {}
	) => {
		return {
			delay,
			duration,
			css: (t: number) => {
				const u = 1 - t;
				const opacity = t;
				const translateY = u * y;
				const blurAmount = u * blur;

				return `
                    opacity: ${opacity};
                    transform: translateY(${translateY}px);
                    filter: blur(${blurAmount}px);
                `;
			}
		};
	};

	const blurOut = (
		node: Element,
		{
			delay = 0,
			duration = 140,
			blur = 6
		}: { delay?: number; duration?: number; blur?: number } = {}
	) => {
		return {
			delay,
			duration,
			css: (t: number) => {
				const u = 1 - t;
				const opacity = t;
				const blurAmount = u * blur;

				return `
                    opacity: ${opacity};
                    transform: translateY(0px);
                    filter: blur(${blurAmount}px);
                `;
			}
		};
	};
</script>

<div class="wrapper">
	<span class="animated-text">
		{#each placeholderText as ch, i (i)}
			<span
				class="char"
				in:flyBlurIn={{ duration: 200, y: 8, blur: 6 }}
				out:blurOut={{ duration: 120, blur: 6 }}
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
		display: inline-flex;
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