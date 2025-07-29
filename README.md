# Smart Warehouse Routing Visualizer

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4+-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![D3.js](https://img.shields.io/badge/D3.js-7+-F9A03C?style=flat&logo=d3.js&logoColor=white)](https://d3js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A React-based visualization tool that demonstrates intelligent warehouse routing algorithms through interactive grid-based simulations. This project combines computational geometry and pathfinding algorithms to solve real-world logistics challenges.

⚠️ **Disclaimer**: This is a prototype with known bugs and limitations. Some features may not work consistently.

## 🚀 Features

- **Interactive Grid Visualization**: 20x20 warehouse grid with dynamic item and obstacle placement
- **Convex Hull Computation**: Animated Gift Wrapping algorithm implementation
- **Intelligent Pathfinding**: BFS-based routing with obstacle avoidance
- **Dark Mode Support**: Complete dark/light theme compatibility
- **Real-time Animation**: Step-by-step algorithm visualization
- **Responsive Design**: Optimized for desktop and mobile viewing

## 🎯 Use Cases

### Warehouse Automation
- **Robot Navigation**: Optimize autonomous vehicle routing
- **Pick Path Planning**: Minimize travel time for human workers
- **Layout Optimization**: Test warehouse configurations for efficiency
- **Safety Zone Definition**: Establish operational boundaries

### Educational Applications
- **Algorithm Visualization**: Interactive learning tool for computational geometry
- **Graph Theory**: Practical pathfinding algorithm demonstration
- **Operations Research**: Supply chain optimization concepts

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+ with functional components
- **Styling**: Tailwind CSS with custom dark mode implementation
- **Visualization**: D3.js for SVG rendering and grid manipulation
- **Algorithms**: Custom implementations of:
  - Gift Wrapping (Jarvis March) for convex hull
  - Breadth-First Search for pathfinding
- **Build Tool**: Vite for fast development and optimization

## 📦 Installation

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/smart-warehouse-routing.git
cd smart-warehouse-routing

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎮 Usage

### Basic Workflow
1. **Generate Layout**: Click "Generate Random Items & Obstacles" to populate the warehouse grid *(may cause overlapping elements)*
2. **Compute Boundary**: Click "Compute Convex Hull" to calculate the operational boundary *(animation may freeze)*
3. **Select Points**: Choose start and end items from the dropdown menus *(dropdowns may not update properly)*
4. **Find Route**: Click "Find Path" to compute the optimal route *(pathfinding may fail in complex layouts)*

### Known Usage Issues
- **Random Generation**: Items and obstacles frequently overlap, making visualization unclear
- **Path Failure**: Route computation fails approximately 30% of the time with dense obstacles
- **Animation Bugs**: Hull computation animation often gets stuck or skips steps
- **State Inconsistency**: UI controls may not reflect actual application state

### Grid Elements
- 🔵 **Blue Circles**: Warehouse items (numbered for identification) *- may overlap with obstacles*
- 🟥 **Red Squares**: Obstacles (walls, equipment, restricted areas) *- can generate on top of items*
- 🟡 **Yellow Line**: Convex hull boundary *- sometimes fails to render*
- 🟢 **Green Line**: Computed optimal path *- often invisible or incomplete*

## 🔬 Algorithm Details

### Convex Hull (Gift Wrapping Algorithm)
```javascript
// Computes minimal boundary around all items
// Time Complexity: O(nh) where n = points, h = hull vertices
// Space Complexity: O(h)
```

**Applications**:
- Define operational zones
- Optimize storage layouts
- Security perimeter establishment

### Pathfinding (Breadth-First Search)
```javascript
// Finds shortest path avoiding obstacles within hull
// Time Complexity: O(V + E) where V = vertices, E = edges
// Space Complexity: O(V)
```

**Features**:
- Obstacle avoidance
- Hull boundary constraints
- Optimal distance guarantee

## 📁 Project Structure

```
src/
├── components/
│   ├── WarehouseMap.jsx     # Main grid visualization
│   └── ControlPanel.jsx     # User interface controls
├── utils/
│   ├── convexHull.jsx       # Hull computation logic
│   ├── convexHullSteps.jsx  # Animation step generation
│   ├── ratMaze.jsx          # Pathfinding implementation
│   ├── pointInPolygon.js    # Geometric utility functions
│   └── findPath.js          # Alternative pathfinding approach
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
└── index.css                # Global styles and Tailwind imports
```

## 🎨 Customization

### Grid Configuration
```javascript
// Modify in WarehouseMap.jsx
const GRID_SIZE = 20;        // Grid dimensions
const CELL_SIZE = 50;        // Visual cell size
```

### Algorithm Parameters
```javascript
// Adjust in respective utility files
const ANIMATION_SPEED = 500; // Hull animation timing
const DIRECTIONS = [...];    // Pathfinding movement options
```

### Styling
- Tailwind classes for component styling
- CSS custom properties for theme variables
- D3.js styling for dynamic grid elements

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Features
1. **New Algorithms**: Add to `src/utils/` directory
2. **UI Components**: Create in `src/components/`
3. **Styling**: Extend Tailwind configuration
4. **Visualization**: Extend D3.js implementations

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 📊 Performance Considerations & Warnings

- **Grid Size**: Currently optimized for 20x20 grids only - larger grids cause crashes
- **Animation Issues**: Hull animation may freeze or skip steps randomly
- **Memory Usage**: Application may consume excessive memory during extended use
- **Rendering Problems**: D3.js grid updates can fail, requiring page refresh
- **Path Generation**: Success rate drops significantly with >15 obstacles
- **Browser Requirements**: Best performance on Chrome; other browsers have issues

## 🐛 Known Issues & Limitations

### Current Bugs
- **Path Generation Failure**: Sometimes pathfinding algorithm fails to generate routes, especially with dense obstacle layouts
- **Visual Overlapping**: Items and obstacles may overlap when randomly generated, causing visibility issues
- **Convex Hull Animation**: Animation occasionally skips steps or gets stuck during computation
- **Grid Rendering**: D3.js grid sometimes fails to update properly after state changes

### Performance Issues
- **Large Grid Impact**: Grids larger than 20x20 cause significant performance degradation
- **Memory Leaks**: Extended usage may lead to memory accumulation due to D3.js element retention
- **Mobile Responsiveness**: Touch interactions are inconsistent and pathfinding controls don't work well on small screens

### Algorithm Limitations
- **Pathfinding Constraints**: BFS may not find paths in complex obstacle configurations
- **Hull Computation**: Gift wrapping algorithm can fail with collinear points
- **Edge Cases**: Application crashes with less than 3 items or when start/end points are the same



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




⭐ **Star this repo if you found it helpful!**
