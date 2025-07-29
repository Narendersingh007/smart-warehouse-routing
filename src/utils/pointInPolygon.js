// Shared internal function using Ray-casting algorithm to check if a point is inside a polygon
const rawPointInPolygon = (point, polygon, debug = false) => {
	if (!point || !polygon || polygon.length < 3) {
		if (debug)
			console.warn("Invalid point or polygon for pointInPolygon check");
		return false;
	}

	let x = point.x,
		y = point.y;
	let inside = false;

	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x,
			yi = polygon[i].y;
		const xj = polygon[j].x,
			yj = polygon[j].y;

		if ([xi, yi, xj, yj].some((val) => val === undefined)) {
			if (debug)
				console.warn("Invalid polygon coordinates at index", i, "or", j);
			continue;
		}

		const denom = yj - yi;
		if (denom === 0) continue; // skip horizontal edge

		const intersect =
			yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / denom + xi;

		if (intersect) inside = !inside;
	}

	return inside;
};

export const pointInPolygonWithDebug = (point, polygon) => {
	return rawPointInPolygon(point, polygon, true);
};

const pointInPolygon = (point, polygon) => {
	return rawPointInPolygon(point, polygon, false);
};

export default pointInPolygon;