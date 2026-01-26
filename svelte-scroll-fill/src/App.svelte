<script lang="ts">
	import NavBar from "./lib/NavBar.svelte";
	import Hero from "./lib/Hero.svelte";
	import CardStack from "./lib/CardStack.svelte";
	import ScrollFloatingCards from "./lib/ScrollFloatingCards.svelte";
</script>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-y: auto;
	}

	.app {
		min-height: 100vh;
	}
</style>

<div class="app">
	<NavBar />

	<!-- Normal hero -->
	<Hero />

	<!-- 🔥 SCROLL-DRIVEN FLOATING FEATURE -->
	<CardStack />

	<ScrollFloatingCards />

	<!-- Next content -->
</div>
