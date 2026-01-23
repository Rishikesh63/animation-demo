<script lang="ts">
	import { onMount } from 'svelte';
	import { useAnimatedText } from '../hooks/useAnimatedText';

	const phrases = ['at scale', 'with precision'];
	let index = 0;
	let cursor = 0;

	const anim = useAnimatedText(phrases[index], 2, 0);

	const next = () => {
		setTimeout(() => {
			index = (index + 1) % phrases.length;
			anim.reset(phrases[index]);
			cursor = 0;
			anim.start((c) => (cursor = c), next);
		}, 1200);
	};

	onMount(() => {
		anim.start((c) => (cursor = c), next);
		return () => anim.stop();
	});
</script>

<span class="at-scale">
	{#each anim.words.slice(0, cursor) as word, i}
		<span class="word" style={`animation-delay:${i * 0.08}s`}>
			{word}
		</span>
	{/each}
</span>

<style>
	.at-scale {
		display: flex;
		justify-content: center;
		gap: 0.45ch;
		font-family: "Instrument Serif", serif;
		font-style: italic;
		font-size: 64px;
		font-weight: 400;
		line-height: 110%;
		letter-spacing: -0.03em;
		color: #E8F7F3;
	}

	.word {
		opacity: 0;
		filter: blur(1.5px);
		animation: word-in 0.45s ease-out forwards;
	}

	@keyframes word-in {
		to {
			opacity: 1;
			filter: blur(0);
			transform: translateY(0);
		}
	}
</style>
