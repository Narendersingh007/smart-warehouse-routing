// src/utils/improvedPathfinding.js
import pointInPolygon from "./pointInPolygon";

export const findPath = (maze, start, end, convexHull) => {
	console.log("Starting pathfinding:", {
		start,
		end,
		convexHull: convexHull.length,
	});

	const rows = maze.length;
	const cols = maze[0].length;

	// Validate inputs
	if (!start || !end || !convexHull || convexHull.length < 3) {
		console.error("Invalid inputs for pathfinding");
		return [];
	}

	if (
		start.x < 0 ||
		start.x >= cols ||
		start.y < 0 ||
		start.y >= rows ||
		end.x < 0 ||
		end.x >= cols ||
		end.y < 0 ||
		end.y >= rows
	) {
		console.error("Start or end point out of bounds");
		return [];
	}

	const directions = [
		[0, 1], // Right
		[1, 0], // Down
		[0, -1], // Left
		[-1, 0], // Up
	];

	// Initialize visited and parent arrays with correct dimensions
	const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
	const parent = Array.from({ length: rows }, () => Array(cols).fill(null));

	// BFS queue - use consistent coordinate system
	const queue = [{ x: start.x, y: start.y }];
	visited[start.y][start.x] = true; // FIXED: maze[row][col] = maze[y][x]

	let nodesExplored = 0;

	while (queue.length > 0) {
		const current = queue.shift();
		nodesExplored++;

		// Check if we reached the destination
		if (current.x === end.x && current.y === end.y) {
			console.log(`Path found after exploring ${nodesExplored} nodes`);
			return reconstructPath(parent, start, end);
		}

		// Explore all 4 directions
		for (const [dx, dy] of directions) {
			const newX = current.x + dx;
			const newY = current.y + dy;

			// Bounds check
			if (newX < 0 || newX >= cols || newY < 0 || newY >= rows) {
				continue;
			}

			// Check if already visited
			if (visited[newY][newX]) {
				continue;
			}

			// Check for obstacles
			if (maze[newY][newX] === 1) {
				continue;
			}

			// Check if point is within convex hull
			if (!pointInPolygon({ x: newX, y: newY }, convexHull)) {
				continue;
			}

			// Mark as visited and add to queue
			visited[newY][newX] = true;
			parent[newY][newX] = { x: current.x, y: current.y };
			queue.push({ x: newX, y: newY });
		}
	}

	console.log(`No path found after exploring ${nodesExplored} nodes`);
	return [];
};

// Helper function to reconstruct the path
function reconstructPath(parent, start, end) {
	const path = [];
	let current = { x: end.x, y: end.y };

	// Trace back from end to start
	while (current && !(current.x === start.x && current.y === start.y)) {
		path.unshift(current);
		current = parent[current.y][current.x]; // FIXED: parent[row][col]
	}

	// Add start point
	if (current) {
		path.unshift(start);
	}

	console.log(`Reconstructed path with ${path.length} points`);
	return path;
}
