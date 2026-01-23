<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const phrases = ['at scale', 'with precision'];

	let phraseIndex = 0;
	let text = '';
	let charIndex = 0;

	let mode: 'typing' | 'erasing' = 'typing';

	const TYPE_DURATION = 500; 
	const ERASE_DURATION = 300; 
	const PAUSE_AFTER_TYPE = 1200;

	let timer: number;

	function startTyping() {
		clearInterval(timer);
		const phrase = phrases[phraseIndex];
		const step = TYPE_DURATION / phrase.length;

		timer = window.setInterval(() => {
			charIndex++;
			text = phrase.slice(0, charIndex);

			if (charIndex === phrase.length) {
				clearInterval(timer);
				setTimeout(startErasing, PAUSE_AFTER_TYPE);
			}
		}, step);
	}

	function startErasing() {
		clearInterval(timer);
		const phrase = phrases[phraseIndex];
		const step = ERASE_DURATION / phrase.length;

		timer = window.setInterval(() => {
			charIndex--;
			text = phrase.slice(0, charIndex);

			if (charIndex === 0) {
				clearInterval(timer);
				phraseIndex = (phraseIndex + 1) % phrases.length;
				startTyping();
			}
		}, step);
	}

	onMount(() => {
		startTyping();
	});

	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<span class="at-scale">
	{text}
</span>

<style>
	.at-scale {
		display: inline-block;
		white-space: nowrap;

		font-family: "Instrument Serif", serif;
		font-style: italic;
		font-size: 64px;
		font-weight: 400;
		line-height: 110%;
		letter-spacing: -0.03em;
		color: #E8F7F3;
	}
</style>
