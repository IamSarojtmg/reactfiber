import { Canvas, useFrame } from "@react-three/fiber";
// https://www.youtube.com/watch?v=vTfMjI4rVSI&t=1998s&ab_channel=rithmic
function Cube() {
  return (
    <mesh>
      //render any 3d shapes
      <directionalLight position={[0,0,2]}/> //manipulate the direction of the incoming light
      <boxGeometry args={[4,4,6]}/> //cube
      <meshStandardMaterial color={'red'}/> //cube colour
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

