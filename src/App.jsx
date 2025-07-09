import React, { useState } from "react";
import WarehouseMap from "./components/WarehouseMap";
import ControlPanel from "./components/ControlPanel";
import { computeConvexHullSteps } from "./utils/convexHullSteps";
import { findPath } from "./utils/ratMaze";

const generateRandomPoints = (count, maxX, maxY) => {
	return Array.from({ length: count }, () => ({
		x: Math.floor(Math.random() * maxX),
		y: Math.floor(Math.random() * maxY),
	}));
};

const generateRandomObstacles = (count, maxX, maxY) => {
	return Array.from({ length: count }, () => ({
		x: Math.floor(Math.random() * maxX),
		y: Math.floor(Math.random() * maxY),
	}));
};

const App = () => {
	const [items, setItems] = useState([]);
	const [obstacles, setObstacles] = useState([]);
	const [convexHull, setConvexHull] = useState([]);
	const [hullSteps, setHullSteps] = useState([]);
	const [hullStepIndex, setHullStepIndex] = useState(0);
	const [path, setPath] = useState([]);
	const [selectedItems, setSelectedItems] = useState({
		start: null,
		end: null,
	});

	const generateRandomData = () => {
		const newItems = generateRandomPoints(6, 20, 20);
		const newObstacles = generateRandomObstacles(10, 20, 20);
		setItems(newItems);
		setObstacles(newObstacles);
		setConvexHull([]);
		setHullSteps([]);
		setHullStepIndex(0);
		setPath([]);
		setSelectedItems({ start: null, end: null });
	};

	const animateHull = (steps) => {
		let i = 0;
		const interval = setInterval(() => {
			if (i >= steps.length) {
				clearInterval(interval);
				return;
			}
			setConvexHull(steps[i]);
			setHullStepIndex(i);
			i++;
		}, 500); // Animation speed
	};

	const computeConvexHull = () => {
		if (items.length < 3) {
			alert("At least 3 items are needed to compute a convex hull.");
			return;
		}
		const steps = computeConvexHullSteps(items);
		setHullSteps(steps);
		animateHull(steps);
	};

	const handleSelectChange = (e, type) => {
		const value = e.target.value;
		setSelectedItems((prev) => ({
			...prev,
			[type]: value === "-1" ? null : parseInt(value),
		}));
	};

	const computePath = () => {
		if (
			selectedItems.start === null ||
			selectedItems.end === null ||
			convexHull.length === 0
		) {
			alert(
				"Please select both start and end items and compute the convex hull to find a path."
			);
			return;
		}
		const start = items[selectedItems.start];
		const end = items[selectedItems.end];
		// Assuming GRID_SIZE is 20x20 based on WarehouseMap
		const maze = Array.from({ length: 20 }, () => Array(20).fill(0));
		obstacles.forEach(({ x, y }) => {
			if (x >= 0 && x < 20 && y >= 0 && y < 20) {
				maze[y][x] = 1; // Assuming maze is [row][col] -> [y][x]
			}
		});
		const newPath = findPath(maze, start, end, convexHull);
		setPath(newPath);
	};

	// Define common styles for reuse with dark mode variants
	const labelStyle = "block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300";
	const selectStyle =
		"w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out bg-white dark:bg-gray-700 dark:text-gray-200";
	const buttonStyle = // Base button style (colors added in specific buttons)
		"px-4 py-2 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50";

	return (
		// Main container with dark mode background and padding
		// Added 'dark' class here to enable dark mode globally for the app
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 dark">
			{/* Inner container with dark mode background, rounded corners, and shadow */}
			<div className="container mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
				{/* Main Title with dark mode text color */}
				<h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
					Smart Warehouse Routing Visualizer
				</h2>

				{/* Map and Main Controls Section Wrapper */}
				<div className="mb-8">
					<WarehouseMap
						items={items}
						obstacles={obstacles}
						convexHull={convexHull}
						path={path}
					/>
					<ControlPanel
						onGenerateRandom={generateRandomData}
						onComputeConvexHull={computeConvexHull}
						// Pass buttonStyle for consistency if needed, or style within ControlPanel
					/>
				</div>

				{/* Item Selection and Path Finding Section with dark mode styles */}
				<div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8">
					<h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
						Pathfinding Controls
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
						{/* Start Item Select */}
						<div>
							<label htmlFor="start-item" className={labelStyle}>
								Start Item:
							</label>
							<select
								id="start-item"
								onChange={(e) => handleSelectChange(e, "start")}
								value={selectedItems.start ?? "-1"}
								className={selectStyle}
								disabled={items.length === 0}
							>
								<option value="-1">-- Select Start --</option>
								{items.map((item, index) => (
									<option key={`start-${index}`} value={index}>
										Item {index + 1} ({item.x}, {item.y})
									</option>
								))}
							</select>
						</div>

						{/* End Item Select */}
						<div>
							<label htmlFor="end-item" className={labelStyle}>
								End Item:
							</label>
							<select
								id="end-item"
								onChange={(e) => handleSelectChange(e, "end")}
								value={selectedItems.end ?? "-1"}
								className={selectStyle}
								disabled={items.length === 0}
							>
								<option value="-1">-- Select End --</option>
								{items.map((item, index) => (
									<option key={`end-${index}`} value={index}>
										Item {index + 1} ({item.x}, {item.y})
									</option>
								))}
							</select>
						</div>

						{/* Find Path Button */}
						<div className="md:pt-6"> {/* Align button slightly */}
							<button
								onClick={computePath}
								className={`${buttonStyle} w-full bg-green-600 hover:bg-green-700 focus:ring-green-500`}
								disabled={selectedItems.start === null || selectedItems.end === null || convexHull.length === 0}
							>
								Find Path
							</button>
						</div>
					</div>
				</div>

				{/* Convex Hull Step Indicator with dark mode text color */}
				{hullSteps.length > 0 && (
					<p className="text-center mt-4 mb-8 text-md text-gray-600 dark:text-gray-400">
						Convex Hull Step: {hullStepIndex + 1} / {hullSteps.length}
					</p>
				)}

				{/* About Section - Already dark styled, but ensure consistency */}
				{/* Using dark:bg-gray-900 for slightly darker contrast if needed, or keep bg-gray-800 */}
				<div className="bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-300 p-6 rounded-lg shadow-lg text-left">
					<h3 className="text-xl font-semibold mb-4 text-indigo-300 dark:text-indigo-400">
						About This Project
					</h3>
					<p className="mb-4 text-gray-300 dark:text-gray-400">
						This project visualizes a smart warehouse layout using two key algorithms:
					</p>
					<ul className="list-disc list-inside space-y-2 mb-4 text-gray-300 dark:text-gray-400">
						<li>
							<strong>Convex Hull (Gift Wrapping Algorithm):</strong> Computes the minimal convex boundary around all items, simulating an efficient storage or operational boundary.
						</li>
						<li>
							<strong>Pathfinding (DFS-based):</strong> Finds a path between two selected items using a Depth-First Search approach, avoiding obstacles and staying within the computed convex hull.
						</li>
					</ul>
					<h4 className="text-lg font-semibold mt-5 mb-2 text-indigo-300 dark:text-indigo-400">
						Potential Applications
					</h4>
					<ul className="list-disc list-inside space-y-1 text-gray-300 dark:text-gray-400">
						<li>Optimizing navigation routes for warehouse robots.</li>
						<li>Planning efficient item picking paths for human workers.</li>
						<li>Simulating and analyzing warehouse layouts.</li>
						<li>Demonstrating graph and geometry algorithms visually.</li>
					</ul>
				</div>
			</div> {/* Close Inner container */}
		</div> // Close Main container
	);
};

export default App;
