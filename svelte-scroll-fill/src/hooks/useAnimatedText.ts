export function useAnimatedText(text: string, duration: number) {
    let characters = text.split(''); 
    let cursor = 0;
    let timer: number | null = null;

    const start = (onCursorChange: (c: number) => void, onComplete?: () => void) => {
        const step = (duration / characters.length) * 1000;
        timer = window.setInterval(() => {
            cursor++;
            onCursorChange(cursor);
            if (cursor >= characters.length) {
                stop();
                onComplete?.();
            }
        }, step);
    };

    const reverse = (onCursorChange: (c: number) => void, onComplete?: () => void) => {
        const step = ((duration * 0.5) / characters.length) * 1000; // Erase faster
        timer = window.setInterval(() => {
            cursor--;
            onCursorChange(cursor);
            if (cursor <= 0) {
                stop();
                onComplete?.();
            }
        }, step);
    };

    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

    const reset = (newText: string) => {
        stop();
        characters = newText.split('');
        cursor = 0;
    };

    return {
        get characters() { return characters; },
        start, reverse, stop, reset
    };
}