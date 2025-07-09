import pointInPolygon from "./pointInPolygon"; // Make sure to import the function

export const findPath = (maze, start, end, polygon) => {
	const rows = maze.length;
	const cols = maze[0].length;
	const directions = [
		[0, 1], // Right
		[1, 0], // Down
		[0, -1], // Left
		[-1, 0], // Up
	];

	let visited = Array.from({ length: rows }, () => Array(cols).fill(false));
	let parent = Array.from({ length: rows }, () => Array(cols).fill(null));
	let queue = [];

	queue.push({ x: start.x, y: start.y });
	visited[start.x][start.y] = true;

	while (queue.length > 0) {
		const { x, y } = queue.shift();

		if (x === end.x && y === end.y) break;

		for (let [dx, dy] of directions) {
			const newX = x + dx;
			const newY = y + dy;
			const newPoint = { x: newX, y: newY };

			if (
				newX >= 0 &&
				newY >= 0 &&
				newX < rows &&
				newY < cols &&
				!visited[newX][newY] &&
				maze[newX][newY] === 0 &&
				pointInPolygon(newPoint, polygon)
			) {
				visited[newX][newY] = true;
				parent[newX][newY] = { x, y };
				queue.push(newPoint);
			}
		}
	}

	// Reconstruct path from end to start
	let path = [];
	let curr = end;

	while (curr && !(curr.x === start.x && curr.y === start.y)) {
		path.push(curr);
		curr = parent[curr.x][curr.y];
	}
	if (curr) path.push(start);

	return path.reverse();
};
