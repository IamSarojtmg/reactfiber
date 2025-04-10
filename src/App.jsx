// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three";
// import { useRef, useState } from "react";
// import { TrackballControls } from "@react-three/drei";

// // Check the GPT last code
// const pos = [0, 0, 7]
// const defaultPos = [3,3,6]
// function Cube({ position, size, targetRotation }) {
//   const meshRef = useRef();

//   const musicTexture = useLoader(TextureLoader, "/image/2.jpg");
//   const footballTexture = useLoader(TextureLoader, "/image/1.jpeg");
//   const threeTexture = useLoader(TextureLoader, "/image/3.jpg");
//   const fourTexture = useLoader(TextureLoader, "/image/4.jpg");
//   const fiveTexture = useLoader(TextureLoader, "/image/5.jpg");
//   const sixTexture = useLoader(TextureLoader, "/image/6.jpg");

//   useFrame(() => {
//     if (!meshRef.current) return;

//     meshRef.current.rotation.y +=
//       (targetRotation.y - meshRef.current.rotation.y) * 0.1;
//     meshRef.current.rotation.x +=
//       (targetRotation.x - meshRef.current.rotation.x) * 0.1;
//   });

//   return (
//     <mesh position={position} ref={meshRef}>
//       <boxGeometry args={size} /> /
//       <meshStandardMaterial map={musicTexture} attach="material-0" />
//       <meshStandardMaterial map={footballTexture} attach="material-1" />
//       <meshStandardMaterial map={threeTexture} attach="material-2" />
//       <meshStandardMaterial map={fourTexture} attach="material-3" />
//       <meshStandardMaterial map={fiveTexture} attach="material-4" />
//       <meshStandardMaterial map={sixTexture} attach="material-5" />
//     </mesh>
//   );
// }

// export default function R3fDemo() {
//   const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

//   const handleMusicClick = () => {
//     setTargetRotation({ x: 0, y: -Math.PI / 2 });
//   };
//   const handleSportsClick = () => {
//     setTargetRotation({ x: 0, y: Math.PI / 2 });
//   };

//   return (
//     <>
//       <button className="d" onClick={handleMusicClick}>
//         Music
//       </button>
//       <button className="d" onClick={handleSportsClick}>
//         Sports
//       </button>

//       <Canvas camera={{ position: defaultPos, fov: 50 }}>
//         <ambientLight intensity={1} />
//         <directionalLight position={[-2, 2, 3]} />
//         <Cube
//           position={[0, 0, 0]}
//           size={[2.5, 2.5, 2.5]}
//           targetRotation={targetRotation}
//         />
//         <TrackballControls rotateSpeed={3} noZoom={true} noPan={true} />
//       </Canvas>
//     </>
//   );
// }

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useState } from "react";
import { TrackballControls } from "@react-three/drei";

const musicPos = [0, 0, 7];
const defaultPos = [3, 3, 6];

function Cube({ position, size, targetRotation }) {
  const meshRef = useRef();
  const textures = useLoader(TextureLoader, [
    "/image/2.jpg",
    "/image/1.jpeg",
    "/image/3.jpg",
    "/image/4.jpg",
    "/image/5.jpg",
    "/image/6.jpg"
  ]);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += (targetRotation.y - meshRef.current.rotation.y) * 0.1;
    meshRef.current.rotation.x += (targetRotation.x - meshRef.current.rotation.x) * 0.1;
  });

  return (
    <mesh position={position} ref={meshRef}>
      <boxGeometry args={size} />
      {textures.map((texture, index) => (
        <meshStandardMaterial key={index} map={texture} attach={`material-${index}`} />
      ))}
    </mesh>
  );
}

function CameraAnimator({ targetPos}) {
  const { camera } = useThree();
  const startPos = useRef([...camera.position]);
  console.log(startPos);
  

  useFrame(() => {
    camera.position.x = startPos.current[0] + (targetPos[0] - startPos.current[0]) 
    camera.position.y = startPos.current[1] + (targetPos[1] - startPos.current[1]) 
    camera.position.z = startPos.current[2] + (targetPos[2] - startPos.current[2]) 

    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  });

  return null;
}

export default function R3fDemo() {
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [cameraPos, setCameraPos] = useState(defaultPos);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMusicClick = () => {
    setTargetRotation({ x: 0, y: -Math.PI / 2 });
    setCameraPos(musicPos);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleSportsClick = () => {
    setTargetRotation({ x: 0, y: Math.PI / 2 });
    setCameraPos(musicPos);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <>
      <button className="d" onClick={handleMusicClick}>Music</button>
      <button className="d" onClick={handleSportsClick}>Sports</button>

      <Canvas camera={{ position: cameraPos, fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[-2, 2, 3]} />
        <Cube
          position={[0, 0, 0]}
          size={[2.5, 2.5, 2.5]}
          targetRotation={targetRotation}
        />
        {isAnimating && <CameraAnimator targetPos={cameraPos} />}
        <TrackballControls
          enabled={!isAnimating}
          rotateSpeed={3}
          noZoom
          noPan
          makeDefault
        />
      </Canvas>
    </>
  );
}
