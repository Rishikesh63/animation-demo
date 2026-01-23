export function useAnimatedText(text: string, duration: number, delay = 0) {
	let words = text.split(' ');

	let cursor = 0;
	let completed = false;
	let timer: number | null = null;

	const start = (
		onCursorChange: (c: number) => void,
		onComplete?: () => void
	) => {
		const total = words.length;
		const step = duration / total;

		timer = window.setInterval(() => {
			cursor++;
			onCursorChange(cursor);

			if (cursor >= total) {
				completed = true;
				onComplete?.();
				stop();
			}
		}, step * 1000 + delay);
	};

	const stop = () => {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	};

	// ✅ NEW: reset with new text
	const reset = (newText: string) => {
		stop();
		words = newText.split(' ');
		cursor = 0;
		completed = false;
	};

	return {
		get words() {
			return words;
		},
		start,
		stop,
		reset,
		get completed() {
			return completed;
		}
	};
}
