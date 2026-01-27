<script lang="ts">
    import { onMount } from 'svelte';

    // --- Animation Helpers ---
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
    
    const rangeProgress = (input: number, start: number, end: number) => {
        const t = (input - start) / (end - start);
        return Math.max(0, Math.min(1, t));
    };

    let section: HTMLElement;
    let lifestyleSection: HTMLElement;
    
    let rawProgress = 0;
    let rawLifestyleProgress = 0;
    
    let smoothProgress = 0;
    let smoothLifestyleProgress = 0;

    const cards = [
        { id: 1, from: { x: -280, y: 0 }, to: { x: -1050, y: -180 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809319-home-scroller-img-1-0.png' },
        { id: 2, from: { x: 450, y: -40 }, to: { x: 1050, y: -180 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-1.png' },
        { id: 3, from: { x: -390, y: 360 }, to: { x: -1150, y: 160 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-2.gif' },
        { id: 4, from: { x: 380, y: 260 }, to: { x: 1150, y: 160 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-3.png' }
    ];

    function tick() {
        const friction = 0.08;
        smoothProgress = lerp(smoothProgress, rawProgress, friction);
        smoothLifestyleProgress = lerp(smoothLifestyleProgress, rawLifestyleProgress, friction);
        requestAnimationFrame(tick);
    }

    // --- IMPROVED CHOREOGRAPHY ---
    // 1. Title Exit (Ends at 0.6)
    $: phraseExit = rangeProgress(smoothProgress, 0.35, 0.55);
    $: restExit = rangeProgress(smoothProgress, 0.40, 0.60);

    // 2. Paragraph Entry (Starts at 0.6 immediately after title leaves)
    $: paraEnter = rangeProgress(smoothProgress, 0.50, 0.70);

    // 3. Layer Global Exit (Only starts when lifestyle section actually hits the viewport)
    $: layerExit = 1 - rangeProgress(smoothLifestyleProgress, 0, 0.2);

    $: phraseStyle = `opacity: ${1 - phraseExit}; filter: blur(${phraseExit * 15}px);`;
    $: restStyle = `opacity: ${1 - restExit}; filter: blur(${restExit * 15}px);`;

    $: paraStyle = `
        opacity: ${paraEnter}; 
        filter: blur(${(1 - paraEnter) * 20}px);
        transform: translate3d(0, ${lerp(30, 0, paraEnter)}px, 0);
        visibility: ${paraEnter <= 0 ? 'hidden' : 'visible'};
    `;

    $: fixedLayerStyle = `
        opacity: ${layerExit};
        visibility: ${layerExit <= 0 ? 'hidden' : 'visible'};
    `;

    // --- LIFESTYLE IMAGE STYLE ---
    $: lifestyleEnter = rangeProgress(smoothLifestyleProgress, 0.1, 0.6);
    $: lifestyleStyle = `
        opacity: ${lifestyleEnter};
        filter: blur(${(1 - lifestyleEnter) * 15}px);
        transform: translate3d(0, ${lerp(100, 0, lifestyleEnter)}px, 0);
    `;

    function handleScroll() {
        const windowHeight = window.innerHeight;
        if (section) {
            const rect = section.getBoundingClientRect();
            // Full range scroll progress
            rawProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight)));
        }
        if (lifestyleSection) {
            const rect = lifestyleSection.getBoundingClientRect();
            rawLifestyleProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight)));
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
    <div class="fixed-content-layer" style={fixedLayerStyle}>
        <h1 class="hatch-title" style="visibility: {phraseExit >= 1 && restExit >= 1 ? 'hidden' : 'visible'}">
            <span style={phraseStyle}>Make space for&nbsp;</span>
            <span style={restStyle}>rest</span>
        </h1>

        <div class="para-container" style={paraStyle}>
            <p class="description-text">
                We make restful tech that puts humans first - it doesn't track you, 
                sell your data, or hijack your time. Our only goal is to help you 
                rest more, and sleep easier.
            </p>
        </div>
    </div>

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
        </div>
    </section>

    <section bind:this={lifestyleSection} class="lifestyle-wrapper">
        <div class="lifestyle-container" style={lifestyleStyle}>
            <img src="https://www.datocms-assets.com/98401/1739823152-large-lifestyle.png" alt="Lifestyle Rest" />
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
        height: 400vh; /* Increased height to give the paragraph time to shine */
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

    .fixed-content-layer {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        pointer-events: none;
        will-change: opacity;
    }

    .hatch-title {
        position: absolute;
        margin: 0;
        font-size: clamp(32px, 7vw, 60px);
        color: #1a1a1a;
        text-align: center;
        white-space: nowrap;
    }

    .para-container {
        position: absolute;
        max-width: 650px;
        padding: 0 24px;
        text-align: center;
        will-change: transform, opacity, filter;
    }

    .description-text {
        font-family: sans-serif;
        font-size: clamp(1.2rem, 2.5vw, 1.5rem);
        line-height: 1.6;
        color: #333;
        margin: 0;
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
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    }

    .lifestyle-wrapper {
        min-height: 120vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10vh 5vw;
        background-color: #f9f7f2;
        position: relative;
        z-index: 20;
    }

    .lifestyle-container {
        max-width: 1000px;
        width: 100%;
    }

    .lifestyle-container img {
        width: 100%;
        border-radius: 24px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    }
</style>