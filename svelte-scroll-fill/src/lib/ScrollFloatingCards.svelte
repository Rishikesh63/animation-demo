<script lang="ts">
    import { onMount } from 'svelte';

    // --- Animation Helpers ---
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
    
    const rangeProgress = (input: number, start: number, end: number) => {
        const t = (input - start) / (end - start);
        return Math.max(0, Math.min(1, t));
    };

    // --- State ---
    let section: HTMLElement;
    let nextSection: HTMLElement;
    
    // Target scroll values
    let rawProgress = 0;
    let rawNextProgress = 0;
    
    // Smoothed values for the "momentum" effect
    let smoothProgress = 0;
    let smoothNextProgress = 0;

    const cards = [
        { id: 1, from: { x: -280, y: 0 }, to: { x: -1050, y: -180 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809319-home-scroller-img-1-0.png' },
        { id: 2, from: { x: 450, y: -40 }, to: { x: 1050, y: -180 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-1.png' },
        { id: 3, from: { x: -390, y: 360 }, to: { x: -1150, y: 160 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-2.gif' },
        { id: 4, from: { x: 380, y: 260 }, to: { x: 1150, y: 160 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-3.png' }
    ];

    // --- SMOOTHING ENGINE ---
    function tick() {
        // Lowering to 0.08 makes the "momentum" even smoother and more premium
        smoothProgress = lerp(smoothProgress, rawProgress, 0.08);
        smoothNextProgress = lerp(smoothNextProgress, rawNextProgress, 0.08);
        
        requestAnimationFrame(tick);
    }

    // --- REACTIVE STYLES ---
    // Title Falling
    $: titleMoveDown = lerp(0, 500, smoothProgress); 
    $: phraseBlurExit = rangeProgress(smoothProgress, 0.45, 0.85);
    $: restWordBlurExit = rangeProgress(smoothProgress, 0.70, 0.95);

    $: phraseStyle = `
        opacity: ${1 - phraseBlurExit}; 
        filter: blur(${phraseBlurExit * 20}px);
        transform: translate3d(0, ${titleMoveDown}px, 0);
    `;
    $: restStyle = `
        opacity: ${1 - restWordBlurExit}; 
        filter: blur(${restWordBlurExit * 20}px);
        transform: translate3d(0, ${titleMoveDown}px, 0);
    `;

    // Next Section Rising (The "Smoothness" fix is here)
    // We increase the range (0.1 to 0.6) so the movement is more gradual
    $: nextEnter = rangeProgress(smoothNextProgress, 0.1, 0.6); 
    $: nextMoveUp = lerp(250, 0, nextEnter); // Now moves relative to the entering progress

    $: nextStyle = `
        opacity: ${nextEnter};
        filter: blur(${(1 - nextEnter) * 2}px);
        transform: translate3d(0, ${nextMoveUp}px, 0);
    `;

    function handleScroll() {
        const windowHeight = window.innerHeight;
        
        if (section) {
            const rect = section.getBoundingClientRect();
            // Calculate raw progress once per scroll event
            rawProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight)));
        }
        if (nextSection) {
            const rect = nextSection.getBoundingClientRect();
            rawNextProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight)));
        }
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        const frame = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(frame);
        };
    });
</script>

<div class="scroll-canvas">
    <section bind:this={section} class="main-wrapper">
        <div class="sticky-container">
            {#each cards as card}
                {@const t = rangeProgress(smoothProgress, card.startAt, card.endAt)}
                {@const x = lerp(card.from.x, card.to.x, t)}
                {@const y = lerp(card.from.y, card.to.y, t)}
                <div class="card-element" style="transform: translate3d({x}px, {y}px, 0);">
                    <img src={card.img} alt="" />
                </div>
            {/each}

            <div class="heading-layer">
                <h1 class="hatch-title">
                    <span style={phraseStyle}>Make space for&nbsp;</span>
                    <span style={restStyle}>rest</span>
                </h1>
            </div>
        </div>
    </section>

    <section bind:this={nextSection} class="landing-wrapper">
        <div class="content-box" style={nextStyle}>
            <p class="description-text">
                We make restful tech that puts humans first - it doesn't track you, 
                sell your data, or hijack your time. Our only goal is to help you 
                rest more, and sleep easier.
            </p>
            <div class="main-visual">
                <img src="https://www.datocms-assets.com/98401/1739823152-large-lifestyle.png" alt="Lifestyle Rest" />
            </div>
        </div>
    </section>
</div>

<style>
    :global(html, body) {
        margin: 0;
        background-color: #f9f7f2;
        font-family: serif;
        overflow-x: hidden;
    }

    .main-wrapper {
        height: 250vh; /* Keeps the cards on screen longer */
        position: relative;
    }

    .sticky-container {
        position: sticky;
        top: 0;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .hatch-title {
        font-size: clamp(32px, 7vw, 60px);
        color: #1a1a1a;
        display: flex;
        white-space: nowrap;
        z-index: 5;
    }

    .hatch-title span { 
        display: inline-block; 
        will-change: filter, opacity, transform; 
    }

    .card-element {
        position: absolute;
        width: 25vw;
        max-width: 380px;
        z-index: 2;
        will-change: transform;
    }

    .card-element img { 
        width: 100%;
        border-radius: 12px; 
    }

    .landing-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 20;
        background-color: white; /* Ensures it acts as a solid "blind" rising up */
        padding: 15vh 5vw;
    }

    .content-box {
        max-width: 800px;
        text-align: center;
        will-change: transform, opacity, filter;
    }

    .description-text {
        font-family: sans-serif;
        font-size: clamp(1.1rem, 2.5vw, 1.6rem);
        line-height: 1.5;
        color: #333;
        margin-bottom: 4rem;
    } 

    .main-visual img { 
        width: 100%; 
        border-radius: 24px; 
    }
</style>