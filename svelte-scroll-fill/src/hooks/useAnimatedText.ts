// src/lib/hooks/useAnimatedText.ts
export function useAnimatedText(text: string, duration: number, delay = 0) {
	const words = text.split(' ');

	let cursor = 0;
	let completed = false;
	let timer: number | null = null;

	const start = (onCursorChange: (c: number) => void, onComplete?: () => void) => {
		const total = words.length;
		const step = duration / total;

		timer = window.setInterval(
			() => {
				cursor++;
				onCursorChange(cursor);

				if (cursor >= total) {
					completed = true;
					onComplete?.();
					stop();
				}
			},
			step * 1000 + delay
		);
	};

	const stop = () => {
		if (timer) clearInterval(timer);
	};

	return {
		words,
		start,
		stop,
		get completed() {
			return completed;
		}
	};
}
