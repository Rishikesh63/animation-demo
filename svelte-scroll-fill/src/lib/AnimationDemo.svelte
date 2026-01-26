<script>
	import Animate from './FloatingCard.svelte';
</script>

<section>
	<h1>SCROLL DOWN</h1>
</section>

<section>
	<div class="container">
		<div class="heading">
			<Animate variant="top"><h1>TOP</h1></Animate>
			<Animate variant="fade"><h1>AND</h1></Animate>
			<Animate variant="bottom"><h1>BOTTOM</h1></Animate>
		</div>

		<div class="boxes-col">
			<Animate variant="top" duration={1}><div class="box" /></Animate>
			<Animate variant="bottom" duration={1}><div class="box" /></Animate>
			<Animate variant="top" duration={1.5} delay={0.2}><div class="box" /></Animate>
			<Animate variant="bottom" duration={1.5} delay={0.2}><div class="box" /></Animate>
			<Animate variant="top" duration={2} delay={0.4}><div class="box" /></Animate>
			<Animate variant="bottom" duration={2} delay={0.4}><div class="box" /></Animate>
		</div>
	</div>
</section>

<section>
	<div class="container">
		<div class="heading">
			<Animate variant="left"><h1>LEFT</h1></Animate>
			<Animate variant="fade"><h1>AND</h1></Animate>
			<Animate variant="right"><h1>RIGHT</h1></Animate>
		</div>

		<div class="boxes-row">
			<Animate variant="left" duration={1}><div class="box" /></Animate>
			<Animate variant="right" duration={1}><div class="box" /></Animate>
			<Animate variant="left" duration={1.5} delay={0.2}><div class="box" /></Animate>
			<Animate variant="right" duration={1.5} delay={0.2}><div class="box" /></Animate>
			<Animate variant="left" duration={2} delay={0.4}><div class="box" /></Animate>
			<Animate variant="right" duration={2} delay={0.4}><div class="box" /></Animate>
		</div>
	</div>
</section>

<section>
	<div class="container">
		<div class="heading">
			<Animate variant="fade"><h1>FADE</h1></Animate>
			<Animate variant="fade"><h1>AND</h1></Animate>
			<Animate variant="scale"><h1>SCALE</h1></Animate>
		</div>

		<div class="boxes-col">
			<Animate variant="fade" duration={1}><div class="box" /></Animate>
			<Animate variant="scale" duration={1}><div class="box" /></Animate>
			<Animate variant="fade" duration={1.5} delay={0.2}><div class="box" /></Animate>
			<Animate variant="scale" duration={1.5} delay={0.2}><div class="box" /></Animate>
			<Animate variant="fade" duration={2} delay={0.4}><div class="box" /></Animate>
			<Animate variant="scale" duration={2} delay={0.4}><div class="box" /></Animate>
		</div>
	</div>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		width: 100%;
		text-align: center;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		justify-content: space-evenly;
	}

	.heading {
		display: flex;
		justify-content: center;
		gap: 20px;
	}

	.boxes-col {
		display: flex;
		justify-content: space-evenly;
	}

	.boxes-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.box {
		height: 100px;
		width: 100px;
		background-color: blue;
	}
</style>
