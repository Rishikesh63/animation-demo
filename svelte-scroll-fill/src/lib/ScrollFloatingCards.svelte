<script lang="ts">
    import { onMount } from 'svelte';

    // --- Animation Helpers ---
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
    
    const rangeProgress = (input: number, start: number, end: number) => {
        const t = (input - start) / (end - start);
        return Math.max(0, Math.min(1, t));
    };

    const computeScrollProgress = (el: HTMLElement) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = (windowHeight - rect.top) / (rect.height + windowHeight);
        return Math.max(0, Math.min(1, progress));
    };

    // --- State ---
    let section: HTMLElement;
    let nextSection: HTMLElement;
    let progress = 0;
    let nextProgress = 0;
   
   // --- Unified Horizontal Card Configurations ---
    const cards = [
        // Left Card 1
        { id: 1, from: { x: -280, y: -180 }, to: { x: -1050, y: -180 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809319-home-scroller-img-1-0.png' },
        // Right Card 2
        { id: 2, from: { x: 450, y: -180 }, to: { x: 1050, y: -180 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-1.png' },
        // Left Card 3
        { id: 3, from: { x: -390, y: 160 }, to: { x: -1150, y: 160 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-2.gif' },
        // Right Card 4
        { id: 4, from: { x: 380, y: 160 }, to: { x: 1150, y: 160 }, startAt: 0.1, endAt: 0.8, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-3.png' }
    ];

    // --- BLURING EFFECT LOGIC (As per screenshot) ---
    // Phrase blurs early
    $: phraseBlurExit = rangeProgress(progress, 0.30, 0.40);
    // "rest" blurs much later
    $: restWordBlurExit = rangeProgress(progress, 0.40, 0.5);

    $: phraseStyle = `
        opacity: ${1 - phraseBlurExit}; 
        filter: blur(${lerp(0, 15, phraseBlurExit)}px);
    `;
    $: restStyle = `
        opacity: ${1 - restWordBlurExit}; 
        filter: blur(${lerp(0, 15, restWordBlurExit)}px);
    `;

    // Next component seamless rising
    $: nextEnter = rangeProgress(nextProgress, 0.1, 0.5); 
    $: nextStyle = `
        opacity: ${nextEnter};
        filter: blur(${lerp(15, 0, nextEnter)}px);
        transform: translateY(${lerp(100, 0, nextEnter)}px);
    `;

    function handleScroll() {
        if (section) progress = computeScrollProgress(section);
        if (nextSection) nextProgress = computeScrollProgress(nextSection);
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<div class="scroll-canvas">
    
    <section bind:this={section} class="main-wrapper">
        <div class="sticky-container">
            <div class="heading-layer">
                <h1 class="hatch-title">
                    <span style={phraseStyle}>Make space for&nbsp;</span>
                    <span style={restStyle}>rest</span>
                </h1>
            </div>

            {#each cards as card}
                {@const t = rangeProgress(progress, card.startAt, card.endAt)}
                {@const x = lerp(card.from.x, card.to.x, t)}
                {@const y = lerp(card.from.y, card.to.y, t)}
                <div class="card-element" style="transform: translate3d({x}px, {y}px, 0);">
                    <img src={card.img} alt="" />
                </div>
            {/each}
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
        /* padding: 0; */
        /* background-color: #f9f7f2; */
        font-family: serif;
        overflow-x: auto;
    }

    /* .scroll-canvas {
        background-color: #f9f7f2;
    } */

    .main-wrapper {
        height: 300vh;
        position: relative;
        margin-bottom: -100vh; /* Eliminates the border gap */
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
        font-size: clamp(32px, 7vw, 50px);
        color: #1a1a1a;
        display: flex;
        white-space: nowrap;
        z-index: 5;
    }

    .hatch-title span { 
        display: inline-block; 
        will-change: filter, opacity; 
    }

    .card-element {
        position: absolute;
        width: 25vw;
        max-width: 380px;
        z-index: 10;
        will-change: transform;
        
    }

    .card-element img { width: 100%;
         border-radius: 12px; 
        }

    .landing-wrapper {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        /* padding: 20vh 5vw; */
        position: relative;
        z-index: 20;
    }

    .content-box {
        max-width: 800px;
        text-align: center;
    }

    .description-text {
        font-family: sans-serif;
        font-size: clamp(1.1rem, 2.5vw, 1.6rem);
        line-height: 1.5;
        color: #333;
        margin-bottom: 4rem;
    }

    .main-visual img { width: 100%; 
    border-radius: 24px; 
    }
</style>