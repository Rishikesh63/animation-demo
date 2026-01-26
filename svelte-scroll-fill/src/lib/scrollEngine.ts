// ===============================
// TYPES
// ===============================
export type Vec2 = {
	x: number;
	y: number;
};

export type CardConfig = {
	id: number;
	from: Vec2;
	to: Vec2;
	startAt: number;
	endAt: number;
	blurFrom: number;
	blurTo: number;
};

// ===============================
// HELPERS
// ===============================
export function clamp(v: number, min = 0, max = 1) {
	return Math.min(max, Math.max(min, v));
}

export function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t;
}

export function rangeProgress(
	value: number,
	start: number,
	end: number
) {
	return clamp((value - start) / (end - start));
}

// ===============================
// SCROLL PROGRESS (GENERIC)
// ===============================
export function computeScrollProgress(
	el: HTMLElement,
	offset = 0
) {
	const rect = el.getBoundingClientRect();
	const viewport = window.innerHeight;

	return clamp(
		(viewport - rect.top - offset) /
			(rect.height + viewport)
	);
}
