export const computeConvexHullSteps = (points) => {
	const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
	const cross = (o, a, b) =>
		(a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

	let lower = [],
		upper = [],
		steps = [];

	for (let p of sorted) {
		while (
			lower.length >= 2 &&
			cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
		) {
			lower.pop();
			steps.push([...lower, ...upper]);
		}
		lower.push(p);
		steps.push([...lower, ...upper]);
	}

	for (let i = sorted.length - 1; i >= 0; i--) {
		const p = sorted[i];
		while (
			upper.length >= 2 &&
			cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
		) {
			upper.pop();
			steps.push([...lower, ...upper]);
		}
		upper.push(p);
		steps.push([...lower, ...upper]);
	}

	upper.pop();
	lower.pop();
	steps.push([...lower, ...upper]);

	return steps;
};
