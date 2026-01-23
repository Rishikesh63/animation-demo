<script lang="ts">
    import { onMount } from 'svelte';
    import { useAnimatedText } from '../hooks/useAnimatedText';

    const phrases = ['at scale', 'with precision'];
    let index = 0;
    let cursor = 0;

    const anim = useAnimatedText(phrases[index], .9);

    const runSequence = () => {
        // 1. Type out
        anim.start((c) => (cursor = c), () => {
            // 2. Wait at full text
            setTimeout(() => {
                // 3. Erase (Go left effect)
                anim.reverse((c) => (cursor = c), () => {
                    // 4. Switch word and repeat
                    index = (index + 1) % phrases.length;
                    anim.reset(phrases[index]);
                    runSequence();
                });
            }, 2000);
        });
    };

    onMount(() => {
        runSequence();
        return () => anim.stop();
    });
</script>

<div class="wrapper">
    <div class="content-box">
        <span class="animated-text">
            {#each anim.characters.slice(0, cursor) as char, i (i)}
                <span class="char">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            {/each}
        </span>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .content-box {
        display: flex;
        justify-content: center;
        min-height: 80px;
        /* This ensures the container shrinks/grows from center */
        transition: width 0.2s ease; 
    }

    .animated-text {
        display: flex;
        font-family: "Instrument Serif", serif;
        font-style: italic;
        font-size: 64px;
        font-weight: 400;
        color: #E8F7F3;
        white-space: nowrap;
    }

    .char {
        display: inline-block;
        opacity: 0;
        filter: blur(5px);
        transform: translateX(-5px); /* Slide in from left while typing */
        animation: char-in 0.3s ease-out forwards;
    }

    @keyframes char-in {
        to {
            opacity: 1;
            filter: blur(0);
            transform: translateX(0);
        }
    }
</style>