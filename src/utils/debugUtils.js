
// Add these utility functions for debugging

export const validateMaze = (maze, items, obstacles) => {
	console.log("=== MAZE VALIDATION ===");
	console.log("Maze dimensions:", maze.length, "x", maze[0]?.length);

	// Check if items are blocked by obstacles
	items.forEach((item, index) => {
		const isBlocked = maze[item.y][item.x] === 1;
		console.log(
			`Item ${index + 1} at (${item.x}, ${item.y}):`,
			isBlocked ? "BLOCKED" : "FREE"
		);
	});

	// Count obstacles
	let obstacleCount = 0;
	for (let y = 0; y < maze.length; y++) {
		for (let x = 0; x < maze[y].length; x++) {
			if (maze[y][x] === 1) obstacleCount++;
		}
	}
	console.log("Total obstacles in maze:", obstacleCount);
	console.log("Expected obstacles:", obstacles.length);
};

export const validateConvexHull = (hull, items) => {
	console.log("=== CONVEX HULL VALIDATION ===");
	console.log("Hull points:", hull.length);
	console.log("Total items:", items.length);

	if (hull.length < 3) {
		console.warn("Hull has less than 3 points!");
		return false;
	}

	// Check if all items are within or on the hull
	items.forEach((item, index) => {
		const isInside = pointInPolygon(item, hull);
		console.log(
			`Item ${index + 1} at (${item.x}, ${item.y}):`,
			isInside ? "INSIDE" : "OUTSIDE"
		);
	});

	return true;
};

export const visualizeMaze = (maze) => {
	console.log("=== MAZE VISUALIZATION ===");
	for (let y = 0; y < maze.length; y++) {
		let row = "";
		for (let x = 0; x < maze[y].length; x++) {
			row += maze[y][x] === 1 ? "█" : "·";
		}
		console.log(row);
	}
};

// Add to your pointInPolygon.js for better debugging

