import React, { useState } from "react";
import WarehouseMap from "./components/WarehouseMap";
import ControlPanel from "./components/ControlPanel";
import { computeConvexHullSteps } from "./utils/convexHullSteps";
import { findPath } from "./utils/improvedPathfinding.js";

const generateRandomPoints = (count, maxX, maxY, existingPoints = []) => {
	const points = [];
	let attempts = 0;
	const maxAttempts = count * 10;

	while (points.length < count && attempts < maxAttempts) {
		const newPoint = {
			x: Math.floor(Math.random() * maxX),
			y: Math.floor(Math.random() * maxY),
		};
		const hasOverlap = [...existingPoints, ...points].some(
			(p) => p.x === newPoint.x && p.y === newPoint.y
		);
		if (!hasOverlap) points.push(newPoint);
		attempts++;
	}

	while (points.length < count) {
		points.push({
			x: Math.floor(Math.random() * maxX),
			y: Math.floor(Math.random() * maxY),
		});
	}

	return points;
};

const generateRandomObstacles = (count, maxX, maxY, existingPoints = []) =>
	generateRandomPoints(count, maxX, maxY, existingPoints);

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
		const newObstacles = generateRandomObstacles(10, 20, 20, newItems);
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
			if (i >= steps.length) return clearInterval(interval);
			setConvexHull(steps[i]);
			setHullStepIndex(i++);
		}, 500);
	};

	const computeConvexHull = () => {
		if (items.length < 3)
			return alert("Need at least 3 items to compute hull.");
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
		const { start, end } = selectedItems;
		if (start === null || end === null)
			return alert("Select start & end items.");
		if (!convexHull.length) return alert("Compute the convex hull first.");
		const s = items[start],
			e = items[end];
		if (!s || !e) return alert("Invalid item selection.");
		if (s.x === e.x && s.y === e.y) return alert("Start and end are the same.");

		const maze = Array.from({ length: 20 }, () => Array(20).fill(0));
		obstacles.forEach(({ x, y }) => {
			if (x >= 0 && x < 20 && y >= 0 && y < 20) maze[y][x] = 1;
		});

		try {
			const newPath = findPath(maze, s, e, convexHull);
			newPath.length ? setPath(newPath) : alert("No path found.");
		} catch (err) {
			console.error("Pathfinding error:", err);
			alert("Error computing path: " + err.message);
		}
	};

	const baseInput =
		"w-full p-3 border rounded-md focus:outline-none focus:ring";
	const selectClasses = `${baseInput} bg-white dark:bg-gray-700 text-base dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-indigo-500`;
	const buttonBase =
		"py-4 px-6 text-lg font-bold rounded-lg shadow-md transition duration-200";
	const greenButton = `${buttonBase} bg-green-600 hover:bg-green-700 text-white focus:ring-green-500`;

	return (
		<div className="grid grid-cols-4 gap-4 h-screen bg-gray-100 dark:bg-gray-800">
			{/* Main Panel */}
			<div className="col-span-3 bg-blue-200 min-h-screen dark:bg-gray-900 p-6">
				<div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl">
					<h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
						🚧 Smart Warehouse Routing Visualizer
					</h2>

					<div className="mb-12">
						<WarehouseMap
							items={items}
							obstacles={obstacles}
							convexHull={convexHull}
							path={path}
						/>
						<ControlPanel
							onGenerateRandom={generateRandomData}
							onComputeConvexHull={computeConvexHull}
						/>
					</div>
				</div>
			</div>

			{/* Sidebar Panel */}
			<div className="col-span-1 bg-gray-200 dark:bg-gray-900 p-4">
				<div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-xl shadow-md mb-12">
					<h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
						Pathfinding Controls
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-1 gap-6">
						{/* Start Select */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Start Item
							</label>
							<select
								value={selectedItems.start ?? "-1"}
								onChange={(e) => handleSelectChange(e, "start")}
								className={selectClasses}
							>
								<option value="-1">-- Select Start --</option>
								{items.map((item, i) => (
									<option key={`start-${i}`} value={i}>
										Item {i + 1} ({item.x}, {item.y})
									</option>
								))}
							</select>
						</div>

						{/* End Select */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								End Item
							</label>
							<select
								value={selectedItems.end ?? "-1"}
								onChange={(e) => handleSelectChange(e, "end")}
								className={selectClasses}
							>
								<option value="-1">-- Select End --</option>
								{items.map((item, i) => (
									<option key={`end-${i}`} value={i}>
										Item {i + 1} ({item.x}, {item.y})
									</option>
								))}
							</select>
						</div>

						{/* Path Button */}
						<div className="flex items-end justify-center pt-2">
							<button
								onClick={computePath}
								className={greenButton}
								disabled={
									selectedItems.start === null ||
									selectedItems.end === null ||
									convexHull.length === 0
								}
							>
								🚚 Find Optimal Path
							</button>
						</div>
					</div>

					{hullSteps.length > 0 && (
						<p className="text-center mt-8 text-lg font-medium text-gray-600 dark:text-gray-300">
							Convex Hull Step: {hullStepIndex + 1} / {hullSteps.length}
						</p>
					)}
				</div>

				{/* About Section */}
				<div className="bg-gray-800 dark:bg-gray-900 p-8 rounded-xl text-gray-300">
					<h3 className="text-2xl font-bold mb-5 text-indigo-300">
						About This Project
					</h3>
					<p className="mb-4">
						This interactive visualizer demonstrates intelligent warehouse
						routing through geometric and graph-based algorithms. It simulates
						how a robot navigates efficiently within a constrained area.
					</p>
					<ul className="list-disc list-inside mb-6">
						<li>
							<strong>Convex Hull (Gift Wrapping Algorithm):</strong> Calculates
							the smallest enclosing boundary around target points (packages) to
							define the robot's working zone.
						</li>
						<li>
							<strong>Depth-First Search (DFS) Pathfinding:</strong> Determines
							an optimal path from the robot’s starting location to the
							destination while remaining inside the convex boundary and
							avoiding obstacles.
						</li>
					</ul>
					<h4 className="text-xl font-semibold mb-3 text-indigo-400">
						Real-World Applications
					</h4>
					<ul className="list-disc list-inside">
						<li>Autonomous robot navigation in smart warehouses</li>
						<li>Efficient order picking and dispatch planning</li>
						<li>Simulating warehouse layout constraints for optimization</li>
						<li>Educational demos for computational geometry & graph theory</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default App;
