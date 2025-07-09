export const computeConvexHull = (items) => {
	if (items.length < 3) return [];

	const points = items.map(({ x, y }) => [x, y]);
	const hull = d3.polygonHull(points);

	if (!hull) return [];

	// 🔒 Ensure polygon is closed for d3.polygonContains
	if (
		hull.length > 0 &&
		(hull[0][0] !== hull[hull.length - 1][0] ||
			hull[0][1] !== hull[hull.length - 1][1])
	) {
		hull.push(hull[0]);
	}

	return hull.map(([x, y]) => ({ x, y }));
};
