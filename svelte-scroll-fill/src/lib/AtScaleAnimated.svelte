<script lang="ts">
	import { onMount } from 'svelte';
	import { useAnimatedText } from '../hooks/useAnimatedText';

	export let className = '';

	const anim = useAnimatedText('at scale', 0.8, 0);
	let cursor = 0;

	onMount(() => {
		anim.start((c) => (cursor = c));
		return () => anim.stop();
	});
</script>

<span class={`at-scale ${className}`}>
	{#each anim.words.slice(0, cursor) as word, i}
		<span class="word" style={`animation-delay:${i * 0.08}s`}>
			{word}
		</span>
	{/each}
</span>

<style>
	.at-scale {
	display: flex;
	margin-top: 0.5rem;
	gap: 0.45ch;
    justify-content: center;
	font-family: "Instrument Serif", serif;
	font-style: italic;
	font-size: 64px;
	font-weight: 400;
	line-height: 110%;
	letter-spacing: -0.03em;
	color: #E8F7F3;
	opacity: 1;
}


	.word {
		display: inline-block;
		opacity: 0;
		filter: blur(1.5px);
		animation: word-in 0.45s ease-out forwards;
	}

	@keyframes word-in {
		from {
			opacity: 0;
			filter: blur(1.5px);
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			filter: blur(0);
			transform: translateY(0);
		}
	}
</style>
