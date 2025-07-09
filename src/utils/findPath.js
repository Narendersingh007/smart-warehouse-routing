export const findPath = (maze, start, end, convexHull) => {
	const rows = maze.length;
	const cols = maze[0].length;

	const directions = [
		[0, 1], // right
		[1, 0], // down
		[0, -1], // left
		[-1, 0], // up
	];

	const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
	const parent = Array.from({ length: rows }, () => Array(cols).fill(null));

	// Close the polygon if it's not already closed
	if (
		convexHull.length > 0 &&
		(convexHull[0].x !== convexHull[convexHull.length - 1].x ||
			convexHull[0].y !== convexHull[convexHull.length - 1].y)
	) {
		convexHull.push({ ...convexHull[0] });
	}

	// Function to check if the point is inside the convex hull or on its edge
	const isInsideHull = (x, y) => {
		const pt = [y, x]; // col, row format for polygonContains
		return (
			d3.polygonContains(convexHull, pt) || pointOnPolygonEdge(pt, convexHull)
		);
	};

	// BFS function to find the shortest path
	const bfs = () => {
		const queue = [[start.x, start.y]];
		visited[start.x][start.y] = true;

		while (queue.length > 0) {
			const [x, y] = queue.shift();

			// If we reached the destination, reconstruct the path
			if (x === end.x && y === end.y) {
				let path = [];
				let current = [x, y];
				while (current) {
					path.unshift({ x: current[0], y: current[1] });
					current = parent[current[0]][current[1]];
				}
				return path;
			}

			// Explore neighbors (Right, Down, Left, Up)
			for (let [dx, dy] of directions) {
				const nx = x + dx;
				const ny = y + dy;

				// Check if the new position is valid (within bounds, no obstacle, not visited, and inside the convex hull)
				if (
					nx >= 0 &&
					ny >= 0 &&
					nx < rows &&
					ny < cols &&
					maze[nx][ny] !== 1 && // Avoid obstacles (walls)
					!visited[nx][ny] && // Avoid already visited cells
					isInsideHull(nx, ny) // Ensure the point lies inside or on the convex hull
				) {
					visited[nx][ny] = true;
					parent[nx][ny] = [x, y];
					queue.push([nx, ny]);
				}
			}
		}

		// If no path was found
		return [];
	};

	// Start BFS to find the path
	return bfs();
};
