import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
// https://www.youtube.com/watch?v=vTfMjI4rVSI&t=1998s&ab_channel=rithmic

function Cube({ position, size, colour }) {
  const refrence = useRef();
const [isDragging,setIsDragging] = useState(false)

  useFrame((state, delta) => {
    // refrence.current.rotation.x += delta;
    // refrence.current.rotation.y += delta;
    // refrence.current.rotation.y += state.mouse.y //moves on Y axis of the Mouse
if(isDragging){
  refrence.current.rotation.y += 0.01
  // refrence.current.rotation.x += 0.01

}

  });

  return (
    <mesh position={position} ref={refrence}
    onPointerDown={()=> setIsDragging(true)}
    onPointerUp={()=> setIsDragging(false)}
    onPointerLeave={()=>setIsDragging(false)}
    
    >
      //position the cube on x,y and front and back axis
      <boxGeometry args={size} /> //cube
      <meshStandardMaterial color={colour} /> //cube colour
    </mesh>
  );
}

export default function R3fDemo() {
  return (
    <Canvas className="canvas">
      <ambientLight />
      <directionalLight position={[0, 0, 1]} />
      <Cube position={[1, 0, 0]} colour={"red"} />
      <OrbitControls enableZoom={true} enableRotate={false} rotateSpeed={1}/> 
    </Canvas>
  );
}

// https://codesandbox.io/p/sandbox/react-three-fiber-practice02-box-rotation-by-mouse-move-d9mb5w
// codes that rotates with mouse, it will rotate without click but its something




//CODE THAT MOVES THE CUBE WHERE EVER I WANT IT TO MOVE
// import { Canvas, useThree } from '@react-three/fiber';
// import { useRef, useState } from 'react';

// function DraggableCube() {
//   const cubeRef = useRef();
//   const [isDragging, setIsDragging] = useState(false);
//   const [startMouse, setStartMouse] = useState({ x: 0, y: 0 });
//   const [startRotation, setStartRotation] = useState({ x: 0, y: 0 });
//   const { size } = useThree();

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
//       <boxGeometry args={[2, 2, 2]} />
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