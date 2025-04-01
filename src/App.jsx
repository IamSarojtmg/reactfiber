import { Canvas, useFrame } from "@react-three/fiber";

function Cube() {
  return (
    <mesh>
      //render any 3d shapes
      <boxGeometry args={[4,4,6]}/> //cube
      <meshStandardMaterial/> //cube colour
    </mesh>
  );
}

export default function R3fDemo() {
  return (
    <Canvas>
      <Cube />
    </Canvas>
  );
}



// https://codesandbox.io/p/sandbox/react-three-fiber-practice02-box-rotation-by-mouse-move-d9mb5w 
// codes that rotates with mouse, it will rotate without click but its somethins