const observerOptions: IntersectionObserverInit = {
	root: null,
	rootMargin: '0px',
	threshold: 1
};

export function viewport(
	element: HTMLElement,
	options: IntersectionObserverInit = observerOptions
) {
	if (!element) {
		throw new Error('Element is required for inView');
	}

	const observer = new IntersectionObserver(
		(entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				const eventName: 'enterViewport' | 'exitViewport' =
					entry.isIntersecting ? 'enterViewport' : 'exitViewport';

				entry.target.dispatchEvent(new CustomEvent(eventName));
			});
		},
		options
	);

	observer.observe(element);

	return {
		destroy(): void {
			observer.unobserve(element);
			observer.disconnect();
		}
	};
}
