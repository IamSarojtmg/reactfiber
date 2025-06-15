# Interactive 3D Cube Experience
This project demonstrates an interactive 3D cube built with React, @react-three/fiber, and @react-three/drei, featuring textured faces and dynamic rotation based on user interaction. It's an exploration into creating engaging 3D web experiences, similar in spirit to the Haleon 3D experience you shared.

## Features
- Interactive 3D Cube: A fully rotatable 3D cube rendered using Three.js via @react-three/fiber.

- Textured Faces: Each face of the cube displays a unique image texture.

- Hover-to-Rotate: Buttons allow users to rotate the cube to specific orientations (e.g., "Music" or "Sports" faces) on hover.

- Click-to-Reveal: Clicking on a cube face identifies and displays the name of the clicked face (e.g., "Conference," "Food Fest," "Gaming").

- Camera Controls: Utilizes TrackballControls from @react-three/drei for intuitive user navigation (rotation, no zoom/pan).

## Technologies Used
- React: For building the user interface.

- @react-three/fiber: A React renderer for Three.js, allowing 3D scenes to be managed with React components.

- @react-three/drei: A collection of useful helpers and abstractions for @react-three/fiber.

- Three.js: The core 3D graphics library.

## Installation
1. Clone repo ```git clone https://github.com/IamSarojtmg/reactfiber.git```
2. Install dependencies ``` npm install ```
3. Running the project ``` npm run dev ```

## Code structure
- App.jsx: The main application component, responsible for setting up the 3D canvas, handling global state (like clicked face and target rotation), and rendering UI buttons.

- Cube.jsx: Renders the 3D cube, loads textures onto its faces, and handles the logic for detecting face clicks and applying smooth rotations based on the targetQuaternion prop.

