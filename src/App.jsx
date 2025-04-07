import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useState } from "react";
import { OrbitControls, TrackballControls } from "@react-three/drei";
//Tying to create a button that rotates the cube to a specic side
//on hover event
//useref on the music part of the cube
//change the view of the cube to the music side
function Cube({ position, size, targetRotation }) {
  const meshRef = useRef();
  
  
  const musicTexture = useLoader(TextureLoader, "/image/2.jpg");
  const footballTexture = useLoader(TextureLoader, "/image/1.jpeg");
  const threeTexture = useLoader(TextureLoader, "/image/3.jpg");
  const fourTexture = useLoader(TextureLoader, "/image/4.jpg");
  const fiveTexture = useLoader(TextureLoader, "/image/5.jpg");
  const sixTexture = useLoader(TextureLoader, "/image/6.jpg");
  
  useFrame(()=>{
    if (!meshRef.current) return;
    meshRef.current.rotation.x =+ 2.4
    meshRef.current.rotation.y =+1
    meshRef.current.rotation.z =+0
    
  })
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
  
  const [targetRotation, setTargetRotation] = useState(0)

  return (
    <>
    <button className="d"
    onClick={()=> setTargetRotation(0)}
    
    >Music</button>
    <Canvas camera={{ position: [7, 7, 7], fov: 30 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[-2, 2, 3]} />
      <Cube position={[0, 0, 0]} size={[2.5, 2.5, 2.5]} targetRotation={targetRotation}/>
      <TrackballControls rotateSpeed={3} noZoom={true} noPan={true} />
    </Canvas>
    </>
  );
}
