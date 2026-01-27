<script lang="ts">
    import { onMount } from 'svelte';

    // --- Animation Helpers ---
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
    
    const rangeProgress = (input: number, start: number, end: number) => {
        const t = (input - start) / (end - start);
        return Math.max(0, Math.min(1, t));
    };

    let section: HTMLElement;
    let rawProgress = 0;
    let smoothProgress = 0;

    const cards = [
        { id: 1, from: { x: -280, y: 0 }, to: { x: -1050, y: -180 }, startAt: 0.1, endAt: 0.7, img: 'https://www.datocms-assets.com/98401/1755809319-home-scroller-img-1-0.png' },
        { id: 2, from: { x: 450, y: -40 }, to: { x: 1050, y: -180 }, startAt: 0.1, endAt: 0.7, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-1.png' },
        { id: 3, from: { x: -390, y: 360 }, to: { x: -1150, y: 160 }, startAt: 0.1, endAt: 0.7, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-2.gif' },
        { id: 4, from: { x: 380, y: 260 }, to: { x: 1150, y: 160 }, startAt: 0.1, endAt: 0.7, img: 'https://www.datocms-assets.com/98401/1755809335-home-scroller-img-1-3.png' }
    ];

    function tick() {
        smoothProgress = lerp(smoothProgress, rawProgress, 0.08);
        requestAnimationFrame(tick);
    }

    // --- CHOREOGRAPHY ---
    $: phraseExit = rangeProgress(smoothProgress, 0.30, 0.50);
    $: restExit = rangeProgress(smoothProgress, 0.35, 0.55);

    // Paragraph & Image Entry
    $: contentEnter = rangeProgress(smoothProgress, 0.60, 0.82);

    // Scroll Away Logic
    $: scrollAway = rangeProgress(smoothProgress, 0.88, 1.0);
    $: moveUpOffset = lerp(0, -600, scrollAway);

    // --- STYLES ---
    $: phraseStyle = `opacity: ${1 - phraseExit}; filter: blur(${phraseExit * 15}px);`;
    $: restStyle = `opacity: ${1 - restExit}; filter: blur(${restExit * 15}px);`;

    $: combinedContentStyle = `
        opacity: ${contentEnter}; 
        filter: blur(${(1 - contentEnter) * 15}px);
        transform: translate3d(0, ${lerp(30, 0, contentEnter) + moveUpOffset}px, 0);
    `;

    // Dynamic scale for the image to keep it from taking over the screen
    $: imgScale = lerp(0.9, 1, contentEnter);

    function handleScroll() {
        if (section) {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            rawProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight)));
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
    <div class="fixed-content-layer">
        
        <h1 class="hatch-title" style="visibility: {phraseExit >= 1 && restExit >= 1 ? 'hidden' : 'visible'}">
            <span style={phraseStyle}>Make space for&nbsp;</span>
            <span style={restStyle}>rest</span>
        </h1>

        <div class="combined-stage" style={combinedContentStyle}>
            <div class="para-container">
                <p class="description-text">
                    We make restful tech that puts humans first - it doesn't track you, 
                    sell your data, or hijack your time. Our only goal is to help you 
                    rest more, and sleep easier.
                </p>
            </div>
            
            <div class="lifestyle-fixed-container" style="transform: scale({imgScale});">
                <img src="https://www.datocms-assets.com/98401/1739823152-large-lifestyle.png" alt="Lifestyle Rest" />
            </div>
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

    <div class="footer-spacer"></div>
</div>

<style>
    :global(html, body) {
        margin: 0;
        background-color: #f9f7f2;
        font-family: serif;
        overflow-x: hidden;
    }

    .main-wrapper {
        height: 500vh;
        position: relative;
    }

    .footer-spacer {
        height: 100vh;
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
    }

    .hatch-title {
        position: absolute;
        margin: 0;
        font-size: clamp(32px, 7vw, 60px);
        color: #1a1a1a;
        text-align: center;
        white-space: nowrap;
    }

    .combined-stage {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* REDUCED GAP: Moves image closer to text */
        gap: 1.5rem; 
        width: 100%;
        max-width: 800px;
        padding: 0 24px;
        text-align: center;
        /* Center content vertically in the fixed layer */
        top: 50%;
        transform: translateY(-50%);
    }

    .para-container {
        max-width: 580px;
    }

    .description-text {
        font-family: sans-serif;
        /* ADJUSTED FONT: Slightly smaller to save space */
        font-size: clamp(1rem, 2vw, 1.25rem);
        line-height: 1.5;
        color: #333;
        margin: 0;
    }

    .lifestyle-fixed-container {
        width: 100%;
        /* REDUCED IMAGE SIZE: 70% of viewport width max */
        max-width: 70vh; 
        transition: transform 0.1s ease-out;
    }

    .lifestyle-fixed-container img {
        width: 100%;
        border-radius: 16px;
        box-shadow: 0 15px 45px rgba(0,0,0,0.1);
    }

    .card-element {
        position: absolute;
        width: 25vw;
        max-width: 380px;
    }

    .card-element img { 
        width: 100%;
        border-radius: 12px; 
    }
</style>