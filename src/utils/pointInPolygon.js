// Ray-casting algorithm to check if a point is inside a polygon
const pointInPolygon = (point, polygon) => {
	let x = point.x,
		y = point.y;
	let inside = false;

	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x,
			yi = polygon[i].y;
		const xj = polygon[j].x,
			yj = polygon[j].y;

		const intersect =
			yi > y !== yj > y &&
			x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0000001) + xi;
		if (intersect) inside = !inside;
	}

	return inside;
};

export default pointInPolygon;
