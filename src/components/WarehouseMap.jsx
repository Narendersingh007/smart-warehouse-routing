import React, { useEffect } from "react";
import * as d3 from "d3";
import "../index.css";

const GRID_SIZE = 20;
const CELL_SIZE = 50; // Increased cell size for zoom

const WarehouseMap = ({ items, obstacles, convexHull, path }) => {
	useEffect(() => {
		drawGrid();
	}, [convexHull, items, obstacles, path]);

	const drawGrid = () => {
		const svg = d3.select("#grid");
		svg.selectAll("*").remove(); // Clear existing grid

		// Check if dark mode is enabled (assuming 'dark' class on html or body)
		const isDarkMode = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');

		const bgColor = isDarkMode ? "#1f2937" : "white"; // Dark gray or white
		const strokeColor = isDarkMode ? "#6b7280" : "black"; // Lighter gray or black
		const itemLabelColor = isDarkMode ? "#e5e7eb" : "black"; // Light gray or black
		const obstacleColor = isDarkMode ? "#ef4444" : "red"; // Red (same)
		const itemColor = isDarkMode ? "#60a5fa" : "blue"; // Lighter blue or blue
		const hullColor = isDarkMode ? "#facc15" : "yellow"; // Yellow (same)
		const pathColor = isDarkMode ? "#4ade80" : "green"; // Lighter green or green


		// Draw the background grid
		svg
			.append("rect")
			.attr("width", GRID_SIZE * CELL_SIZE)
			.attr("height", GRID_SIZE * CELL_SIZE)
			.attr("fill", bgColor);

		// Draw grid lines
		for (let i = 0; i <= GRID_SIZE; i++) {
			// Vertical lines
			svg
				.append("line")
				.attr("x1", i * CELL_SIZE)
				.attr("y1", 0)
				.attr("x2", i * CELL_SIZE)
				.attr("y2", GRID_SIZE * CELL_SIZE)
				.attr("stroke", strokeColor);

			// Horizontal lines
			svg
				.append("line")
				.attr("x1", 0)
				.attr("y1", i * CELL_SIZE)
				.attr("x2", GRID_SIZE * CELL_SIZE)
				.attr("y2", i * CELL_SIZE)
				.attr("stroke", strokeColor);
		}

		// Obstacles
		svg
			.selectAll(".obstacle")
			.data(obstacles)
			.enter()
			.append("rect")
			.attr("class", "obstacle")
			.attr("x", (d) => d.x * CELL_SIZE)
			.attr("y", (d) => d.y * CELL_SIZE)
			.attr("width", CELL_SIZE)
			.attr("height", CELL_SIZE)
			.attr("fill", obstacleColor);

		// Items with numbering
		svg
			.selectAll(".item")
			.data(items)
			.enter()
			.append("circle")
			.attr("class", "item")
			.attr("cx", (d) => d.x * CELL_SIZE + CELL_SIZE / 2)
			.attr("cy", (d) => d.y * CELL_SIZE + CELL_SIZE / 2)
			.attr("r", 8) // Slightly larger radius
			.attr("fill", itemColor);

		svg
			.selectAll(".item-label")
			.data(items)
			.enter()
			.append("text")
			.attr("class", "item-label")
			.attr("x", (d) => d.x * CELL_SIZE + CELL_SIZE / 2 + 8)
			.attr("y", (d) => d.y * CELL_SIZE + CELL_SIZE / 2 + 5) // Adjusted y offset
			.text((d, i) => i + 1)
			.attr("font-size", "16px") // Slightly larger font
			.attr("fill", itemLabelColor);

		// Convex Hull
		if (convexHull.length > 0) {
			const line = d3
				.line()
				.x((d) => d.x * CELL_SIZE + CELL_SIZE / 2)
				.y((d) => d.y * CELL_SIZE + CELL_SIZE / 2)
				.curve(d3.curveLinearClosed);

			svg
				.append("path")
				.datum(convexHull)
				.attr("d", line)
				.attr("stroke", hullColor)
				.attr("fill", "none")
				.attr("stroke-width", 4); // Slightly thicker
		}

		// Path
		if (path.length > 0) {
			const pathLine = d3
				.line()
				.x((d) => d.x * CELL_SIZE + CELL_SIZE / 2)
				.y((d) => d.y * CELL_SIZE + CELL_SIZE / 2)
				.curve(d3.curveLinear);

			svg
				.append("path")
				.datum(path)
				.attr("d", pathLine)
				.attr("stroke", pathColor)
				.attr("fill", "none")
				.attr("stroke-width", 4); // Slightly thicker
		}
	};

	return (
		// Center the grid container, add slight vertical margin
		// Added dark mode classes for background and text
		<div className="grid-container flex flex-col items-center my-6 dark:bg-gray-900">
			{/* Subtitle for the grid itself */}
			{/* Adjusted text color for dark mode */}
			<h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Warehouse Grid Visualization</h2>
			<svg
				id="grid"
				// Adjusted border and background for dark mode
				className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg bg-white dark:bg-gray-800"
				width={GRID_SIZE * CELL_SIZE} // Width is now 1000
				height={GRID_SIZE * CELL_SIZE} // Height is now 1000
			></svg>
		</div>
	);
};

export default WarehouseMap;
