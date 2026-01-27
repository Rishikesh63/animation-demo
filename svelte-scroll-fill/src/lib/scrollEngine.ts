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

// 🌗 Appear → Clear → Disappear
export function blurValley(t: number) {
	t = clamp(t);
	return Math.abs(1 - 2 * t);
}

export function distanceFade(
	pos: number,
	center: number,
	maxDistance: number
) {
	return clamp(Math.abs(pos - center) / maxDistance);
}

// ===============================
// SCROLL PROGRESS (IMPROVED)
// ===============================
export function computeScrollProgress(
	el: HTMLElement,
	offset = 0,
	edgeFactor = 0.9 // 🔥 NEW (default)
) {
	const rect = el.getBoundingClientRect();
	const viewport = window.innerHeight;

	return clamp(
		(viewport - rect.top - offset) /
		(rect.height + viewport * edgeFactor)
	);
}
