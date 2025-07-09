import React from "react";

const ControlPanel = ({
	onGenerateRandom,
	onComputeConvexHull,
	// onComputePath, // Removed as the button is now in App.jsx
}) => {
	// Define base button style - consistent with App.jsx
	const baseButtonStyle =
		"px-4 py-2 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50";

	return (
		// Use flexbox for layout, center items, add gap
		<div className="mt-6 flex justify-center items-center space-x-4">
			{/* Generate Button - Blue */}
			<button
				onClick={onGenerateRandom}
				className={`${baseButtonStyle} bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500`}
			>
				Generate Random Items & Obstacles
			</button>
			{/* Compute Hull Button - Purple */}
			<button
				onClick={onComputeConvexHull}
				className={`${baseButtonStyle} bg-purple-600 hover:bg-purple-700 focus:ring-purple-500`}
			>
				Compute Convex Hull
			</button>
			{/* Note: Find Path button is now located in App.jsx within the Pathfinding Controls section */}
		</div>
	);
};

export default ControlPanel;
