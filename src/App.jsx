import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";
import { OrbitControls, TrackballControls } from "@react-three/drei";
// https://www.youtube.com/watch?v=9XvZ3ChtT9M&ab_channel=OlivierLarose START FROM 6:00
//on hover event
//useref on the music part of the cube
//change the view of the cube to the music side
function Cube({ position, size }) {
  const meshRef = useRef();

  const musicTexture = useLoader(TextureLoader, "/image/2.jpg");
  const footballTexture = useLoader(TextureLoader, "/image/1.jpeg");
  const threeTexture = useLoader(TextureLoader, "/image/3.jpg");
  const fourTexture = useLoader(TextureLoader, "/image/4.jpg");
  const fiveTexture = useLoader(TextureLoader, "/image/5.jpg");
  const sixTexture = useLoader(TextureLoader, "/image/6.jpg");

  return (
    <mesh position={position} ref={meshRef}>
      <boxGeometry args={size} /> /
      <meshStandardMaterial map={musicTexture} attach="material-0" />
      <meshStandardMaterial map={footballTexture} attach="material-1" />
      <meshStandardMaterial map={threeTexture} attach="material-2" />
      <meshStandardMaterial map={fourTexture} attach="material-3" />
      <meshStandardMaterial map={fiveTexture} attach="material-4" />
      <meshStandardMaterial map={sixTexture} attach="material-5" />
    </mesh>
  );
}

export default function R3fDemo() {
  return (
    <>
    <div className="d">Music</div>
    <Canvas camera={{ position: [7, 7, 7], fov: 30 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[-2, 2, 3]} />
      <Cube position={[0, 0, 0]} colour={"lightgreen"} size={[2.5, 2.5, 2.5]} />
      <TrackballControls rotateSpeed={3} noZoom={true} noPan={true} />
    </Canvas>
    </>
  );
}

// https://codesandbox.io/p/sandbox/react-three-fiber-practice02-box-rotation-by-mouse-move-d9mb5w
// codes that rotates with mouse, it will rotate without click but its something

//28:29 from the above video says that i can use the state to do something with the mouse control

// CODE THAT MOVES THE CUBE WHERE EVER I WANT IT TO MOVE
// import { Canvas, useThree } from '@react-three/fiber';
// import { useRef, useState } from 'react';
// import { AmbientLight } from 'three';

// function DraggableCube() {
//   const cubeRef = useRef();
//   const [isDragging, setIsDragging] = useState(false);
//   const [startMouse, setStartMouse] = useState({ x: 0, y: 0 });
//   const [startRotation, setStartRotation] = useState({ x: 0, y: 0 });
//   // const { size } = useThree();

//   const handlePointerDown = (e) => {
//     e.stopPropagation();
//     setIsDragging(true);
//     setStartMouse({ x: e.clientX, y: e.clientY });
//     setStartRotation({ x: cubeRef.current.rotation.x, y: cubeRef.current.rotation.y });
//   };

//   const handlePointerMove = (e) => {
//     if (!isDragging) return;

//     const deltaX = e.clientX - startMouse.x;
//     const deltaY = e.clientY - startMouse.y;

//     // Only rotate horizontally if mostly horizontal drag (|deltaX| > |deltaY|)
//     if (Math.abs(deltaX) > Math.abs(deltaY)) {
//       cubeRef.current.rotation.y = startRotation.y + deltaX * 0.01;
//     }
//     // Only rotate vertically if mostly vertical drag
//     else {
//       cubeRef.current.rotation.x = startRotation.x + deltaY * 0.01;
//     }
//   };

//   const handlePointerUp = () => setIsDragging(false);

//   return (
//     <mesh

//       ref={cubeRef}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       onPointerUp={handlePointerUp}
//       onPointerLeave={handlePointerUp}
//     >
//       <boxGeometry args={[4, 4, 4]} />
//       <meshStandardMaterial color="hotpink" />
//     </mesh>
//   );
// }

// export default function App() {
//   return (
//     <Canvas camera={{ position: [0, 0, 8] }}>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <DraggableCube />
//     </Canvas>
//   );
// }
